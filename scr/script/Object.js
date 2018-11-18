var Object = function(o_name){
  let obj = this;
  let name = o_name;
  this.publicVars=[];
  this.privateVars=[];

  this.publicFunctions=[];
  this.privateFunctions=[];

  this.publicObjects=[];
  this.privateObjects=[];

  this.doFunction=function(functionName){

  }
  this.init=function(arguments){//arguments = var;
    let hasConstructor = false;
    for (let i = 0; i < this.publicFunctions.length;i++){
      //check for constructor if no constructor add basic constructor
      if (this.publicFunctions[i].getName()==name){
        hasConstructor=true;
      }
    }
  }
}
