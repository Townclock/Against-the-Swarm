var number_of_clicks = 0;

var engaged = false;

var invasion_progress = 0;

var under_siege = false;

follower_resource = 0;

var current_town  = 0;
var current_world = 0;

var  invasion_rate = 1;

var current_monster = null;
var current_fighter = null;

var time_left  = 0;
var spawn_time = 7;

var towns = [
    new Town("Safety", 20, false),
    new Town("Concern", 40, false),
    new Town("Worry", 60, false),
    new Town("Panic", 85, false),
    new Town("Doom", 95, true)
];
var world = [towns];

var technology_list_html = "";

var technology = [
   new Technology("Researched", true, true),
   new Technology("Unresearched", true, false),
   new Technology("Unresearchable", false, false)
]
   for (i in technology){
       if (technology[i].has_been_researched){
           technology_list_html += ("<p>" + technology[i].description + "</p>");
       }
   }
   technology_list_html += "<hr>";
   for (i in technology){
       if (!technology[i].has_been_researched && technology[i].can_be_researched){
           technology_list_html += ("<p>" + technology[i].description + "</p>");
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

function multi_fight(fighters, monsters){
    if(fighters.length != 0 && monsters.length != 0){
        for(f in fighters){

            if(monsters.length == 0 || fighters.length == 0)
                break;

            //finds random monster. If random monster is already dead, searches for new one
            var temp = Math.floor(Math.random() * monsters.length);
            
            //remove hp from monster and check if monster is dead or not. 
            monsters[temp].hp -= fighters[f].atk;

            if(monsters[temp].hp <= 0){
                monsters[temp].die();                
                monsters.splice(temp,1);
                }
        }

        //same for loop for fighters but instead for monsters
        for(m in monsters){
            if(monsters.length == 0 || fighters.length == 0)
                break;

            var temp = Math.floor(Math.random() * fighters.length);     

            fighters[temp].hp -= monsters[m].attack_bonus;
            if(fighters[temp].hp <= 0){
                fighters.splice(temp,1);
            }
        }
    }
}
function rest(fighters, monsters){
    number_of_clicks++;

    for(f in fighters){
        fighters[f].hp = fighters[f].max_hp;
    }
    for(var i = 0; i < monsters.length; i++)
    {
        monsters[i].heal();
    }
    //update_ui(player, monsters[0]);


    invasion_progress += 2;
}
function engage(fighters, monsters){
    number_of_clicks++;
    engaged = true;
    //update_ui(player, monsters[0])
};
function disengage(fighters, monsters){

    number_of_clicks++;
    // monsters make retreat attack
    for(m in monsters){
        if(monsters.length == 0 || fighters.length == 0)
            break;

        var temp = Math.floor(Math.random() * fighters.length);

        fighters[temp].hp -= monsters[m].attack_bonus;
        if(fighters[temp].hp < 0){
            fighters.splice(temp,1);
        }
            
    }

    //check whether town is in siege or not
    if (! under_siege) {
        engaged = false;
    }
    else {
        towns[current_town].destroyed = true;
        engaged = false;
        under_siege = false;
	change_town(player);
    }

    //update_ui(player, monsters[0]);

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
