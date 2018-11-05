let Drawer = function(canvas_o,ctx_o){
  this.canvas=canvas_o;
  this.ctx=ctx_o;
  gridBoxs = (canvas.width < canvas.height)?canvas.width:canvas.height;
  gridBoxs = Math.floor(gridBoxs/g_gridSize);

  this.drawGrid=function(){
    let lineThickness = 1;
    for (let i = 0; i < gridBoxs;i++){
      for (let j = 0; j < gridBoxs;j++){
        ctx.fillStyle = 'black';
        ctx.fillRect(i*g_gridSize,
          j*g_gridSize,
          g_gridSize,
          g_gridSize);
        ctx.fillStyle = 'white';
        ctx.fillRect(i*g_gridSize+lineThickness,
          j*g_gridSize,
          g_gridSize-lineThickness,
          g_gridSize-lineThickness);
      }//end inner for
    }//end outer for
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,gridBoxs*g_gridSize,lineThickness);
    ctx.fillRect(gridBoxs*g_gridSize-1,0,
      lineThickness,gridBoxs*g_gridSize);
  }
}
