let Drawer = function(canvas_o,ctx_o){
  this.canvas=canvas_o;
  this.ctx=ctx_o;
  let gridBoxs = (canvas.width < canvas.height)?canvas.width:canvas.height;
  gridBoxs = Math.floor(gridBoxs/g_gridSize);
  let startx = (canvas.width-gridBoxs*g_gridSize)*.5;
  let starty = (canvas.height-gridBoxs*g_gridSize)*.5;

  this.drawGrid=function(){
    let lineThickness = 1;
    for (let i = 0; i < gridBoxs;i++){
      for (let j = 0; j < gridBoxs;j++){
        ctx.fillStyle = 'black';
        ctx.fillRect(i*g_gridSize+startx,
          j*g_gridSize+starty,
          g_gridSize,
          g_gridSize);
        ctx.fillStyle = 'white';
        ctx.fillRect(i*g_gridSize+lineThickness+startx,
          j*g_gridSize+starty,
          g_gridSize-lineThickness,
          g_gridSize-lineThickness);
      }//end inner for
    }//end outer for
    ctx.fillStyle = 'black';
    ctx.fillRect(startx,starty,gridBoxs*g_gridSize,lineThickness);
    ctx.fillRect(gridBoxs*g_gridSize-1+startx,starty,
      lineThickness,gridBoxs*g_gridSize);
  }
}
