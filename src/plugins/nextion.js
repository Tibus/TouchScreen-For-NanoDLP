require("babel-polyfill");
import abstract from "./abstract.js";

import NextionService from "./nextion/nextionService.js";

export default class Confirm extends abstract{
    constructor(manager){
      super(manager);
      
      this.isPrinting = null;
      
      this.nextion = new NextionService(this.config.plugins.nextion);
      
      this.nextion.on("disconnect", ()=>{
        this.init().catch(e=>console.error(e));
      });
    }

    async init(){
      this.isPrinting = null;
      this.currentPageId = null;
      
      console.log("connect to port "+this.config.plugins.nextion.port);
      
      await this.nextion.connect();
      
      console.log("connected");
      
      this.update(this.status, this.log).catch(e=>console.error(e));
    }

    async update(status, log){
      if(!status)
        return
        
      this.status = status;
      this.log = log;
      
      clearTimeout(this.updateTimeOut);

      if(status.Printing !== this.isPrinting){
        this.isPrinting = status.Printing;
        await this.setPage("home");
      }
      this.isPrinting = status.Printing;
      
      await this.currentPage.update(status, log).catch((e) => console.error(e));
    }

    async setPage(page, options){
      
      switch (page) {
        case "home":
          if(this.isPrinting){
            page = "printingHome";
          }else{
            page = "home";
          }
          break;
      }
      
      if(this.currentPageId == page)
        return;
      
      console.log("setPage", page, `./nextion/pages/${page}.js`);
      try {
        var PageClass = require(`./nextion/pages/${page}.js`).default;
      } catch (e) {
        console.log(`page ./nextion/pages/${page}.js do not exist`);      
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
      
      await new Promise((resolve) => setTimeout(resolve, 100));
      this.currentPage.init(options).catch(e=>console.error(e));
      
      await this.update(this.status, this.log);
    }
}
