function Monster (monster_name, health, attack) {
    this.monster_name = monster_name;
    this.hp = health;
    this.max_hp = health;
    this.attack_bonus = attack;
    this.armor = 0;
    this.loot = {meat:1, scales:1, claws:1};
    this.present = true;
}

Monster.prototype.replace = function (challenge_level) {
    this.hp = 5;
    this.max_hp = 5;
    this.attack_bonus = 1;
    this.armor = 0;
    this.loot = {meat:1, scales:1, claws:1};
    var ability_pool = Math.floor(Math.pow(1.5, challenge_level));
    while (ability_pool > 0){
        var selection = Math.floor(Math.random() * 5);
        switch(selection){
            case 0:
                this.attack_bonus += 2;
                break;
            case 1:
                this.armor += 1;
                break;
            default:
                this.hp += 5;
                this.max_hp+= 5;
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
    player_inventory.increment("meat", this.loot.meat);
    player_inventory.increment("scales", this.loot.scales);
    player_inventory.increment("claws", this.loot.claws);
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
