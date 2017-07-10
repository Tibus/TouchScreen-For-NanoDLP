require("babel-polyfill");
import abstract from "./abstract.js";
import pushBullet from "pushbullet";

export default class PushBulletClass extends abstract{

  constructor(screenManager){
    super(screenManager);
    
    let PushBullet = require('pushbullet');
    console.log(this.config.plugins, this.config.plugins.pushbullet);
    if(this.config.plugins.pushbullet && this.config.plugins.pushbullet.apiKey != null){
      this.pusher = new PushBullet(this.config.plugins.pushbullet.apiKey);
    }else{
      console.error("missing API key for pushbullet");
    }
    
    this.isPrinting = null;
  }
  
  async update(status, log){
    if(this.pusher == null)
      return;
    
    if(this.isPrinting == null)
      this.isPrinting = status.Printing;
    
    if(this.isPrinting != status.Printing){
      console.log(this.isPrinting, status.Printing);
      let title = status.Printing?"print started":"print finished";
      this.pusher.note({}, title, title, function(error, response) {
      	
      });
      
      this.isPrinting = status.Printing;
    }
    
  }
}
