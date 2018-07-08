var number_of_clicks = 0;

var engaged = true;

var invasion_progress = 0;

var under_siege = false;

var current_town = 4;

var towns = [
    new Town("Safety", 95, false),
    new Town("Concern", 80, false),
    new Town("Worry", 60, false),
    new Town("Panic", 40, false),
    new Town("Doom", 20, true)
]

var technology_list_html = "";

var technology = [
   new Technology("Researched", true, true),
   new Technology("Unresearched", true, false),
   new Technology("Unresearchable", false, false)
]

var tech_placeholders = [
   {description: "Researched Tech", can_be_researched: true, has_been_researched: true},
   {description: "Unresearched Tech, Cost: ?", can_be_researched: true, has_been_researched: false},
   {description: "Unresearchable Tech", can_be_researched: false, has_been_researched: false},
];

   for (i in tech_placeholders){
       if (tech_placeholders[i].has_been_researched){
           technology_list_html += ("<p>" + tech_placeholders[i].description + "</p>");
       }
   }
   technology_list_html += "<hr>";
   for (i in tech_placeholders){
       if (!tech_placeholders[i].has_been_researched && tech_placeholders[i].can_be_researched){
           technology_list_html += ("<p>" + tech_placeholders[i].description + "</p>");
       }
   }

function fight(player, monster){
    number_of_clicks++;
    if (monster.present) {
        monster.hp--;
        monster.attack(player);
        if (monster.hp < 1) {
            monster.die(monster);
            player.gain_experience(1);
            player.gain_resources(monster.loot);
            setTimeout( replace_monster(monster, player.level - 1)
                , 500);
            invasion_progress -=3;
            }
    }

    update_ui(player, monster);
};
function rest(player, monster){
    number_of_clicks++;
    player.heal();
    monster.heal();
    update_ui(player, monster);
    invasion_progress += 2;
}
function engage(player, monster){
    number_of_clicks++;
    engaged = true;
    update_ui(player, monster)
};
function disengage(player, monster){
    number_of_clicks++;
    if (monster.present) {
        monster.attack(player);
    } 
    if (! under_siege) {
        engaged = false;
        player.deposit_resources();
    }
    else {
        towns[current_town].destroyed = true;
        current_town -= 1;
        engaged = false;
        under_siege = false;
    }

    update_ui(player, monster);
};

function replace_monster(monster, challenge_level){
    console.log(monster);
    monster.replace(challenge_level);
    console.log(monster);
}
