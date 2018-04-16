function Management() {
}

Management.prototype = (() => {
    const urls = {
        carAccidents: 'http://localhost:3002/api/events/open',
        // carAccidents: 'http://ocorrencias-teste-api.herokuapp.com/api/events/open',
        // options: 'https://131.255.84.174:5000/api/Options',
        options: 'https://ocorrencias-teste-api.herokuapp.com/api/options'
    };
    const _getUrl = (type) => {
        return urls[type];
    };
    return {
        constructor: Management,
        getUrl: (type) => {
            return _getUrl(type)
        }
    };
})();
const management = new Management();

export function getUrl(type) {
    return management.getUrl(type);
}
