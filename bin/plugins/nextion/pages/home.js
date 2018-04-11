"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstract2 = require("./abstract.js");

var _abstract3 = _interopRequireDefault(_abstract2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-polyfill");

var Home = function (_abstract) {
  _inherits(Home, _abstract);

  function Home(screenManager) {
    _classCallCheck(this, Home);

    return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, screenManager));
  }

  _createClass(Home, [{
    key: "init",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        var _this2 = this;

        var ip, exec;
        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.setScreen("home");

              case 2:
                _context2.next = 4;
                return this.setText("t0", "Not Printing");

              case 4:
                ip = require("ip");
                _context2.next = 7;
                return this.setText("b6", ip.address());

              case 7:
                if (!options) {
                  _context2.next = 23;
                  break;
                }

                console.log("options", options);

                if (!options.confirmResult) {
                  _context2.next = 16;
                  break;
                }

                if (!(options.confirmType === "shutdown")) {
                  _context2.next = 16;
                  break;
                }

                exec = require('child_process').exec;

                this.setScreen("progress");
                this.setText("t0", "Shutdown in progress...");
                exec('shutdown now', function (error, stdout, stderr) {});
                return _context2.abrupt("return", _context.stop());

              case 16:
                if (!options.confirmResult) {
                  _context2.next = 23;
                  break;
                }

                if (!(options.confirmType === "reboot")) {
                  _context2.next = 23;
                  break;
                }

                exec = require('child_process').exec;

                this.setScreen("progress");
                this.setText("t0", "Reboot in progress...");
                exec('shutdown -r now', function (error, stdout, stderr) {});
                return _context2.abrupt("return", _context.stop());

              case 23:

                this.addListener("click_b3", function (e) {
                  _this2.changePage("settings");
                });

                this.addListener("click_b1", function (e) {
                  _this2.changePage("plates");
                });

                this.addListener("click_b4", function (e) {
                  _this2.changePage("confirm", {
                    text: "Are you sure you want to shutdown?",
                    confirmType: "shutdown",
                    returnPage: "home"
                  });
                });

                this.addListener("click_b5", function (e) {
                  _this2.changePage("confirm", {
                    text: "Are you sure you want to reboot?",
                    confirmType: "reboot",
                    returnPage: "home"
                  });
                });

                this.addListener("click_b6", function (e) {
                  _this2.changePage("ipqr", {
                    text: "http://" + ip.address()
                  });
                });

              case 28:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this);
      }));

      function init(_x) {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "update",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(status, log) {
        return regeneratorRuntime.wrap(function _callee2$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!status.Printing) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", this.changePage("home"));

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee2, this);
      }));

      function update(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return update;
    }()
  }]);

  return Home;
}(_abstract3.default);

exports.default = Home;