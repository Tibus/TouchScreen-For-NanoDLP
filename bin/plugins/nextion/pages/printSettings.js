"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstract2 = require("./abstract.js");

var _abstract3 = _interopRequireDefault(_abstract2);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-polyfill");

var PrintSettings = function (_abstract) {
  _inherits(PrintSettings, _abstract);

  function PrintSettings(screenManager) {
    _classCallCheck(this, PrintSettings);

    return _possibleConstructorReturn(this, (PrintSettings.__proto__ || Object.getPrototypeOf(PrintSettings)).call(this, screenManager));
  }

  _createClass(PrintSettings, [{
    key: "init",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.setScreen("prtSettings");

              case 2:
                _context2.prev = 2;

                if (!(options && options.confirmResult && options.confirmResult)) {
                  _context2.next = 14;
                  break;
                }

                _context2.t0 = options.confirmType;
                _context2.next = _context2.t0 === "pause" ? 7 : _context2.t0 === "stop" ? 11 : 14;
                break;

              case 7:
                console.log("pause");
                this.nanoDLP.pause();
                this.changePage("home");
                return _context2.abrupt("break", 14);

              case 11:
                this.nanoDLP.stop();
                this.changePage("home");
                return _context2.abrupt("break", 14);

              case 14:
                _context2.next = 19;
                break;

              case 16:
                _context2.prev = 16;
                _context2.t1 = _context2["catch"](2);

                console.log("error", _context2.t1);

              case 19:

                this.addListener("click_b4", function (e) {
                  _this2.changePage("home");
                });

                this.addListener("click_b5", function (e) {
                  _this2.changePage("confirm", {
                    text: "Are you sure you want to debug\rprinting?\rIt will move 25mm to the top after\rthe current layer completed and\rcontinue to print.",
                    confirmType: "debug",
                    returnPage: "printSettings"
                  });
                });

                this.addListener("click_b3", function (e) {
                  console.log("click_b3");
                  _this2.changePage("confirm", {
                    text: "Are you sure you want to pause\r printing?\rIt will pause after the current\rlayer completed.",
                    confirmType: "pause",
                    returnPage: "printSettings"
                  });
                });

                this.addListener("click_b2", function (e) {
                  _this2.changePage("confirm", {
                    text: "Are you sure you want to stop\r printing?\rIt will stop after the current\rlayer completed.",
                    confirmType: "stop",
                    returnPage: "printSettings"
                  });
                });

                this.addListener("string", function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(string) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _this2.history = {};

                            if (string != "cancel") {
                              console.log("edit string :", string);
                              _this2.profile.CureTime = Number(string);
                              _this2.nanoDLP.setCureTime(_this2.profile.ProfileID, _this2.profile);
                              _this2.changePage("home");
                            }

                          case 2:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee, _this2);
                  }));

                  return function (_x2) {
                    return _ref2.apply(this, arguments);
                  };
                }());

                this.setCureTime = false;

              case 25:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[2, 16]]);
      }));

      function init(_x) {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: "update",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(status) {
        var remaining_time, total_time;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                this.status = status;

                if (!(this.setCureTime == false)) {
                  _context3.next = 13;
                  break;
                }

                this.setCureTime = true;
                _context3.next = 5;
                return this.nanoDLP.getPlates();

              case 5:
                this.plates = _context3.sent;

                this.plate = this.plates[_lodash2.default.findIndex(this.plates, { PlateID: this.status.PlateID })];

                _context3.next = 9;
                return this.nanoDLP.getProfiles();

              case 9:
                this.profiles = _context3.sent;

                this.profile = this.profiles[_lodash2.default.findIndex(this.profiles, { ProfileID: this.plate.ProfileID })];

                _context3.next = 13;
                return this.setText("t7", this.profile.CureTime);

              case 13:
                remaining_time = Math.round((status.LayersCount - status.LayerID) * status.LayerTime / 1000000000 / 60);
                total_time = Math.round(status.LayersCount * status.LayerTime / 1000000000 / 60);
                _context3.next = 17;
                return this.setText("t11", status.LayerID + "/" + status.LayersCount);

              case 17:
                _context3.next = 19;
                return this.setText("t10", remaining_time + " of " + total_time + "min");

              case 19:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function update(_x3) {
        return _ref3.apply(this, arguments);
      }

      return update;
    }()
  }]);

  return PrintSettings;
}(_abstract3.default);

exports.default = PrintSettings;