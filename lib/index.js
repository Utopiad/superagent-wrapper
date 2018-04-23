'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var apiBaseURL = '';
var defaultHeaders = {
    Accept: 'application/json'
};

var setHeaders = function setHeaders(headers) {
    return Object.assign({}, defaultHeaders, headers);
};

var endCallback = function endCallback(resolve, reject, error, response) {
    try {
        var resObj = response.text ? JSON.parse(response.text) : {};

        if (error) {
            reject({ error: true, data: resObj, status: response.status });
            return;
        }

        resolve(resObj);
    } catch (unknownError) {
        reject({
            error: true,
            data: { message: 'Unknown error' },
            status: response ? response.status : 500
        });
    }
};

var init = function init(apiUrl) {
    var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    apiBaseURL = apiUrl;
    defaultHeaders = Object.assign({}, defaultHeaders, headers);
};

var send = function send(method, endpoint, values) {
    var headers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    return new Promise(function (resolve, reject) {
        method('' + apiBaseURL + endpoint).set(setHeaders(headers)).send(values).end(function (error, response) {
            endCallback(resolve, reject, error, response);
        });
    });
};

var get = function get(endpoint) {
    var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve, reject) {
        _superagent2.default.get('' + apiBaseURL + endpoint).set(setHeaders(headers)).end(function (error, response) {
            endCallback(resolve, reject, error, response);
        });
    });
};

var del = function del(endpoint) {
    var headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return new Promise(function (resolve, reject) {
        _superagent2.default.del('' + apiBaseURL + endpoint).set(setHeaders(headers)).end(function (error, response) {
            endCallback(resolve, reject, error, response);
        });
    });
};

var post = function post(endpoint, values) {
    var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return send(_superagent2.default.post, endpoint, values, headers);
};

var put = function put(endpoint, values) {
    var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return send(_superagent2.default.put, endpoint, values, headers);
};

var patch = function patch(endpoint, values) {
    var headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    return send(_superagent2.default.patch, endpoint, values, headers);
};

exports.default = {
    init: init,
    get: get,
    post: post,
    put: put,
    patch: patch,
    del: del
};