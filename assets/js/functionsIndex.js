//$('#newGame').click(function(){
//attaque de zombie

life= 5;
ammo= 5;
gun= 0;
$('#gameOver').hide();
$('#button').click(function(){
	$('#survivor').show();
	$('#dead').hide();
	event = Math.floor(Math.random()*5+1);
	if(event ==1){
		$('#event').html('Vous etes attaquez par un zombie.');
		pcChoice = Math.floor(Math.random()*100+1);
	if((ammo==0 || gun==0) && pcChoice >0 && pcChoice < 34 ){
		alert("You kill zombie, continue !");
	}else if (ammo >= 1 && gun == 1 && pcChoice >0 && pcChoice < 67){
		alert("You kill zombie, continue !");
		ammo--;
	}else {
		life--;
		$('#dead').show();
		$('#survivor').hide();
		setInterval(function(){
			$('#survivor').show();
			$('#dead').hide();
		},500);
		if(life == 0){
			alert('your\'re dead, try again');
			$('body').css('background','red');
			$('#survivor').hide();
			$('#dead').show();
			$('#gameOver').show();
		}
	}
}/* else if(event == 2) {
	alert('you are dead');
	$('body').css('background','red');
	$('#survivor').hide()
	$('#gameOver').show()
} */else if(event == 3){
	$('#event').html('Vous avez trouvé des munitions.');
	ammo += 5;
}
else if(event == 4){
	$('#event').html('Vous avez trouvé une trousse de soins.');
	life ++;
}
});
