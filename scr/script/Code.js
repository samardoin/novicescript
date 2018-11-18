var Code =function(o_lineNumber, o_instruction){
  let code = this;
  let lineNumber = o_lineNumber;
  let instruction = o_instruction;

  this.getLineNumber = function(){
    return lineNumber;
  }
  this.getInstruction = function(){
    return instruction;
  }
  this.getInstructionAsString = function(){
    let result = "";
    for (let i = 0; i < instruction.length;i++){
      result+=instruction[i];
      result+="\t";
    }
    return result;
  }
  this.run=function(){
    console.log(this.getInstructionAsString());
    return lineNumber++;
  }
}
