require("babel-polyfill");
import abstract from "./abstract.js";

export default class Home extends abstract{


  constructor(screenManager){
    super(screenManager);
  }

  async init(options){
    await this.setScreen("home");
    await this.setText("t0", "Not Printing");
    var ip = require("ip");
    await this.setText("b6", ip.address());
    
    if(options) {
      console.log("options", options);
      if (options.confirmResult) {
         if (options.confirmType === "shutdown") {
            var exec = require('child_process').exec;
	    this.setScreen("progress");
	    this.setText("t0", "Shutdown in progress...");
	    exec('shutdown now', function(error, stdout, stderr){});
	    return _context.stop();
         }
      }
      if (options.confirmResult) {
         if (options.confirmType === "reboot") {
            var exec = require('child_process').exec;
            this.setScreen("progress");
            this.setText("t0", "Reboot in progress...");
            exec('shutdown -r now', function(error, stdout, stderr){});
	    return _context.stop();
          }
       }
    }
    
    this.addListener("click_b3", (e)=>{
      this.changePage("settings");
    });

    this.addListener("click_b1", (e)=>{
      this.changePage("plates");
    });

    this.addListener("click_b4", (e)=>{
      this.changePage("confirm", {
          text: "Are you sure you want to shutdown?",
          confirmType: "shutdown",
          returnPage: "home"
      });
     });

    this.addListener("click_b5", (e)=>{
      this.changePage("confirm", {
          text: "Are you sure you want to reboot?",
          confirmType: "reboot",
          returnPage: "home"
      });
    });

    this.addListener("click_b6", (e)=>{
      this.changePage("ipqr", {
          text: "http://" + ip.address() 
      });
    });

  }
  
  async update(status, log){
    if(status.Printing){
      return this.changePage("home");
    }
  }
}
