require("babel-polyfill");
import abstract from "./abstract.js";
import request from "request-promise-native";
import config from "../../../../config.json";

export default class Home extends abstract{


  constructor(screenManager){
    super(screenManager);
  }

  async init(options){
    await this.setScreen("addPlate");
    this.profiles = await this.nanoDLP.getProfiles();
    this.config = config.plugins.plates;

    var idxP = 0;
    var idxD = 0;
    var idxF = 0;

    await this.setText("t3", this.profiles[idxP].ProfileID + ": " + this.profiles[idxP].Title);
    
    if(options) {
      console.log("options", options);
      if(options.confirmResult && options.confirmType === "addplate") {
 	var prid = options.data0;
        var path = options.data1;
        var file = options.data2;

        var fs = require("fs");
        var buffer = fs.readFileSync( path + "/" + file);
  
        let result = request( {
	   uri: global.SERVER_URL + "/plate/add",
	   formData: {
              'ZipFile': {
                 value: buffer,
                 options: {
                    filename: file
                 }
              },
              'Path': file,
              'ProfileID': prid
	   },
	   method: 'POST'
	 });
        console.log("result", result);
	return this.changePage("plates");
      }
    }
    
    this.addListener("click_b2", (e)=>{
      this.changePage("plates");
    });

    this.addListener("click_b4", (e)=>{
      idxP = Math.abs((idxP - 1) % this.profiles.length);
      this.setText("t3", this.profiles[idxP].ProfileID + ": " + this.profiles[idxP].Title);
    });

    this.addListener("click_b5", (e)=>{
      idxP = (idxP + 1) % this.profiles.length;
      this.setText("t3", this.profiles[idxP].ProfileID + ": " + this.profiles[idxP].Title);
    });

    var pth = [];
    var lbl = [];
    var fin = [];
  var fs = require('fs');

    const drivelist = require('drivelist');
    await drivelist.list((error, drives) => {
       if (error) { throw error; } 
       drives.forEach((drive) => {
           console.log(drive);
           pth.push(drive.mountpoints[0].path);
           lbl.push(drive.description + " | " + drive.mountpoints[0].path);
       });

       idxD=-1;
       do {
         idxD++;
         fin = fs.readdirSync(pth[idxD]);
         fin = fin.filter(this.cbFile,this);
       } while (this.config.autoFetch==="true" && this.config.showAll==="false" && fin.length==0 && idxD<pth.length);
       this.setText("t6", lbl[idxD]);
       this.list(idxF,fin);

    });

    this.addListener("click_b7", (e)=>{
       idxD = Math.abs((idxD - 1) % lbl.length);
       this.setText("t6", lbl[idxD]);
       fin = fs.readdirSync(pth[idxD]);
       fin = fin.filter(this.cbFile,this);
       idxF=0;
       this.list(idxF,fin);
    });

    this.addListener("click_b8", (e)=>{
       idxD = (idxD + 1) % lbl.length;
       this.setText("t6", lbl[idxD]);
       fin = fs.readdirSync(pth[idxD]);
       fin = fin.filter(this.cbFile,this);
       idxF=0;
       this.list(idxF,fin);
    });

    this.addListener("number", (scroll)=>{
       idxF = Math.floor((100-scroll)/(100/(fin.length-3)) );
       if(idxF<=fin.length-4) this.list(idxF,fin);
    });

    this.addListener("click_b9", (e)=>{
	if ((idxF+0)<fin.length && this.evalFile(fin[idxF+0])) this.changePage("confirm", {
	   text: "Are you sure you want to create\rthe follwing new plate?\r\rProfile: " + this.profiles[idxP].Title + "\rPath: " + pth[idxD] + "\rFile: " + fin[idxF+0],
	   confirmType: "addplate",
	   returnPage: "addPlate",
	   data0: this.profiles[idxP].ProfileID,
	   data1: pth[idxD],
           data2: fin[idxF+0]
	});
    });

    this.addListener("click_b10", (e)=>{
        if ((idxF+1)<fin.length && this.evalFile(fin[idxF+1])) this.changePage("confirm", {
           text: "Are you sure you want to create\rthe following new plate?\r\rProfile: " + this.profiles[idxP].Title + "\rPath: " + pth[idxD] + "\rFile: " + fin[idxF+1],
           confirmType: "addplate",
           returnPage: "addPlate",
           data0: this.profiles[idxP].ProfileID,
           data1: pth[idxD],
           data2: fin[idxF+1]
        });
    });

    this.addListener("click_b11", (e)=>{
        if ((idxF+2)<fin.length && this.evalFile(fin[idxF+2])) this.changePage("confirm", {
           text: "Are you sure you want to create\rthe following new plate?\r\rProfile: " + this.profiles[idxP].Title + "\rPath: " + pth[idxD] + "\rFile: " + fin[idxF+2],
           confirmType: "addplate",
           returnPage: "addPlate",
           data0: this.profiles[idxP].ProfileID,
           data1: pth[idxD],
           data2: fin[idxF+2]
        });
    });

    this.addListener("click_b12", (e)=>{
        if ((idxF+3)<fin.length && this.evalFile(fin[idxF+3])) this.changePage("confirm", {
           text: "Are you sure you want to create\rthe following new plate?\r\rProfile: " + this.profiles[idxP].Title + "\rPath: " + pth[idxD] + "\rFile: " + fin[idxF+3],
           confirmType: "addplate",
           returnPage: "addPlate",
           data0: this.profiles[idxP].ProfileID,
           data1: pth[idxD],
           data2: fin[idxF+3]
        });
    });

  }
  
  async list(index,fin) {
	if (fin.length>0){
		this.setText("b9", fin[index+0]);
	} else {
		this.setText("b9", "");
	}
	if (fin.length>1){
	        this.setText("b10", fin[index+1]);
	} else {
		this.setText("b10", "");
	}
	if (fin.length>2){
	        this.setText("b11", fin[index+2]);
	} else {
		this.setText("b11", "");
	}
	if (fin.length>3){
		this.setText("b12", fin[index+3]);
	} else {
		this.setText("b12", "");
	}
  }

   evalFile(filename) {
	var exts = this.config.fileExt.split("|");
        var res = false;
        for (var i=0; i< exts.length && res==0; i++) {
           if (filename.substr(filename.length-exts[i].length-1,exts[i].length+1).toLowerCase() == ("."+exts[i]).toLowerCase() ){ res = true;}
        }  
        return res;
  }

   listFile(filename) {
        return ((this.evalFile(filename)) || this.config.showAll==="true");
   }

   cbFile(value, index, ar) {
        return this.listFile(value);
  }

}
