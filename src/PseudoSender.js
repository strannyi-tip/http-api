class PseudoSender {
    static async fetch(url, options, data = {}) {
        return {
            url: url,
            options: options,
        };
    }
}

module.exports = PseudoSender;