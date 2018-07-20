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
	this.items = [];
	this.cost = {fiber: fiber_cost, metal: metal_cost, gelatin: gelatin_cost};

    this.prerequisites = prerequisites;

    this.operation = operation;



	if(this.cost.gelatin_cost === undefined){
	  this.cost = {fiber: 0, metal: 0, gelatin: 0};
	}

};

Technology.prototype.unlock = function(technology){
	technology.has_been_researched = true;
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
