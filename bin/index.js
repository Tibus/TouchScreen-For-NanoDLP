'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nanoDlpService = require("./services/nanoDlpService.js");

var _nanoDlpService2 = _interopRequireDefault(_nanoDlpService);

var _nextionService = require("./services/nextionService.js");

var _nextionService2 = _interopRequireDefault(_nextionService);

var _config = require("../config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require("babel-polyfill");

global.SERVER_URL = _config2.default.url;
var nanoDLPService = new _nanoDlpService2.default();
var nextionService = new _nextionService2.default();

var ScreenManager = function () {
  function ScreenManager() {
    var _this = this;

    _classCallCheck(this, ScreenManager);

    this.nanoDLP = nanoDLPService;
    this.nextion = nextionService;
    this.isPrinting = null;

    this.nextion.on("disconnect", function () {
      _this.init().catch(function (e) {
        return console.error(e);
      });
    });
  }

  _createClass(ScreenManager, [{
    key: "init",
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.isPrinting = null;
                this.currentPageId = null;
                if (this.updateTimeOut) clearTimeout(this.updateTimeOut);

                _context.next = 5;
                return this.nextion.connect();

              case 5:

                console.log("connected");

                this.update().catch(function (e) {
                  return console.error(e);
                });

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "update",
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var _this2 = this;

        var status, log;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                clearTimeout(this.updateTimeOut);

                _context2.next = 3;
                return this.nanoDLP.getStatus().catch(function (e) {});

              case 3:
                status = _context2.sent;
                _context2.next = 6;
                return this.nanoDLP.getCurrentLog().catch(function (e) {});

              case 6:
                log = _context2.sent;

                if (!(!status || !log)) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 10;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 2000);
                });

              case 10:
                _context2.next = 12;
                return this.update();

              case 12:
                return _context2.abrupt("return", _context2.sent);

              case 13:
                if (!(status.Printing !== this.isPrinting)) {
                  _context2.next = 17;
                  break;
                }

                this.isPrinting = status.Printing;
                _context2.next = 17;
                return this.setPage("home");

              case 17:
                this.isPrinting = status.Printing;

                _context2.next = 20;
                return this.currentPage.update(status, log).catch(function (e) {
                  return console.error(e);
                });

              case 20:

                clearTimeout(this.updateTimeOut);
                this.updateTimeOut = setTimeout(function () {
                  return _this2.update();
                }, 1000);

              case 22:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function update() {
        return _ref2.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "setPage",
    value: function () {
      var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(page, options) {
        var PageClass;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.t0 = page;
                _context3.next = _context3.t0 === "home" ? 3 : 5;
                break;

              case 3:
                if (this.isPrinting) {
                  page = "printingHome";
                } else {
                  page = "home";
                }
                return _context3.abrupt("break", 5);

              case 5:
                if (!(this.currentPageId == page)) {
                  _context3.next = 7;
                  break;
                }

                return _context3.abrupt("return");

              case 7:

                console.log("setPage", page, "./pages/" + page + ".js");
                _context3.prev = 8;
                PageClass = require("./pages/" + page + ".js").default;
                _context3.next = 16;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t1 = _context3["catch"](8);

                console.log("page ./pages/" + page + ".js do not exist");
                return _context3.abrupt("return");

              case 16:

                if (this.currentPage) {
                  try {
                    this.currentPage.dispose();
                  } catch (e) {
                    console.error(e);
                  }
                }

                this.currentPageId = page;
                this.currentPage = new PageClass(this);

                //await this.nextion.stopRefresh();
                _context3.next = 21;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 100);
                });

              case 21:
                this.currentPage.init(options).catch(function (e) {
                  return console.error(e);
                });

                _context3.next = 24;
                return this.update();

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[8, 12]]);
      }));

      function setPage(_x, _x2) {
        return _ref3.apply(this, arguments);
      }

      return setPage;
    }()
  }]);

  return ScreenManager;
}();

new ScreenManager().init().catch(function (e) {
  console.error(e);
});