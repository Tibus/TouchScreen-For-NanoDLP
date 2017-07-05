'use strict';

require("babel-polyfill");

import NanoDLPService from "./services/nanoDlpService.js";
import NextionService from "./services/nextionService.js";
import config from "../config.json";

global.SERVER_URL = config.url;
const nanoDLPService = new NanoDLPService();
const nextionService = new NextionService();

class ScreenManager{
  constructor(){
    this.nanoDLP = nanoDLPService;
    this.nextion = nextionService;
    this.isPrinting = null;
    
    this.nextion.on("disconnect", ()=>{
      this.init().catch(e=>console.error(e));
    });
  }

  async init(){
    this.isPrinting = null;
    this.currentPageId = null;
    if(this.updateTimeOut)
      clearTimeout(this.updateTimeOut);
      
    await this.nextion.connect();
    
    console.log("connected");
    
    this.update().catch(e=>console.error(e));
  }

  async update(){
    clearTimeout(this.updateTimeOut);
    
    let status = await this.nanoDLP.getStatus();
    let log = await this.nanoDLP.getCurrentLog();

    if(status.Printing !== this.isPrinting){
      this.isPrinting = status.Printing;
      await this.setPage("home");
    }
    this.isPrinting = status.Printing;
    
    await this.currentPage.update(status, log).catch((e) => console.error(e));
    
    clearTimeout(this.updateTimeOut);
    this.updateTimeOut = setTimeout(()=> this.update(), 1000);
  }

  async setPage(page, options){
    if(this.currentPageId == page)
      return;
      
    switch (page) {
      case "home":
        if(this.isPrinting){
          page = "printingHome";
        }else{
          page = "home";
        }
        break;
    }
    
    console.log("setPage", page, `./pages/${page}.js`);
    try {
      var PageClass = require(`./pages/${page}.js`).default;
    } catch (e) {
      console.log(`page ./pages/${page}.js do not exist`);      
      return;
    }
    
    if(this.currentPage){
      try {
        this.currentPage.dispose();
      } catch (e) {
        console.error(e);
      }
    }
    
    this.currentPageId = page;
    this.currentPage = new PageClass(this);
    
    //await this.nextion.stopRefresh();
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.currentPage.init(options).catch(e=>console.error(e));
    
    await this.update();
    //await this.nextion.startRefresh();
  }
}

new ScreenManager().init().catch((e)=>{
  console.error(e);
});
