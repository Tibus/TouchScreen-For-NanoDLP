'use strict';

import debug_ from 'debug';

require("babel-polyfill");

import SerialPort from 'serialport';
import {EventEmitter} from 'events';
import sharp from 'sharp';

const NextionEvent = {
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
}

const debug = debug_('nextion');

export default class NextionService extends EventEmitter{
  
  _buffer;
  
  constructor(config) {
    super();
    
    this._buffer = new Buffer([]);
    this.config = config;
  }
  
  async connect(){
    
      debug("serialport open");
      
      let open = false;
      while (open == false) {
        try {
          await new Promise(function(resolve, reject) {
            SerialPort.list((err, ports)=>{
              console.log("list", ports);
              resolve();
            });
          });
          
          this.port = new SerialPort(this.config.port, { 
            autoOpen: false, baudRate:115200});
          await new Promise((resolve, reject) => this.port.open(resolve));
          await new Promise((r)=> setTimeout(r, 1000));
          await this._initScreen();
          open = true;
        } catch (e) {
          await new Promise((r)=> setTimeout(r, 1000));
          console.log("error opening port ", this.config.port, "retry in 2 seconds");
        }
      }
      
      process.on('SIGINT', () => {
        this.setPage("connection");
        process.exit();
      });
  }
  
  async setPage(num){
    await this._writeUart('page '+num);
  }
  
  async setText(cmp, txt){
    let text = txt.toString().split("\r").join('"+"\\r"+"');
    await this._writeUart(cmp+'.txt="'+text+'"');
  }
  
  async setValue(cmp, txt){
    await this._writeUart(cmp+'.val='+txt+'');
  }
  
  async addToWaveForm(cmp, channel, value){
    //  console.log(`add ${cmp},${channel},${value.toInt()}`);
    await this._writeUart(`add ${cmp},${channel},${value}`);
  }
  
  async setVis(cmp, value){
    var val = value ? "1":"0";
    await this._writeUart('vis '+cmp+','+val);
  }
  
  async setLine(x, y, x2, y2, color){
    await this._writeUart(`line ${x},${y},${x2},${y2},${color}`, false);
  }

  async setFill(x, y, width, height, color){
      await this._writeUart(`fill ${x},${y},${width},${height},${color}`, false);
  }
  
  async stopRefresh(cmp, bco){
    await this._writeUart("ref_stop");
  }
  
  async startRefresh(cmp, bco){
    await this._writeUart("ref_star");
  }
  
  async setColor(cmp, bco){
    await this._writeUart(cmp + ".bco=" + bco);
    await this._writeUart("ref " + cmp);
  }
  
  async getPage(){
    var page = await this._writeUart('sendme');
    return page[0];
  }
  
  async getValue(cmp){
    var result = await this._writeUart('get '+cmp);
    return (result[1] * 256 + result[0]);
  }

  async displayBlackWhiteImage(buffer, positionX, positionY, width){
    //debug(url);
    const image = sharp(buffer);
    
    image.metadata()
      .then((metadata) => {        
        image
          .rotate((metadata.width>=metadata.height)?0:90)
          .resize(width)
          .extractChannel(1)
          //.toFile(__dirname+"/../1.min.png");
          .raw()
          .toBuffer(async (err, data, info)=> {
            debug(err);
            debug(data.length);
            debug(data);
            debug(info);

            //debug("fill", info.width, info.height, "0");
            this.setFill(positionX, positionY, info.width, info.height, 0);

            let index = 0;
            let numLine = 0;
            for (let i = 0; i < info.height; i++) {
              //debug("line ", i);
              var x = -1;
              var currentXColor = -1;
              let j = 0;
              for (j = 0; j < info.width; j++) {
                var currentColor = data[index] <= 50 ? 0 : 1;
                //debug(data[index]);
                if (j == 0) {
                  currentXColor = currentColor;
                } else if (currentColor != currentXColor) {
                  if (currentXColor == 1) {
                    this.setLine(x + positionX, i + positionY, j - 1 + positionX, i + positionY, 0xFFFFFF);
                    debug("setLine", ++numLine, "y", i, "from", x, "to", j - 1, "color", currentXColor);
                  }
                  x = j - 1;
                  currentXColor = currentColor;
                }
                index++;
              }
              if (x == 0 && currentXColor != 0) {
                this.setLine(x+positionX, i+positionY, j-1+positionX, i+positionY, 0xFFFFFF);
                debug("setLine", ++numLine, "y", i, "from", x, "to", j - 1, "color", currentXColor);
              }
            }
          debug("time = ", new Date().getTime() - date);
      });
    });
  }
  
  
  //private
  
  async _initScreen(){
    //await new Promise((resolve) => setTimeout(resolve, 1000));
    this.port.on("close", ()=>{
      this.emit("disconnect");
    });
    
    this.port.on('data', (byte) => {
      this._buffer = Buffer.concat([this._buffer, byte]);
      this._readBuffer();
    });
    
    this._writeUart('sleep=0');
    
    await this._writeUart('bkcmd=3');

    await this._writeUart('thup=1');
    
    if (this.config.hasOwnProperty("sleep"))
      await this._writeUart('thsp=' + this.config.sleep);
    
    //await this._writeUart('bauds=115200');

    debug("screenInitialized");
  }
  
  _readBuffer(){
    let index = this._buffer.indexOf(delimiterBuffer);
    if (index>=0) {
      let result = this._parseData(this._buffer.slice(0, index));
      this.emit("data", result);
      debug("event", NextionEvent[result.event], ":", result.event.toString(16), result.data);
      switch (NextionEvent[result.event]) {
        case "touchEvent":
          debug("emit : ", "click_b"+result.data[1].toString());
          this.emit("click_b"+result.data[1].toString());
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
      
      this._buffer = this._buffer.slice(index+3);
      this._readBuffer();
    }
  }
  
  _parseData(buffer){
    let result = {};
    result.event = buffer[0];
    result.data = buffer.slice(1);
    return result;
  }
  

  async _writeUart(cmd, wait = true){
    debug("send command : "+cmd);
    this.port.write(this.hex(cmd));
    if(wait)
      return await this._waitForResult();
  }
  
  async _waitForResult(){
    return await new Promise((resolve, reject) => {
      this.once("data", (data)=>{
        debug("receiveResult", data);
        if(NextionEvent[data.event] !== null){
          return resolve(data.data);
        }
        
        return reject(data.data);
      })
    });
    
  }

  hex(str) {
    var arr = [];
    for (var i = 0, l = str.length; i < l; i ++) {
      var ascii = str.charCodeAt(i);
      arr.push(ascii);
    }
    arr.push(255);
    arr.push(255);
    arr.push(255);
    return new Buffer(arr);
  }
}

export const delimiter = [
  0xff,
  0xff,
  0xff
];

export const delimiterBuffer = Buffer.from(delimiter);