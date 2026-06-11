/* Configuración pública. No colocar client secrets, contraseñas ni API keys privadas. */
window.PYSEC_CONFIG = Object.freeze({
  appVersion: '11.3.0',
  googleOAuth: Object.freeze({
    clientId: '',
    redirectUri: `${location.origin}${location.pathname}`,
    scopes: Object.freeze(['openid', 'email', 'profile'])
  }),
  localAI: Object.freeze({
    url: 'http://127.0.0.1:11434',
    model: 'qwen2.5-coder:3b'
  })
});
