require("babel-polyfill");
import abstract from "./abstract.js";

export default class Confirm extends abstract{

  constructor(screenManager){
    super(screenManager);
  }

  async init(options){
    await this.setScreen("ipQR");
    await this.setText("t1", options.text);
    await this.setText("qr2", options.text);

    this.addListener("click_b3", (e)=>{
      this.changePage("home");
    });

  }
}
