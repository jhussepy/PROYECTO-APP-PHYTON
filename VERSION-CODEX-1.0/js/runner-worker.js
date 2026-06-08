importScripts('runner.js?v=842-cyber-ui-2');
self.onmessage = async event => {
  try {
    const result = await simulatePython(event.data && event.data.code ? event.data.code : '');
    self.postMessage(result);
  } catch (e) {
    self.postMessage({ ok:false, error: e.message || String(e), friendly: 'Error interno del worker. Revisa el código o recarga la app.' });
  }
};
