require("babel-polyfill");
import abstract from "./abstract.js";

export default class ZAxis extends abstract{


  constructor(screenManager){
    super(screenManager);
    
    this.currentButton = 8;
  }

  async init(options){
    await this.setScreen("zAxis");
    
    this.addListener("click_b16", (e)=>{
      this.changePage("home");
    });
    
    this.addListener("click_b12", (e)=>{
      this.up();
    });
    
    this.addListener("click_b13", (e)=>{
      this.down();
    });
    
    this.addListener("click_b11", () => this.setBtn(11));
    this.addListener("click_b10", () => this.setBtn(10));
    this.addListener("click_b9", () => this.setBtn(9));
    this.addListener("click_b8", () => this.setBtn(8));
    this.addListener("click_b7", () => this.setBtn(7));
    this.addListener("click_b6", () => this.setBtn(6));
    this.addListener("click_b5", () => this.setBtn(5));
    this.addListener("click_b2", () => this.setBtn(2));
    
    this.addListener("click_b3", () => this.nanoDLP.command("/z-axis/top"));
    this.addListener("click_b4", () => this.nanoDLP.command("/z-axis/bottom"));
    this.addListener("click_b14", () => this.nanoDLP.command("/z-axis/touch-limit"));
    this.addListener("click_b15", () => this.nanoDLP.command("/z-axis/calibrate"));
    
    this.setBtn(10);
  }
  
  async up(){
    this.move("up");
  }
  
  async down(){
    this.move("down");
  }
  
  async move(direction){
    switch(this.currentButton){
      case 11:
        await this.nanoDLP.command(`/z-axis/move/${direction}/micron/100000`);
        break;
      case 10:
        await this.nanoDLP.command(`/z-axis/move/${direction}/micron/10000`);
        break;
      case 9:
        await this.nanoDLP.command(`/z-axis/move/${direction}/micron/1000`);
        break;
      case 8:
        await this.nanoDLP.command(`/z-axis/move/${direction}/micron/500`);
        break;
      case 7:
        await this.nanoDLP.command(`/z-axis/move/${direction}/micron/100`);
        break;
      case 6:
        await this.nanoDLP.command(`/z-axis/move/${direction}/pulse/100`);
        break;
      case 5:
        await this.nanoDLP.command(`/z-axis/move/${direction}/pulse/10`);
        break;
      case 2:
        await this.nanoDLP.command(`/z-axis/move/${direction}/pulse/1`);
        break;
    }
  }
  
  async setBtn(id){
    await this.nextion.setValue(`bt${this.currentButton}`, 0);    
    this.currentButton = id;
    await this.nextion.setValue(`bt${this.currentButton}`, 1);
  }
  
  
  async update(status){
    if(!this.setup){
      this.setup = await this.nanoDLP.getSetup();
    }
    
    let currentMm = status.CurrentHeight/((360/this.setup.MotorDegree*this.setup.MicroStep)/this.setup.LeadscrewPitch);
    let total = this.setup.ZAxisHeight/((360/this.setup.MotorDegree*this.setup.MicroStep)/this.setup.LeadscrewPitch);
    
    await this.setText("t1", currentMm+"mm");
    await this.setText("t2", total+"mm");
  }
}
