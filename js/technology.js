function Technology(technology_name,
                    has_been_researched,
                    fiber_cost,
                    metal_cost,
                    gelatin_cost,
                    prerequisites,
                    operation) {
  this.technology_name = technology_name;
  this.can_be_researched = true;
  this.has_been_researched = has_been_researched;
  this.cost = {fiber: fiber_cost, metal: metal_cost, gelatin: gelatin_cost};
  this.prerequisites = prerequisites;
  this.operation = operation;


  if(this.cost.gelatin === undefined){
	  this.cost = {fiber: 0, metal: 0, gelatin: 0};
	}

}

Technology.prototype.unlock_tech = function(techs, player_inventory){
    if(game.player_inventory.fiber >= this.cost.fiber && game.player_inventory.metal >= this.cost.metal && game.player_inventory.gelatin >= this.cost.gelatin){
        game.player_inventory.decrement("fiber", this.cost.fiber);
        game.player_inventory.decrement("metal", this.cost.metal);
        game.player_inventory.decrement("gelatin", this.cost.gelatin);
        this.unlock();
    }else {
        alert("Cost: " + this.cost.fiber + " fiber / " + this.cost.metal + " metal / " + this.cost.gelatin + " gelatin");
    }
   
}

Technology.prototype.unlock = function(){
  this.has_been_researched = true;
  this.operation();
}

Technology.prototype.visible = function(tech_list){
  var visible = 'visible';
  this.prerequisites.forEach(function(tech_name) {
    var found = false;
    tech_list.forEach(function(tech) {
      if(tech_name == tech.technology_name)
      {
        found = tech.has_been_researched;
      }

    })
    if(!found) {
       visible = 'hidden';
    }

  })

  return visible;
}

Technology.prototype.is_researched_color = function(){
  if (this.has_been_researched) {
      return 'green';
  }else {
      if(game.player_inventory.fiber >= this.cost.fiber && game.player_inventory.metal >= this.cost.metal && game.player_inventory.gelatin >= this.cost.gelatin) {
          return 'yellow';
      } else{
          return 'red';
      }
  }
}