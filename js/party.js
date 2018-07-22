function Party() {

	var skip_increment = 5;
	this.follower_count = 0;
	this.meat_processor_count = 0;
	this.claws_processor_count = 0;
	this.scales_processor_count = 0;
	this.ore_processor_count = 0;
	this.miner_count = 0;
	this.fighter_count = 0;

	this.add_follower = function(followers, player_inventory) {
		if(followers.follower_resource > 0 && player_inventory.crystals > 0){
			followers.follower_resource--;
			this.follower_count++;
			player_inventory.crystals--;
		}

	}
	this.sub_follower = function(followers, player_inventory) {
		if(this.follower_count > 0){
			followers.follower_resource++;
			this.follower_count--;
			player_inventory.crystals--;
		}
	}
	this.add_followers = function(followers, player_inventory) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.add_follower(followers, player_inventory);
		}
	}
	this.sub_followers = function(followers, player_inventory) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.sub_follower(followers, player_inventory);
		}
	}
	
	this.add_meat_processor = function(followers, player_inventory) {
		if(followers.meat_processors > 0){
			followers.meat_processors--;
			this.meat_processor_count++;
			player_inventory.crystals--;
		}
	}
	this.sub_meat_processor = function(followers, player_inventory) {
		if(this.meat_processor_count > 0){
			followers.meat_processors++;
			this.meat_processor_count--;
			player_inventory.crystals++;
		}
	}
	this.add_meat_processors = function(followers, player_inventory) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.add_meat_processor(followers, player_inventory);
		}
	}
	this.sub_meat_processors = function(followers, player_inventory) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.sub_meat_processor(followers, player_inventory);
		}
	}
	
	this.add_claws_processor = function(followers, player_inventory) {
		if(followers.claws_processors > 0){
			followers.claws_processors--;
			this.claws_processor_count++;
			player_inventory.crystals--;
		}
	}
	this.sub_claws_processor = function(followers, player_inventory) {
		if(this.claws_processor_count > 0){
			followers.claws_processors++;
			this.claws_processor_count--;
			player_inventory.crystals++;
		}
	}
	this.add_claws_processors = function(followers, player_inventory) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.add_claws_processor(followers, player_inventory);
		}
	}
	this.sub_claws_processors = function(followers, player_inventory) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.sub_claws_processor(followers, player_inventory);
		}
	}

	this.add_scales_processor = function(followers, player_inventory) {
		if(followers.scales_processors > 0){
			followers.scales_processors--;
			this.scales_processor_count++;
			player_inventory.crystals--;
		}
	}
	this.sub_scales_processor = function(followers, player_inventory) {
		if(this.scales_processor_count > 0){
			followers.scales_processors++;
			this.scales_processor_count--;
			player_inventory.crystals++;
		}
	}
	this.add_scales_processors = function(followers, player_inventory) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.add_scales_processor(followers, player_inventory);
		}
	}
	this.sub_scales_processors = function(followers, player_inventory) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.sub_scales_processor(followers, player_inventory);
		}
	}

	this.add_ore_processor = function(followers, player_inventory) {
		if(followers.ore_processors > 0){
			followers.ore_processors--;
			this.ore_processor_count++;
			player_inventory.crystals--;
		}
	}
	this.sub_ore_processor = function(followers, player_inventory) {
		if(this.ore_processor_count > 0){
			followers.ore_processors++;
			this.ore_processor_count--;
			player_inventory.crystals++;
		}
	}
	this.add_ore_processors = function(followers, player_inventory) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.add_ore_processor(followers, player_inventory);
		}
	}
	this.sub_ore_processors = function(followers, player_inventory) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.sub_ore_processor(followers, player_inventory);
		}
	}

	this.add_miner = function(followers, player_inventory) {
		if(followers.miners > 0 && player_inventory.crystals > 0){
			followers.miners--;
			this.miner_count++;
			player_inventory.crystals--;
		}
	}
	this.sub_miner = function(followers, player_inventory) {
		if(this.miner_count > 0){
			followers.miners++;
			this.miner_count--;
			player_inventory.crystals++;
		}
	}
	this.add_miners = function(followers, player_inventory) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.add_miner(followers, player_inventory);
		}
	}
	this.sub_miners = function(followers, player_inventory) {
		for(var i = 0; i < skip_increment; i++)
		{
			this.sub_miner(followers, player_inventory);
		}
	}

	this.set_party = function(followers) {
		followers.follower_resource = this.follower_count;
		followers.meat_processors = this.meat_processor_count;
		followers.claws_processors = this.claws_processor_count;
		followers.scales_processors = this.scales_processor_count;
		followers.ore_processors = this.ore_processor_count;
		followers.miners = this.miner_count;
	}

	this.reset_counts = function() {
		this.follower_count = 0;
		this.meat_processor_count = 0;
		this.claws_processor_count = 0;
		this.scales_processor_count = 0;
		this.ore_processor_count = 0;
		this.miner_count = 0;
		this.fighter_count = 0;
	}

}