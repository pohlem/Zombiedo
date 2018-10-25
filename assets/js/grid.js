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
 event = Math.floor(Math.random()*7+1);
 if(event >=1 && event<4){
  zombieAlive=true;
  while(zombieAlive && perso.life > 0){
    $('#event'+perso.number).html('Vous etes attaquez par un zombie.');
    pcChoice = Math.floor(Math.random()*100+1);
    if(perso.ammo==0 && pcChoice >0 && pcChoice < 51 ){
      $('#event'+perso.number).html('Vous êtes attaqué par un zombie. Vous avez tué le zombie, continuez.');
      zombieAlive=false;
    }else if (perso.ammo >= 1 && pcChoice >0 && pcChoice < 83){
      $('#event'+perso.number).html('Vous êtes attaqué par un zombie. Vous avez tué le zombie, continuez.');
      perso.ammo--;
      zombieAlive=false;
    } else {
      perso.life--;
    }
  }
}
  /* else if(event == 2) {
  	alert('you are dead');
  	$('body').css('background','red');
  	$('#survivor').hide()
  	$('#gameOver').show()
  } */
  else if(event >= 4 || event <= 6){
  	$('#event').html('Vous avez trouvé des munitions.');
  	perso.ammo += 1;
  }
  else if(event == 5){
  	$('#event').html('Vous avez trouvé une trousse de soins.');
  	perso.life++;
  }
}
function isWall(x,y){
  if(plan.IsCoordVisible(x,y)==8)
    return true;
  else
    return false;
}

$(function(){
  //1=personnage1 2=personnage2 3=sortie 4=autre
  canvas = document.getElementById('screen');
  canvas.width = $(document).width();
  canvas.height= $(document).height();
  ctx = canvas.getContext("2d");
  plan = new grid(300,300,10,1);
  perso1 = new personnage(1,0,1,5,5);
  perso2 = new personnage(2,1,0,5,5);
  rng= getRandomInt(1,plan.WorldY.length-1);
  jeu();
  $('#infoPerso1').html("Life : "+perso1.life+" Ammo : "+perso1.ammo);
  $('#infoPerso2').html("Perso 2 Life : "+perso2.life+" Ammo : "+perso2.ammo);
  $(document).keydown(function(e){
    $('#infoPerso1').html("Perso 1 Life : "+perso1.life+" Ammo : "+perso1.ammo);
    $('#infoPerso2').html("Perso 2 Life : "+perso2.life+" Ammo : "+perso2.ammo);
    if(perso1.life == 0){
      $('#event').html('Game Over');
      $('body').html('<img class="imgEnd" src="assets/image/skull.png"></img> Joueur1');
    }else if(perso2.life ==0){
      $('body').html('<img class="imgEnd" src="assets/image/skull.png"></img> Joueur2');
    }else{
      switch(e.keyCode){
        case 37:
        if(perso1.x>0)
          perso1.LEFT();
        doEvent(perso1);
        break;

        case 38:
        if(perso1.y>0)
          perso1.UP();
        doEvent(perso1);
        break;

        case 39:
        if(perso1.x<plan.WorldX.length-1)
          perso1.RIGHT();
        doEvent(perso1);
        break;

        case 40:
        if(perso1.y<plan.WorldY.length-1)
          perso1.DOWN();
        doEvent(perso1);
        break;
         case 81:
        if(perso2.x>0)
          perso2.LEFT();
        doEvent(perso2);
        break;

        case 90:
        if(perso2.y>0)
          perso2.UP();
        doEvent(perso2);
        break;

        case 68:
        if(perso2.x<plan.WorldX.length-1)
          perso2.RIGHT();
        doEvent(perso2);
        break;

        case 83:
        if(perso2.y<plan.WorldY.length-1)
          perso2.DOWN();
        doEvent(perso2);
        break;
      }
      
      jeu();
    }
  });
  function jeu(){
    plan.Sweap();
    plan.SetCoordVisibility(plan.WorldX.length-1,plan.WorldY.length-1,1); //sortie

    if(plan.IsCoordVisible(perso1.x,perso1.y)===1){
      $('body').html('<img class="imgEnd" src="assets/image/wingame.png"></img>Joueur 1');
    } else if(plan.IsCoordVisible(perso2.x,perso2.y)===1){
      $('body').html('<img class="imgEnd" src="assets/image/skull.png"></img>Joueur 2');
    }

    plan.SetCoordVisibility(perso1.x,perso1.y,3); //perso
    plan.SetCoordVisibility(perso2.x,perso2.y,4); //perso
    dessiner();
  }
});
