var number_of_clicks = 0;

var engaged = true;

var invasion_progress = 0;

var under_siege = false;

var current_town  = 0;
var current_world = 0;

var towns = [
    new Town("Safety", 20, false),
    new Town("Concern", 40, false),
    new Town("Worry", 60, false),
    new Town("Panic", 85, false),
    new Town("Doom", 95, true)
];
var world = [towns];

function change_town(player){
	if(current_town == 4){
		world.push( [new Town("test",  20,  false),
			     new Town("test2", 40,  false),
			     new Town("test3", 60,  false),
			     new Town("test4", 80,  false),
			     new Town("test5", 100, false)]);
		current_world++;
		current_town = 0;
		invasion_progress = 0;
	}
	else{
		current_town++;
	}
	player.location = world[current_world][current_town].location;

}

function fight(player, monster){
    number_of_clicks++;
    if (monster.present) {
        monster.hp--;
        monster.attack(player);
        if (monster.hp < 1) {
            monster.die(monster);
            player.gain_experience(1);
            player.gain_resources(monster.loot);
            setTimeout( replace_monster(monster, player.level - 1)
                , 500);
            invasion_progress -=3;
            }
    }

    update_ui(player, monster);
};
function rest(player, monster){
    number_of_clicks++;
    player.heal();
    monster.heal();
    update_ui(player, monster);
    invasion_progress += 2;
}
function engage(player, monster){
    number_of_clicks++;
    engaged = true;
    update_ui(player, monster)
};
function disengage(player, monster){
    number_of_clicks++;
    if (monster.present) {
        monster.attack(player);
    } 
    if (! under_siege) {
        engaged = false;
        player.deposit_resources();
    }
    else {
        towns[current_town].destroyed = true;
        engaged = false;
        under_siege = false;
	change_town(player);
    }

    update_ui(player, monster);
};

function replace_monster(monster, challenge_level){
    console.log(monster);
    monster.replace(challenge_level);
    console.log(monster);
}
