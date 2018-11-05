let Drawer = function(canvas,ctx){
  this.canvas=canvas;
  this.ctx=ctx;
  gridBoxs = (canvas.width < canvas.height)?canvas.width:canvas.height;
  gridBoxs = Math.floor(gridBoxs/global_gridSize);


  this.drawGrid=function(){
    let lineThickness = 1;
    for (let i = 0; i < gridBoxs;i++){
      for (let j = 0; j < gridBoxs;j++){
        ctx.fillStyle = 'black';
        ctx.fillRect(i*global_gridSize,
          j*global_gridSize,
          global_gridSize,
          global_gridSize);
        ctx.fillStyle = 'white';
        ctx.fillRect(i*global_gridSize+lineThickness,
          j*global_gridSize,
          global_gridSize-lineThickness,
          global_gridSize-lineThickness);
      }//end inner for
    }//end outer for
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,gridBoxs*global_gridSize,lineThickness);
    ctx.fillRect(gridBoxs*global_gridSize-1,0,
      lineThickness,gridBoxs*global_gridSize);


  }
}
