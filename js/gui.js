var sliding_panel_offset = 0 ;

function slide_panel(engaged){
    var width = document.getElementById("town_panel").offsetWidth;
    if ( (sliding_panel_offset > -width) && ( game.engaged || game.under_siege)){
        sliding_panel_offset -= 20;
    }
    if ( (sliding_panel_offset < 0) && ! game.engaged && ! game.under_siege){
        sliding_panel_offset += 20;
    }
    if (sliding_panel_offset < 5 && sliding_panel_offset > -5){sliding_panel_offset = 0;}

        document.getElementById("panel_track").style.left  = sliding_panel_offset;
}

function update_value_by_id(id, value){
    document.getElementById(id).innerHTML = value;
}

function update_bar_by_id(id, current, max){
    var h_width = 100 * (current / max) + "%";
    document.getElementById(id).style.width = h_width;
}

function update_ui( monster){
    document.getElementById("track_container").style.height  = document.getElementById("panel_track").offsetHeight;

    slide_panel(game.engaged);
    

    update_bar_by_id("invasion", game.invasion_progress, 100);

    
    if (! game.under_siege){
        for (i in document.getElementsByClassName('combat_button')) {
            document.getElementsByClassName('combat_button')[i].disabled = !game.engaged;
        }
        for (i in document.getElementsByClassName('town_button')) {
            document.getElementsByClassName('town_button')[i].disabled = game.engaged;
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


    //var width_scalar = document.getElementById("towns").offsetWidth;
    
    /*var towns_status = ""
    for (x in towns){
    if (! towns[x].destroyed) {
        towns_status += ('<div class="destroyed_town" style="left:' + ((85-towns[x].location)/100 * width_scalar+40) + 'px"> <image class="town_image" src="assets/sprites/Town.png"/> </div>');
    } 
        else {
            towns_status += ('<div class="destroyed_town" style="left:' + ((85 - towns[x].location)/100 * width_scalar + 40)+ 'px"> <image class="town_image" src="assets/sprites/Destroyed_Town.png"/> </div>');
        }
    }
    update_value_by_id("towns", towns_status);*/

}

var current_knight_frame = 1;
function update_knight_animation(){
    var current_knight_sprite = "-";
    var knight_scale = 350;
    if (current_knight_frame >= 19) {
        current_knight_frame = 1;
    }
    else {
        current_knight_frame += 1;
    }
    for (i in game.fighters)
        document.getElementsByClassName("knight_sprite")[i].style.backgroundPosition = current_knight_sprite + knight_scale * current_knight_frame + 'px 0%';
}

var current_fire_frame = 1;
function update_fire_animation(){
    var current_fire_sprite = "-";
    var fire_scale = 200;
    if (current_fire_frame >= 2) {
        current_fire_frame = 1;
    }
    else {
        current_fire_frame += 1;
    }
   for (i in game.towns){
        document.getElementsByClassName("fire_sprite")[i].style.backgroundPosition = current_fire_sprite + fire_scale * current_fire_frame + 'px 0%';
   }
}
