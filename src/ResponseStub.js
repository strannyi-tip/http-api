class ResponseStub {
    static async fetch(url = '', options = {}) {
        return Response.json({
            id: 1,
            name: 'Slim Sad',
        });
    }
}

module.exports = ResponseStub;