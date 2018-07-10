function Monster (monster_name, health) {
    this.monster_name = monster_name;
    this.hp = health;
    this.max_hp = health;
    this.attack_bonus = 1;
    this.armor = 0;
    this.loot = [];
    this.present = true;
}

Monster.prototype.replace = function (challenge_level) {
    this.hp = 5;
    this.max_hp = 5;
    this.attack_bonus = 1;
    this.armor = 0;
    this.loot = [];
    var ability_pool = Math.floor(Math.pow(1.5, challenge_level));
    while (ability_pool > 0){
        var selection = Math.floor(Math.random() * 5);
        switch(selection){
            case 0:
                this.attack_bonus += 2;
                this.loot.push({description: "claws", process_time: 0, max_process_time: 200, value: 300});
                break;
            case 1:
                this.armor += 1;
                this.loot.push({description: "scales", process_time: 0, max_process_time: 100, value: 200});
                break;
            default:
                this.hp += 5;
                this.max_hp+= 5;
                this.loot.push({description: "meat", process_time: 0, max_process_time: 50, value: 100});
                break;

        }
        ability_pool--;
    }

    this.present = true;
   
}


Monster.prototype.respawn = function(monster){
        monster.hp = 5;
        monster.present = true;
}
Monster.prototype.die = function(monster){
        this.present = false;
}
Monster.prototype.attack = function(player){
        player.hp -= this.attack_bonus;
        if (player.hp < 1) {
            alert("player is dead");
            window.location.reload(false);
            }
}
Monster.prototype.heal = function(){
        this.hp = this.max_hp;
}
