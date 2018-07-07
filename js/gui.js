function update_value_by_id(id, value){
    document.getElementById(id).innerHTML = value;
}

function update_bar_by_id(id, current, max){
    var h_width = 100 * (current / max) + "%";
    document.getElementById(id).style.width = h_width;
}

function update_ui(player, monster){
    update_value_by_id("player_level", player.level);
    
    update_value_by_id("technology_list", technology_list_html);


    update_value_by_id("number_of_processors", player.processors);
    update_value_by_id("player_money", player.money);

    var resources = ["meat", "scales", "claws", "fiber", "metal", "gelatin"];
    for (i in resources){
        update_value_by_id(resources[i], player_inventory[resources[i]]);
    }

    update_bar_by_id("player_health", player.hp, player.max_hp);
    update_bar_by_id("player_experience", player.experience, player.experience_until_level);
    update_value_by_id("follower_resource", follower_resource);



    document.getElementById('currentTown').innerHTML = world[current_world][current_town].town_name;



    update_value_by_id('exp_counter',  player.experience);
    update_value_by_id('exp_until_level',  player.experience_until_level);
    

    update_bar_by_id("invasion", invasion_progress, 100);

    update_bar_by_id("monster_health", monster.hp, monster.max_hp);
    
    
    if (monster.present){
        document.getElementsByClassName('monster')[0].style.visibility = "visible";
        document.getElementById('monster_health_bar').style.visibility = "visible";
    }
    else {
        document.getElementsByClassName('monster')[0].style.visibility = "hidden";
        document.getElementById('monster_health_bar').style.visibility = "hidden";
    }
    
    if (! under_siege){
        for (i in document.getElementsByClassName('combat_button')) {
            document.getElementsByClassName('combat_button')[i].disabled = !engaged;
        }
        for (i in document.getElementsByClassName('town_button')) {
            document.getElementsByClassName('town_button')[i].disabled = engaged;
        }
    }
    else {
        for (i in document.getElementsByClassName('combat_button')) {
            document.getElementsByClassName('combat_button')[i].disabled = false;
        }
        for (i in document.getElementsByClassName('town_button')) {
            document.getElementsByClassName('town_button')[i].disabled = true;
        }
    }

    if (player.processor_queue.length > 0){
        var unit = player.processor_queue[0];

        update_bar_by_id(processpr_bar, unit.process_time, unit.max_process_time);

    } 
    else{
        document.getElementById('processor_bar').style.width = 0;
    }

    //if (invasion_progress >= 100){
    //   alert("you did not stop the invasion");
    //    window.location.reload(false);
    //}

    var width_scalar = document.getElementById("towns").offsetWidth;
    
    var towns_status = ""
    for (x in towns){
    if (! towns[x].destroyed) {
        towns_status += ('<div class="safe_town" style="left:' + (95-towns[x].location)/100 * width_scalar + 'px"></div>');
    } 
        else {
            towns_status += ('<div class="destroyed_town" style="left:' + (95 - towns[x].location)/100 * width_scalar + 'px"></div>');
        }
    }
    document.getElementById("towns").innerHTML = towns_status;

}
