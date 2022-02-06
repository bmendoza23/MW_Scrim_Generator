//Handles Logic and scripts
console.log("index.js imported");

//Global Variables 
let seriesLength;
let playerList = [];
const mwInfoJSON = {
    "maps":[
        "arlov_peak",
        "azhir_cave",
        "gun_runner",
        "hackney_yard",
        "shoot_house",
        "vacant",
        "khandor_hideout",
        "hardhat",
        "hovec_sawmill"
    ],
    "gamemodes":[
        "snd",
        "hardpoint",
        "dom",
        "ctf"
    ]
};// want to use require('../json/mwInfo.json'); but it seems little complicated
let mapsList = [];
let gamemodesList = [];
let team1, team2;


//Parses mwInfoJSON object to mapsList and gamemodeList
function parseMWInfo(){
    console.log("Parsing MW Info...");
    //Pushes maps to mapsList
    for (let map of mwInfoJSON.maps)
    {
        mapsList.push(map);
    }
    console.log("Maps List: " + mapsList); 
    //Pushes gamemodes to gamemodesList
    for (let gamemode of mwInfoJSON.gamemodes)
    {
        gamemodesList.push(gamemode);
    }
    console.log("Gamemodes List: " + gamemodesList);
};


parseMWInfo();

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

//Fisher-Yates Shuffle Algorithm

function shuffle(arr) {
    let currentIndex = arr.length,  randomIndex;
  
    // While there are still elements in the array
    while (currentIndex != 0) { 
      randomIndex = Math.floor(Math.random() * currentIndex);   //Picking random element
      currentIndex--;
  
      //Swapping index with random index.
      [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
    }
    return array;
  }

//Randomize Teams
function randomizeTeams(){
    //Randomize Array
    shuffle(playerList);

    //Split Array into 2
    var listHalf = Math.ceil(playerList.length / 2);        //Finding middle point of playerList
    team1 = playerList.slice(0,listHalf);                   //Slicing first half of list to team1
    team2 = playerList.slice(listHalf+1, playerList.length);//Slicing second half of list to team2
    
    //Appending team1 and team2 to Teams div:
    //Looping over team1 list
    for (let player in team1){
         $("#team1").append( "<br>"+ player+ "</br>" ); //Appending player to team1
    };

    for (let player in team2){
        $("#team2").append( "<br>"+ player+ "</br>" );
   }
}

//Done Button Click
function done(){ 
    getSeriesLength();
    randomizeTeams();
}


