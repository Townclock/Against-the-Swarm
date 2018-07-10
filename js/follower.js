function Follower(player){
    this.owner = player;
    //Follower Resource
    this.followers = 0;

    //Will be scrapped, there will be three different types of processors.
    this.processors = 20;
    this.processor_queue = [];

    //New variables of different jobs
    this.meat_processors = 1;
    this.claw_processors = 0;
    this.scale_processors = 0;

    this.fighters = 0;
    this.miners = 0;
    this.researchers = 0;
    this.teleporters = 0;


    //Update function for the followers. Use this function for updates when calling from outside.
    this.followers_act = function (){
        this.processors_act(); //Processes claws, scales, meat...
        this.fighters_act();
        this.miners_act();
        this.researchers_act();
        this.teleporters_act();
    }

    //A function to Hire Followers into different jobs. Use this function for hiring.
    this.hire = function(job, number_to_hire){
        if (number_to_hire <= this.followers) {
            this.followers -= number_to_hire;
            switch (job) {
                case Job.MEAT_PROCESSOR:
                    this.meat_processors += number_to_hire;
                case Job.CLAW_PROCESSOR:
                    this.claw_processors += number_to_hire;
                case Job.SCALE_PROCESSOR:
                    this.scale_processors += number_to_hire;
                case Job.FIGHTER:
                    this.fighters += number_to_hire;
                case Job.MINER:
                    this.miners += number_to_hire;
                case Job.RESEARCHERS:
                    this.researchers += number_to_hire;
                case Job.TELEPORTERS:
                    this.teleporters += number_to_hire;
            }
        }
        else {
            console.log("Not enough followers");
        }
    }

    this.processors_act = function(){
        var raw_goods = ["meat", "scales", "claws"];
        var fin_goods = ["fiber", metal, "gelatin"];
        for (g in raw_goods){
            if (this[raw_goods[g] + "_processors"] > 0){
                player_inventory.increment([fin_goods[g]],player_inventory[raw_goods[g]]);
                player_inventory.decrement([raw_goods[g]],player_inventory[raw_goods[g]]);
            }
        }
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

function Fighter(player, fname, health, attack){
    this.owner  =       player;
    this.fighter_name = fname;
    this.hp     =       health;
    this.max_hp =       health;
    this.atk    =       attack;

}

