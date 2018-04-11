"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstract2 = require("./abstract.js");

var _abstract3 = _interopRequireDefault(_abstract2);

var _requestPromiseNative = require("request-promise-native");

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _config = require("../../../../config.json");

var _config2 = _interopRequireDefault(_config);

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

            var idxP, idxD, idxF, prid, path, file, fs, buffer, result, pth, lbl, fin, drivelist;
            return regeneratorRuntime.wrap(function _callee$(_context) {
               while (1) {
                  switch (_context.prev = _context.next) {
                     case 0:
                        _context.next = 2;
                        return this.setScreen("addPlate");

                     case 2:
                        _context.next = 4;
                        return this.nanoDLP.getProfiles();

                     case 4:
                        this.profiles = _context.sent;

                        this.config = _config2.default.plugins.plates;

                        idxP = 0;
                        idxD = 0;
                        idxF = 0;
                        _context.next = 11;
                        return this.setText("t3", this.profiles[idxP].ProfileID + ": " + this.profiles[idxP].Title);

                     case 11:
                        if (!options) {
                           _context.next = 22;
                           break;
                        }

                        console.log("options", options);

                        if (!(options.confirmResult && options.confirmType === "addplate")) {
                           _context.next = 22;
                           break;
                        }

                        prid = options.data0;
                        path = options.data1;
                        file = options.data2;
                        fs = require("fs");
                        buffer = fs.readFileSync(path + "/" + file);
                        result = (0, _requestPromiseNative2.default)({
                           uri: global.SERVER_URL + "/plate/add",
                           formData: {
                              'ZipFile': {
                                 value: buffer,
                                 options: {
                                    filename: file
                                 }
                              },
                              'Path': file,
                              'ProfileID': prid
                           },
                           method: 'POST'
                        });

                        console.log("result", result);
                        return _context.abrupt("return", this.changePage("plates"));

                     case 22:

                        this.addListener("click_b2", function (e) {
                           _this2.changePage("plates");
                        });

                        this.addListener("click_b4", function (e) {
                           idxP = Math.abs((idxP - 1) % _this2.profiles.length);
                           _this2.setText("t3", _this2.profiles[idxP].ProfileID + ": " + _this2.profiles[idxP].Title);
                        });

                        this.addListener("click_b5", function (e) {
                           idxP = (idxP + 1) % _this2.profiles.length;
                           _this2.setText("t3", _this2.profiles[idxP].ProfileID + ": " + _this2.profiles[idxP].Title);
                        });

                        pth = [];
                        lbl = [];
                        fin = [];
                        fs = require('fs');
                        drivelist = require('drivelist');
                        _context.next = 32;
                        return drivelist.list(function (error, drives) {
                           if (error) {
                              throw error;
                           }
                           drives.forEach(function (drive) {
                              console.log(drive);
                              pth.push(drive.mountpoints[0].path);
                              lbl.push(drive.description + " | " + drive.mountpoints[0].path);
                           });

                           idxD = -1;
                           do {
                              idxD++;
                              fin = fs.readdirSync(pth[idxD]);
                              fin = fin.filter(_this2.cbFile, _this2);
                           } while (_this2.config.autoFetch === "true" && _this2.config.showAll === "false" && fin.length == 0 && idxD < pth.length);
                           _this2.setText("t6", lbl[idxD]);
                           _this2.list(idxF, fin);
                        });

                     case 32:

                        this.addListener("click_b7", function (e) {
                           idxD = Math.abs((idxD - 1) % lbl.length);
                           _this2.setText("t6", lbl[idxD]);
                           fin = fs.readdirSync(pth[idxD]);
                           fin = fin.filter(_this2.cbFile, _this2);
                           idxF = 0;
                           _this2.list(idxF, fin);
                        });

                        this.addListener("click_b8", function (e) {
                           idxD = (idxD + 1) % lbl.length;
                           _this2.setText("t6", lbl[idxD]);
                           fin = fs.readdirSync(pth[idxD]);
                           fin = fin.filter(_this2.cbFile, _this2);
                           idxF = 0;
                           _this2.list(idxF, fin);
                        });

                        this.addListener("number", function (scroll) {
                           idxF = Math.floor((100 - scroll) / (100 / (fin.length - 3)));
                           if (idxF <= fin.length - 4) _this2.list(idxF, fin);
                        });

                        this.addListener("click_b9", function (e) {
                           if (idxF + 0 < fin.length && _this2.evalFile(fin[idxF + 0])) _this2.changePage("confirm", {
                              text: "Are you sure you want to create\rthe follwing new plate?\r\rProfile: " + _this2.profiles[idxP].Title + "\rPath: " + pth[idxD] + "\rFile: " + fin[idxF + 0],
                              confirmType: "addplate",
                              returnPage: "addPlate",
                              data0: _this2.profiles[idxP].ProfileID,
                              data1: pth[idxD],
                              data2: fin[idxF + 0]
                           });
                        });

                        this.addListener("click_b10", function (e) {
                           if (idxF + 1 < fin.length && _this2.evalFile(fin[idxF + 1])) _this2.changePage("confirm", {
                              text: "Are you sure you want to create\rthe following new plate?\r\rProfile: " + _this2.profiles[idxP].Title + "\rPath: " + pth[idxD] + "\rFile: " + fin[idxF + 1],
                              confirmType: "addplate",
                              returnPage: "addPlate",
                              data0: _this2.profiles[idxP].ProfileID,
                              data1: pth[idxD],
                              data2: fin[idxF + 1]
                           });
                        });

                        this.addListener("click_b11", function (e) {
                           if (idxF + 2 < fin.length && _this2.evalFile(fin[idxF + 2])) _this2.changePage("confirm", {
                              text: "Are you sure you want to create\rthe following new plate?\r\rProfile: " + _this2.profiles[idxP].Title + "\rPath: " + pth[idxD] + "\rFile: " + fin[idxF + 2],
                              confirmType: "addplate",
                              returnPage: "addPlate",
                              data0: _this2.profiles[idxP].ProfileID,
                              data1: pth[idxD],
                              data2: fin[idxF + 2]
                           });
                        });

                        this.addListener("click_b12", function (e) {
                           if (idxF + 3 < fin.length && _this2.evalFile(fin[idxF + 3])) _this2.changePage("confirm", {
                              text: "Are you sure you want to create\rthe following new plate?\r\rProfile: " + _this2.profiles[idxP].Title + "\rPath: " + pth[idxD] + "\rFile: " + fin[idxF + 3],
                              confirmType: "addplate",
                              returnPage: "addPlate",
                              data0: _this2.profiles[idxP].ProfileID,
                              data1: pth[idxD],
                              data2: fin[idxF + 3]
                           });
                        });

                     case 39:
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
      key: "list",
      value: function () {
         var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(index, fin) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
               while (1) {
                  switch (_context2.prev = _context2.next) {
                     case 0:
                        if (fin.length > 0) {
                           this.setText("b9", fin[index + 0]);
                        } else {
                           this.setText("b9", "");
                        }
                        if (fin.length > 1) {
                           this.setText("b10", fin[index + 1]);
                        } else {
                           this.setText("b10", "");
                        }
                        if (fin.length > 2) {
                           this.setText("b11", fin[index + 2]);
                        } else {
                           this.setText("b11", "");
                        }
                        if (fin.length > 3) {
                           this.setText("b12", fin[index + 3]);
                        } else {
                           this.setText("b12", "");
                        }

                     case 4:
                     case "end":
                        return _context2.stop();
                  }
               }
            }, _callee2, this);
         }));

         function list(_x2, _x3) {
            return _ref2.apply(this, arguments);
         }

         return list;
      }()
   }, {
      key: "evalFile",
      value: function evalFile(filename) {
         var exts = this.config.fileExt.split("|");
         var res = false;
         for (var i = 0; i < exts.length && res == 0; i++) {
            if (filename.substr(filename.length - exts[i].length - 1, exts[i].length + 1).toLowerCase() == ("." + exts[i]).toLowerCase()) {
               res = true;
            }
         }
         return res;
      }
   }, {
      key: "listFile",
      value: function listFile(filename) {
         return this.evalFile(filename) || this.config.showAll === "true";
      }
   }, {
      key: "cbFile",
      value: function cbFile(value, index, ar) {
         return this.listFile(value);
      }
   }]);

   return Home;
}(_abstract3.default);

exports.default = Home;