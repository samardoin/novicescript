let Texter = function(textcan_o,textctx_o){
  this.textcan=textcan_o;
  this.textctx=textctx_o;
  this.stop = false;

  let update = function(){

  }
  let render = function(){
    
  }

  this.startLoop=function(){
    setInterval(function(){
          update();
          render();
          if (this.stop)clearInterval();
    },1000/g_fps);
  }

}
