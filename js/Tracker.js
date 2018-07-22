function Tracker(){
	
	this.boss_kills = 0;
	this.warrior_kills = 0;
	this.drone_kills = 0;
	this.tank_kills = 0;

	this.fighter_deaths = 0;
	this.mage_deaths = 0;

}

Tracker.prototype.update = function(dead_object){
	if(dead_object == "boss")
		this.boss_kills++;

	else if(dead_object == "warrior")
		this.warrior_kills++;

	else if(dead_object == "drone")
		this.drone_kills++;

	else if(dead_object == "tank")
		this.tank_kills++;

	else if(dead_object == "Knight")
		this.fighter_deaths++;

	else if(dead_object == "Mage")
		this.mage_deaths++;
}

Tracker.prototype.spawn = function(game){
	var type = Math.floor(Math.random()*3);
	if(type == 0)
		game.monsters.push(new Monster("tank", 50,1,1));

	if(type == 1)
		game.monsters.push(new Monster("drone", 25,10,1));

	if(type == 2)
		game.monsters.push(new Monster("warrior", 12,20,1));
}
