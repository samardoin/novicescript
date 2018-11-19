//Delete

var Cleaner = function(o_text){
  let cleaner = this;
  let text = o_text;

  mainScript = new Script();
  //create a quote record
  let quoteRecord=[];
  let find_quoteRecord=function(){//segment code to reduce loose vars
    let quoteMode = 0;//1=''  2 = ""
    let slashMap = {n:"\n", "t":"\t", "\"":"\"",  "\'":"\'"};
    for (let i = 0; i < text.length;i++){
      if (text.charAt(i)=="\\"){
        if (i+1 == text.length){
          quoteRecord.push(quoteMode);
          return null;
        }//else
        if (slashMap[text.charAt(i+1)] == undefined){
          quoteRecord.push(quoteMode);
          i++;
          quoteRecord.push(quoteMode);
        }
        else {//slashMap[text.charAt(i+1)] != undefined
          console.log("Old text:" + text);
          let char = slashMap[text.charAt(i+1)];
          text=text.substr(0, i) + text.substr(i+1);//slash deleted
          text=text.substr(0, i) + char+text.substr(i+1);//nextChar replaced
          quoteRecord.push(quoteMode);
          console.log("New text:" + text);
        }
      }
      else if (text.charAt(i)=="\'"){
        if (quoteMode==2){/*THROW ERROR*/}
        else if (quoteMode==1){
          quoteMode=0;
          quoteRecord.push(quoteMode);
        }
        else if (quoteMode==0){
          quoteRecord.push(quoteMode);
          quoteMode=1;
        }
      }
      else if (text.charAt(i)=="\""){
        if (quoteMode == 1){/*THROW ERROR*/}
        else if (quoteMode==2){
          quoteMode=0;
          quoteRecord.push(quoteMode);
        }
        else if (quoteMode==0){
          quoteRecord.push(quoteMode);
          quoteMode=2;
        }
      }
      else{
        quoteRecord.push(quoteMode);
      }
    }
  };find_quoteRecord();

  let documentGlobal = function(){
    let dstart = 0;
    let dend = undefined;
    //skipWhiteSpace
    let skipWhite = function(i){
      if (i >= text.length) return undefined;
      while (whiteSpace.includes(text.charAt(i))){
        i++;
        if (i >= text.length) return undefined;
      }
      return i;
    }
    //skipNonWhiteSpace
    let skipNotWhite = function(i){
      while (whiteSpace.includes(text.charAt(i)) == false || quoteRecord[i]!=0){
        i++;
      }
      if (i >= text.length) return text.length-1;
      return i-1;
    }
    //skipToEndOfScope
    let skipScope = function(s){
      skscope = 0;
      let sks = 0;
      for (let i = s ; i < text.length;i++){
        if (quoteRecord[i] != 0){}
        else if (text.charAt(i) == '{') {
          if (skscope == 0){
            sks = i;
          }
          skscope++;
        }
        else if (text.charAt(i) == '}') {
          skscope--;
          if (skscope == 0) {
            return {start:sks, end:i};
          }
        }
      }
      throw "End of scope undefined";
    }


    for (let i = 0 ; true;){
      i=skipWhite(i);//skip init whitespace
      if (i == undefined || isNaN(i)){break;}
      start = i;//start of first word
      i=skipNotWhite(i);//find the end of the first word
      end = i;//end of the first word
      console.log("type:|" + text.substring(start,end+1) +"|");//first word

      if (i>=text.length) break;
      else if (text.substring(start,end+1) == "function" ){
        i++;//space after function
        let temp = skipScope(i);
        console.log("F:",text.substring(temp.start+1,temp.end) + ":");

        let ftemp = new Function(text.substring(start,temp.end+1),quoteRecord.slice(start,temp.end+1),"global",0);
        mainScript.globalFunctions.push(ftemp);

        console.log("|" + text.substring(start,temp.end+1) + "|");
        console.log("q:\t" + quoteRecord.slice(start,temp.end+1));
        if (text.substring(start,temp.end+1).length != quoteRecord.slice(start,temp.end+1).length) {
          throw "quote != ftemp @ Cleaner:documentGlobal";
        }
        i = temp.end+1;
      }
      else if (text.substring(start,end+1) == "class"){
        i++;
        let temp = skipScope(i);
        start = temp.start;
        end = temp.end;
        i = end+1;
      }
      else if (text.substring(start,end+1) == "var"){
        start = i;
        while (i < text.length){
          if ((quoteRecord[i] == 0)&&(text.charAt(i)=='\n' || text.charAt(i) == ';')){
            break;
          }
          i++;
        }
        end = i;
        i = i+1;
      }
      else {
        console.log("!!!|" + text.substring(start,end+1) + "|!!!");
        throw "unknow type";
      }


      if (i>=text.length) break;
    }
  };documentGlobal();

  console.log("Global Functions:");
  for (let i = 0 ; i < mainScript.globalFunctions.length;i++){
    console.log(mainScript.globalFunctions[i].getName());
  }
}
