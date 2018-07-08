function Technology(description, researchable, researched) {
	this.description = "";
	this.researchable = false;
	this.researched = false; 
	this.items = [];
	
}

Technology.prototype.unlock = function(technology) {
	technology.researched = true;
}


