function personnage(number,x,y,life,ammo){
  this.number=number;
  this.x=x;
  this.y=y;
  this.life=life;
  this.ammo=ammo;

  this.UP = function(){
    this.y--;
	};

	this.DOWN = function(){
    this.y++;
	};

	this.LEFT = function(){
    this.x--;
	};

	this.RIGHT = function(){
    this.x++;
	};
}
