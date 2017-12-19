"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstract2 = require("./abstract.js");

var _abstract3 = _interopRequireDefault(_abstract2);

var _nextionService = require("./nextion/nextionService.js");

var _nextionService2 = _interopRequireDefault(_nextionService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-polyfill");

var Confirm = function (_abstract) {
  _inherits(Confirm, _abstract);

  function Confirm(manager) {
    _classCallCheck(this, Confirm);

    var _this = _possibleConstructorReturn(this, (Confirm.__proto__ || Object.getPrototypeOf(Confirm)).call(this, manager));

    _this.isPrinting = null;

    _this.nextion = new _nextionService2.default(_this.config.plugins.nextion);

    _this.nextion.on("disconnect", function () {
      _this.init().catch(function (e) {
        return console.error(e);
      });
    });
    return _this;
  }

  _createClass(Confirm, [{
    key: "init",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.isPrinting = null;
                this.currentPageId = null;

                console.log("connect to port " + this.config.plugins.nextion.port);

                _context.next = 5;
                return this.nextion.connect();

              case 5:

                console.log("connected");

                this.update(this.status, this.log).catch(function (e) {
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(status, log) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (status) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return");

              case 2:

                this.status = status;
                this.log = log;

                clearTimeout(this.updateTimeOut);

                if (!(status.Printing !== this.isPrinting)) {
                  _context2.next = 9;
                  break;
                }

                this.isPrinting = status.Printing;
                _context2.next = 9;
                return this.setPage("home");

              case 9:
                this.isPrinting = status.Printing;

                _context2.next = 12;
                return this.currentPage.update(status, log).catch(function (e) {
                  return console.error(e);
                });

              case 12:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function update(_x, _x2) {
        return _ref2.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "setPage",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(page, options) {
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

                console.log("setPage", page, "./nextion/pages/" + page + ".js");
                _context3.prev = 8;
                PageClass = require("./nextion/pages/" + page + ".js").default;
                _context3.next = 16;
                break;

              case 12:
                _context3.prev = 12;
                _context3.t1 = _context3["catch"](8);

                console.log("page ./nextion/pages/" + page + ".js do not exist");
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

                _context3.next = 21;
                return new Promise(function (resolve) {
                  return setTimeout(resolve, 100);
                });

              case 21:
                this.currentPage.init(options).catch(function (e) {
                  return console.error(e);
                });

                _context3.next = 24;
                return this.update(this.status, this.log);

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[8, 12]]);
      }));

      function setPage(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return setPage;
    }()
  }]);

  return Confirm;
}(_abstract3.default);

exports.default = Confirm;