var number_of_clicks = 0;

var engaged = false;

var invasion_progress = 0;

var under_siege = false;

var reclaim_mode = false;

follower_resource = 0;

var current_town  = 0;
var current_world = 0;

var  invasion_rate = 1;

var current_monster = null;
var current_fighter = null;

var time_elapsed  = 0;
var spawn_time = 1;


var towns = [
    new Town("Safety", 10, false),
    new Town("Concern", 35, false),
    new Town("Worry", 50, false),
    new Town("Panic", 65, false),
    new Town("Doom", 80, true)
];
var world = [towns];

var player_location = world[current_world][current_town].location;

var technology_list_html = "";

var technology = [
   new Technology("Can Hire Meat", true, 0, 0, 0, [], console.log("")),
   new Technology("Can Hire Claws", true, 0, 0, 0, [], console.log("")),
   new Technology("Can Hire Scales", false, 10, 0, 10, [], console.log("")),
   new Technology("Can Hire Miners", false, 20, 50, 20, ["Can Hire Scales"], console.log("")),
   new Technology("Can Hire Crysal", false, 10, 0, 10, ["Can Hire Miners"], console.log("")),
]


function change_town(){
	if(current_town == 4){
		world.push( [new Town("test",  20,  false),
			     new Town("test2", 40,  false),
			     new Town("test3", 60,  false),
			     new Town("test4", 80,  false),
			     new Town("test5", 100, false)]);
		current_world++;
		current_town = 0;
		invasion_progress = 0;
	    while(monsters.length > 0) monsters.pop();
        towns = world[current_world];
    }
	else{
		current_town++;
	}
	player_location = world[current_world][current_town].location;

}

function multi_fight(fighters, monsters){
    if (monsters.length == 0){ invasion_progress-= .1};
    if(under_siege){
        followers.act;
        increment_follower_resource(1);
    }
    if(fighters.length != 0 && monsters.length != 0){
        for(f in fighters){

            //checking to see if fighter is a spell caster
            if(fighters[f].is_magic && fighters[f].charge != 2)
                fighters[f].charge ++;

            else{
                //finds random monster. If random monster is already dead, searches for new one
                var temp = Math.floor(Math.random() * monsters.length);
            
                //remove hp from monster and check if monster is dead or not.
                monsters[temp].hp -= fighters[f].atk;
                if(fighters[f].is_magic){
                    monsters[temp].hp -= fighters[f].atk_bonus;
                    fighters[f].charge = 0;
                }

                if(monsters[temp].hp <= 0){
                    monsters[temp].die();
                    monsters.splice(temp,1);
                }
            }
        }

        //same for loop for fighters but instead for monsters
        for(m in monsters){
            if(monsters.length == 0 || fighters.length == 0){
                if (reclaim_mode){
                    reclaim_mode = false;
                    if (monsters.length == 0){
                        current_town--;
                        player_location = world[current_world][current_town].location;
                        invasion_progress -= 10;
                    }
                }
                if(engaged && fighters.length < 1) {disengage(fighters, monsters);}
                break;
            }

            var temp = Math.floor(Math.random() * fighters.length);

            fighters[temp].hp -= monsters[m].attack_bonus;
            fighters[temp].charge = 0;

            if(fighters[temp].hp <= 0){
                fighters.splice(temp,1);
            }
        }
    }
            if(monsters.length == 0 || fighters.length == 0){
                if (reclaim_mode){
                    reclaim_mode = false;
                    if (monsters.length == 0){
                        current_town--;
                        player_location = world[current_world][current_town].location;
                        invasion_progress -= 10;
                    }
                }
                if(engaged && fighters.length < 1) {disengage(fighters, monsters);}
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


    invasion_progress += 2;
}
function engage(fighters, monsters){
    number_of_clicks++;
    engaged = true;
};
function disengage(fighters, monsters){

    number_of_clicks++;
    reclaim_mode = false;

    // monsters make retreat attack
    for(m in monsters){
        if(monsters.length == 0 || fighters.length == 0)
            break;

        var temp = Math.floor(Math.random() * fighters.length);

        fighters[temp].hp -= monsters[m].attack_bonus;
        fighters[temp].charge = 0;

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
	change_town();
    }


};

function replace_monster(monster, challenge_level){
    console.log(monsters[0]);
    monsters[0].replace(challenge_level);
    console.log(monsters[0]);
}

function change_invasion_rate(monsters){
    invasion_rate = monsters.length/5;
}

function increment_follower_resource(current_town){
    follower_resource += (5 - current_town);
}

function reclaim(fighters, monsters){
    if (current_town > 0 && reclaim_mode == false) {
        if (invasion_progress < towns[current_town - 1].location) {
            reclaim_mode = true;
            while (monsters.length > 0) {monsters.pop();}
            monsters.push( new Monster("protoss",5,40) );
            engaged = true;
        }
    }
};

function hire_mage(player_inventory, fighters, follower){
    if(player_inventory.meat > follower.mage_cost[0]){
        player_inventory.meat-=50;
        fighters.push(new Fighter( "Mage",500,50,true));

    }
    else{
        alert('not enough materials');
    }

}
