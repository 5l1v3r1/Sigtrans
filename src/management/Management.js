function Management() {
}

Management.prototype = (() => {
    const urls = {
        carAccidents: 'https://131.255.84.174:5000/api/CarAccidents',
        options: 'https://131.255.84.174:5000/api/Options'
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