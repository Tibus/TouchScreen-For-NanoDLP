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

var ZAxis = function (_abstract) {
  _inherits(ZAxis, _abstract);

  function ZAxis(screenManager) {
    _classCallCheck(this, ZAxis);

    var _this = _possibleConstructorReturn(this, (ZAxis.__proto__ || Object.getPrototypeOf(ZAxis)).call(this, screenManager));

    _this.currentButton = 8;
    return _this;
  }

  _createClass(ZAxis, [{
    key: "init",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.setScreen("zAxis");

              case 2:

                this.addListener("click_b16", function (e) {
                  _this2.changePage("home");
                });

                this.addListener("click_b12", function (e) {
                  _this2.up();
                });

                this.addListener("click_b13", function (e) {
                  _this2.down();
                });

                this.addListener("click_b11", function () {
                  return _this2.setBtn(11);
                });
                this.addListener("click_b10", function () {
                  return _this2.setBtn(10);
                });
                this.addListener("click_b9", function () {
                  return _this2.setBtn(9);
                });
                this.addListener("click_b8", function () {
                  return _this2.setBtn(8);
                });
                this.addListener("click_b7", function () {
                  return _this2.setBtn(7);
                });
                this.addListener("click_b6", function () {
                  return _this2.setBtn(6);
                });
                this.addListener("click_b5", function () {
                  return _this2.setBtn(5);
                });
                this.addListener("click_b2", function () {
                  return _this2.setBtn(2);
                });

                this.addListener("click_b3", function () {
                  return _this2.nanoDLP.command("/z-axis/top");
                });
                this.addListener("click_b4", function () {
                  return _this2.nanoDLP.command("/z-axis/bottom");
                });
                this.addListener("click_b14", function () {
                  return _this2.nanoDLP.command("/z-axis/touch-limit");
                });
                this.addListener("click_b15", function () {
                  return _this2.nanoDLP.command("/z-axis/calibrate");
                });

                this.setBtn(10);

              case 18:
              case "end":
                return _context.stop();
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
    key: "up",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                this.move("up");

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function up() {
        return _ref2.apply(this, arguments);
      }

      return up;
    }()
  }, {
    key: "down",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.move("down");

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function down() {
        return _ref3.apply(this, arguments);
      }

      return down;
    }()
  }, {
    key: "move",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(direction) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.t0 = this.currentButton;
                _context4.next = _context4.t0 === 11 ? 3 : _context4.t0 === 10 ? 6 : _context4.t0 === 9 ? 9 : _context4.t0 === 8 ? 12 : _context4.t0 === 7 ? 15 : _context4.t0 === 6 ? 18 : _context4.t0 === 5 ? 21 : _context4.t0 === 2 ? 24 : 27;
                break;

              case 3:
                _context4.next = 5;
                return this.nanoDLP.command("/z-axis/move/" + direction + "/micron/100000");

              case 5:
                return _context4.abrupt("break", 27);

              case 6:
                _context4.next = 8;
                return this.nanoDLP.command("/z-axis/move/" + direction + "/micron/10000");

              case 8:
                return _context4.abrupt("break", 27);

              case 9:
                _context4.next = 11;
                return this.nanoDLP.command("/z-axis/move/" + direction + "/micron/1000");

              case 11:
                return _context4.abrupt("break", 27);

              case 12:
                _context4.next = 14;
                return this.nanoDLP.command("/z-axis/move/" + direction + "/micron/500");

              case 14:
                return _context4.abrupt("break", 27);

              case 15:
                _context4.next = 17;
                return this.nanoDLP.command("/z-axis/move/" + direction + "/micron/100");

              case 17:
                return _context4.abrupt("break", 27);

              case 18:
                _context4.next = 20;
                return this.nanoDLP.command("/z-axis/move/" + direction + "/pulse/100");

              case 20:
                return _context4.abrupt("break", 27);

              case 21:
                _context4.next = 23;
                return this.nanoDLP.command("/z-axis/move/" + direction + "/pulse/10");

              case 23:
                return _context4.abrupt("break", 27);

              case 24:
                _context4.next = 26;
                return this.nanoDLP.command("/z-axis/move/" + direction + "/pulse/1");

              case 26:
                return _context4.abrupt("break", 27);

              case 27:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function move(_x2) {
        return _ref4.apply(this, arguments);
      }

      return move;
    }()
  }, {
    key: "setBtn",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.nextion.setValue("bt" + this.currentButton, 0);

              case 2:
                this.currentButton = id;
                _context5.next = 5;
                return this.nextion.setValue("bt" + this.currentButton, 1);

              case 5:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function setBtn(_x3) {
        return _ref5.apply(this, arguments);
      }

      return setBtn;
    }()
  }, {
    key: "update",
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(status) {
        var currentMm, total;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                if (this.setup) {
                  _context6.next = 4;
                  break;
                }

                _context6.next = 3;
                return this.nanoDLP.getSetup();

              case 3:
                this.setup = _context6.sent;

              case 4:
                currentMm = status.CurrentHeight / (360 / this.setup.MotorDegree * this.setup.MicroStep / this.setup.LeadscrewPitch);
                total = this.setup.ZAxisHeight / (360 / this.setup.MotorDegree * this.setup.MicroStep / this.setup.LeadscrewPitch);
                _context6.next = 8;
                return this.setText("t1", currentMm + "mm");

              case 8:
                _context6.next = 10;
                return this.setText("t2", total + "mm");

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function update(_x4) {
        return _ref6.apply(this, arguments);
      }

      return update;
    }()
  }]);

  return ZAxis;
}(_abstract3.default);

exports.default = ZAxis;