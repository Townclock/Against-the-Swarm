var number_of_clicks = 0;

var engaged = true;

var invasion_progress = 0;

var under_siege = false;

follower_resource = 0;

var current_town  = 0;
var current_world = 0;

var  invasion_rate = 1;

var towns = [
    new Town("Safety", 20, false),
    new Town("Concern", 40, false),
    new Town("Worry", 60, false),
    new Town("Panic", 85, false),
    new Town("Doom", 95, true)
];
var world = [towns];

var technology_list_html= "";
tech_placeholders=[
{description: "researched tech", can_be_researched: true, has_been_researched: true},
{description: "unresearched tech", can_be_researched: true, has_been_researched: false},
{description: "unresearchbal tech", can_be_researched: false, has_been_researched: false},
];
for (i in tech_placeholders){
    if (tech_placeholders[i].has_been_researched){
        technology_list_html += ("<p>" + tech_placeholders[i].description + "</p>");
    }
}
technology_list_html += "<hr>";
for (i in tech_placeholders){
    if (!tech_placeholders[i].has_been_researched && tech_placeholders[i].can_be_researched){
        technology_list_html += ("<p>" + tech_placeholders[i].description + "</p>");
    }
}

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
function fight(player, monsters){
    number_of_clicks++;
    var rand = Math.floor(Math.random(0, monsters.length));
    console.log(monsters, monsters[rand], rand);
    if (monsters.length > 0) {
        monsters[rand].hp--;
        monsters[rand].attack(player);
        if (monsters[rand].hp < 1) {
            monsters[rand].die(monsters[rand]);
            player.gain_experience(1);
            player.gain_resources(monsters[rand].loot);
            setTimeout( replace_monster(monsters[rand], player.level - 1)
                , 500);
            invasion_progress -=3;
            }
    }

    update_ui(player, monsters[0]);

};
function rest(player, monsters){
    number_of_clicks++;
    player.heal();

    for(var i = 0; i < monsters.length; i++)
    {
        monsters[i].heal();
    }
    update_ui(player, monsters[0]);


    invasion_progress += 2;
}
function engage(player, monsters){
    number_of_clicks++;
    engaged = true;

    update_ui(player, monsters[0])
};
function disengage(player, monsters){

    number_of_clicks++;
    if (monsters[0].present) {
        monsters[0].attack(player);
    } 
    if (! under_siege) {
        engaged = false;
    }
    else {
        towns[current_town].destroyed = true;
        engaged = false;
        under_siege = false;
	change_town(player);
    }

    update_ui(player, monsters[0]);

};

function replace_monster(monster, challenge_level){
    console.log(monsters[0]);
    monsters[0].replace(challenge_level);
    console.log(monsters[0]);
}

function change_rate(monsters){
    invasion_rate = monsters.length/5;
}

function increment_follower_resource(current_town){
    follower_resource += (5 - current_town);     
}
