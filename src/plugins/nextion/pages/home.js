require("babel-polyfill");
import abstract from "./abstract.js";

export default class Home extends abstract{


  constructor(screenManager){
    super(screenManager);
  }

  async init(options){
    await this.setScreen("home");
    await this.setText("t0", "Not Printing");
    
    if(options)
      console.log("options", options);
    
    this.addListener("click_b3", (e)=>{
      this.changePage("settings");
    });

    this.addListener("click_b1", (e)=>{
      this.changePage("plates");
    });
  }
  
  async update(status, log){
    if(status.Printing){
      return this.changePage("home");
    }
  }
}
