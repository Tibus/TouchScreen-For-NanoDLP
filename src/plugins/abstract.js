require("babel-polyfill");
import config from "../../config.json";

export default class AbstractPlugin{
  
  constructor(manager){
    this.manager = manager;
    this.nanoDLP = manager.nanoDLP;
    this.config = config;
  }
  
  async init(){
    
  }
  
  async update(status){

  }
  
  dispose(){
    
  }
}
