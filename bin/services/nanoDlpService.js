'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestPromiseNative = require("request-promise-native");

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _stl2png = require("./utils/stl2png.js");

var _stl2png2 = _interopRequireDefault(_stl2png);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _debug = require("debug");

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require("babel-polyfill");

var debug = (0, _debug2.default)('nanodlp');

var NanoDLPService = function () {
  function NanoDLPService(auth) {
    _classCallCheck(this, NanoDLPService);

    this.serverURL = global.SERVER_URL;
    if (auth.enable) {
      this.auth = true;
      this.user = auth.user;
      this.pass = auth.pass;
      this.session = "";
      this._getSession();
    } else {
      this.auth = false;
    }
  }

  _createClass(NanoDLPService, [{
    key: "getPlates",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", this._request("/json/db/plates.json"));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getPlates() {
        return _ref.apply(this, arguments);
      }

      return getPlates;
    }()
  }, {
    key: "getSetup",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this._request("/json/db/machine.json"));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getSetup() {
        return _ref2.apply(this, arguments);
      }

      return getSetup;
    }()
  }, {
    key: "getProfiles",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", this._request("/json/db/profiles.json"));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getProfiles() {
        return _ref3.apply(this, arguments);
      }

      return getProfiles;
    }()
  }, {
    key: "setCureTime",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(plate, settings) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                debug(method + ": " + url + ("" + (this.auth ? "\tAUTH: " + this.session.split("=")[1] : "")));
                _context4.next = 3;
                return (0, _requestPromiseNative2.default)({
                  uri: this.serverURL + "/profile/edit/" + plate,
                  headers: { Cookie: "" + (this.auth ? this.session : "") },
                  form: settings,
                  method: "POST"
                });

              case 3:
                return _context4.abrupt("return", _context4.sent);

              case 4:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setCureTime(_x, _x2) {
        return _ref4.apply(this, arguments);
      }

      return setCureTime;
    }()
  }, {
    key: "getCurrentPlateLayer",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(plate, layer) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return (0, _requestPromiseNative2.default)({ url: this.serverURL + "/static/plates/" + plate + "/" + layer + ".png", encoding: null });

              case 2:
                return _context5.abrupt("return", _context5.sent);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getCurrentPlateLayer(_x3, _x4) {
        return _ref5.apply(this, arguments);
      }

      return getCurrentPlateLayer;
    }()
  }, {
    key: "getCurrentPlate3DView",
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(plate, orientation) {
        var stl;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (!_fs2.default.existsSync("temp/" + plate + "_" + orientation + ".png")) {
                  _context6.next = 2;
                  break;
                }

                return _context6.abrupt("return", Promise.resolve(_fs2.default.readFileSync("temp/" + plate + "_" + orientation + ".png")));

              case 2:
                _context6.next = 4;
                return (0, _requestPromiseNative2.default)({ url: this.serverURL + "/static/plates/" + plate + "/plate.stl", encoding: null });

              case 4:
                stl = _context6.sent;
                _context6.next = 7;
                return new _stl2png2.default().getPNG(stl, plate, orientation);

              case 7:
                return _context6.abrupt("return", _context6.sent);

              case 8:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function getCurrentPlate3DView(_x5, _x6) {
        return _ref6.apply(this, arguments);
      }

      return getCurrentPlate3DView;
    }()
  }, {
    key: "getCurrentPlateSTL",
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(plate) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function getCurrentPlateSTL(_x7) {
        return _ref7.apply(this, arguments);
      }

      return getCurrentPlateSTL;
    }()
  }, {
    key: "getStatus",
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._request("/status");

              case 2:
                return _context8.abrupt("return", _context8.sent);

              case 3:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function getStatus() {
        return _ref8.apply(this, arguments);
      }

      return getStatus;
    }()
  }, {
    key: "pause",
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this._request("/printer/pause");

              case 2:
                return _context9.abrupt("return", _context9.sent);

              case 3:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function pause() {
        return _ref9.apply(this, arguments);
      }

      return pause;
    }()
  }, {
    key: "stop",
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this._request("/printer/stop");

              case 2:
                return _context10.abrupt("return", _context10.sent);

              case 3:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function stop() {
        return _ref10.apply(this, arguments);
      }

      return stop;
    }()
  }, {
    key: "unpause",
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this._request("/printer/unpause");

              case 2:
                return _context11.abrupt("return", _context11.sent);

              case 3:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function unpause() {
        return _ref11.apply(this, arguments);
      }

      return unpause;
    }()
  }, {
    key: "getCurrentLog",
    value: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var log;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this._request("/log");

              case 2:
                log = _context12.sent;
                return _context12.abrupt("return", JSON.parse(log.split("\n").slice(-1).toString().split(" ").slice(2).join(" ")));

              case 4:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getCurrentLog() {
        return _ref12.apply(this, arguments);
      }

      return getCurrentLog;
    }()
  }, {
    key: "command",
    value: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(url) {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this._request(url, "GET", "");

              case 2:
                return _context13.abrupt("return", _context13.sent);

              case 3:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function command(_x8) {
        return _ref13.apply(this, arguments);
      }

      return command;
    }()
  }, {
    key: "_getSession",
    value: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "json";
        var response;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                debug("POST" + ": " + "/login");
                _context14.next = 3;
                return (0, _requestPromiseNative2.default)({
                  uri: "" + this.serverURL + "/login",
                  form: {
                    "username": "" + this.user,
                    "password": "" + this.pass
                  },
                  json: type == "json",
                  method: "POST",
                  simple: false,
                  transform: function transform(body, response, resolveWithFullResponse) {
                    return { 'headers': response.headers, 'data': body };
                  }
                  //timeout: 10000
                });

              case 3:
                response = _context14.sent;

                if (response.headers['location'] == '/') {
                  debug("Auth: Login response: " + response.headers['set-cookie'][0]);
                  this.session = response.headers['set-cookie'][0];
                  debug("Auth: Setting cookie: " + this.session);
                } else {
                  debug("Login failed");
                  this.session = "Error";
                }

              case 5:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function _getSession() {
        return _ref14.apply(this, arguments);
      }

      return _getSession;
    }()
  }, {
    key: "_request",
    value: function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(url) {
        var method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "GET";
        var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "json";
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                debug(method + ": " + url + ("" + (this.auth ? "\tAUTH: " + this.session.split("=")[1] : "")));
                _context15.next = 3;
                return (0, _requestPromiseNative2.default)({
                  uri: "" + this.serverURL + url,
                  method: method,
                  headers: { Cookie: "" + (this.auth ? this.session : "") },
                  //type: type,
                  json: type == "json",
                  timeout: 10000
                });

              case 3:
                return _context15.abrupt("return", _context15.sent);

              case 4:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function _request(_x10) {
        return _ref15.apply(this, arguments);
      }

      return _request;
    }()
  }]);

  return NanoDLPService;
}();

exports.default = NanoDLPService;