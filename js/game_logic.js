function Game(){
    this.number_of_clicks = 0;
    this.engaged = false;
    this.invasion_progress = 0;
    this.under_siege = false;
    this.reclaim_mode = false;
    this.current_town  = 0;
    this.current_world = 0;
    this.invasion_rate = 0;
    this.current_monster = null;
    this.current_fighter = null;
    this.time_elapsed  = 0;
    
    this.spawn_time = 2;
    this.monsters = [new Monster("Beetle", 500, 1, 19)];
    this.fighters = [
        new Fighter( "hero 1", 100, 20),
        new Fighter( "hero 1", 100, 20),
        new Fighter( "hero 1", 100, 20),
        ];

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

    this.technology = [
        new Technology("Meat Cutters", false, 0, 0, 0, [], function(){
            game.followers.can_hire_meat_processors = true;
            alert("You can now hire Meat Cutters in the Town Panel.")
        }),
        new Technology("Scale Forgers", false, 10, 0, 0, ["Meat Cutters"], function(){
            game.followers.can_hire_scales_processors = true;
            alert("You can now hire Scale Forgers in the Town Panel.")
        }),
        new Technology("Claw Grinders", false, 20, 10, 0, ["Meat Cutters", "Scale Forgers"], function(){
            game.followers.can_hire_claws_processors = true;
            alert("You can now hire Claw Grinders in the Town Panel.")
        }),
        new Technology("Fighters", false, 10, 20, 5, ["Meat Cutters", "Scale Forgers", "Claw Grinders"], function(){
            game.followers.can_hire_fighters = true;
            alert("You can now hire Fighter in the Town Panel.")
        }),
        new Technology("Miners", false, 10, 40, 15, ["Meat Cutters", "Scale Forgers", "Claw Grinders"], function(){
            game.followers.can_hire_miners = true;
            alert("You can now hire Miners in the Town Panel.")
        }),

       new Technology("Can Hire Crysal", false, 40, 20, 80, ["Can Hire Miners"], function(){
            game.followers.can_hire_ore_processors = true;
            alert("You can now hire Enchanters in the Town Panel.")
       }),
    ]

    temp = [
        new Town("Safety", 20, false),
        new Town("Concern", 40, false),
        new Town("Worry", 60, false),
        new Town("Panic", 85, false),
        new Town("Doom", 100, true)
    ];
    this.towns = temp;
    this.world = [temp];
    this.player_location = 20;
    this.tracker = new Tracker();
}
Game.prototype.change_town = function(){
	if(this.current_town == 4){
		this.world.push( [new Town("test",  20,  false),
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

Game.prototype.multi_fight = function(){
    if (this.monsters.length == 0 && !this.under_siege){ 
        this.invasion_progress-= .1;

        //if you fought back the swarm to the previous town, reclaim mode is set to true and boss is placed.
        //NO MORE RANDOM SPAWNS
        if(this.current_town > 0 && this.invasion_progress <= this.towns[this.current_town-1].location && !this.reclaim_mode){
            alert('boss incoming');
            this.engaged = true;
            this.reclaim_mode = true;
            this.monsters.push(new Monster("boss", 1000,10));
        }

        //if you made it to the beginning of the previous world, shift to the next world
        if(this.current_town == 0 && this.invasion_progress <= 0){
            this.current_world--;
            this.current_town = 5;
            this.invasion_progress = 100;
            this.towns = this.world[this.current_world];
            alert('boss incoming');
            this.engaged = true;
            this.reclaim_mode = true;
            this.monsters.push(new Monster("boss",1000,10));
        }
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

                else{
                    //finds random monster. If random monster is already dead, searches for new one
                    var temp = Math.floor(Math.random() * this.monsters.length);
                
                    //remove hp from monster and check if monster is dead or not.
                    this.monsters[temp].hp -= (this.fighters[f].atk-this.monsters[temp].armor);
                    if(this.fighters[f].is_magic){
                        this.monsters[temp].hp -= (this.fighters[f].atk_bonus);
                        this.fighters[f].charge = 0;
                    }

                    //if monster dead
                    if(this.monsters[temp].hp <= 0){
                        this.monsters[temp].die(this);
                        this.tracker.update(this.monsters[temp].monster_name);

                        this.monsters.splice(temp,1);
                        if(this.monsters.length == 0)
                            break;
                    }
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

                if(this.fighters[temp].hp <= 0){
                    this.tracker.update(this.fighters[temp].fighter_name);
                    this.fighters.splice(temp,1);
                }
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

Game.prototype.increment_follower_resource = function(){
    this.followers.follower_resource += (5 - this.current_town)/10;
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

function guard(fighters, monsters){
    if (monsters.length == 0){ 
        invasion_progress-= .1;
    }
    if(this.under_siege){
        this.followers.act;
        increment_follower_resource(1/10);
    }
    if(fighters.length != 0 && monsters.length != 0){
        for(f in fighters){
            //checking to see if fighter is a spell caster
            if(fighters[f].is_magic){
                if (fighters[f].charge != 2){
                    fighters[f].charge ++;
                }
                else{
                    //finds random monster. If random monster is already dead, searches for new one
                    var temp = Math.floor(Math.random() * monsters.length);
                    //remove hp from monster and check if monster is dead or not.
                    monsters[temp].hp -= fighters[f].atk;
                    fighters[f].charge = 0;
                    if(monsters[temp].hp <= 0){
                        monsters[temp].die();
                        monsters.splice(temp,1);
                    }
                }
            }
        }
        //same for loop for fighters but instead for monsters
        for(m in monsters){
            var temp = Math.floor(Math.random() * fighters.length);
            if(!fighters[temp].is_magic){
                fighters[temp].hp -= monsters[m].attack_bonus;
                if(fighters[temp].hp <= 0){
                    fighters.splice(temp,1);
                }
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
