require("babel-polyfill");
import abstract from "./abstract.js";

export default class Confirm extends abstract{

  constructor(screenManager){
    super(screenManager);
  }

  async init(options){
    await this.setScreen("confirm");
    await this.setText("t0", options.text);

    this.addListener("click_b1", (e)=>{
      this.changePage(options.returnPage, {confirmType:options.confirmType, confirmResult:true});
    });

    this.addListener("click_b2", (e)=>{
      this.changePage(options.returnPage, {confirmType:options.confirmType, confirmResult:false});
    });
  }
}
