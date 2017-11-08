require("babel-polyfill");

export default class Abstract{

  constructor(manager){
    this.manager = manager;
    this.nextion = manager.nextion;
    this.nanoDLP = manager.nanoDLP;
    this.listener = [];
    this.history = {};
    this.enabled = true;
  }

  addListener(event, callback){
    this.listener.push({btn:event, callback:callback});
    this.nextion.on(event, callback);
  }

  async setScreen(val){
    await this.nextion.setPage(val);
    this.history = {};
  }

  async changePage(val, options){
    await this.manager.setPage(val, options);
  }

  async setText(txt, val){
    if(this.history[txt] == val)
      return;
    this.history[txt] = val;
    await this.nextion.setText(txt, val);
  }

  async setValue(txt, val){
    if(this.history[txt] == val)
      return;
    this.history[txt] = val;
    await this.nextion.setValue(txt, val);
  }

  async getValue(txt) {
    return await this.nextion.getValue(txt);
  }

  async update(status){

  }

  dispose(){
    this.enabled = false;

    for(let i = 0; i<this.listener.length; i++){
      this.nextion.removeListener(this.listener[i].btn, this.listener[i].callback);
    }
  }
}
