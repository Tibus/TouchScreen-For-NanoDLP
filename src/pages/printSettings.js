require("babel-polyfill");

import abstract from "./abstract.js";
import lodash from "lodash";

export default class PrintSettings extends abstract{
  constructor(screenManager){
    super(screenManager);
  }

  async init(options){
    await this.setScreen("prtSettings");
    
    try {
      if(options && options.confirmResult && options.confirmResult){
        switch (options.confirmType) {
          case "pause":
          console.log("pause")
          this.nanoDLP.pause();
          this.changePage("home");
          break;
          
          case "stop":
          this.nanoDLP.stop();
          this.changePage("home");
          break;
        }
      }
    } catch (e) {
      console.log("error", e);
    }
    
    this.addListener("click_b4", (e)=>{
        this.changePage("home");
    });
    
    
    this.addListener("click_b5", (e)=>{
        this.changePage("confirm", {
          text:"Are you sure you want to debug\rprinting?\rIt will move 25mm to the top after\rthe current layer completed and\rcontinue to print."
          , confirmType: "debug"
          , returnPage: "printSettings"
        })
    });
    
    this.addListener("click_b3", (e)=>{
        console.log("click_b3");
        this.changePage("confirm", {
          text:"Are you sure you want to pause\r printing?\rIt will pause after the current\rlayer completed."
          , confirmType: "pause"
          , returnPage: "printSettings"
        })
    });

    this.addListener("click_b2", (e)=>{
        this.changePage("confirm", {
          text:"Are you sure you want to stop\r printing?\rIt will stop after the current\rlayer completed."
          , confirmType: "stop"
          , returnPage: "printSettings"
        });
    });
    
    this.addListener("string", async (string)=>{
      this.history = {};
      
      if(string != "cancel"){
        console.log("edit string :", string);
        this.profile.CureTime = Number(string);
        this.nanoDLP.setCureTime(this.profile.ProfileID, this.profile);
        this.changePage("home");
      }
    });
    
    this.setCureTime = false;
  }
  
  async update(status){
    this.status = status;
    
    if(this.setCureTime == false){
      this.setCureTime = true;
      this.plates = await this.nanoDLP.getPlates();
      this.plate = this.plates[lodash.findIndex(this.plates, {PlateID:this.status.PlateID})]

      this.profiles = await this.nanoDLP.getProfiles();
      this.profile = this.profiles[lodash.findIndex(this.profiles, {ProfileID:this.plate.ProfileID})]
      
      await this.setText("t7", this.profile.CureTime);
    }
    
    var remaining_time = Math.round((status.LayersCount-status.LayerID)*status.LayerTime/1000000000/60);
    var total_time = Math.round(status.LayersCount*status.LayerTime/1000000000/60);

    await this.setText("t11", status.LayerID+"/"+status.LayersCount);
    await this.setText("t10", remaining_time+" of "+total_time+"min");
  }
  
}
