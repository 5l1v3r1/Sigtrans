function Management() {
}

Management.prototype = (() => {
  const urls = {
    // carAccidents: 'http://ocorrencias-teste-api.herokuapp.com/api/events/open',
    // options: 'https://131.255.84.174:5000/api/Options',
    // options: 'https://ocorrencias-teste-api.herokuapp.com/api/options/',
    api: 'http://10.81.80.91:8090/sigtrans-api/',
    // api:'http://10.81.80.104:8080/sigtrans-api/'
  };
  const _getUrl = type => urls[type];
  return {
    constructor: Management,
    getUrl: type => _getUrl(type),
  };
})();
const management = new Management();

export function getUrl(type) {
  return management.getUrl(type);
}
