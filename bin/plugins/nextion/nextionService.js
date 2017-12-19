'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.delimiterBuffer = exports.delimiter = exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _serialport = require('serialport');

var _serialport2 = _interopRequireDefault(_serialport);

var _events = require('events');

var _sharp = require('sharp');

var _sharp2 = _interopRequireDefault(_sharp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-polyfill");

var NextionEvent = {
  0x00: 'invalidInstruction',
  0x01: 'success',
  0x02: 'invalidComponentID',
  0x03: 'invalidPageID',
  0x04: 'invalidPictureID',
  0x05: 'invalidFontID',
  0x11: 'invalidBaudRate',
  0x12: 'invalidCurveControl',
  0x1a: 'invalidVariableName',
  0x1b: 'invalidVariableOperation',
  0x1c: 'assignmentFailure',
  0x1d: 'eepromFailure',
  0x1e: 'invalidParameterQuantity',
  0x1f: 'ioOperationFailure',
  0x20: 'undefinedEscapeCharacter',
  0x23: 'variableNameTooLong',
  0x70: 'stringData',
  0x71: 'numericData',
  0x65: 'touchEvent',
  0x66: 'pageId',
  0x67: 'touchCoordinate',
  0x68: 'touchCoordinateOnWake',
  0x86: 'autoSleep',
  0x87: 'autoWake',
  0x88: 'startup',
  0x89: 'cardUpgrade',
  0xfd: 'transmitFinished',
  0xfe: 'transmitReady'
};

var debug = (0, _debug2.default)('nextion');

var NextionService = function (_EventEmitter) {
  _inherits(NextionService, _EventEmitter);

  function NextionService(config) {
    _classCallCheck(this, NextionService);

    var _this = _possibleConstructorReturn(this, (NextionService.__proto__ || Object.getPrototypeOf(NextionService)).call(this));

    _this._buffer = new Buffer([]);
    _this.config = config;
    return _this;
  }

  _createClass(NextionService, [{
    key: 'connect',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this2 = this;

        var open;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:

                debug("serialport open");

                open = false;

              case 2:
                if (!(open == false)) {
                  _context.next = 23;
                  break;
                }

                _context.prev = 3;
                _context.next = 6;
                return new Promise(function (resolve, reject) {
                  _serialport2.default.list(function (err, ports) {
                    console.log("list", ports);
                    resolve();
                  });
                });

              case 6:

                this.port = new _serialport2.default(this.config.port, {
                  autoOpen: false, baudRate: 115200 });
                _context.next = 9;
                return new Promise(function (resolve, reject) {
                  return _this2.port.open(resolve);
                });

              case 9:
                _context.next = 11;
                return new Promise(function (r) {
                  return setTimeout(r, 1000);
                });

              case 11:
                _context.next = 13;
                return this._initScreen();

              case 13:
                open = true;
                _context.next = 21;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context['catch'](3);
                _context.next = 20;
                return new Promise(function (r) {
                  return setTimeout(r, 1000);
                });

              case 20:
                console.log("error opening port ", this.config.port, "retry in 2 seconds");

              case 21:
                _context.next = 2;
                break;

              case 23:

                process.on('SIGINT', function () {
                  _this2.setPage("connection");
                  process.exit();
                });

              case 24:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 16]]);
      }));

      function connect() {
        return _ref.apply(this, arguments);
      }

      return connect;
    }()
  }, {
    key: 'setPage',
    value: function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(num) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return this._writeUart('page ' + num);

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function setPage(_x) {
        return _ref2.apply(this, arguments);
      }

      return setPage;
    }()
  }, {
    key: 'setText',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(cmp, txt) {
        var text;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                text = txt.toString().split("\r").join('"+"\\r"+"');
                _context3.next = 3;
                return this._writeUart(cmp + '.txt="' + text + '"');

              case 3:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function setText(_x2, _x3) {
        return _ref3.apply(this, arguments);
      }

      return setText;
    }()
  }, {
    key: 'setValue',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(cmp, txt) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this._writeUart(cmp + '.val=' + txt + '');

              case 2:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function setValue(_x4, _x5) {
        return _ref4.apply(this, arguments);
      }

      return setValue;
    }()
  }, {
    key: 'addToWaveForm',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(cmp, channel, value) {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return this._writeUart('add ' + cmp + ',' + channel + ',' + value);

              case 2:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function addToWaveForm(_x6, _x7, _x8) {
        return _ref5.apply(this, arguments);
      }

      return addToWaveForm;
    }()
  }, {
    key: 'setVis',
    value: function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(cmp, value) {
        var val;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                val = value ? "1" : "0";
                _context6.next = 3;
                return this._writeUart('vis ' + cmp + ',' + val);

              case 3:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function setVis(_x9, _x10) {
        return _ref6.apply(this, arguments);
      }

      return setVis;
    }()
  }, {
    key: 'setLine',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(x, y, x2, y2, color) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return this._writeUart('line ' + x + ',' + y + ',' + x2 + ',' + y2 + ',' + color, false);

              case 2:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function setLine(_x11, _x12, _x13, _x14, _x15) {
        return _ref7.apply(this, arguments);
      }

      return setLine;
    }()
  }, {
    key: 'setFill',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(x, y, width, height, color) {
        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.next = 2;
                return this._writeUart('fill ' + x + ',' + y + ',' + width + ',' + height + ',' + color, false);

              case 2:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function setFill(_x16, _x17, _x18, _x19, _x20) {
        return _ref8.apply(this, arguments);
      }

      return setFill;
    }()
  }, {
    key: 'stopRefresh',
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(cmp, bco) {
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.next = 2;
                return this._writeUart("ref_stop");

              case 2:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function stopRefresh(_x21, _x22) {
        return _ref9.apply(this, arguments);
      }

      return stopRefresh;
    }()
  }, {
    key: 'startRefresh',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(cmp, bco) {
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return this._writeUart("ref_star");

              case 2:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function startRefresh(_x23, _x24) {
        return _ref10.apply(this, arguments);
      }

      return startRefresh;
    }()
  }, {
    key: 'setColor',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(cmp, bco) {
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.next = 2;
                return this._writeUart(cmp + ".bco=" + bco);

              case 2:
                _context11.next = 4;
                return this._writeUart("ref " + cmp);

              case 4:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function setColor(_x25, _x26) {
        return _ref11.apply(this, arguments);
      }

      return setColor;
    }()
  }, {
    key: 'getPage',
    value: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var page;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this._writeUart('sendme');

              case 2:
                page = _context12.sent;
                return _context12.abrupt('return', page[0]);

              case 4:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getPage() {
        return _ref12.apply(this, arguments);
      }

      return getPage;
    }()
  }, {
    key: 'getValue',
    value: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(cmp) {
        var result;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this._writeUart('get ' + cmp);

              case 2:
                result = _context13.sent;
                return _context13.abrupt('return', result[1] * 256 + result[0]);

              case 4:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function getValue(_x27) {
        return _ref13.apply(this, arguments);
      }

      return getValue;
    }()
  }, {
    key: 'displayBlackWhiteImage',
    value: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(buffer, positionX, positionY, width) {
        var _this3 = this;

        var image;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                //debug(url);
                image = (0, _sharp2.default)(buffer);


                image.metadata().then(function (metadata) {
                  image.rotate(metadata.width >= metadata.height ? 0 : 90).resize(width).extractChannel(1)
                  //.toFile(__dirname+"/../1.min.png");
                  .raw().toBuffer(function () {
                    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(err, data, info) {
                      var index, numLine, i, x, currentXColor, j, currentColor;
                      return regeneratorRuntime.wrap(function _callee14$(_context14) {
                        while (1) {
                          switch (_context14.prev = _context14.next) {
                            case 0:
                              debug(err);
                              debug(data.length);
                              debug(data);
                              debug(info);

                              //debug("fill", info.width, info.height, "0");
                              _this3.setFill(positionX, positionY, info.width, info.height, 0);

                              index = 0;
                              numLine = 0;

                              for (i = 0; i < info.height; i++) {
                                //debug("line ", i);
                                x = -1;
                                currentXColor = -1;
                                j = 0;

                                for (j = 0; j < info.width; j++) {
                                  currentColor = data[index] <= 50 ? 0 : 1;
                                  //debug(data[index]);

                                  if (j == 0) {
                                    currentXColor = currentColor;
                                  } else if (currentColor != currentXColor) {
                                    if (currentXColor == 1) {
                                      _this3.setLine(x + positionX, i + positionY, j - 1 + positionX, i + positionY, 0xFFFFFF);
                                      debug("setLine", ++numLine, "y", i, "from", x, "to", j - 1, "color", currentXColor);
                                    }
                                    x = j - 1;
                                    currentXColor = currentColor;
                                  }
                                  index++;
                                }
                                if (x == 0 && currentXColor != 0) {
                                  _this3.setLine(x + positionX, i + positionY, j - 1 + positionX, i + positionY, 0xFFFFFF);
                                  debug("setLine", ++numLine, "y", i, "from", x, "to", j - 1, "color", currentXColor);
                                }
                              }
                              debug("time = ", new Date().getTime() - date);

                            case 9:
                            case 'end':
                              return _context14.stop();
                          }
                        }
                      }, _callee14, _this3);
                    }));

                    return function (_x32, _x33, _x34) {
                      return _ref15.apply(this, arguments);
                    };
                  }());
                });

              case 2:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function displayBlackWhiteImage(_x28, _x29, _x30, _x31) {
        return _ref14.apply(this, arguments);
      }

      return displayBlackWhiteImage;
    }()

    //private

  }, {
    key: '_initScreen',
    value: function () {
      var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                //await new Promise((resolve) => setTimeout(resolve, 1000));
                this.port.on("close", function () {
                  _this4.emit("disconnect");
                });

                this.port.on('data', function (byte) {
                  _this4._buffer = Buffer.concat([_this4._buffer, byte]);
                  _this4._readBuffer();
                });

                this._writeUart('sleep=0');

                _context16.next = 5;
                return this._writeUart('bkcmd=3');

              case 5:
                _context16.next = 7;
                return this._writeUart('thup=1');

              case 7:
                if (!this.config.hasOwnProperty("sleep")) {
                  _context16.next = 10;
                  break;
                }

                _context16.next = 10;
                return this._writeUart('thsp=' + this.config.sleep);

              case 10:

                //await this._writeUart('bauds=115200');

                debug("screenInitialized");

              case 11:
              case 'end':
                return _context16.stop();
            }
          }
        }, _callee16, this);
      }));

      function _initScreen() {
        return _ref16.apply(this, arguments);
      }

      return _initScreen;
    }()
  }, {
    key: '_readBuffer',
    value: function _readBuffer() {
      var index = this._buffer.indexOf(delimiterBuffer);
      if (index >= 0) {
        var result = this._parseData(this._buffer.slice(0, index));
        this.emit("data", result);
        debug("event", NextionEvent[result.event], ":", result.event.toString(16), result.data);
        switch (NextionEvent[result.event]) {
          case "touchEvent":
            debug("emit : ", "click_b" + result.data[1].toString());
            this.emit("click_b" + result.data[1].toString());
            break;

          case "numericData":
            debug("emit : ", "number");
            this.emit("number", result.data[0]);
            break;

          case "stringData":
            debug("emit : ", "string", result.data.toString());
            this.emit("string", result.data.toString());
            break;

          default:
            this.emit(NextionEvent[result.event], result.data);
        }

        this._buffer = this._buffer.slice(index + 3);
        this._readBuffer();
      }
    }
  }, {
    key: '_parseData',
    value: function _parseData(buffer) {
      var result = {};
      result.event = buffer[0];
      result.data = buffer.slice(1);
      return result;
    }
  }, {
    key: '_writeUart',
    value: function () {
      var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(cmd) {
        var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                debug("send command : " + cmd);
                this.port.write(this.hex(cmd));

                if (!wait) {
                  _context17.next = 6;
                  break;
                }

                _context17.next = 5;
                return this._waitForResult();

              case 5:
                return _context17.abrupt('return', _context17.sent);

              case 6:
              case 'end':
                return _context17.stop();
            }
          }
        }, _callee17, this);
      }));

      function _writeUart(_x35) {
        return _ref17.apply(this, arguments);
      }

      return _writeUart;
    }()
  }, {
    key: '_waitForResult',
    value: function () {
      var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18() {
        var _this5 = this;

        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                _context18.next = 2;
                return new Promise(function (resolve, reject) {
                  _this5.once("data", function (data) {
                    debug("receiveResult", data);
                    if (NextionEvent[data.event] !== null) {
                      return resolve(data.data);
                    }

                    return reject(data.data);
                  });
                });

              case 2:
                return _context18.abrupt('return', _context18.sent);

              case 3:
              case 'end':
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function _waitForResult() {
        return _ref18.apply(this, arguments);
      }

      return _waitForResult;
    }()
  }, {
    key: 'hex',
    value: function hex(str) {
      var arr = [];
      for (var i = 0, l = str.length; i < l; i++) {
        var ascii = str.charCodeAt(i);
        arr.push(ascii);
      }
      arr.push(255);
      arr.push(255);
      arr.push(255);
      return new Buffer(arr);
    }
  }]);

  return NextionService;
}(_events.EventEmitter);

exports.default = NextionService;
var delimiter = exports.delimiter = [0xff, 0xff, 0xff];

var delimiterBuffer = exports.delimiterBuffer = Buffer.from(delimiter);