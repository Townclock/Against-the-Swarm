function Monster (monster_name, health, attack, armor) {
    this.monster_name = monster_name;
    this.hp = health;
    this.max_hp = health;
    this.attack_bonus = attack;
    this.armor = 0;
    this.loot = {meat:5, scales:5, claws:1};
    this.present = true;
}

Monster.prototype.hp_in_percent = function(){
    return ((this.hp / this.max_hp) *100) + "%";
}


Monster.prototype.respawn = function(monster){
        monster.hp = 5;
        monster.present = true;
}
Monster.prototype.die = function(){
    game.player_inventory.increment("meat", this.loot.meat);
    game.player_inventory.increment("scales", this.loot.scales);
    game.player_inventory.increment("claws", this.loot.claws);
    console.log(game.player_inventory);
//invasion_progress--;
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
