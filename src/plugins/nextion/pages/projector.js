require("babel-polyfill");
import abstract from "./abstract.js";

export default class Projector extends abstract{


  constructor(screenManager){
    super(screenManager);
  }

  async init(options){
    await this.setScreen("projector");
    
    this.addListener("click_b2", (e)=>{
      this.changePage("home");
    });

    this.addListener("click_b4", () => this.nanoDLP.command("/shutter/open"));
    this.addListener("click_b8", () => this.nanoDLP.command("/shutter/close"));
    
    this.addListener("click_b3", () => this.nanoDLP.command("/button/press/1"));
    this.addListener("click_b9", () => this.nanoDLP.command("/button/press/0"));
    
    this.addListener("click_b5", () => {
      if(this.status.Projecting)
        this.nanoDLP.command("/projector/blank");
      else
        this.nanoDLP.command("/projector/generate/calibration");
    });
    
    this.addListener("click_b6", () => {
      if(this.status.Projecting)
        this.nanoDLP.command("/projector/blank");
      else
        this.nanoDLP.command("/projector/generate/white");
    });
    
    this.addListener("click_b7", () => {
      if(this.status.Projecting)
        this.nanoDLP.command("/projector/blank");
      else
        this.nanoDLP.command("/projector/generate/boundaries");
    });
  }
  
  async update(status){
    this.status = status;
  }
}
