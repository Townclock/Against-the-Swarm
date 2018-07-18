function Party() {

    this.miner_count = 0;
	this.fighter_count = 0;

	this.add_miners = function(followers) {
		if(followers.miners > 0){
			followers.miners--;
			this.miner_count++;
		}
	}
	this.sub_miners = function(followers) {
		if(this.miner_count > 0){
			followers.miners++;
			this.miner_count--;
		}
	}
}