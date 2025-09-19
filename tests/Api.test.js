const Api = require('../Api');
const PseudoSender = require("../PseudoSender");

const api = new Api(':http:', PseudoSender.fetch);

test('Test for url setted correctly', ()=>{
    expect(api.url).toBe(':http:');
});

test('Test for GET method setted correctly', ()=> {
    api.get().then(r => (r) => {
        expect(r.url).toBe(':http:');
        expect(r.options.method).toBe(Api.Method.GET);
    });
});
test('Test for HEAD method setted correctly', () => {
    api.head({a: 1, b: 2}).then(r => (r) => {
        expect(r.url).toBe(':http:');
        expect(r.options.method).toBe(Api.Method.HEAD);
        expect(r.options.body).toBe({a: 1, b: 2});
    });
});

test('Test for POST method setted correctly', () => {
    api.post({foo: 'foo', bar: 'bar'}).then(r => (r) => {
        expect(r.url).toBe(':http:');
        expect(r.options.method).toBe(Api.Method.POST);
        expect(r.options.body).toBe({foo: 'foo', bar: 'bar'});
    });
});

test('Test for PUT method setted correctly', () => {
    api.put({foo: 'foo', a: 1}).then(r => (r) => {
        expect(r.url).toBe(':http:');
        expect(r.options.method).toBe(Api.Method.PUT);
        expect(r.options.body).toBe({foo: 'foo', a: 1});
    });
});

test('Test for DELETE method setted correctly', () => {
    api.delete({foo: 'foo'}).then(r => (r) => {
        expect(r.url).toBe(':http:');
        expect(r.options.method).toBe(Api.Method.DELETE);
        expect(r.options.body).toBe({foo: 'foo'});
    });
});

test('Test for CONNECT method setted correctly', () => {
    api.connect({foo: 'foo', bar: 'bar'}).then(r => (r) => {
        expect(r.url).toBe(':http:');
        expect(r.options.method).toBe(Api.Method.CONNECT);
        expect(r.options.body).toBe({foo: 'foo', bar: 'bar'});
    });
});

test('Test for OPTIONS method setted correctly', () => {
    api.options({message: 'Work for food'}).then(r => (r) => {
        expect(r.url).toBe(':http:');
        expect(r.options.method).toBe(Api.Method.OPTIONS);
        expect(r.options.body).toBe({message: 'Work for food'});
    });
});

test('Test for TRACE method setted correctly', () => {
    api.trace({message: 'Need more gold'}).then(r => (r) => {
        expect(r.url).toBe(':http:');
        expect(r.options.method).toBe(Api.Method.TRACE);
        expect(r.options.body).toBe({message: 'Need more gold'});
    });
});

test('Test for PATCH method setted correctly', () => {
    api.patch({message: 'Please call the police'}).then(r => (r)=> {
        expect(r.url).toBe(':http:');
        expect(r.options.method).toBe(Api.Method.TRACE);
        expect(r.options.body).toBe({message: 'Please call the police'});
    });
});

test('Test for header added correctly', () => {
    api
        .addHeader('Content-Type', 'application/insomnia')
        .post({})
        .then(r => (r) => {
            expect(r.options.headers.has('Content-Type')).toBe(true);
            expect(r.options.headers.get('Content-Type')).toBe('application/insomnia');
        });
});

test('Test for mode setted correctly', () => {
    api
        .setMode(Api.Mode.ORIGIN)
        .get()
        .then(r => (r) => {
            expect(r.options.mode).toBe(Api.Mode.ORIGIN);
        });
});

test('Test for cache setted correctly', () => {
    api
        .setCache(Api.Cache.ONLY_IF_CACHED)
        .get()
        .then(r => (r) => {
            expect(r.options.cache).toBe(Api.Cache.ONLY_IF_CACHED);
        });
});

test('Test for credentials setted correctly', () => {
    api
        .setCache(Api.Credentials.INCLUDE)
        .get()
        .then(r => (r) => {
            expect(r.options.cache).toBe(Api.Credentials.INCLUDE);
        });
});

test('Test for header rewrited success', () => {
    api
        .addHeader('Content-Type', 'foo/bar')
        .get()
        .then(r => (r) => {
            expect(r.options.headers.get('Content-Type')).toBe('foo/bar');
        });
    api
        .setHeader('Content-Type', 'application/javascript')
        .get()
        .then(r => (r) => {
            expect(r.options.headers.get('Content-Type')).toBe('application/javascript');
        });
});

test('Test for redirect setted correctly', () => {
    api
        .setRedirect(Api.Redirect.FOLLOW)
        .get()
        .then(r => (r) => {
            expect(r.options.redirect).toBe(Api.Redirect.FOLLOW);
        });
});

test('Test for referrerPolicy setted correctly', () => {
    api
        .setReferrerPolicy(Api.ReferrerPolicy.NO_REFERRER)
        .get()
        .then(r => (r) => {
            expect(r.options.referrerPolicy).toBe(Api.ReferrerPolicy.NO_REFERRER);
        });
});

test('Test for watch object', async () => {

});