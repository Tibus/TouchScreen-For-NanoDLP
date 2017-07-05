require("babel-polyfill");

import PNG from "png-js";
import abstract from "./abstract.js";

export default class Stats extends abstract{

  constructor(screenManager){
    super(screenManager)
  }

  async init(){
    await this.setScreen("stats");
    
    this.addListener("click_b11", (e)=>{
      this.changePage("home");
    });
  }

  async update(status){
    this.setText("t1", status.proc);
    this.setText("t2", status.mem);
    this.setText("t5", Math.ceil(parseInt(status.temp))+"°C");

    this.nextion.addToWaveForm(3, 0, parseInt(status.proc));
    this.nextion.addToWaveForm(5, 0, parseInt(status.mem));
    this.nextion.addToWaveForm(6, 0, Math.ceil(parseInt(status.temp)));
  }
}
