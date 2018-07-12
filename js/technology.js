function Technology(description, can_be_researched, has_been_researched, fiber_cost, metal_cost, gelatin_cost) {
	this.description = description;
	this.can_be_researched = can_be_researched;
	this.has_been_researched = has_been_researched;
	this.items = [];
	this.cost = {fiber: fiber_cost, metal: metal_cost, gelatin: gelatin_cost};
	
	if(this.cost.gelatin_cost === undefined){
	  this.cost = {fiber: 0, metal: 0, gelatin: 0};
	}
	
}

Technology.prototype.unlock = function(technology) {
	technology.researched = true;
}


