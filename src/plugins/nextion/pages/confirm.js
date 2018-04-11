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
      this.changePage(options.returnPage, {confirmType:options.confirmType, confirmResult:true, data0:options.data0, data1:options.data1, data2:options.data2});
    });

    this.addListener("click_b2", (e)=>{
      this.changePage(options.returnPage, {confirmType:options.confirmType, confirmResult:false, data0:options.data0, data1:options.data1, data2:options.data2});
    });
  }
}
