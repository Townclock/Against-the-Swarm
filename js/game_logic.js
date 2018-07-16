function gamer(){
    this.number_of_clicks = 0;

    this.engaged = false;

    this.invasion_progress = 0;

    this.under_siege = false;

    this.reclaim_mode = false;

    this.follower_resource = 0;

    this.current_town  = 0;
    this.current_world = 0;

    this.invasion_rate = 0;

    this.current_monster = null;
    this.current_fighter = null;

    this.time_elapsed  = 0;
    this.spawn_time = 1;

    //this.monster = new Monster("zerg",5,20);
    this.monsters = [new Monster("zerg", 50, 10)];

    this.fighters = [new Fighter( "hero 1", 1100, 50),
                        new Fighter( "hero 2", 1200, 50),
                        new Fighter( "hero 3", 1000, 50)];

    this.player_inventory = new Player_Inventory;

    this.followers = new Followers();
    this.technology_list_html = "";

    this.technology = [
       new Technology("Can Hire Meat", true, 0, 0, 0, [], console.log("")),
       new Technology("Can Hire Claws", true, 0, 0, 0, [], console.log("")),
       new Technology("Can Hire Scales", false, 10, 0, 10, [], console.log("")),
       new Technology("Can Hire Miners", false, 20, 50, 20, ["Can Hire Scales"], console.log("")),
       new Technology("Can Hire Crysal", false, 10, 0, 10, ["Can Hire Miners"], console.log("")),
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



}
gamer.prototype.change_town = function(){
	if(this.current_town == 4){
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

gamer.prototype.multi_fight = function(){
    if (this.monsters.length == 0 && !this.under_siege){ 
        this.invasion_progress-= 1;

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
    else {
        if(this.under_siege){
            this.followers.act;
            this.increment_follower_resource(1);
        }
        if(this.fighters.length != 0 && this.monsters.length != 0){
            for(f in this.fighters){

                //checking to see if fighter is a spell caster
                if(this.fighters[f].is_magic && this.fighters[f].charge != 2)
                    this.fighters[f].charge ++;

                else{
                    //finds random monster. If random monster is already dead, searches for new one
                    var temp = Math.floor(Math.random() * this.monsters.length);
                
                    //remove hp from monster and check if monster is dead or not.
                    this.monsters[temp].hp -= this.fighters[f].atk;
                    if(this.fighters[f].is_magic){
                        this.monsters[temp].hp -= this.fighters[f].atk_bonus;
                        this.fighters[f].charge = 0;
                    }
                    if(this.monsters[temp].hp <= 0){
                        this.monsters[temp].die(this);
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

gamer.prototype.rest = function(){
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
gamer.prototype.engage = function(){
    this.number_of_clicks++;
    this.engaged = true;
};
gamer.prototype.disengage = function(){

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

gamer.prototype.change_invasion_rate = function(){
    this.invasion_rate = this.monsters.length/5;
}

gamer.prototype.increment_follower_resource = function(){
    this.follower_resource += (5 - this.current_town);
}

gamer.prototype.reclaim = function(){
    if (this.current_town > 0 && this.reclaim_mode == false) {
        if (this.invasion_progress < this.towns[this.current_town - 1].location) {
            this.reclaim_mode = true;
            while (this.monsters.length > 0) {this.monsters.pop();}
            this.monsters.push( new Monster("protoss",5,40) );
            this.engaged = true;
        }
    }
};

gamer.prototype.hire_mage = function(follower){
    if(this.player_inventory.meat > this.followers.mage_cost[0]){
        this.player_inventory.meat-=50;
        this.fighters.push(new Fighter( "Mage",500,50,true));

    }
    else{
        alert('not enough materials');
    }

}
