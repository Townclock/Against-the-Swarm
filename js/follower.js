function Follower(player){
    this.owner = player;
    this.followers = 0;
    this.processors = 50;
    this.processor_queue = [];

    this.deposit_resources = function(resources){
        this.processor_queue = this.processor_queue.concat(resources);
    }

    this.followers_act = function (){
        if (this.processor_queue.length > 0){
        this.processor_queue[0].process_time += this.processors;
            if  (this.processor_queue[0].process_time >= this.processor_queue[0].max_process_time){
                this.owner.gain_money(this.processor_queue[0].value);
                this.processor_queue.shift();
            }
        }
    }
    this.pay_followers = function(){
        this.owner.money -= this.processors;
    }
}

function Fighter(player, fname, health, attack){
    this.owner  =       player;
    this.fighter_name = fname;
    this.hp     =       health;
    this.max_hp =       health;
    this.atk    =       attack;

}

