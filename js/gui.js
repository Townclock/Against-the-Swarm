function update_ui(player, monster, follower){
    document.getElementsByClassName('player_level')[0].innerHTML = player.level; 
    document.getElementById('number_of_processors').innerHTML = follower.processors; 
    
    var h_width = 100 * (player.hp / player.max_hp) + "%";
        document.getElementById('player_health').style.width = h_width;
        document.getElementsByClassName('player_money')[0].innerHTML = player.money; 
    
    var h_width = 100 * ( ( player.experience - player.experience_last_level ) 
                    / (player.experience_until_level 
                    - player.experience_last_level ) ) + "%";

    document.getElementsByClassName('exp_counter')[0].innerHTML = player.experience 
                    - player.experience_last_level;
    document.getElementsByClassName('exp_until_level')[0].innerHTML = player.experience_until_level 
                    - player.experience_last_level;
    document.getElementById('player_experience').style.width = h_width;
    
    var h_width = invasion_progress + "%";
        document.getElementById('invasion').style.width = h_width;


    var h_width = 100 * (monster.hp / monster.max_hp) + "%";
    document.getElementById('monster_health').style.width = h_width;
    
    var h_width = 100 * (player.hp / player.max_hp) + "%";
    document.getElementById('player_health').style.width = h_width;
    
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

    if (follower.processor_queue.length > 0){
        var unit = follower.processor_queue[0];
        var h_width = 100 * (unit.process_time / unit.max_process_time) + "%";
        document.getElementById('processor_bar').style.width = h_width;
    } 
    else{
        document.getElementById('processor_bar').style.width = 0;
    }

    if (invasion_progress >= 100){
        alert("you did not stop the invasion");
        window.location.reload(false);
    }

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
