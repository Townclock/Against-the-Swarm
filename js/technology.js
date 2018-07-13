function Technology(description,
                    can_be_researched,
                    has_been_researched,
                    fiber_cost,
                    metal_cost,
                    gelatin_cost,
                    prerequisites,
                    operation) {
	this.description = description;
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
	technology.researched = true;
   }


function create_technology_html(technology, technology_list_html){
   for (i in technology){
       if (technology[i].has_been_researched){
           technology_list_html += ("<p>" + technology[i].description + "</p>");
       }
   }
   technology_list_html += "<hr>";
   for (i in technology){
       if (!technology[i].has_been_researched && technology[i].can_be_researched){
           technology_list_html += ("<p>" + technology[i].description + "</p>");
       }
   }
   return technology_list_html;
}
