const VIRTUAL_FILE_KEY = 'pysec_virtual_files_v92';
const SAFE_MODULES = ['math','random','hashlib','json','re','os','requests','base64','datetime','statistics'];
function getStorage() { return (typeof localStorage !== 'undefined') ? localStorage : null; }
function loadVirtualFiles() { try { const storage = getStorage(); return storage ? JSON.parse(storage.getItem(VIRTUAL_FILE_KEY) || '{}') : {}; } catch (_) { return {}; } }
function saveVirtualFiles(files) { const storage = getStorage(); if (storage) storage.setItem(VIRTUAL_FILE_KEY, JSON.stringify(files)); }
class PyReturn { constructor(value) { this.value = value; } }
class PyBreak {}
class PyContinue {}

function normalizeCodeInput(code) {
  return String(code || '')
    .replace(/[‘’´`]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\u00a0/g, ' ')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n');
}
async function simulatePython(code) {
  code = normalizeCodeInput(code);
  if (!code.trim()) return err('Código vacío', 'Escribe al menos una instrucción. Por ejemplo: print(\'Hola\')');
  const paren = balance(code, '(', ')'); if (paren !== 0) return err('SyntaxError: paréntesis sin cerrar', 'Revisa que cada ( tenga su ).');
  const brack = balance(code, '[', ']'); if (brack !== 0) return err('SyntaxError: corchetes sin cerrar', 'Revisa que cada [ tenga su ].');
  if (hasUnclosedQuotes(code)) return err('SyntaxError: comillas sin cerrar', 'Revisa que cada comilla simple o doble tenga cierre.');
  const env = { __files__: loadVirtualFiles() };
  const functions = {};
  const classes = {};
  let output = [];
  const lines = normalizePythonLines(code);
  let i = 0;
  try {
    while (i < lines.length) { i = await execLineBlock(lines, i, env, functions, classes, output); }
    saveVirtualFiles(env.__files__);
    return { ok: true, output: output.join('\n') + (output.length ? '\n' : '') };
  } catch (e) {
    if (e instanceof PyReturn) return { ok: true, output: pyFormat(e.value) + '\n' };
    return err(e.message || String(e), friendlyError(e.message || String(e)));
  }
}
function balance(s,a,b) { return (s.match(new RegExp('\\'+a,'g'))||[]).length - (s.match(new RegExp('\\'+b,'g'))||[]).length; }
function hasUnclosedQuotes(s) { let single=false,dbl=false,esc=false; for (const ch of s) { if (esc) { esc=false; continue; } if (ch==='\\') { esc=true; continue; } if (ch==="'" && !dbl) single=!single; if (ch==='"' && !single) dbl=!dbl; } return single||dbl; }
function normalizePythonLines(code) {
  const rawLines = code.replace(/\t/g, '    ').split('\n');
  const lines = [];
  for (const raw of rawLines) {
    const indent = (raw.match(/^ */) || [''])[0];
    for (const part of splitStatements(raw.trim())) lines.push(indent + part);
  }
  return lines;
}
function splitStatements(line) {
  const out=[]; let cur='', depth=0, q=null, esc=false;
  for (const ch of line) {
    if (q) { cur += ch; if (esc) { esc=false; continue; } if (ch === '\\') { esc=true; continue; } if (ch === q) q=null; continue; }
    if (ch === "'" || ch === '"') { q=ch; cur+=ch; continue; }
    if (ch === '(' || ch === '[' || ch === '{') depth++;
    if (ch === ')' || ch === ']' || ch === '}') depth--;
    if (ch === ';' && depth === 0) { if (cur.trim()) out.push(cur.trim()); cur=''; }
    else cur += ch;
  }
  if (cur.trim() || !out.length) out.push(cur.trim());
  return out;
}

function err(error, friendly) { return { ok:false, error, friendly }; }
function friendlyError(msg) {
  if (msg.includes('NameError')) return 'Estás usando una variable que no fue creada antes o escribiste mal su nombre.';
  if (msg.includes('Indentation')) return 'Falta indentación. Después de if, for, while, try, except, def o class usa espacios.';
  if (msg.includes('ModuleNotFound')) return 'Ese módulo no está disponible en el simulador. Usa módulos educativos permitidos: math, random, hashlib, json, re, os, requests, base64, datetime o statistics.';
  if (msg.includes('FileNotFound')) return 'El archivo no existe en el sistema virtual. Créalo antes con open(..., "w") o revisa el nombre.';
  if (msg.includes('requests')) return 'Las peticiones reales solo están permitidas hacia localhost, 127.0.0.1 o la misma app. Para internet usa datos simulados.';
  if (msg.includes('Syntax')) return 'Hay un problema de sintaxis. Revisa paréntesis, comillas, dos puntos o estructura del bloque.';
  if (msg.includes('loop')) return 'El bucle while parece no terminar. Agrega una condición de salida.';
  return 'Revisa la línea indicada y compara con el ejemplo.';
}
function stripComment(line) { let inS=false,inD=false,esc=false; for (let i=0;i<line.length;i++){ const ch=line[i]; if(esc){esc=false;continue;} if(ch==='\\'){esc=true;continue;} if(ch==="'"&&!inD) inS=!inS; if(ch==='"'&&!inS) inD=!inD; if(ch==='#'&&!inS&&!inD) return line.slice(0,i); } return line; }
function indentOf(line) { return (line.match(/^ */)||[''])[0].length; }

async function execLineBlock(lines, i, env, functions, classes, output) {
  let raw = lines[i]; let line = stripComment(raw).trim(); if (!line) return i+1;
  let m;
  if ((m = line.match(/^import\s+([\w,\s]+)$/))) { for (const name of m[1].split(',').map(x=>x.trim())) importModule(name, env); return i+1; }
  if ((m = line.match(/^from\s+(\w+)\s+import\s+(.+)$/))) { importFromModule(m[1], m[2], env); return i+1; }
  if ((m = line.match(/^with\s+open\((.*)\)\s+as\s+(\w+)\s*:/))) { const {block,next} = collectBlock(lines, i); const args=splitArgs(m[1]).map(x=>evalExpr(x,env,functions,classes)); env[m[2]] = makeFileHandle(args[0], args[1] || 'r', env); await execLines(block, env, functions, classes, output); delete env[m[2]]; saveVirtualFiles(env.__files__); return next; }
  if ((m = line.match(/^try\s*:/))) { const tb = collectBlock(lines, i); let finalNext = tb.next; let catchBlock = null; if (lines[tb.next] && stripComment(lines[tb.next]).trim().startsWith('except')) { const eb = collectBlock(lines, tb.next); catchBlock = eb.block; finalNext = eb.next; } try { await execLines(tb.block, env, functions, classes, output); } catch (e) { if (!catchBlock) throw e; await execLines(catchBlock, env, functions, classes, output); } return finalNext; }
  if ((m = line.match(/^class\s+(\w+)(?:\([^)]*\))?\s*:/))) { const cb = collectBlock(lines, i); classes[m[1]] = parseClass(cb.block); return cb.next; }
  if ((m = line.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:/))) { const {block,next} = collectBlock(lines, i); functions[m[1]] = {params: parseParams(m[2]), block}; return next; }
  if ((m = line.match(/^while\s+(.+)\s*:/))) { const {block,next} = collectBlock(lines, i); let guard=0; while (evalCondition(m[1], env, functions, classes)) { if (++guard > 1000) throw new Error('RuntimeError: loop while detenido por seguridad'); try { await execLines(block, env, functions, classes, output); } catch (e) { if (e instanceof PyBreak) break; if (e instanceof PyContinue) continue; throw e; } } return next; }
  if ((m = line.match(/^if\s+(.+)\s*:/))) { const {block,next} = collectBlock(lines, i); const branches=[{cond:m[1], block}]; let j=next; let elseBlock=[]; while (lines[j] && stripComment(lines[j]).trim().startsWith('elif ')) { const mm=stripComment(lines[j]).trim().match(/^elif\s+(.+)\s*:/); const eb=collectBlock(lines,j); branches.push({cond:mm[1], block:eb.block}); j=eb.next; } if (lines[j] && stripComment(lines[j]).trim().startsWith('else:')) { const eb=collectBlock(lines,j); elseBlock=eb.block; j=eb.next; } let done=false; for (const b of branches) { if (evalCondition(b.cond, env, functions, classes)) { await execLines(b.block, env, functions, classes, output); done=true; break; } } if (!done) await execLines(elseBlock, env, functions, classes, output); return j; }
  if ((m = line.match(/^for\s+(.+?)\s+in\s+(.+)\s*:/))) { const {block,next} = collectBlock(lines, i); const targets=m[1].split(',').map(x=>x.trim()); const iterable=evalExpr(m[2], env, functions, classes); const arr = toIterable(iterable); for (const item of arr) { if (targets.length===1) env[targets[0]]=item; else targets.forEach((t,idx)=>env[t]=item[idx]); try { await execLines(block, env, functions, classes, output); } catch (e) { if (e instanceof PyBreak) break; if (e instanceof PyContinue) continue; throw e; } } return next; }
  await execSimple(line, env, functions, classes, output); return i+1;
}
function collectBlock(lines, i) { const base = indentOf(lines[i]); const block=[]; let j=i+1; while (j<lines.length) { if (!stripComment(lines[j]).trim()) { block.push(''); j++; continue; } if (indentOf(lines[j]) <= base) break; block.push(lines[j].slice(base+4)); j++; } if (block.filter(x=>stripComment(x).trim()).length===0) throw new Error('IndentationError: se esperaba un bloque indentado'); return {block,next:j}; }
async function execLines(block, env, functions, classes, output) { let j=0; while (j<block.length) j = await execLineBlock(block, j, env, functions, classes, output); }
function parseParams(s) { return s.split(',').map(x=>x.trim()).filter(Boolean).map(x=>x.split('=')[0].trim()); }
function parseClass(block) { const methods={}; let j=0; while (j<block.length) { const line=stripComment(block[j]).trim(); const m=line.match(/^def\s+(\w+)\s*\(([^)]*)\)\s*:/); if (m) { const cb=collectBlock(block,j); methods[m[1]]={params:parseParams(m[2]), block:cb.block}; j=cb.next; } else j++; } return {methods}; }

async function execSimple(line, env, functions, classes, output) {
  if (!line) return;
  if (line === 'pass') return;
  if (line === 'break') throw new PyBreak();
  if (line === 'continue') throw new PyContinue();
  let m;
  if ((m=line.match(/^return(?:\s+(.+))?$/))) throw new PyReturn(m[1] ? await evalExprAsync(m[1], env, functions, classes) : null);
  if ((m=line.match(/^print\((.*)\)$/))) { const args=[]; for (const x of splitArgs(m[1])) args.push(await evalExprAsync(x, env, functions, classes, output)); output.push(args.map(pyFormat).join(' ')); return; }
  if ((m=line.match(/^(\w+)\.(\w+)\((.*)\)$/))) { await callMethod(env[m[1]], m[2], splitArgs(m[3]).map(x=>evalExpr(x,env,functions,classes)), env, functions, classes, output); return; }
  if ((m=line.match(/^([\w\.]+)\s*([+\-*/%]?=)\s*(.+)$/))) { await assignTarget(m[1], m[2], m[3], env, functions, classes, output); return; }
  if ((m=line.match(/^(\w+)\((.*)\)$/))) { await callFunctionOrClass(m[1], splitArgs(m[2]).map(x=>evalExpr(x,env,functions,classes)), env, functions, classes, output); return; }
  throw new Error('SyntaxError: instrucción no reconocida en simulador');
}
async function assignTarget(target, op, expr, env, functions, classes, output) { const val = await evalExprAsync(expr, env, functions, classes, output); let current = getTargetValue(target, env); let final = val; if (op !== '=') { const o=op[0]; final = operate(current, o, val); } setTargetValue(target, final, env); }
function getTargetValue(target, env) { if (target.includes('.')) { const [obj,attr]=target.split('.'); return env[obj]?.attrs?.[attr]; } return env[target]; }
function setTargetValue(target, value, env) { if (target.includes('.')) { const [obj,attr]=target.split('.'); if (!env[obj] || !env[obj].attrs) throw new Error(`NameError: ${obj} no está definido como objeto`); env[obj].attrs[attr]=value; } else env[target]=value; }

async function evalExprAsync(expr, env, functions, classes, output=[]) {
  expr = expr.trim();
  let m = expr.match(/^(requests)\.get\((.*)\)$/);
  if (m) return await requestGet(evalExpr(m[2], env, functions, classes));
  m = expr.match(/^(\w+)\((.*)\)$/);
  if (m && (functions[m[1]] || classes[m[1]] || typeof env[m[1]] === 'function')) {
    return await callFunctionOrClass(m[1], splitArgs(m[2]).map(x => evalExpr(x, env, functions, classes)), env, functions, classes, output);
  }
  m = expr.match(/^(\w+)\.(\w+)\((.*)\)$/);
  if (m && env[m[1]] && env[m[1]].__object__) {
    return await callObjectMethod(env[m[1]], m[2], splitArgs(m[3]).map(x => evalExpr(x, env, functions, classes)), env, functions, classes, output);
  }
  return evalExpr(expr, env, functions, classes);
}
function evalExpr(expr, env, functions={}, classes={}) {
  expr = expr.trim();
  if ((expr.startsWith('f"') && expr.endsWith('"')) || (expr.startsWith("f'") && expr.endsWith("'"))) return evalFString(expr, env, functions, classes);
  if ((expr.startsWith("'") && expr.endsWith("'")) || (expr.startsWith('"') && expr.endsWith('"'))) return expr.slice(1,-1);
  if (/^-?\d+(\.\d+)?$/.test(expr)) return Number(expr);
  if (expr === 'True') return true; if (expr === 'False') return false; if (expr === 'None') return null;
  let m;
  if ((m=expr.match(/^input\((.*)\)$/))) { const label=m[1] ? String(evalExpr(m[1],env,functions,classes)) : 'Entrada:'; const promptFn = (typeof window !== 'undefined' && typeof window.prompt === 'function') ? window.prompt.bind(window) : null; const value = promptFn ? promptFn(label) : 'Peter'; return (value === null || String(value).trim() === '') ? 'Peter' : String(value); }
  const inOp = scanForOps(expr, [' not in ', ' in ']);
  if (inOp) { const left=evalExpr(inOp.left,env,functions,classes); const right=evalExpr(inOp.right,env,functions,classes); const found = Array.isArray(right) ? right.includes(left) : String(right).includes(String(left)); return inOp.op.trim() === 'in' ? found : !found; }
  if ((m=expr.match(/^(\w+)\((.*)\)$/)) && (functions[m[1]] || env[m[1]])) return callFunctionOrClassSync(m[1], splitArgs(m[2]).map(x=>evalExpr(x,env,functions,classes)), env, functions, classes);
  if ((m=expr.match(/^(\w+)\.(\w+)\((.*)\)$/))) return callBuiltinMethod(env[m[1]], m[2], splitArgs(m[3]).map(x=>evalExpr(x,env,functions,classes)), env);
  if ((m=expr.match(/^(\w+)\.(\w+)$/))) { const base=env[m[1]]; if (base && base.__module__) return base[m[2]]; if (base && base.attrs) return base.attrs[m[2]]; }
  if (/^\[.*\]$/.test(expr)) { const inner=expr.slice(1,-1).trim(); if(!inner) return []; return splitArgs(inner).map(x=>evalExpr(x,env,functions,classes)); }
  if (/^\{.*\}$/.test(expr)) return evalDict(expr, env, functions, classes);
  if ((m = expr.match(/^(.+)\[(.+)\]$/))) { const obj=evalExpr(m[1],env,functions,classes); const key=evalExpr(m[2],env,functions,classes); return obj[key]; }
  if ((m=expr.match(/^len\((.+)\)$/))) return evalExpr(m[1], env, functions, classes).length;
  if ((m=expr.match(/^range\((.*)\)$/))) { const args=splitArgs(m[1]).map(x=>Number(evalExpr(x,env,functions,classes))); let start=0, stop=args[0], step=1; if(args.length===2){start=args[0];stop=args[1];} if(args.length===3){start=args[0];stop=args[1];step=args[2];} const out=[]; for(let n=start; step>0?n<stop:n>stop; n+=step) out.push(n); return out; }
  if ((m=expr.match(/^int\((.+)\)$/))) return parseInt(evalExpr(m[1],env,functions,classes),10);
  if ((m=expr.match(/^str\((.+)\)$/))) return String(evalExpr(m[1],env,functions,classes));
  if ((m=expr.match(/^float\((.+)\)$/))) return Number(evalExpr(m[1],env,functions,classes));
  if ((m=expr.match(/^bool\((.+)\)$/))) return Boolean(evalExpr(m[1],env,functions,classes));
  const binary = findTopLevelOperator(expr, [' or ',' and ','==','!=','>=','<=','>','<','+','-','*','/','//','%','**']);
  if (binary) { const a=evalExpr(binary.left,env,functions,classes), b=evalExpr(binary.right,env,functions,classes); return operate(a,binary.op.trim(),b); }
  if (expr.startsWith('not ')) return !evalExpr(expr.slice(4),env,functions,classes);
  if (expr in env) return env[expr];
  throw new Error(`NameError: ${expr} no está definido`);
}
function findTopLevelOperator(expr, opsIgnored) {
  const groups = [[' or '], [' and '], ['==','!=','>=','<=','>','<'], ['+','-'], ['*','/','//','%'], ['**']];
  for (const group of groups) {
    const found = scanForOps(expr, group);
    if (found) return found;
  }
  return null;
}
function scanForOps(expr, ops) {
  let depth=0,q=null,esc=false;
  for(let i=expr.length-1;i>=0;i--){
    const ch=expr[i];
    if(q){ if(esc){esc=false;continue;} if(ch==='\\'){esc=true;continue;} if(ch===q) q=null; continue; }
    if(ch==='"'||ch==="'"){q=ch;continue;}
    if(ch===')'||ch===']'||ch==='}')depth++;
    if(ch==='('||ch==='['||ch==='{')depth--;
    if(depth===0){
      for(const op of ops){
        const start=i-op.length+1;
        if(start>=0 && expr.slice(start,i+1)===op) {
          if ((op === '+' || op === '-') && start === 0) continue;
          return {left:expr.slice(0,start),op,right:expr.slice(i+1)};
        }
      }
    }
  }
  return null;
}
function operate(a,op,b){ if(op==='or') return a||b; if(op==='and') return a&&b; if(op==='==') return a==b; if(op==='!=') return a!=b; if(op==='>=') return a>=b; if(op==='<=') return a<=b; if(op==='>') return a>b; if(op==='<') return a<b; if(op==='+') return a+b; if(op==='-') return a-b; if(op==='*') return a*b; if(op==='/') return a/b; if(op==='//') return Math.floor(a/b); if(op==='%') return a%b; if(op==='**') return a**b; return b; }
function evalCondition(expr, env, functions, classes) { return Boolean(evalExpr(expr, env, functions, classes)); }
function evalFString(expr, env, functions, classes) { let s=expr.slice(2,-1); return s.replace(/\{([^{}]+)\}/g, (_, inner) => pyFormat(evalExpr(inner.trim(), env, functions, classes))); }
function evalDict(expr, env, functions, classes) { const obj={}; const inner=expr.slice(1,-1).trim(); if(!inner)return obj; splitArgs(inner).forEach(pair=>{ const idx=pair.indexOf(':'); const k=evalExpr(pair.slice(0,idx).trim(),env,functions,classes); const v=evalExpr(pair.slice(idx+1).trim(),env,functions,classes); obj[k]=v; }); return obj; }
function splitArgs(s) { const out=[]; let cur='', depth=0, q=null, esc=false; for (const ch of s) { if(q){cur+=ch;if(esc){esc=false;continue;} if(ch==='\\'){esc=true;continue;} if(ch===q)q=null;continue;} if(ch==="'"||ch==='"'){q=ch;cur+=ch;continue;} if(ch==='('||ch==='['||ch==='{')depth++; if(ch===')'||ch===']'||ch==='}')depth--; if(ch===','&&depth===0){out.push(cur.trim());cur='';} else cur+=ch; } if(cur.trim())out.push(cur.trim()); return out; }
function toIterable(value) { if (Array.isArray(value)) return value; if (typeof value === 'string') return value.split(''); if (value && typeof value === 'object') return Object.entries(value); throw new Error('TypeError: el for necesita una lista, string, diccionario o range()'); }
function pyFormat(value) { if (value && value.__response__) return `<Response [${value.status_code}]>`; if (value && value.__object__) return `<${value.__class__} object>`; if (Array.isArray(value)) return '[' + value.map(pyFormat).join(', ') + ']'; if (value && typeof value === 'object') return '{' + Object.entries(value).filter(([k])=>!k.startsWith('__')).map(([k,v]) => `'${k}': ${pyFormat(v)}`).join(', ') + '}'; if (typeof value === 'boolean') return value ? 'True' : 'False'; if (value === null) return 'None'; return String(value); }

function importModule(name, env) { if (!SAFE_MODULES.includes(name)) throw new Error(`ModuleNotFoundError: ${name}`); env[name]=makeModule(name); }
function importFromModule(name, imports, env) { const mod=makeModule(name); imports.split(',').map(x=>x.trim()).forEach(k=>env[k]=mod[k]); }
function makeModule(name) { if(name==='math') return {__module__:true, sqrt:Math.sqrt, floor:Math.floor, ceil:Math.ceil, pi:Math.PI}; if(name==='random') return {__module__:true, randint:(a,b)=>Math.floor(Math.random()*(b-a+1))+a, choice:(arr)=>arr[Math.floor(Math.random()*arr.length)]}; if(name==='hashlib') return {__module__:true, sha256:(txt)=>({hexdigest:()=>simpleHash(String(txt))})}; if(name==='json') return {__module__:true, dumps:(v)=>JSON.stringify(v), loads:(s)=>JSON.parse(s)}; if(name==='re') return {__module__:true, search:(p,s)=>({group:()=>String(s).match(new RegExp(p))?.[0] || ''}), findall:(p,s)=>String(s).match(new RegExp(p,'g'))||[]}; if(name==='os') return {__module__:true, getcwd:()=>'/pysec-lab', listdir:()=>Object.keys(loadVirtualFiles())}; if(name==='requests') return {__module__:true, get:(url)=>({__request__:url})}; if(name==='base64') return {__module__:true, b64encode:(txt)=>({decode:()=>btoa(String(txt))}), b64decode:(txt)=>({decode:()=>atob(String(txt))})}; if(name==='datetime') return {__module__:true, date:{today:()=>({isoformat:()=>new Date().toISOString().slice(0,10)})}, datetime:{now:()=>({isoformat:()=>new Date().toISOString()})}}; if(name==='statistics') return {__module__:true, mean:(arr)=>arr.reduce((a,b)=>a+Number(b),0)/arr.length, median:(arr)=>{const x=[...arr].map(Number).sort((a,b)=>a-b); const m=Math.floor(x.length/2); return x.length%2?x[m]:(x[m-1]+x[m])/2;}}; return {__module__:true}; }
function callBuiltinMethod(base, method, args, env) { if (typeof base === 'function') return base(...args); if (base && base.__response__) { if(method==='json') return base.json; } if (base && base.__module__) { const fn=base[method]; if(typeof fn==='function') return fn(...args); return fn; } if (base && base.__file__) return fileMethod(base, method, args, env); if (base && base.__object__) return callMethodSync(base, method, args, env); if (Array.isArray(base) && method==='append') { base.push(args[0]); return null; } if (typeof base === 'string' && method==='lower') return base.toLowerCase(); if (typeof base === 'string' && method==='upper') return base.toUpperCase(); if (typeof base === 'string' && method==='strip') return base.trim(); if (typeof base === 'string' && method==='split') return base.split(args[0] ?? undefined); throw new Error(`NameError: método ${method} no disponible`); }
async function callMethod(base, method, args, env, functions, classes, output) { if (base && base.__file__) { fileMethod(base, method, args, env); return; } if (Array.isArray(base) && method==='append') { base.push(args[0]); return; } if (base && base.__object__) { await callObjectMethod(base, method, args, env, functions, classes, output); return; } throw new Error(`NameError: método ${method} no disponible`); }
function callFunctionOrClassSync(name,args,env,functions,classes) { if (classes[name]) return instantiateClass(name,args,env,functions,classes); if (functions[name]) { const local=Object.create(env); functions[name].params.forEach((p,i)=>local[p]=args[i]); let out=[]; execLines(functions[name].block, local, functions, classes, out).catch(e=>{ if(e instanceof PyReturn) return e.value; throw e; }); return null; } if (typeof env[name] === 'function') return env[name](...args); throw new Error(`NameError: ${name} no está definido`); }
async function callFunctionOrClass(name,args,env,functions,classes,output) { if (classes[name]) return await instantiateClass(name,args,env,functions,classes); if (functions[name]) { const local=Object.create(env); functions[name].params.forEach((p,i)=>local[p]=args[i]); try { await execLines(functions[name].block, local, functions, classes, output); } catch(e) { if(e instanceof PyReturn) return e.value; throw e; } return null; } if (typeof env[name] === 'function') return env[name](...args); throw new Error(`NameError: ${name} no está definido`); }
async function instantiateClass(name,args,env,functions,classes) { const obj={__object__:true,__class__:name,attrs:{}}; const init=classes[name].methods.__init__; if (init) { const local=Object.create(env); local.self=obj; init.params.slice(1).forEach((p,i)=>local[p]=args[i]); await execLines(init.block, local, functions, classes, []); } return obj; }
async function callObjectMethod(obj, method, args, env, functions, classes, output) { const def=classes[obj.__class__]?.methods?.[method]; if(!def) throw new Error(`NameError: método ${method} no existe`); const local=Object.create(env); local.self=obj; def.params.slice(1).forEach((p,i)=>local[p]=args[i]); try { await execLines(def.block, local, functions, classes, output); } catch(e) { if(e instanceof PyReturn) return e.value; throw e; } }
function callMethodSync(obj, method, args, env) { if (obj.attrs && method in obj.attrs && typeof obj.attrs[method] === 'function') return obj.attrs[method](...args); return null; }
function makeFileHandle(path, mode, env) { path=String(path); if (!env.__files__) env.__files__={}; if (mode.includes('r') && !(path in env.__files__)) throw new Error(`FileNotFoundError: ${path}`); if (mode.includes('w')) env.__files__[path]=''; if (mode.includes('a') && !(path in env.__files__)) env.__files__[path]=''; return {__file__:true,path,mode}; }
function fileMethod(file, method, args, env) { if (method==='write') { env.__files__[file.path]=(env.__files__[file.path]||'')+String(args[0]); saveVirtualFiles(env.__files__); return null; } if(method==='read') return env.__files__[file.path] || ''; if(method==='readlines') return (env.__files__[file.path]||'').split('\n').map(x=>x+'\n'); throw new Error(`NameError: método de archivo ${method} no disponible`); }
function simpleHash(s) { let h=0x811c9dc5; for (let i=0;i<s.length;i++){h^=s.charCodeAt(i); h=Math.imul(h,0x01000193)>>>0;} return h.toString(16).padStart(64,'0'); }
async function requestGet(url) { url=String(url); const origin = (typeof location !== 'undefined' && location.origin) ? location.origin : ''; const canFetch = typeof fetch === 'function'; const allowed = url.startsWith('http://127.0.0.1') || url.startsWith('http://localhost') || (origin && url.startsWith(origin)) || url.startsWith('./') || url.startsWith('/'); if(!allowed) throw new Error('requests: URL bloqueada fuera de laboratorio autorizado'); if(!canFetch) return {__response__:true,status_code:0,headers:{},text:'',json:null,error:'fetch no disponible en este entorno'}; try { const res=await fetch(url); const text=await res.text(); let json=null; try{json=JSON.parse(text);}catch(_){} return {__response__:true,status_code:res.status,headers:{},text,json}; } catch(e) { return {__response__:true,status_code:0,headers:{},text:'',json:null,error:String(e)}; } }



function runPythonSafe(code, options = {}) {
  const timeoutMs = Number(options.timeoutMs || 3500);
  const workerPath = (typeof window !== 'undefined' && window.PYSEC_WORKER_PATH) ? window.PYSEC_WORKER_PATH : 'js/runner-worker.js';
  const fallbackRun = () => Promise.race([
    simulatePython(code),
    new Promise(resolve => setTimeout(() => resolve(err('TimeoutError: ejecución detenida por seguridad', 'El código tardó demasiado. Revisa posibles bucles infinitos.')), timeoutMs))
  ]);
  if (typeof Worker !== 'undefined') {
    try {
      return new Promise(resolve => {
        let worker;
        try {
          worker = new Worker(workerPath);
        } catch (workerError) {
          fallbackRun().then(result => resolve({
            ...result,
            fallback: true,
            message: result.message || 'Worker no disponible. Usando simulador local fallback.'
          }));
          return;
        }
        const timer = setTimeout(() => {
          worker.terminate();
          resolve(err('TimeoutError: ejecución detenida por seguridad', 'El código tardó demasiado. Revisa posibles bucles infinitos o operaciones muy pesadas.'));
        }, timeoutMs);
        worker.onmessage = event => { clearTimeout(timer); worker.terminate(); resolve(event.data); };
        worker.onerror = event => {
          clearTimeout(timer);
          worker.terminate();
          fallbackRun().then(result => resolve({
            ...result,
            fallback: true,
            message: result.message || `Worker no disponible (${event.message || 'error de origen'}). Usando simulador local fallback.`
          }));
        };
        worker.postMessage({ code });
      });
    } catch (_) {
      return fallbackRun();
    }
  }
  return fallbackRun();
}
