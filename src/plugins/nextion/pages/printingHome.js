require("babel-polyfill");

import abstract from "./abstract.js";

export default class PrintingHome extends abstract{


  constructor(screenManager){
    super(screenManager);

    this.layerID = -1;
    this.isPause = null;
  }

  async init(){

    this.addListener("click_b10", (e)=>{
      console.log("printSettings");
      this.changePage("printSettings");
    });

    this.addListener("click_b11", (e)=>{
      console.log("stats");
      this.changePage("stats");
    });

    this.addListener("click_b9", (e)=>{
      this.manager.nanoDLP.unpause();
    });
  }

  async update(status, log){
    if(!status.Printing){
      return this.changePage("home");
    }

    if(this.isPause == null || this.isPause !== status.Pause){
        this.isPause = status.Pause;
        if(this.isPause)
          await this.setScreen("printingPause");
        else
          await this.setScreen("printing");

        this.imageX = await this.nextion.getValue("t12.x");
        this.imageY = await this.nextion.getValue("t12.y");
        this.imageWidth = await this.nextion.getValue("t12.w");
    }

    await this.setText("t6", this.isPause?"Pause":"Printing");

    var remaining_time = Math.round((status.LayersCount-status.LayerID)*status.LayerTime/1000000000/60);
    var total_time = Math.round(status.LayersCount*status.LayerTime/1000000000/60);

    await this.setText("t0", status.LayerID+"/"+status.LayersCount);
    await this.setValue("j0", Math.floor((status.LayerID/status.LayersCount)*100));
    await this.setText("t1", remaining_time+" of "+total_time+"min");
    await this.setText("t2", log.msg);
    await this.setText("t7", status.Path)

    if(this.history.layer != status.LayerID){
      this.history.layer = status.LayerID;
      console.log("setImage", this.history.layer);
      let image = await this.nanoDLP.getCurrentPlateLayer(status.PlateID, status.LayerID)
      if(this.enabled)
        await this.nextion.displayBlackWhiteImage(image, this.imageX, this.imageY, this.imageWidth).catch(e => console.error(e));
    }
  }
}
