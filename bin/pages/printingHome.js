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

var PrintingHome = function (_abstract) {
  _inherits(PrintingHome, _abstract);

  function PrintingHome(screenManager) {
    _classCallCheck(this, PrintingHome);

    var _this = _possibleConstructorReturn(this, (PrintingHome.__proto__ || Object.getPrototypeOf(PrintingHome)).call(this, screenManager));

    _this.layerID = -1;
    _this.isPause = null;
    return _this;
  }

  _createClass(PrintingHome, [{
    key: "init",
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.addListener("click_b10", function (e) {
                  console.log("printSettings");
                  _this2.changePage("printSettings");
                });

                this.addListener("click_b11", function (e) {
                  console.log("stats");
                  _this2.changePage("stats");
                });

                this.addListener("click_b9", function (e) {
                  _this2.manager.nanoDLP.unpause();
                });

              case 3:
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
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(status, log) {
        var remaining_time, total_time, image;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (status.Printing) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", this.changePage("home"));

              case 2:
                if (!(this.isPause == null || this.isPause !== status.Pause)) {
                  _context2.next = 11;
                  break;
                }

                this.isPause = status.Pause;

                if (!this.isPause) {
                  _context2.next = 9;
                  break;
                }

                _context2.next = 7;
                return this.setScreen("printingPause");

              case 7:
                _context2.next = 11;
                break;

              case 9:
                _context2.next = 11;
                return this.setScreen("printing");

              case 11:
                _context2.next = 13;
                return this.setText("t6", this.isPause ? "Pause" : "Printing");

              case 13:
                remaining_time = Math.round((status.LayersCount - status.LayerID) * status.LayerTime / 1000000000 / 60);
                total_time = Math.round(status.LayersCount * status.LayerTime / 1000000000 / 60);
                _context2.next = 17;
                return this.setText("t0", status.LayerID + "/" + status.LayersCount);

              case 17:
                _context2.next = 19;
                return this.setValue("j0", Math.floor(status.LayerID / status.LayersCount * 100));

              case 19:
                _context2.next = 21;
                return this.setText("t1", remaining_time + " of " + total_time + "min");

              case 21:
                _context2.next = 23;
                return this.setText("t2", log.msg);

              case 23:
                _context2.next = 25;
                return this.setText("t7", status.Path);

              case 25:
                if (!(this.history.layer != status.LayerID)) {
                  _context2.next = 33;
                  break;
                }

                this.history.layer = status.LayerID;
                console.log("setImage", this.history.layer);
                _context2.next = 30;
                return this.nanoDLP.getCurrentPlateLayer(status.PlateID, status.LayerID);

              case 30:
                image = _context2.sent;
                _context2.next = 33;
                return this.nextion.displayBlackWhiteImage(image, 0, 60, 150).catch(function (e) {
                  return console.error(e);
                });

              case 33:
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
  }]);

  return PrintingHome;
}(_abstract3.default);

exports.default = PrintingHome;