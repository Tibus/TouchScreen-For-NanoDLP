'use strict';
require("babel-polyfill");

import request from "request-promise-native";
import STL2PNG from "./utils/stl2png.js";
import fs from "fs";

import debug_ from 'debug';
const debug = debug_('nanodlp');

export default class NanoDLPService {
  constructor(auth) {
    this.serverURL = global.SERVER_URL;
    if (auth.enable) {
      this.auth = true;
      this.user = auth.user;
      this.pass = auth.pass;
      this.session = "";
      this._getSession();
    }
    else {
      this.auth=false;
    }
  }


  async getPlates(){
    return this._request("/json/db/plates.json");
  }
  
  async getSetup(){
    return this._request("/json/db/machine.json");
  }
  
  async getProfiles(){
    return this._request("/json/db/profiles.json");
  }
  
  async setCureTime(plate, settings){
    debug(method+": "+url+`${this.auth ? "\tAUTH: "+this.session.split("=")[1] : ""}`);
    return await request({
      uri: `${this.serverURL}/profile/edit/${plate}`,
      headers:  { Cookie: `${this.auth ?  this.session : ""}`},
      form: settings,
      method: "POST",
    });
  }

  async getCurrentPlateLayer(plate, layer){
    //192.168.1.25/static/plates/6/48.png
    //return this._request(`static/plates/${plate}/${layer}.png`, "GET", "raw");

    return await request({ url: `${this.serverURL}/static/plates/${plate}/${layer}.png`, encoding: null });
  }
  
  async getCurrentPlate3DView(plate, orientation){
    if (fs.existsSync(`temp/${plate}_${orientation}.png`)) {
      return Promise.resolve(fs.readFileSync(`temp/${plate}_${orientation}.png`));
    }
    
    let stl =  await request({ url: `${this.serverURL}/static/plates/${plate}/plate.stl`, encoding: null });
    return await new STL2PNG().getPNG(stl, plate, orientation);
  }
  
  async getCurrentPlateSTL(plate){
    //192.168.1.25/static/plates/6/48.png
    //return this._request(`static/plates/${plate}/${layer}.png`, "GET", "raw");
    
  }
  
  async getStatus(){
    return await this._request("/status");
  }

  async pause(){
    return await this._request("/printer/pause");
  }

  async stop(){
    return await this._request("/printer/stop");
  }

  async unpause(){
    return await this._request("/printer/unpause");
  }

  async getCurrentLog(){
    var log = await this._request("/log");
    return JSON.parse((log.split("\n").slice(-1)).toString().split(" ").slice(2).join(" "));
  }
  
  async command(url){
    return await this._request(url, "GET", "");
  }
  
  async _getSession(type="json"){
    debug("POST"+": "+"/login");
    let response = await request({
      uri: `${this.serverURL}`+"/login",
      form: {
        "username": `${this.user}`,
        "password": `${this.pass}`,
      },
      json: type=="json",
      method: "POST",
      simple: false,
      transform: function(body, response, resolveWithFullResponse) {
                  return {'headers': response.headers, 'data': body};
                }
      //timeout: 10000
    })
    if (response.headers['location'] == '/') {
      debug("Auth: Login response: "+ response.headers['set-cookie'][0]);
      this.session = response.headers['set-cookie'][0];
      debug("Auth: Setting cookie: "+this.session);
    }
    else {
      debug("Login failed");
      this.session =  "Error";
    }

  }

  async _request(url, method="GET", type="json"){
    debug(method+": "+url+`${this.auth ? "\tAUTH: "+this.session.split("=")[1] : ""}`);
    return await request({
      uri: `${this.serverURL}${url}`,
      method: method,
      headers:  { Cookie: `${this.auth ?  this.session : ""}`},
      //type: type,
      json: type=="json",
      timeout: 10000
    })
  }
}
