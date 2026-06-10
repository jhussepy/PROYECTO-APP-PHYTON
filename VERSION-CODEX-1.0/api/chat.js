// PySec Academy Elite v11.0.0 — proxy seguro para IA Cloud en Vercel.
// Nunca expone ANTHROPIC_API_KEY al frontend. Configurar la key en Vercel Environment Variables.

const ALLOWED_ORIGINS = new Set([
  'https://proyecto-app-phyton.vercel.app',
  'http://localhost:8000',
  'http://127.0.0.1:8000'
]);
const RATE_LIMIT_WINDOW_MS = 60 * 1000;
const RATE_LIMIT_MAX = 20;
const ipBuckets = new Map();

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const bucket = ipBuckets.get(ip) || { count: 0, start: now };
  if (now - bucket.start > RATE_LIMIT_WINDOW_MS) {
    ipBuckets.set(ip, { count: 1, start: now });
    return false;
  }
  bucket.count += 1;
  ipBuckets.set(ip, bucket);
  return bucket.count > RATE_LIMIT_MAX;
}

function safeString(value, maxLength) {
  return String(value || '').slice(0, maxLength);
}

function normalizeMessages(messages) {
  if (!Array.isArray(messages)) return [];
  return messages.slice(-10).map(item => ({
    role: item?.role === 'assistant' ? 'assistant' : 'user',
    content: safeString(item?.content, 3500)
  })).filter(item => item.content.trim());
}

export default async function handler(req, res) {
  const origin = req.headers.origin || '';
  const allowOrigin = ALLOWED_ORIGINS.has(origin) ? origin : 'https://proyecto-app-phyton.vercel.app';
  res.setHeader('Access-Control-Allow-Origin', allowOrigin);
  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido' });

  const ip = getClientIp(req);
  if (isRateLimited(ip)) return res.status(429).json({ error: 'Límite de IA alcanzado. Espera un minuto e intenta otra vez.' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'IA Cloud no configurada en Vercel. Falta ANTHROPIC_API_KEY.' });

  const body = req.body || {};
  const messages = normalizeMessages(body.messages);
  if (!messages.length) return res.status(400).json({ error: 'Faltan mensajes válidos.' });

  const system = safeString(body.system, 2500) || 'Eres un mentor educativo de PySec Academy Elite. Responde siempre en español.';
  const maxTokens = Math.min(Math.max(Number(body.max_tokens) || 500, 120), 800);
  const model = process.env.ANTHROPIC_MODEL || 'claude-haiku-4-5-20251001';

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({ model, max_tokens: maxTokens, system, messages })
    });
    const data = await response.json().catch(() => ({ error: 'Respuesta IA no JSON' }));
    return res.status(response.status).json(data);
  } catch (error) {
    return res.status(502).json({ error: 'No se pudo contactar la IA Cloud.', detail: String(error?.message || error) });
  }
}
