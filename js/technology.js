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
	  console.log("tech cost default");
	}

}

Technology.prototype.unlock_tech = function(techs, player_inventory){
    if(player_inventory.fiber >= this.cost.fiber && player_inventory.metal >= this.cost.metal && player_inventory.gelatin >= this.cost.gelatin){
        player_inventory.decrement("fiber", this.cost.fiber);
        player_inventory.decrement("metal", this.cost.metal);
        player_inventory.decrement("gelatin", this.cost.gelatin);
        this.unlock();
        console.log(this.cost.gelatin);
    }else {
        alert(this.cost.fiber + " fibers prerequisites not met.");
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
      return 'red';
  }else
      return 'blue';
}
