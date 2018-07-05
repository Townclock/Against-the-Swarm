function Player(){
    this.hp = 10;
    this.max_hp = 10;
    this.level = 1; 
    this.experience = 0;
    this.experience_until_level = 1;
    this.experience_last_level = 0;
    this.money = 0;

    //followers
    this.processors = 3;


    this.held_resources = [];
    this.processor_queue = [];

    this.heal = function(){
        this.hp = this.max_hp;
    }

    this.level_up = function(){
            this.level++;
            this.max_hp = player.max_hp * 2;
            this.hp += player.max_hp / 5;
    }
    this.gain_money = function(gain){
        this.money += gain;
    }

    this.gain_resources = function(resources){
        this.held_resources = this.held_resources.concat(resources);
    }

    this.deposit_resources = function(follower){
        follower.deposit_resources(this.held_resources);
        this.held_resources = [];
    }

    this.gain_experience = function(gain){
        this.experience += gain;
        while (this.experience >= this.experience_until_level){
            this.experience_last_level = player.experience_until_level;
            this.experience_until_level = player.experience_until_level * 2;
            this.level_up();
        }
    }
}
