//Handles Logic and scripts
console.log("index.js imported");

//Global Variables 
let seriesLength,
    team1,
    team2;
let mapsPlaying = [];
let playerList = [];
let gmsPlaying = [];    
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
    "respawn_gamemodes":[
        "hardpoint",
        "domination",
        "capture_the_flag"
    ],
    "no_respawn_gamemodes":[
        "snd"
    ]
};// want to use require('../json/mwInfo.json'); but it seems little complicated
let mapsList = [];
let rsGamemodesList = [];


//Parses mwInfoJSON object to mapsList and gamemodeList
function parseMWInfo(){
    console.log("Parsing MW Info...");
    //Pushes maps to mapsList
    for (let map of mwInfoJSON.maps)
    {
        mapsList.push(map);
    }
    console.log("Maps List: " + mapsList); 
    //Pushes gamemodes to rsGamemodesList
    for (let gamemode of mwInfoJSON.respawn_gamemodes)
    {
        rsGamemodesList.push(gamemode);
    }
    console.log("Gamemodes List: " + rsGamemodesList);
}
parseMWInfo();

//Function takes string input and formats to change first letter to uppercase and insert a space
function upperCaseAndSplit(string){
    let splitString = string.split('_');
    let formattedStrings = [];
    for(let i = 0; i<splitString.length;i++){
        formattedStrings.push(splitString[i].charAt(0).toUpperCase() + splitString[i].slice(1));
    }
    string = formattedStrings.join(' ');
    return string;
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
    return arr;
}

//Selects random index from a given array
function selectRandomIndex(array)
{
    let currElement = array[Math.floor(Math.random()*array.length)];
    return currElement;
}

//Gets series length
function getSeriesLength() {
    let seriesLengthInput = String($('input[name=seriesLengthRadio]:checked', '#seriesLengthForm').val());
    console.log("Series Length Radio Selected: " + seriesLengthInput);

    switch (seriesLengthInput){
        case '1of1':
            seriesLength = 1;
            break;
        case '2of3':
            seriesLength = 3;
            break;
        case '3of5':
            seriesLength = 5;
            break;
        case '4of7':
            seriesLength = 7;
            break;
    }

    $('#seriesLengthMsg').text("Series Length Selected: " + seriesLength);
};
 
//Adds entered player to List
function addPlayer(){
    let $newPlayer = $('#playerID').val();   //Grabbing Player ID from entry form
    if ($newPlayer === '')
    {
        alert('Cannot add blank player to list');
    }
    else if ($newPlayer !== ''){
        playerList.push($newPlayer);             //Adding new Player to PlayerList
        console.log("New Player Added to list: " + $newPlayer);
        refreshPlayerList();
    }
    $('#playerID').val(''); //Clears text box
}

//Refreshes playerList div
function refreshPlayerList(){
    $("#playerList").append( "<br>"+ playerList[(playerList.length - 1)]+ "</br>" );
}

//Adds player to list + refreshes playerList div
function addPlayerBtnClick(){
    addPlayer();
}

//Randomize Teams
function randomizeTeams(){
    //Randomize Array
    shuffle(playerList);

    //Split Array into 2
    var listHalf = Math.ceil(playerList.length / 2);        //Finding middle point of playerList
    team1 = playerList.slice(0,listHalf);                   //Slicing first half of list to team1
    team2 = playerList.slice(listHalf, playerList.length);//Slicing second half of list to team2
    
    //Appending team1 and team2 to Teams div:
    //Looping over team1 list
    for (let player in team1){
         $("#team1").append( "<br>"+ team1[player]+ "</br>" ); //Appending player to team1
    };

    for (let player in team2){
        $("#team2").append( "<br>"+ team2[player]+ "</br>" );
   }
}

//Randomizing maps list
function generateMaps(){
    //Clearing mapsPlaying array
    mapsPlaying.splice(0,mapsPlaying.length)
    //Adds maps to mapsPlaying array
    for(let i = 0; i < seriesLength; i++)
    {
        mapsPlaying.push(selectRandomIndex(mapsList));
    }
    console.log('Maps Generated:' + mapsPlaying);
}

//Randomizes gamemodes
function generateGMsPlaying(){   //Variable to hold index for gms array
                 //Array to hold gamemodes
    //loop fills scrimGms array
    for (let i = 0; i < seriesLength; i++){
        console.log('index ' + i);
        //if index the first game
        if (i === 0){
            gmsPlaying.push(selectRandomIndex(rsGamemodesList));
            console.log('Pushed 0 ' + gmsPlaying[i]);
        }
        //if index is even
        else if ((i % 2 === 0) && (i !== 0)){
            gmsPlaying.push("Search and Destroy");
            console.log('Pushed even ' + gmsPlaying[i]);
        }
        //If index is odd
        else { 
            gmsPlaying.push(selectRandomIndex(rsGamemodesList));
            console.log('Pushedodd ' + gmsPlaying[i]);

        }
    }
    console.log('Gamemodes playing: ' + gmsPlaying); 
};

//Generates gamemodes onto page
function displayGMs(){
    generateGMsPlaying();
    //loops over scrimGms
    for (let gm in gmsPlaying){
        let gmString = upperCaseAndSplit(gmsPlaying[gm]);
        $('#gamemode').append('<td>'+ gmString + '</td>');
    }
}

//Displays maps in maps div
function displayMaps(){
    generateMaps();
    for(let map in mapsPlaying){
        let mapNameString = upperCaseAndSplit(mapsPlaying[map]);
        $('#mapName').append('<td>'+ mapNameString + '</td>');
        //Grabbing map imgs
        //$('#mapsImg').append(mapsList[map])
    }
}

//Done Button Click
function done(){ 
    getSeriesLength();
    randomizeTeams();
    displayGMs();
    displayMaps();
}


