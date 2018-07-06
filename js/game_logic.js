var number_of_clicks = 0;

var engaged = true;

var invasion_progress = 0;

var under_siege = false;

var follower_resource = 10;

var current_town = 4;

var  invasion_rate = 1;

var towns = [
    new Town("Safety", 95, false),
    new Town("Concern", 80, false),
    new Town("Worry", 60, false),
    new Town("Panic", 40, false),
    new Town("Doom", 20, true)
]



function fight(player, monsters){
    number_of_clicks++;
    var rand = Math.floor(Math.random(0, monsters.length));
    if (monsters[rand].present) {
        monsters[rand].hp--;
        monsters[rand].attack(player);
        if (monsters[rand].hp < 1) {
            monsters[rand].die(monsters[rand]);
            player.gain_experience(1);
            player.gain_resources(monsters[rand].loot);
            setTimeout( replace_monster(monsters[rand], player.level - 1)
                , 500);
            invasion_progress -=3;
            }
    }

    update_ui(player, monsters[rand]);

};
function rest(player, monsters){
    number_of_clicks++;
    player.heal();
    for(var i = 0; i < monsters.length; i++)
    {
        monsters[i].heal();
    }
    update_ui(player, monsters[0]);

    invasion_progress += 2;
}
function engage(player, monsters){
    number_of_clicks++;
    engaged = true;
    update_ui(player, monsters[0])
};
function disengage(player, monsters){

    number_of_clicks++;
    if (monsters[0].present) {
        monsters[0].attack(player);
    } 
    if (! under_siege) {
        engaged = false;
        player.deposit_resources(follower);
    }
    else {
        towns[current_town].destroyed = true;
        current_town -= 1;
        engaged = false;
        under_siege = false;
    }

    update_ui(player, monsters[0]);

};

function replace_monster(monster, challenge_level){
    console.log(monsters[0]);
    monsters[0].replace(challenge_level);
    console.log(monsters[0]);
}

function change_rate(monsters){
    invasion_rate = monsters.length/5;
}