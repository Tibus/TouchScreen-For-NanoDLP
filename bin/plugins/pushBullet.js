"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstract2 = require("./abstract.js");

var _abstract3 = _interopRequireDefault(_abstract2);

var _pushbullet = require("pushbullet");

var _pushbullet2 = _interopRequireDefault(_pushbullet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-polyfill");

var PushBulletClass = function (_abstract) {
  _inherits(PushBulletClass, _abstract);

  function PushBulletClass(screenManager) {
    _classCallCheck(this, PushBulletClass);

    var _this = _possibleConstructorReturn(this, (PushBulletClass.__proto__ || Object.getPrototypeOf(PushBulletClass)).call(this, screenManager));

    var PushBullet = require('pushbullet');
    console.log(_this.config.plugins, _this.config.plugins.pushbullet);
    if (_this.config.plugins.pushbullet && _this.config.plugins.pushbullet.apiKey != null) {
      _this.pusher = new PushBullet(_this.config.plugins.pushbullet.apiKey);
    } else {
      console.error("missing API key for pushbullet");
    }

    _this.isPrinting = null;
    return _this;
  }

  _createClass(PushBulletClass, [{
    key: "update",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(status, log) {
        var title;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(this.pusher == null)) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:

                if (this.isPrinting == null) this.isPrinting = status.Printing;

                if (this.isPrinting != status.Printing) {
                  console.log(this.isPrinting, status.Printing);
                  title = status.Printing ? "print started" : "print finished";

                  this.pusher.note({}, title, title, function (error, response) {});

                  this.isPrinting = status.Printing;
                }

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function update(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return update;
    }()
  }]);

  return PushBulletClass;
}(_abstract3.default);

exports.default = PushBulletClass;