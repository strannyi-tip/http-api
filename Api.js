/**
 * HTTP api.
 */
class Api {

    /**
     * HTTP method enumeration.
     *
     * @type {{GET: string, HEAD: string, POST: string, PUT: string, DELETE: string, PATCH: string}}
     */
    static Method = {
        GET: 'GET',
        HEAD: 'HEAD',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
        PATCH: 'PATCH',
    };

    /**
     * HTTP mode enumeration.
     *
     * @type {{NOCORS: string, CORS: string, ORIGIN: string}}
     */
    static Mode = {
        NO_CORS: 'no-cors',
        CORS: 'cors',
        ORIGIN: 'same-origin',
    };

    /**
     * HTTP cache enumeration.
     *
     * @type {{DEFAULT: string, NO_CACHE: string, RELOAD: string, FORCE: string, ONLY_IF_CACHED: string}}
     */
    static Cache = {
        DEFAULT: 'default',
        NO_CACHE: 'no-cache',
        RELOAD: 'reload',
        FORCE_CACHE: 'force-cache',
        ONLY_IF_CACHED: 'only-if-cached',
    };

    /**
     * HTTP credentials enumeration.
     *
     * @type {{INCLUDE: string, SAME_ORIGIN: string, OMIT: string}}
     */
    static Credentials = {
        INCLUDE: 'include',
        SAME_ORIGIN: 'same-origin',
        OMIT: 'omit',
    };

    /**
     * HTTP redirect enumeration.
     *
     * @type {{MANUAL: string, FOLLOW: string, ERROR: string}}
     */
    static Redirect = {
        MANUAL: 'manual',
        FOLLOW: 'follow',
        ERROR: 'error',
    };

    /**
     * HTTP referrer policy enumeration.
     *
     * @type {{NO_REFERRER: string, CLIENT: string}}
     */
    static ReferrerPolicy = {
        NO_REFERRER: 'no-referrer',
        CLIENT: 'client',
    };

    /**
     * @param url The request URL
     * @param sender
     */
    constructor(url, sender = fetch) {

        /**
         * HTTP request sender.
         *
         * @private
         */
        this._sender = sender;

        /**
         * The request url.
         *
         * @private
         */
        this._url = url;

        /**
         * The HTTP request mode.
         *
         * @type {string}
         *
         * @private
         */
        this._mode = Api.Mode.CORS;

        /**
         * The HTTP request cache.
         *
         * @type {string}
         *
         * @private
         */
        this._cache = Api.Cache.NO_CACHE;

        /**
         * The HTTP request credentials.
         *
         * @type {string}
         *
         * @private
         */
        this._credentials = Api.Credentials.OMIT;

        /**
         * The HTTP request headers.
         *
         * @type {Headers}
         *
         * @private
         */
        this._headers = new Headers();

        /**
         * The HTTP request redirect.
         *
         * @type {string}
         *
         * @private
         */
        this._redirect = Api.Redirect.FOLLOW;

        /**
         * The HTTP request referrer.
         *
         * @type {string}
         *
         * @private
         */
        this._referrerPolicy = Api.ReferrerPolicy.NO_REFERRER;

        /**
         * The watch interval descriptors.
         *
         * @type {{}}
         * @private
         */
        this._watch_descriptors = {};

        /**
         * Thw watch objects differences.
         *
         * @type {{}}
         * @private
         */
        this._watch_diffs = {};

        /**
         * Methods which have not body.
         *
         * @type {string[]}
         * @private
         */
        this._no_body_methods = [
            Api.Method.GET,
            Api.Method.HEAD,
        ];

        /**
         * The logger.
         *
         * @type {null}
         * @private
         */
        this._logger = null;
    }

    /**
     * The HTTP request mode setter.
     *
     * @param mode
     *
     * @returns {Api}
     */
    setMode(mode) {
        this._mode = mode;

        return this;
    }

    /**
     * The HTTP request cache setter.
     *
     * @param cache
     *
     * @returns {Api}
     */
    setCache(cache) {
        this._cache = cache;

        return this;
    }

    /**
     * The HTTP request credentials setter.
     *
     * @param credentials
     *
     * @returns {Api}
     */
    setCredentials(credentials) {
        this._credentials = credentials;

        return this;
    }

    /**
     * The HTTP request header setter. Rewritable*
     *
     * @param name
     * @param header
     *
     * @returns {Api}
     */
    setHeader(name, header) {
        this._headers[name] = header;

        return this;
    }

    /**
     * The HTTP request header setter.
     *
     * @param name
     * @param header
     * 
     * @returns {Api}
     */
    addHeader(name, header) {
        this._headers.append(name, header);

        return this;
    }

    /**
     * The HTTP request redirect setter.
     *
     * @param redirect
     *
     * @returns {Api}
     */
    setRedirect(redirect) {
        this._redirect = redirect;

        return this;
    }

    /**
     * The HTTP request referrer policy setter.
     *
     * @param policy
     *
     * @returns {Api}
     */
    setReferrerPolicy(policy) {
        this._referrerPolicy = policy;

        return this;
    }

    /**
     * Set the Logger object.
     *
     * @param logger The Logger interface
     *
     * @return {Api}
     */
    setLogger(logger) {
        this._logger = logger;

        return this;
    }

    /**
     * Has logger.
     *
     * @return {boolean}
     */
    hasLogger() {
        return null !== this._logger;
    }

    /**
     * The _url getter.
     *
     * @returns {string}
     */
    get url() {
        return this._url;
    }

    /**
     * The _mode getter.
     *
     * @returns {string}
     */
    get mode() {
        return this._mode;
    }

    /**
     * The _cache getter.
     *
     * @returns {string}
     */
    get cache() {
        return this._cache;
    }

    /**
     * The _credentials getter.
     *
     * @returns {string}
     */
    get credentials() {
        return this._credentials;
    }

    /**
     * The _headers getter.
     *
     * @returns {object}
     */
    get headers() {
        return this._headers;
    }

    /**
     * The _redirect getter.
     *
     * @returns {string}
     */
    get redirect() {
        return this._redirect;
    }

    /**
     * The _referrerPolicy getter.
     *
     * @returns {string}
     */
    get referrerPolicy() {
        return this._referrerPolicy;
    }

    /**
     * Send HTTP request.
     *
     * @param method HTTP method
     * @param data Request data
     *
     * @returns {Promise<void>}
     *
     * @private
     */
   async _send(method, data = null) {
       const options = {
           method: method,
           mode: this._mode,
           cache: this._cache,
           credentials: this._credentials,
           headers: this._headers,
           redirect: this._redirect,
           referrerPolicy: this._referrerPolicy,
       };
       if (!this._no_body_methods.includes(method)) {
           options.body = JSON.stringify(data);
       }

        return new Promise((resolve, reject) => {
            resolve(this._sender(this._url, options));
            reject((e) => {
                if (!this.hasLogger()) {
                    console.log(e);
                } else {
                    this._logger.error(e);
                }
            });
        });
    }

    /**
     * The HTTP[GET] request.
     *
     * @return {Promise<void>}
     */
    async get() {
        return await this._send(Api.Method.GET);
    }

    /**
     * The HTTP[HEAD] request.
     *
     * @return {Promise<void>}
     */
    async head() {
        return await this._send(Api.Method.HEAD);
    }

    /**
     * The HTTP[POST] request.
     *
     * @param data
     *
     * @return {Promise<void>}
     */
    async post(data) {
        return await this._send(Api.Method.POST, data);
    }

    /**
     * The HTTP[PUT] request.
     *
     * @param data
     *
     * @return {Promise<void>}
     */
    async put(data) {
        return await this._send(Api.Method.PUT, data);
    }

    /**
     * The HTTP[DELETE] request.
     *
     * @param data
     *
     * @return {Promise<void>}
     */
    async delete(data) {
        return await this._send(Api.Method.DELETE, data);
    }

    /**
     * The HTTP[PATCH] request.
     *
     * @param data
     *
     * @return {Promise<void>}
     */
    async patch(data) {
        return await this._send(Api.Method.PATCH, data);
    }

    /**
     * Watch is object has changed data.
     *
     * @param object Target object
     * @param callback Callback function called if an object has diff
     * @param timeout Interval timeout
     * @param limit Interval loop limit
     *
     * @returns {{}}
     */
    watch(object, callback, timeout = 1000, limit = 0) {
        const watch_id = Date.now();
        let iterator = 0;
        this._watch_diffs[watch_id] = object;
        this._watch_descriptors[watch_id] = setInterval(async () => {
            if (limit !== 0 && limit !== iterator) {
                iterator++;
            } else {
                clearInterval(this._watch_descriptors[watch_id]);
            }

            return this._send(Api.Method.GET)
                .then(response => response.text()
                    .then(text => this._compareObjects(this._watch_diffs[watch_id], JSON.parse(text), watch_id, callback))
                );
        }, timeout);
    }

    /**
     * Compare two objects and put diff to callback.
     *
     * @param first Left object
     * @param second Right object
     * @param watch_id The watcher id
     * @param callback Callback function called if an object has diff
     * @private
     */
    _compareObjects(first, second, watch_id, callback) {
        const keys = Object.keys(first);
        let changes_count = 0;
        for (const index in keys) {
            const key = keys[index];
            if (!second.hasOwnProperty(key)) {
                clearInterval(this._watch_descriptors[watch_id]);
                throw Error(`Wrong keys compatibility. Left object key [${key}] not present in right object.`);
            }
            if (first[key] !== second[key]) {
                this._watch_diffs[watch_id][key] = second[key];
                changes_count++;
            }
        }

        if (changes_count > 0) {
            callback(this._watch_diffs[watch_id]);
        }
    }
}

module.exports = Api;