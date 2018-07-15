function Player_Inventory(){
    // unprocessed items
    this.meat= 0;
    this.scales= 0;
    this.claws= 0;
    this.ore = 100;

    //processed items
    this.fiber= 0;
    this.metal= 0;
    this.gelatin= 0;
    this.crystals = 0;

}
Player_Inventory.prototype.increment = function(item, amount){
    this[item] += amount;
}
Player_Inventory.prototype.decrement = function(item, amount){
    this[item] -= amount;
}
Player_Inventory.prototype.get = function(item){
    return this[item];
}
Player_Inventory.prototype.set = function(item, amount){
    this[item] = amount;
}

