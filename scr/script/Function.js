var Function = function(o_text, o_quoteRecord, o_master,o_num){
  let fun = this;
  let name;
  let text = o_text;
  let quoteRecord = o_quoteRecord;
  let master = o_master;
  let args = [];
  let startNum = o_num;
  let actions = [];

  let organize = function(){
    let start = 0;
    let end = 0;
    let currentNum = startNum;

    //find function name
    let findName = function(){
      for (start = 0; whiteSpace.includes(text.charAt(start))==false;start++){}
      for (;whiteSpace.includes(text.charAt(start));start++)
      for (end = start+1;whiteSpace.includes(text.charAt(end))==false||text.charAt(end)=='(';end++){}
      name = text.substring(start,end);
    };findName();

    //find arguments
    let findArguments = function(){
      let bscope = 0;
      let sscope = 0;
      let cscope = 0;
      //get arguments Think about arrayLists
      for (start = end;text.charAt(start) != '(';start++);
      for (end = start;true;end++){
        if (quoteRecord[end] != 0 ) {continue;}
        else if (text.charAt(end) == '[') bscope++;
        else if (text.charAt(end) == ']') bscope--;
        else if (text.charAt(end) == '{') sscope++;
        else if (text.charAt(end) == '}') sscope--;
        else if (text.charAt(end) == '(') cscope++;
        else if (text.charAt(end) == ')') {
          if (cscope==1) break;
          else cscope--;
        }
      }//at )
    };findArguments();

    //find actions in body
    let findActions = function(){

      start++;
      end--; // at *)
      let bscope = 0;
      let sscope = 0;
      let cscope = 0;

      //NEEDS ERROR HANDLE
      let temptext = "";
      for (let i = start;i < end+1;i++){
        if (quoteRecord[i]!=0) temptext+=text.charAt(i);
        else if (text.charAt(i) == '[') bscope++;
        else if (text.charAt(i) == ']') bscope--;
        else if (text.charAt(i) == '{') sscope++;
        else if (text.charAt(i) == '}') sscope--;
        else if (text.charAt(i) == '(') cscope++;
        else if (text.charAt(i) == ')') cscope--;
        else if (text.charAt(i) == ',' && bscope==0 && sscope==0 &&cscope==0) {
          if (temptext!="")args.push(temptext);
          temptext="";
        }
        else if (whiteSpace.includes(text.charAt[i])) continue;
        else {temptext+=text.charAt(i);}
        tempn=i;
      }
      if (temptext!="")args.push(temptext);

      start = end+1;
      temptext = "";
      for (end = text.length; text.charAt(end) != '}' ;end--){}
      for (;text.charAt(start)!='{';start++){}
      start++;
      for (let i = start; i <end;i++){
        if (quoteRecord[i]==0&&text.charAt(i)=='\n'){
          if (temptext != "") {
            let action = new Action();
            action.value=temptext;
            action.num =currentNum;
            actions.push(l);
          }
          currentNum++;
          temptext ="";
        }
        else if (quoteRecord[i]==0&&text.charAt(i)==';'){
          if (temptext != "") {
            let action = new Action();
            action.value=temptext;
            action.num =currentNum;
            actions.push(action);
          }
          temptext ="";
        }
        else {temptext +=text.charAt(i);}
      }
      if (temptext!=""){
        let action = new Action();
        action.value=temptext;
        action.num =currentNum;
        actions.push(action);
      }
    };findActions();

    //print actions
    for (let i = 0; i < actions.length;i++){
      console.log("action:" + actions[i].value);
    }

  };organize();


  this.getName = function(){
    return name;
  }
  this.run= function(){
    console.log("Running function " + name);
    for (let i = 0; i < actions.length;i++){
      actions[i].run();
    }//end for
    return null;
  }//end run

  for (let i = 0; i < text;i++){
    console.log(text.substring(0,"function".length));
  }
}//end Function
