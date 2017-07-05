require("babel-polyfill");
import abstract from "./abstract.js";
import lodash from "lodash";

export default class Plate extends abstract{


  constructor(screenManager){
    super(screenManager);
    
    this.currentViewID = 0;
  }

  async init(plate){
    this.plate = plate;
    this.profiles = await this.nanoDLP.getProfiles();
    this.profile = this.profiles[lodash.findIndex(this.profiles, {ProfileID:this.plate.ProfileID})]
    
    this.addListener("click_b2", (e)=>{
      this.changePage("plates");
    });
    
    this.addListener("click_b9", async () => {
      await this.nanoDLP.command("/printer/start/"+this.plate.PlateID);
      this.changePage("home");
    });

    this.addListener("click_b12", (e)=>{
      this.set3DView(++this.currentViewID);
    });
    
    let gap = 100/(this.plate.LayersCount);
    
    this.addListener("number", (index)=>{
      index = Math.floor((index)/gap);
      this.setLayer(index);
    });
    
    this.set3DView(this.currentViewID);
  }
  
  async set3DView(index){
    await this.resetView();

    var image = await this.manager.nanoDLP.getCurrentPlate3DView(this.plate.PlateID, this.currentViewID%4);
    await this.nextion.displayBlackWhiteImage(image, 153, 49, 167).catch(e => console.error(e));
  }
  
  async resetView(){
    await this.setScreen("plate");
    await this.setText("t0", this.plate.Path);
    await this.setText("t1", `${this.profile.Title} (${this.profile.Depth}um)`);
    await this.setText("t3", `${this.plate.TotalSolidArea}ml`);
    await this.setText("t7", `${this.plate.LayersCount} layers`);
  }
  
  /*
  async setLayer(index){
    console.log("this.plate", this.plate);
    this.setText("t9", "layer "+index+"/"+this.plate.LayersCount);
    console.log("getImage");
    let image = await this.nanoDLP.getCurrentPlateLayer(this.plate.PlateID, index)
    console.log(image);
    
    await this.nextion.displayBlackWhiteImage(image, 170, 47, 150).catch(e => console.error(e));
    console.log(imageOK);
    
  }*/
}
