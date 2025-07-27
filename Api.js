/**
 * HTTP api.
 */
export default class Api {

    /**
     * HTTP method.
     *
     * @type {{GET: string, HEAD: string, POST: string, PUT: string, DELETE: string, CONNECT: string, OPTIONS: string, TRACE: string, PATCH: string}}
     */
    static Method = {
        GET: 'GET',
        HEAD: 'HEAD',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
        CONNECT: 'CONNECT',
        OPTIONS: 'OPTIONS',
        TRACE: 'TRACE',
        PATCH: 'PATCH',
    };

    /**
     * @param url The request URL
     */
    constructor(url) {

        /**
         * The request url.
         *
         * @private
         */
        this._url = url;

        /**
         * The HTTP request method.
         *
         * @type {string}
         *
         * @private
         */
        this._method = 'GET';

        /**
         * The HTTP request body.
         *
         * @type {string}
         *
         * @private
         */
        this._body = '';

        /**
         * The HTTP request mode (no-cors, *cors, same-origin).
         *
         * @type {string}
         *
         * @private
         */
        this._mode = 'cors';

        /**
         * The HTTP request cache (*default, no-cache, reload, force-cache, only-if-cached).
         *
         * @type {string}
         *
         * @private
         */
        this._cache = 'no-cache';

        /**
         * The HTTP request credentials (include, *same-origin, omit).
         *
         * @type {string}
         *
         * @private
         */
        this._credentials = 'omit';

        /**
         * The HTTP request headers.
         *
         * @type {Headers}
         *
         * @private
         */
        this._headers = new Headers();

        /**
         * The HTTP request redirect (manual, *follow, error).
         *
         * @type {string}
         *
         * @private
         */
        this._redirect = 'follow';

        /**
         * The HTTP request referrer policy (no-referrer, *client).
         *
         * @type {string}
         *
         * @private
         */
        this._referrerPolicy = 'no-referrer';
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
     * The _url getter.
     *
     * @returns {string}
     */
    get url() {
        return this._url;
    }

    /**
     * The _method getter.
     *
     * @returns {string}
     */
    get method() {
        return this._method;
    }

    /**
     * The _body getter.
     *
     * @returns {string}
     */
    get body() {
        return this._body;
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
    async _send(method, data) {
        await fetch(this._url, {
            method: this._method,
            mode: this._mode,
            cache: this._cache,
            credentials: this._credentials,
            headers: this._headers,
            redirect: this._redirect,
            referrerPolicy: this._referrerPolicy,
            body: this._body,
        });
    }

    /**
     * The HTTP[GET] request.
     *
     * @param data
     *
     * @returns {Promise<void>}
     */
    async get(data) {
        await this._send(Api.Method.GET, data);
    }

    /**
     * The HTTP[HEAD] request.
     *
     * @param data
     *
     * @returns {Promise<void>}
     */
    async head(data) {
        await this._send(Api.Method.HEAD, data);
    }

    /**
     * The HTTP[POST] request.
     *
     * @param data
     *
     * @returns {Promise<void>}
     */
    async post(data) {
        await this._send(Api.Method.POST, data);
    }

    /**
     * The HTTP[PUT] request.
     *
     * @param data
     *
     * @returns {Promise<void>}
     */
    async put(data) {
        await this._send(Api.Method.PUT, data);
    }

    /**
     * The HTTP[DELETE] request.
     *
     * @param data
     *
     * @returns {Promise<void>}
     */
    async delete(data) {
        await this._send(Api.Method.DELETE, data);
    }

    /**
     * The HTTP[CONNECT] request.
     *
     * @param data
     *
     * @returns {Promise<void>}
     */
    async connect(data) {
        await this._send(Api.Method.CONNECT, data);
    }

    /**
     * The HTTP[OPTIONS] request.
     *
     * @param data
     *
     * @returns {Promise<void>}
     */
    async options(data) {
        await this._send(Api.Method.OPTIONS, data);
    }

    /**
     * The HTTP[TRACE] request.
     *
     * @param data
     *
     * @returns {Promise<void>}
     */
    async trace(data) {
        await this._send(Api.Method.TRACE, data);
    }

    /**
     * The HTTP[PATCH] request.
     *
     * @param data
     *
     * @returns {Promise<void>}
     */
    async patch(data) {
        await this._send(Api.Method.PATCH, data);
    }
}