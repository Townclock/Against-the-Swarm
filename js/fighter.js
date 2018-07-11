function Fighter(player, fname, health, attack){
    this.fighter_name = fname;
    this.hp     =       health;
    this.max_hp =       health;
    this.atk    =       attack;
}

Fighter.prototype.hp_in_percent = function(){
    return ((this.hp / this.max_hp) *100) + "%";
}

