function Fighter( fname, health, attack, is_magic){
    this.fighter_name = fname;
    this.hp     =       health;
    this.max_hp =       health;
    this.atk    =       attack;
    this.is_magic =     is_magic;
}

Fighter.prototype.hp_in_percent = function(){
    return ((this.hp / this.max_hp) *100) + "%";
}

