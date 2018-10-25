function grid(X,Y,pixel,m){
  this.pixelSize = pixel;
  this.margin = m;
  this.WorldX = new Array(Math.floor(X/(pixel+2*this.margin)));
  this.WorldY = new Array(Math.floor(Y/(pixel+2*this.margin)));
  this.ShowCoord = new Array(this.WorldX.length*this.WorldY.length).fill(-1);

  for(var i=0;i<this.WorldX.length;i++){
    this.WorldX[i]=i*pixel +(i)*this.margin;
  }
  for(var i=0;i<this.WorldY.length;i++){
    this.WorldY[i]=i*pixel +(i)*this.margin;
  }

  this.IsCoordVisible=function(X,Y){
    return this.ShowCoord[this.WorldX.length*X + Y];
  };

  this.SetCoordVisibility = function(X,Y, color){
    this.ShowCoord[this.WorldX.length*X + Y]=color;
  };

  this.Sweap= function(){
    for(var i=0;i<this.ShowCoord.length;i++)
    {
      this.ShowCoord[i]=-1;
    }
  };
};

  function SelectColor(i,j,table){
    switch(table.IsCoordVisible(i,j))
    {
      case -1:
      ctx.fillStyle="black";
      break;

      case 1:
      ctx.fillStyle="#ff342d";	//red
      break;
      case 2:
      ctx.fillStyle="#0bf247";	//green
      break;
      case 3:
      ctx.fillStyle="#0b80ff";	//blue
      break;

      case 4:
      ctx.fillStyle="#ffd42d"; //yellow
      break;

      case 5:
      ctx.fillStyle="white";	//white
      break;
      case 6:
      ctx.fillStyle="#f68c00";	//Orange
      break;

      case 7:
      ctx.fillStyle="#f14ee8";	//purple
      break;

      case 8:
      ctx.fillStyle="#02ffff";	//cyan     //walls
      break;
    }
  };

function walls()
{
  for(i=0;i<plan.WorldX.length;i++)
  {
    plan.SetCoordVisibility(i,rng,8);
  }
};

function dessiner(){
  for(var i=0; i<plan.WorldX.length; i++)		//lines
  {
    for(var j = 0;j<plan.WorldY.length;j++)	//columns
    {
      SelectColor(i,j,plan);
      ctx.fillRect(plan.WorldX[i],plan.WorldY[j],plan.pixelSize,plan.pixelSize);
    }
  }
};
function doEvent(perso){
  	$('#survivor').show();
  	$('#dead').hide();
  	event = Math.floor(Math.random()*5+1);
  	if(event ==1){
      zombieAlive=true;
  		$('#event').html('Vous etes attaquez par un zombie.');
      while(zombieAlive){
  		pcChoice = Math.floor(Math.random()*100+1);
  	if((perso.ammo==0) && pcChoice >0 && pcChoice < 34 ){
  		alert("You kill zombie, continue !");
      zombieAlive=false;
  	}else if (perso.ammo >= 1 && pcChoice >0 && pcChoice < 67){
  		alert("You kill zombie, continue !");
  		perso.ammo--;
      zombieAlive=false;
  	}else {
  		perso.life--;
  		$('#dead').show();
  		$('#survivor').hide();
  		setInterval(function(){
  			$('#survivor').show();
  			$('#dead').hide();
  		},500);
  		if(perso.life == 0){
  			alert('your\'re dead, try again');
  			$('body').css('background','red');
  			$('#survivor').hide();
  			$('#dead').show();
  			$('#gameOver').show();
  		}
  	}
  }
  }/* else if(event == 2) {
  	alert('you are dead');
  	$('body').css('background','red');
  	$('#survivor').hide()
  	$('#gameOver').show()
  } */else if(event == 3){
  	$('#event').html('Vous avez trouvé des munitions.');
  	perso.ammo += 5;
  }
  else if(event == 4){
  	$('#event').html('Vous avez trouvé une trousse de soins.');
  	perso.life ++;
  }
}
$(function(){
  //1=personnage1 2=personnage2 3=sortie 4=autre
  canvas = document.getElementById('screen');
  canvas.width = $(document).width();
  canvas.height= $(document).height();
  ctx = canvas.getContext("2d");
  plan = new grid(300,300,10,1);
  perso1 = new personnage(0,0,5,5);
  perso2 = new personnage(0,1,5,5);
  rng= getRandomInt(1,plan.WorldY.length-1);
  jeu();

  function isWall(x,y){
    if(plan.IsCoordVisible(x,y)==8)
      return true;
    else
      return false;
  }

  $(document).keydown(function(e){
    $('.infoPerso1').html("Life : "+perso1.life+" Ammo : "+perso1.ammo);
    switch(e.keyCode){
      case 37:
        if(perso1.x>0)
          perso1.LEFT();
        break;

      case 38:
      if(perso1.y>0)
        perso1.UP();
        break;

      case 39:
      if(perso1.x<plan.WorldX.length-1)
        perso1.RIGHT();
        break;

      case 40:
      if(perso1.y<plan.WorldY.length-1)
        perso1.DOWN();
        break;
    }
    doEvent(perso1);
    jeu();
  });

  function jeu(){
    plan.Sweap();
    plan.SetCoordVisibility(plan.WorldX.length-1,plan.WorldY.length-1,1); //sortie

    if(plan.IsCoordVisible(perso1.x,perso1.y)===1)
      alert("EXIT");

    plan.SetCoordVisibility(perso1.x,perso1.y,3); //perso
    dessiner();
  };
});
