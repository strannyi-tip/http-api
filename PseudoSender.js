class PseudoSender {
    static async fetch(url, options) {
        return {
            url: url,
            options: options,
            data: {
                id: 1991,
                name: 'fat troll'
            }
        };
    }
}

module.exports = PseudoSender;