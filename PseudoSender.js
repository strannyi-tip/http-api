class PseudoSender {
    static async fetch(url, options) {
        return {
            url: url,
            options: options
        };
    }
}

module.exports = PseudoSender;