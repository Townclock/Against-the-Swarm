function Followers(player){

    //New variables of different jobs
    this.meat_processors = 1;
    this.claws_processors = 0;
    this.scale_processors = 0;

    this.meat_processors = 0;
    this.meat_progress = 0;
    this.meat_complete = 100;

    this.claws_processors = 0;
    this.claws_progress = 0;
    this.claws_complete = 100;
    
    this.scales_processors = 0;
    this.scales_progress = 0;
    this.scales_complete = 100;

    this.fighters = 0;
    this.miners = 0;
    this.researchers = 0;
    this.teleporters = 0;

    this.deposit_resources = function(resources){
        this.processor_queue = this.processor_queue.concat(resources);
    }

    //Update function for the followers. Use this function for updates when calling from outside. 
    this.followers_act = function (){
        this.processors_act(); //Processes claws, scales, meat...
        this.fighters_act();
        this.miners_act();
        this.researchers_act();
        this.teleporters_act();
    }

    //A function to Hire Followers into different jobs. Use this function for hiring.
    this.pay_followers = function(){
        this.owner.money -= this.processors;
    }

    //A function to Hire Followers into different jobs. Use this function for hiring. 
    this.hire = function(job, number_to_hire){
        if (number_to_hire <= follower_resource) {
            follower_resource -= number_to_hire;
            this[job] += number_to_hire;
            }
        else {
            console.log("Not enough followers");
        }
    }

    this.processors_act = function(){
        var raw_goods = ["meat", "scales", "claws"];
        var fin_goods = ["fiber", "metal", "gelatin"];
        for (g in raw_goods){
            if (this[raw_goods[g] + "_processors"] > 0){
                this[raw_goods[g] +"_progress"] = 10 + this[raw_goods[g]+"_progress"];
                if (this[raw_goods[g]+"_progress"] >= this[raw_goods[g]+"_complete"]){
                    player_inventory.increment([fin_goods[g]],player_inventory[raw_goods[g]]);
                    player_inventory.decrement([raw_goods[g]],player_inventory[raw_goods[g]]);
                }
            }
        }
    }
    this.fighters_act = function(){
        //Write what fighter does
    }

    this.miners_act = function() {
        //Write what miner does
    }

    this.fighters_act = function(){
        //Write what fighter does
    }

    this.miners_act = function() {
        //Write what miner does
    }

    this.researchers_act = function() {
        //Write what researcher does
    }

    this.teleporters_act = function() {
        //Write what teleporter does. Might not need this function at all.
    }

}
