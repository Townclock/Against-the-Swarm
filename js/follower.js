function Follower(player){
    this.owner = player;
    //Follower Resource
    this.followers = 0;

    //Will be scrapped, there will be three different types of processors.
    this.processors = 20;
    this.processor_queue = [];

    //New variables of different jobs
    this.meat_processors = 0;
    this.meat_processor_queue = [];
    this.claw_processors = 0;
    this.claw_processor_queue = [];
    this.scale_processors = 0;
    this.scale_processor_queue = [];

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

    this.pay_followers = function(){
        this.owner.money -= this.processors;
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
        if (this.processor_queue.length > 0){
        this.processor_queue[0].process_time += this.processors;
            if  (this.processor_queue[0].process_time >= this.processor_queue[0].max_process_time){
                this.owner.gain_money(this.processor_queue[0].value);
                this.processor_queue.shift();
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

//Enum for different kinds of jobs that Followers can be hired to. 
var Job = {
    MEAT_PROCESSOR: 1,
    CLAW_PROCESSOR: 2,
    SCALE_PROCESSOR: 3,
    FIGHTER: 4,
    MINER: 5,
    RESEARCHERS: 6,
    TELEPORTERS: 7
};
