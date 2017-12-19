'use strict';

require("babel-polyfill");

import NanoDLPService from "./services/nanoDlpService.js";
import config from "../config.json";

global.SERVER_URL = config.url;
const nanoDLPService = new NanoDLPService(config.auth);

class ScreenManager{
  constructor(){
    this.nanoDLP = nanoDLPService;
    this.plugins = [];
    
    this.registerPlugin("pushBullet");
    this.registerPlugin("nextion");
  }

  async init(){
    for (var i = 0; i < this.plugins.length; i++) {
      await this.plugins[i].init();
    }
    
    this.update().catch(e=>console.error(e));
  }

  async update(){
    clearTimeout(this.updateTimeOut);
    
    let status = await this.nanoDLP.getStatus().catch((e) => {});
    let log = await this.nanoDLP.getCurrentLog().catch((e) => {});
    if(!status || !log){
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return await this.update();
    }
    
    for (var i = 0; i < this.plugins.length; i++) {
      this.plugins[i].update(status, log).catch((e) => {console.error(e);});
    }
    
    clearTimeout(this.updateTimeOut);
    this.updateTimeOut = setTimeout(()=> this.update(), 1000);
  }
  
  registerPlugin(pluginName){
    let plugin = new (require('./plugins/'+pluginName).default)(this);
    this.plugins.push(plugin);
  }
}

new ScreenManager().init().catch((e)=>{
  console.error(e);
});
