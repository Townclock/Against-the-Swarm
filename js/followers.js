function Followers(){


    this.follower_resource = 0;
    //New variables of different jobs
    this.meat_processors = 50;
    this.claws_processors = 0;
    this.scale_processors = 0;

    this.meat_processors = 50;
    this.meat_progress = 0;
    this.meat_complete = 100;

    this.claws_processors = 50;
    this.claws_progress = 0;
    this.claws_complete = 100;
    
    this.scales_processors = 50;
    this.scales_progress = 0;
    this.scales_complete = 100;

    this.miners = 50;
    this.ore_progress = 0;
    this.ore_complete = 100;

    this.ore_processors = 50;
    this.ore_progress = 0;
    this.ore_complete = 100;

    this.fighters = 0;

    this.mage_cost = [50,0,0,0,0,0];

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

    this.researchers_act = function() {
        //Write what researcher does
    }
}
}
