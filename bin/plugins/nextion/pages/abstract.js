"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

require("babel-polyfill");

var Abstract = function () {
  function Abstract(manager) {
    _classCallCheck(this, Abstract);

    this.manager = manager;
    this.nextion = manager.nextion;
    this.nanoDLP = manager.nanoDLP;
    this.listener = [];
    this.history = {};
    this.enabled = true;
  }

  _createClass(Abstract, [{
    key: "addListener",
    value: function addListener(event, callback) {
      this.listener.push({ btn: event, callback: callback });
      this.nextion.on(event, callback);
    }
  }, {
    key: "setScreen",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(val) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.nextion.setPage(val);

              case 2:
                this.history = {};

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function setScreen(_x) {
        return _ref.apply(this, arguments);
      }

      return setScreen;
    }()
  }, {
    key: "changePage",
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(val, options) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this.manager.setPage(val, options);

              case 2:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function changePage(_x2, _x3) {
        return _ref2.apply(this, arguments);
      }

      return changePage;
    }()
  }, {
    key: "setText",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(txt, val) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!(this.history[txt] == val)) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return");

              case 2:
                this.history[txt] = val;
                _context3.next = 5;
                return this.nextion.setText(txt, val);

              case 5:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setText(_x4, _x5) {
        return _ref3.apply(this, arguments);
      }

      return setText;
    }()
  }, {
    key: "setValue",
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(txt, val) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!(this.history[txt] == val)) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return");

              case 2:
                this.history[txt] = val;
                _context4.next = 5;
                return this.nextion.setValue(txt, val);

              case 5:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setValue(_x6, _x7) {
        return _ref4.apply(this, arguments);
      }

      return setValue;
    }()
  }, {
    key: "getValue",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(txt) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this.nextion.getValue(txt);

              case 2:
                return _context5.abrupt("return", _context5.sent);

              case 3:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function getValue(_x8) {
        return _ref5.apply(this, arguments);
      }

      return getValue;
    }()
  }, {
    key: "update",
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(status) {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function update(_x9) {
        return _ref6.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "dispose",
    value: function dispose() {
      this.enabled = false;

      for (var i = 0; i < this.listener.length; i++) {
        this.nextion.removeListener(this.listener[i].btn, this.listener[i].callback);
      }
    }
  }]);

  return Abstract;
}();

exports.default = Abstract;