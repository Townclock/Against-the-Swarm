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
    this.monsters = [/* new Monster("Beetle", 500, 1, 19) */];
    this.fighters = [
        new Fighter( "hero 1", 100, 20),
        new Fighter( "hero 1", 100, 20),
        new Fighter( "hero 1", 100, 20),
        ];


    this.player_inventory = new Player_Inventory;

    this.followers = new Followers();
    this.party = new Party();
    this.technology_list_html = "";

    this.technology = [
        new Technology("Meat Cutters","Description 1", false, 0, 0, 0, [], function(){
            game.followers.can_hire_meat_processors = true;
            alert("You can now hire Meat Cutters in the Town Panel.")
        }),
        new Technology("Scale Forgers","Description 2", false, 10, 0, 0, ["Meat Cutters"], function(){
            game.followers.can_hire_scales_processors = true;
            alert("You can now hire Scale Forgers in the Town Panel.")
        }),
        new Technology("Claw Grinders","Description 3", false, 20, 10, 0, ["Meat Cutters", "Scale Forgers"], function(){
            game.followers.can_hire_claws_processors = true;
            alert("You can now hire Claw Grinders in the Town Panel.")
        }),
        new Technology("Fighters","Description 4", false, 10, 20, 5, ["Meat Cutters", "Scale Forgers", "Claw Grinders"], function(){
            game.followers.can_hire_fighters = true;
            alert("You can now hire Fighter in the Town Panel.")
        }),
        new Technology("Miners","Description 5", false, 10, 40, 15, ["Meat Cutters", "Scale Forgers", "Claw Grinders"], function(){
            game.followers.can_hire_miners = true;
            alert("You can now hire Miners in the Town Panel.")
        }),

       new Technology("Can Hire Crysal","", false, 40, 20, 80, ["Can Hire Miners"], function(){
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
        var modal = document.getElementById('teleport_box');
        modal_open = true;
        modal.style.display = "block";
		this.world.push( [new Town("test",  20,  false),
			     new Town("test2", 40,  false),
			     new Town("test3", 60,  false),
			     new Town("test4", 80,  false),
			     new Town("test5", 100, false)]);
		this.current_world++;
		this.current_town = 0;
		this.invasion_progress = 0;
	    while(this.monsters.length > 0)
            this.monsters.pop();
        this.towns = this.world[this.current_world];
    }
	else{
		this.current_town++;
	}
	this.player_location = this.world[this.current_world][this.current_town].location;

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
            this.monsters.push(new Monster("boss", 1000,10, 1));
        }

        //if you made it to the beginning of the previous world, shift to the next world
        if(this.current_town == 0 && this.invasion_progress <= 0){
            if(this.current_world == 0)
            {
                this.game_over();
            }
            else
            {
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
    }
    else {
        if(this.under_siege){
            this.followers.act;
            this.increment_follower_resource(1);
        }
        if(this.fighters.length != 0 && this.monsters.length != 0){
            for(f in this.fighters){


                //checking to see if fighter is a spell caster
                if(this.fighters[f].is_magic && this.fighters[f].charge <= 2)
                    this.fighters[f].charge ++;

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

            //same for loop for fighters but instead for monsters
            for(m in this.monsters){
                if(this.monsters.length == 0 || this.fighters.length == 0){
                    if (this.reclaim_mode){
                        this.reclaim_mode = false;
                        if (this.monsters.length == 0){
                            this.current_town--;
                            this.player_location = this.world[this.current_world][this.current_town].location;
                            this.invasion_progress -= 10;
                        }
                    }
                    if(this.engaged && this.fighters.length < 1) {this.disengage(this.fighters, this.monsters);}
                    break;
                }

                var temp = Math.floor(Math.random() * this.fighters.length);

                this.fighters[temp].hp -= this.monsters[m].attack_bonus;
                this.fighters[temp].charge = 0;

                if(this.fighters[temp].hp <= 0){
                    this.tracker.update(this.fighters[temp].fighter_name);
                    this.fighters.splice(temp,1);
                }
            }
        }
        //if you have beat the boss while trying to reclaim town
        if(this.monsters.length == 0 || this.fighters.length == 0){
            if (this.reclaim_mode){
                this.reclaim_mode = false;
                this.engaged = false;
                if (this.monsters.length == 0){
                    this.current_town--;
                    this.player_location = this.world[this.current_world][this.current_town].location;
                    this.invasion_progress -= 10;
                }
            }
            //if(engaged && fighters.length < 1) {disengage(fighters, monsters);}
        }
    }
}

Game.prototype.rest = function(){
    this.number_of_clicks++;

    for(f in this.fighters){
        this.fighters[f].hp = this.fighters[f].max_hp;
    }
    for(var i = 0; i < this.monsters.length; i++)
    {
        this.monsters[i].heal();
    }


    this.invasion_progress += 2;
}
Game.prototype.engage = function(){
    this.number_of_clicks++;
    this.engaged = true;
};
Game.prototype.disengage = function(){

    this.number_of_clicks++;
    if(this.reclaim_mode){
        this.monsters.pop();
    }
    this.reclaim_mode = false;

    // monsters make retreat attack
    for(m in this.monsters){
        if(this.monsters.length == 0 || this.fighters.length == 0)
            break;

        var temp = Math.floor(Math.random() * this.fighters.length);

        this.fighters[temp].hp -= this.monsters[m].attack_bonus;
        this.fighters[temp].charge = 0;

        if(this.fighters[temp].hp < 0){
            this.fighters.splice(temp,1);
        }
    
            
    }

    console.log(this.under_siege);
    //check whether town is in siege or not
    if (! this.under_siege || this.reclaim_mode) {
        this.engaged = false;
    }
    else {
        this.towns[this.current_town].destroyed = true;
        this.engaged = false;
        this.under_siege = false;
	    this.change_town();
    }


};

function replace_monster(monster, challenge_level){
    console.log(monsters[0]);
    monsters[0].replace(challenge_level);
    console.log(monsters[0]);
}

Game.prototype.change_invasion_rate = function(){
    this.invasion_rate = this.monsters.length/5;
}

Game.prototype.increment_follower_resource = function(){
    this.followers.follower_resource += (5 - this.current_town)/10;
}

Game.prototype.reclaim = function(){
    if (this.current_town > 0 && this.reclaim_mode == false) {
        if (this.invasion_progress < this.towns[this.current_town - 1].location) {
            this.reclaim_mode = true;
            while (this.monsters.length > 0) {this.monsters.pop();}
            this.monsters.push( new Monster("protoss",5,40) );
            this.engaged = true;
        }
    }
};



Game.prototype.guard = function(){
    fighters = this.fighters;
    monsters = this.monsters;
    
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
                if (fighters[f].charge < 3){
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

Game.prototype.game_over = function(){
        var modal = document.getElementById('game_over_screen');
        modal_open = true;
        modal.style.display = "block";
}