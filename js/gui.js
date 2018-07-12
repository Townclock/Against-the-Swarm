var sliding_panel_offset = -49;

function slide_panel(engaged){
    var width = document.getElementById("town_panel").offsetWidth;
    if ( (sliding_panel_offset > -width) && ( engaged || under_siege)){
        sliding_panel_offset -= 20;
    }
    if ( (sliding_panel_offset < 0) && ! engaged && ! under_siege){
        sliding_panel_offset += 20;
    }
        document.getElementById("panel_track").style.left  = sliding_panel_offset;
}

function update_value_by_id(id, value){
    document.getElementById(id).innerHTML = value;
}

function update_bar_by_id(id, current, max){
    var h_width = 100 * (current / max) + "%";
    document.getElementById(id).style.width = h_width;
}

function update_ui(player, monster){
    document.getElementById("track_container").style.height  = document.getElementById("panel_track").offsetHeight;

    slide_panel(engaged);
    
    update_value_by_id("technology_list", technology_list_html);


    update_value_by_id("number_of_processors", player.processors);

    var resources = ["meat", "scales", "claws", "ore", "fiber", "metal", "gelatin", "crystals"];
    for (i in resources){
        update_value_by_id(resources[i], player_inventory[resources[i]]);
    }

    update_value_by_id("follower_resource", follower_resource);


    update_bar_by_id("invasion", invasion_progress, 100);

    
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
    update_value_by_id("towns", towns_status);

}
