'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _nanoDlpService = require("./services/nanoDlpService.js");

var _nanoDlpService2 = _interopRequireDefault(_nanoDlpService);

var _config = require("../config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require("babel-polyfill");

global.SERVER_URL = _config2.default.url;
var nanoDLPService = new _nanoDlpService2.default(_config2.default.auth);

var ScreenManager = function () {
  function ScreenManager() {
    _classCallCheck(this, ScreenManager);

    this.nanoDLP = nanoDLPService;
    this.plugins = [];

    this.registerPlugin("pushBullet");
    this.registerPlugin("nextion");
  }

  _createClass(ScreenManager, [{
    key: "init",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var i;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                i = 0;

              case 1:
                if (!(i < this.plugins.length)) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return this.plugins[i].init();

              case 4:
                i++;
                _context.next = 1;
                break;

              case 7:

                this.update().catch(function (e) {
                  return console.error(e);
                });

              case 8:
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
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        var status, log, i;
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

                for (i = 0; i < this.plugins.length; i++) {
                  this.plugins[i].update(status, log).catch(function (e) {
                    console.error(e);
                  });
                }

                clearTimeout(this.updateTimeOut);
                this.updateTimeOut = setTimeout(function () {
                  return _this.update();
                }, 1000);

              case 16:
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
    key: "registerPlugin",
    value: function registerPlugin(pluginName) {
      var plugin = new (require('./plugins/' + pluginName).default)(this);
      this.plugins.push(plugin);
    }
  }]);

  return ScreenManager;
}();

new ScreenManager().init().catch(function (e) {
  console.error(e);
});