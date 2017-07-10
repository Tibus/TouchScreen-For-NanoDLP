require("babel-polyfill");

import abstract from "./abstract.js";

export default class Settings extends abstract{
  
  constructor(screenManager){
    super(screenManager);
  }

  async init(){
    await this.setScreen("settings");

    this.addListener("click_b4", (e)=>{
      this.changePage("home");
    });

    this.addListener("click_b2", (e)=>{
      this.changePage("zAxis");
    });
    
    this.addListener("click_b3", (e)=>{
      this.changePage("projector");
    });
  }
  
  async update(status){
    this.setText("t1", status.proc);
    this.setText("t2", status.mem);
    this.setText("t5", Math.ceil(parseInt(status.temp))+"°C");

    this.nextion.addToWaveForm(13, 0, parseInt(status.proc));
    this.nextion.addToWaveForm(12, 0, parseInt(status.mem));
    this.nextion.addToWaveForm(11, 0, Math.ceil(parseInt(status.temp)));
  }
}
