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
        if (document.getElementsByClassName("fire_sprite")[i] !== undefined)
            document.getElementsByClassName("fire_sprite")[i].style.backgroundPosition = current_fire_sprite + fire_scale * current_fire_frame + 'px 0%';
   }
}

var knight_current_frame = 1;
var wizard_current_frame = 1;
var spider_current_frame = 1;
var scalisk_current_frame = 1;
var crab_current_frame = 1;
function update_animation(){
    update_knight_animation();
    update_wizard_animation();
    update_spider_animation();
    update_scalisk_animation();
    update_crab_animation();
}

function update_knight_animation(){
    var current_sprite = "-";
    var scale = 350 / 3;
    if (knight_current_frame >= 19) {
        knight_current_frame = 1;
    }
    else {
        knight_current_frame += 1;
    }
    for (i = 0; i < document.getElementsByClassName("knight_sprite").length; i++) {
        document.getElementsByClassName("knight_sprite")[i].style.backgroundPosition = current_sprite + scale * knight_current_frame + 'px 0%';
    }
}

function update_wizard_animation(){
    var current_sprite = "-";
    var scale = 350 / 3;
    if (wizard_current_frame >= 24) {
        wizard_current_frame = 1;
    }
    else {
        wizard_current_frame += 1;
    }
    for (i = 0; i < document.getElementsByClassName("magic_user").length; i++) {
        document.getElementsByClassName("magic_user")[i].style.backgroundPosition = current_sprite + scale * wizard_current_frame + 'px 0%';
    }
}

function update_spider_animation(){
    var current_sprite = "-";
    var scale = 350 / 3;
    if (spider_current_frame >= 24) {
        spider_current_frame = 1;
    }
    else {
        spider_current_frame += 1;
    }
    for (i = 0; i < document.getElementsByClassName("monster_spider").length; i++) {
        document.getElementsByClassName("monster_spider")[i].style.backgroundPosition = current_sprite + scale * spider_current_frame + 'px 0%';
    }
}

function update_scalisk_animation(){
    var current_sprite = "-";
    var scale = 300 / 3;
    if (scalisk_current_frame >= 24) {
        scalisk_current_frame = 1;
    }
    else {
        scalisk_current_frame += 1;
    }
    for (i = 0; i < document.getElementsByClassName("monster_scalisk").length; i++) {
        document.getElementsByClassName("monster_scalisk")[i].style.backgroundPosition = current_sprite + scale * scalisk_current_frame + 'px 0%';
    }
}

function update_crab_animation(){
    var current_sprite = "-";
    var scale = 300 / 3;
    if (crab_current_frame >= 24) {
        crab_current_frame = 1;
    }
    else {
        crab_current_frame += 1;
    }
    for (i = 0; i < document.getElementsByClassName("monster_crab").length; i++) {
        document.getElementsByClassName("monster_crab")[i].style.backgroundPosition = current_sprite + scale * crab_current_frame + 'px 0%';
    }
}
