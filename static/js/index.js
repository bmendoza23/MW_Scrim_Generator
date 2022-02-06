//Handles Logic and scripts
console.log("index.js imported");

//Global Variables 
let seriesLength;
let playerList = [];

//Gets series length
function getSeriesLength() {
    let seriesLengthInput = String($('input[name=seriesLengthRadio]:checked', '#seriesLengthForm').val());
    console.log("Series Length Radio Selected: " + seriesLengthInput);

    switch (seriesLengthInput){
        case '1of1':
            seriesLength = 1;
        case '2of3':
            seriesLength = 3;
        case '3of5':
            seriesLength = 5;
        case '4of7':
            seriesLength = 7;
    }

    $('#msg').text("Series Length Selected: " + seriesLength);
};
 
//Adds entered player to List
function addPlayer(){
    let $newPlayer = $('#playerID').val();   //Grabbing Player ID from entry form
    playerList.push($newPlayer);             //Adding new Player to PlayerList
    console.log("New Player Added to list: " + $newPlayer);
    console.log("Player List: " + playerList);
}

//Refreshes playerList div
function refreshPlayerList(){
    $("#playerList").append( "<br>"+ playerList[(playerList.length - 1)]+ "</br>" );
    
}

//Adds player to list + refreshes playerList div
function addPlayerBtnClick(){
    addPlayer();
    refreshPlayerList();
}

//Randomize Teams
function randomizeTeams(){
    //Randomize Array

    //Split Array into 2

    //Display Array to Page
}

//Load maps to list
function loadMaps(){
    
}
//Done Button Click
function done(){ 
    getSeriesLength();
}


