const ObservadorEstado = require('./ObservadorEstado');
const axios = require('axios');

class ModuloTelemetria extends ObservadorEstado {
  constructor(dispositivoUrls = []) {
    super();
    this._urls = dispositivoUrls;
  }

  atualizar(estado) {
    // Fire-and-forget: não bloqueia o Subject
    for (const url of this._urls) {
      axios.post(url, estado).catch(err => {
        console.warn(`[Telemetria] Falha ao notificar ${url}: ${err.message}`);
      });
    }
  }

  adicionarDispositivo(url) {
    this._urls.push(url);
  }
}

module.exports = ModuloTelemetria;
