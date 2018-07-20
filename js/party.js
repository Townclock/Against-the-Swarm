function Party() {

	var skip_increment = 5;
	this.meat_processor_count = 0;
	this.claws_processor_count = 0;
	this.scales_processor_count = 0;
	this.ore_processor_count = 0;
	this.miner_count = 0;
	this.fighter_count = 0;
	
	this.add_meat_processor = function(followers) {
		if(followers.meat_processors > 0){
			followers.meat_processors--;
			this.meat_processor_count++;
		}
	}
	this.sub_meat_processor = function(followers) {
		if(this.meat_processor_count > 0){
			followers.meat_processors++;
			this.meat_processor_count--;
		}
	}
	this.add_meat_processors = function(followers) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.add_meat_processor(followers);
		}
	}
	this.sub_meat_processors = function(followers) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.sub_meat_processor(followers);
		}
	}
	
	this.add_claws_processor = function(followers) {
		if(followers.claws_processors > 0){
			followers.claws_processors--;
			this.claws_processor_count++;
		}
	}
	this.sub_claws_processor = function(followers) {
		if(this.claws_processor_count > 0){
			followers.claws_processors++;
			this.claws_processor_count--;
		}
	}
	this.add_claws_processors = function(followers) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.add_claws_processor(followers);
		}
	}
	this.sub_claws_processors = function(followers) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.sub_claws_processor(followers);
		}
	}

	this.add_scales_processor = function(followers) {
		if(followers.scales_processors > 0){
			followers.scales_processors--;
			this.scales_processor_count++;
		}
	}
	this.sub_scales_processor = function(followers) {
		if(this.scales_processor_count > 0){
			followers.scales_processors++;
			this.scales_processor_count--;
		}
	}
	this.add_scales_processors = function(followers) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.add_scales_processor(followers);
		}
	}
	this.sub_scales_processors = function(followers) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.sub_scales_processor(followers);
		}
	}

	this.add_ore_processor = function(followers) {
		if(followers.ore_processors > 0){
			followers.ore_processors--;
			this.ore_processor_count++;
		}
	}
	this.sub_ore_processor = function(followers) {
		if(this.ore_processor_count > 0){
			followers.ore_processors++;
			this.ore_processor_count--;
		}
	}
	this.add_ore_processors = function(followers) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.add_ore_processor(followers);
		}
	}
	this.sub_ore_processors = function(followers) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.sub_ore_processor(followers);
		}
	}

	this.add_miner = function(followers) {
		if(followers.miners > 0){
			followers.miners--;
			this.miner_count++;
		}
	}
	this.sub_miner = function(followers) {
		if(this.miner_count > 0){
			followers.miners++;
			this.miner_count--;
		}
	}
	this.add_miners = function(followers) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.add_miner(followers);
		}
	}
	this.sub_miners = function(followers) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.sub_miner(followers);
		}
	}

}