var Function = function(o_text, o_quoteRecord, o_master){
  let fun = this;
  let name;
  let codes;
  let text = o_text;
  let quoteRecord = o_quoteRecord;
  let master = o_master;


  let organize = function(){
    let start = 0;
    let end = 0;
    let lines = [];
    let args = [];

    //get function name
    for (start = 0; whiteSpace.includes(text.charAt(start))==false;start++){}
    for (;whiteSpace.includes(text.charAt(start));start++)

    //get arguments Think about arrayLists

    //get function body
    for (end = start+1;whiteSpace.includes(text.charAt(end))==false||text.charAt(end)=='(';end++){}
    name = text.substring(start,end);
    for (start = 0;text.charAt(start) != '{';start++){}
    for (end = text.length-1;text.charAt(end) != '}'; end--){}
    text = text.substr(0, end);
    text = text.substring(start+1);
    console.log("Text:" + text);




  };organize();


  this.getName = function(){
    return name;
  }
  this.run= function(){
    console.log("Running function " + name);
    for (let i = 0; i < codes.length;i++){
      codes[i].run();
    }//end for
  }//end run

  for (let i = 0; i < text;i++){
    console.log(text.substring(0,"function".length));
  }

}//end Function
