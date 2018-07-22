function Followers(){
    this.follower_resource = 0;

    this.meat_processors = 0;
    this.meat_progress = 0;
    this.meat_complete = 10;
    this.can_hire_meat_processors = false;

    this.claws_processors = 0;
    this.claws_progress = 0;
    this.claws_complete = 20;
    this.can_hire_claws_processors = false;
    
    this.scales_processors = 0;
    this.scales_progress = 0;
    this.scales_complete = 20;
    this.can_hire_scales_processors = false;

    this.miners = 0;
    this.ore_progress = 0;
    this.ore_complete = 20;
    this.can_hire_miners = false;

    this.ore_processors = 0;
    this.ore_progress = 0;
    this.ore_complete = 20;
    this.can_hire_ore_processors = false;

    this.fighters = 3;
    this.can_hire_fighters = false;
    this.magic_users = 0;
    this.can_hire_magic_users = false;

    this.fighter_cost = 5;
    this.magic_user_cost = 5;

    //Update function for the followers. Use this function for updates when calling from outside. 
    this.followers_act = function (game){
        this.processors_act(game); //Processes claws, scales, meat...
        this.miners_act(game);
    }


    //A function to Hire Followers into different jobs. Use this function for hiring. 
    this.hire = function(job, number_to_hire){
        if (number_to_hire <= this.follower_resource) {
            this.follower_resource -= number_to_hire;
            this[job] += number_to_hire;
            }
        else {
            console.log("Not enough followers");
        }
    console.log("hire was called")
    }

    this.hire_fighter = function(number_to_hire, game){
        if (number_to_hire*this.fighter_cost <= this.follower_resource) {
            this.follower_resource -= number_to_hire*this.fighter_cost;
            this.fighters += number_to_hire;
            game.fighters.push(new Fighter( "Knight", 500, 20, false));
            }
        else {
            console.log("Not enough followers");
        }
    }
    this.hire_magic_user = function(number_to_hire, game){
        if (number_to_hire*this.magic_user_cost <= this.follower_resource) {
            this.follower_resource -= number_to_hire*this.magic_user_cost;
            this.magic_users += number_to_hire;
            game.fighters.push(new Fighter( "Mage",500,100,true));
            }
        else {
            console.log("Not enough followers");
        }
    }

    this.processors_act = function(game){
    this.processors_act = function(){
        var raw_goods = ["meat", "scales", "claws", "ore"];
        var fin_goods = ["fiber", "metal", "gelatin", "crystals"];
        for (g in raw_goods){
            if (this[raw_goods[g] + "_processors"] > 0 && game.player_inventory[raw_goods[g]] > 0){
                this[raw_goods[g] +"_progress"] = this[raw_goods[g]+"_processors"] + this[raw_goods[g]+"_progress"];
                if (this[raw_goods[g]+"_progress"] >= this[raw_goods[g]+"_complete"]){
                    game.player_inventory.increment([fin_goods[g]],1);
                    game.player_inventory.decrement([raw_goods[g]],1);
                    this[raw_goods[g]+"_progress"]=0;
                }
            }
        }
    }


    this.miners_act = function() {
        this[ore] += 2;
    }

}
}
