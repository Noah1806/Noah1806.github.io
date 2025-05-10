let league;
let oldGameDay = document.getElementById("gameDays").innerHTML;
let currentGameDay = 1;
let gameDayOnSims = 1;
let simulated = false;
let simulatedOneGameday = false;
let initialisedFirstTime = false;

let teamArray = [];

let teamArrays24 = [["Bundesliga", []], ["2_Bundesliga", []], ["3_Liga", []], ["Premier_League", []], ["Championship", []], ["EFL_LeagueOne", []], ["Eredivisie", []], ["Eerste_Divisie", []], ["La_Liga", []], ["La_Liga2", []], ["Serie_A", []], ["Serie_B", []], ["Ligue_1", []], ["Ligue_2", []]];
let teamArraysYears = [teamArrays24];
let teamArrays = [];

let gamePlan = [];
let gamePlans24 = [["Bundesliga", []], ["2_Bundesliga", []], ["3_Liga", []], ["Premier_League", []], ["Championship", []], ["EFL_LeagueOne", []], ["Eredivisie", []], ["Eerste_Divisie", []], ["La_Liga", []], ["La_Liga2", []], ["Serie_A", []], ["Serie_B", []], ["Ligue_1", []], ["Ligue_2", []]];
let gamePlanYears = [gamePlans24];
let gamePlans = [];

let year = 0;

let oldTableHTML = document.getElementById("table").innerHTML;
let oldGameDayHTML = document.getElementById("seasonsim").innerHTML;

let experimentalVersion = false;

//Deutschland
function bundesligaclick(){
    league = "Bundesliga";
    setupNew();
    scrollToSeasonSim();
}

function secbundesligaclick(){
    league = "2_Bundesliga";
    setupNew();
    scrollToSeasonSim();
}

function drligaclick(){
    league = "3_Liga";
    setupNew();
    scrollToSeasonSim();
}

//ENGLAND
function premclick(){
    league = "Premier_League";
    setupNew();
    scrollToSeasonSim();
}

function eflcclick(){
    league = "Championship";
    setupNew();
    scrollToSeasonSim();
}

function league1click(){
    league = "EFL_LeagueOne";
    setupNew();
    scrollToSeasonSim();
}

//NIEDERLANDE
function eredivisieclick(){
    league = "Eredivisie";
    setupNew();
    scrollToSeasonSim();
}

function eerstedivisieclick(){
    league = "Eerste_Divisie";
    setupNew();
    scrollToSeasonSim();
}
//SPANIEN

function laligaclick(){
    league = "La_Liga";
    setupNew();
    scrollToSeasonSim();
}

function laliga2click(){
    league = "La_Liga2";
    setupNew();
    scrollToSeasonSim();
}

//ITALIEN

function serieaclick(){
    league = "Serie_A";
    setupNew();
    scrollToSeasonSim();
}

function seriebclick(){
    league = "Serie_B";
    setupNew();
    scrollToSeasonSim();
}

//FRANKREICH

function ligue1click(){
    league = "Ligue_1";
    setupNew();
    scrollToSeasonSim();
}

function ligue2click(){
    league = "Ligue_2";
    setupNew();
    scrollToSeasonSim();
}

//INTERNATIONAL

function menuButton(divId){
    const divToGoTo = document.getElementById(divId);
    if(!divToGoTo){return};
    divToGoTo.scrollIntoView({
        behavior: 'smooth',  // Für sanftes Scrollen
        block: 'start'       // Scrollt zum oberen Bereich des Elements
    });
}

function scrollToSeasonSim(){
    const seasonsimElement = document.getElementById('seasonsim');
    seasonsimElement.scrollIntoView({
        behavior: 'smooth',  // Für sanftes Scrollen
        block: 'start'       // Scrollt zum oberen Bereich des Elements
    });
}

function setupNew(){
    teamArray = [];
    gamePlan = [];

    document.getElementById("seasonsim").style.display = "block";
    document.getElementById("table").style.display = "table";
    document.getElementById("tableHeader").hidden = false;

    gamePlans = gamePlanYears[year];
    teamArrays = teamArraysYears[year];

    if(initialisedFirstTime == false){
        initialisedFirstTime = true;
        for(let __team of teams){
            __team.crest = __team.league;
        }
    }

    loadTeamArrays();
    loadGamePlans();
    loadSeason();

    for (let _gamePlan of gamePlans) {
        if (_gamePlan[0] === league) {
            // Check: Gibt es überhaupt diesen Spieltag?
            if (_gamePlan[1][currentGameDay - 1]) {
                curGameDay = _gamePlan[1][currentGameDay - 1];
            }
            else{
                currentGameDay = 1;
                document.getElementById("curGameDay").innerText = "Spieltag: " + currentGameDay;
                loadGameDay(currentGameDay);
            }
        }
    }

    loadGameDay(currentGameDay);
}


function loadTeamArrays(){
    for(let teamArrayChild of teamArrays){
            if (teamArrayChild[1].length == 0) {
                for (let team of teams) {
                    if (teamArrayChild[0] == team.league) {
                        team.points = 0;
                        team.wins = 0;
                        team.draws = 0;
                        team.losses = 0;
                        team.goalsScored = 0;
                        team.goalsConceaded = 0;
                        team.games = 0;
                        team.easteregg = "Du Spanner was durchsuchst du meine Files?";
                        teamArrayChild[1].push(team);
                    }
                }
            }
    
            if (teamArrayChild[0] == league && teamArray.length == 0) {
                teamArray = teamArrayChild[1];
                //console.log(teamArray);
            }
    }
}

function loadGamePlans(){
    for(let gamePlanChild of gamePlans){
        if(gamePlanChild[0].includes("Qualifiers")){
            return;
        }
        else{
            if (gamePlanChild[1].length == 0) {
                //console.log("Spielplan für " + gamePlanChild[0] + " erstellt.");
                for(let teamArrayChild of teamArrays){
                    if(teamArrayChild[0] == gamePlanChild[0]){
                        //console.log(teamArrayChild[1]);
                        gamePlanChild[1] = generateGamePlan(teamArrayChild[1]);
                    }
                }
    
            }
    
            if (gamePlanChild[0] == league && gamePlan.length == 0) {
                gamePlan = gamePlanChild[1];
                //console.log("Jetziger Spielplan ist: " + gamePlanChild[0]);
            }
        }
    }
}


function loadSeason(){
    if (typeof league === 'undefined') {
        alert("Error ExL01: Fehler beim Erstellen der Liga.");
        return; // beendet die Funktion
    }

    if (gamePlan == []){
        alert("Error ExL06: Fehler beim Abrufen des generierten Spielplanes.");
        return; // beendet die Funktion
    }


    
    if(document.getElementById("tablethings_" + league) == null){
        setupTable();
    }


    for (let tablething of document.getElementById("table").children){
        if (tablething.className == "tablethings"){
            if (tablething.id == "tablethings_" + league){
                tablething.style.display = "table-row-group";
                //console.log("Tablething: " + tablething.id + " eingeblendet.");
            }
            else{
                tablething.style.display = "none";
                //console.log("Tablething: " + tablething.id + " ausgeblendet.");
            }
        }
    }
}

function generateGamePlan(_teamArray){
    if (typeof _teamArray[0].league === 'undefined') {
        alert("Error ExL02: Fehler beim erstellen/abrufen des Spielplanes.");
        return; // beendet die Funktion
    }
    if (typeof teams === 'undefined') {
        alert("Error ExL03: Fehler beim Abrufen der Teams.");
        return; // beendet die Funktion
    }
    
    

    if (_teamArray.length < 10){
        alert("Error ExL04: Fehler beim Abrufen der Teams: Zu wenig Teams aus der Liga gefunden, fehlerhaft.");
        return; // beendet die Funktion
    }

    let numTeams = _teamArray.length;
    let numMatchdays = (numTeams - 1) * 2;
    let gameDays = [];

    let rotatingTeams = _teamArray.slice(1); // Erstes Team bleibt fix, die anderen rotieren

    for (let day = 0; day < numMatchdays; day++) {
        let gamesForDay = [];

        // Erstes Spiel (fixes Team gegen rotierendes Team)
        let home = day % 2 === 0 ? _teamArray[0] : rotatingTeams[0];
        let away = day % 2 === 0 ? rotatingTeams[0] : _teamArray[0];
        gamesForDay.push([home, away, "TBD"]);

        // Weitere Spiele mit rotierten Teams
        for (let i = 1; i < numTeams / 2; i++) {
            let team1 = rotatingTeams[i];
            let team2 = rotatingTeams[numTeams - 1 - i];

            if (day % 2 === 0) {
                gamesForDay.push([team1, team2, "TBD"]);
            } else {
                gamesForDay.push([team2, team1, "TBD"]);
            }
        }

        gameDays.push(gamesForDay);

        // Teams rotieren für den nächsten Spieltag (außer das erste Team)
        rotatingTeams.push(rotatingTeams.shift());
    }

    return gameDays;
}

function loadGameDay(gameDay){
    let seasonGames = document.getElementById("seasonsim");


    for(let gameChild of seasonGames.children) {
        if (gameChild.id == "gameDays_" + league) {
            gameChild.style.display = "block";
        } 
        else if(gameChild.className == "gameDays" && gameChild.id != "gameDays_" + league){
            gameChild.style.display = "none";
        }
    }
    

    

    loadAllLeagues(gameDay);

    

    for (let leagueChilds of teamArrays) {
        let leagueChld = leagueChilds[0];
        let curGameDay; // Aktueller Spieltag dieser Liga
    
        for (let _gamePlan of gamePlans) {
            if (_gamePlan[0] === leagueChld) {
                // Check: Gibt es überhaupt diesen Spieltag?
                if (_gamePlan[1][gameDay - 1]) {
                    curGameDay = _gamePlan[1][gameDay - 1];
                }
            }
        }
    
        // Wenn es diesen Spieltag für diese Liga nicht gibt → skip
        if (!curGameDay) {
            console.warn("⚠️ Kein Spieltag " + gameDay + " für Liga " + leagueChld);
            continue;
        }
    
        let gameDayTemplate = document.querySelector("#gameDayTemplate .game");
    
        for (let i = 0; i < curGameDay.length; i++) {
            let curGame = document.createElement("div");
            curGame.innerHTML = gameDayTemplate.innerHTML;
            curGame.id = "game" + (1 + i);
            curGame.className = "game";
    
            // Teams und Logos
            curGame.querySelector(".team-container:first-child #team1").innerHTML = curGameDay[i][0].name;
            curGame.querySelector(".team-container:last-child #team2").innerHTML = curGameDay[i][1].name;
    
            let homelogo = curGame.querySelector(".team-container:first-child #team1logo");
            let awaylogo = curGame.querySelector(".team-container:last-child #team2logo");
    
            curGame.querySelector("#score").innerHTML = curGameDay[i][2];
            curGame.querySelector("#score").className = "score";
    
            homelogo.src = "./imgs/teams/" + curGameDay[i][0].crest + "/" + curGameDay[i][0].id + ".png";
            awaylogo.src = "./imgs/teams/" + curGameDay[i][1].crest + "/" + curGameDay[i][1].id + ".png";
    
            homelogo.onerror = function () {
                this.onerror = null; // wichtig, sonst loop!
                this.src = "./imgs/teams/placeholder.png";
            };

            awaylogo.onerror = function () {
                this.onerror = null; // wichtig, sonst loop!
                this.src = "./imgs/teams/placeholder.png";
            };
            
    
            curGame.style.display = (leagueChld === league) ? "flex" : "none";
            document.querySelector("#gameDays_" + leagueChld + " #gameDay" + gameDay).appendChild(curGame);
        }
    }
    
    if(league.includes("Qualifiers")){
        return;
    }
    updateTable();
}

function loadAllLeagues(gameDay){
    for (let leagueChilds of teamArrays){
        let leagueChld = leagueChilds[0];
        
        // Füge das neue Element in den Container (NICHT die Vorlage!) ein
        curGamedayDiv = document.createElement("div");
        curGamedayDiv.id = "gameDay" + gameDay;
        //curGamedayDiv.innerHTML = document.querySelector("#gameDayTemplate").innerHTML;
        curGamedayDiv.className = "gameDay";

        let gameDaysDiv;

        if(document.getElementById("gameDays_" + leagueChld) == null){
            let divToCreate = document.createElement("div");
            divToCreate.id = "gameDays_" + leagueChld;
            divToCreate.className = "gameDays";
            document.getElementById("seasonsim").insertBefore(divToCreate, document.getElementById("gameDays"));
            gameDaysDiv = document.getElementById("gameDays_" + leagueChld);
        }
        else{
            gameDaysDiv = document.getElementById("gameDays_" + leagueChld);
            document.getElementById("gameDays_"+leagueChld).innerHTML = oldGameDay;
        }

        gameDaysDiv.appendChild(curGamedayDiv);
        document.getElementById("gameDayTemplate").style.display = "none"; 
    }

    

    return;
}


function prevGameDay(){
    if(currentGameDay - 1 <= 0){
        return
    }
    else{
        currentGameDay = currentGameDay - 1;
        document.getElementById("curGameDay").innerText = "Spieltag: " + currentGameDay;
        loadGameDay(currentGameDay);
    }
}

function nextGameDay(){
    if(gamePlan == []){
        alert("Error ExL06: Fehler beim Abrufen des generierten Spielplanes.");
        return; // beendet die Funktion
    }

    if(currentGameDay + 1 > gamePlan.length){
        return
    }
    else{
        currentGameDay = currentGameDay + 1;
        document.getElementById("curGameDay").innerText = "Spieltag: " + currentGameDay;
        loadGameDay(currentGameDay);
    }
}


function simGameDay(){
    setTimeout(() => {
    for (let leagueChilds of teamArrays){
        let leagueChld = leagueChilds[0];
        let gameDayDiv = document.querySelector("#gameDays_" + leagueChld + " #gameDay" + currentGameDay);
        if(gameDayDiv == undefined){
            alert("Error ExL06: Fehler beim Abrufen des generierten Spielplanes.");
            return;
        }

        let curGameDayPlan;

        for (let _gamePlan of gamePlans){
            if(_gamePlan[0] == leagueChld){
                curGameDayPlan = _gamePlan[1][currentGameDay - 1];
            }
        }

        if(curGameDayPlan == undefined){
            console.log("Error ExL06: Fehler beim Abrufen des generierten Spielplanes.");
        }

        if(gameDayOnSims < currentGameDay){
            alert("Simuliere erst den vorherigen Spieltag!");
            document.getElementById("loadingScreen").style.display = "none";
            return;
        }

        for (let game of gameDayDiv.children){
            for (let gameChild of game.children){
                if (gameChild.id == "score"){
                    if(gameChild.innerText == "TBD"){
                        let homeTeam;
                        let awayTeam;

                        if(curGameDayPlan.length <= 0) {
                            alert("Error ExL06: Fehler beim Abrufen des generierten Spielplanes.");
                            document.getElementById("loadingScreen").style.display = "none";
                            return; // beendet die Funktion
                        }

                        let gameId = game.id;
                        let splitId = gameId.split("game")[1];
                        let gameNumber = parseInt(splitId);

                        let gameData = curGameDayPlan[gameNumber - 1];


                        if (curGameDayPlan.length >= gameNumber) {
                            //console.log(curGameDayPlan[gameNumber-1][1]);
                            //console.log("Hi");
                            homeTeam = gameData[0];
                            awayTeam = gameData[1];
                            let score = getScore(homeTeam, awayTeam);
                            gameData[2] = score;
                            
                            simulatedOneGameday = true;
                        } else {

                        }
                        
                        

                    }
                    else{
                        let homeTeamName = "";
                        let awayTeamName = "";

                        for(let child of game.children){
                            if (child.className = "team-container"){
                                for(let gameNameChild of child.children){
                                    if(gameNameChild.id == "team1"){
                                        homeTeamName = gameNameChild.innerText;
                                    }
                                    else if (gameNameChild.id == "team2"){
                                        awayTeamName = gameNameChild.innerText;
                                    }
                                }
                            }
                        }
                        if(homeTeamName != "" && awayTeamName != ""){
                            alert("Der "+currentGameDay+". Spieltag wurde bereits simuliert.");
                            document.getElementById("loadingScreen").style.display = "none";
                            return;
                        }
                    }
                }
            }
        }
    }
    gameDayOnSims++;
    if(gameDayOnSims > 42){
        document.getElementById("simButton").style.display = "none";
        document.getElementById("simSeasonButton").style.display = "none";
        document.getElementById("newSeasonButton").style.display = "flex";
    }
    loadGameDay(currentGameDay);                            
    updateTable();
    document.getElementById("loadingScreen").style.display = "none"; // nach der Simulation ausblenden
    }, 50);
}


function simSeason(){
    document.getElementById("simSeasonButton").style.display = "none";
    document.getElementById("simButton").style.display = "none";
    document.getElementById("promptField").style.display = "none";

    for (let leagueChilds of teamArrays){
        let leagueChld = leagueChilds[0];
        let gameDayDiv = document.querySelector("#gameDays_" + leagueChld + " #gameDay" + currentGameDay);
        if(gameDayDiv == undefined){
            alert("Error ExL06: Fehler beim Abrufen des generierten Spielplanes.");
            return;
        }

        let curGamePlan;

        for (let _gamePlan of gamePlans){
            if(_gamePlan[0] == leagueChld){
                curGamePlan = _gamePlan[1];
            }
        }

        if(curGamePlan == undefined){
            alert("Error ExL06: Fehler beim Abrufen des generierten Spielplanes.");
            return;
        }

        if(curGamePlan != undefined && simulated == false){
            for (let i = 0; i < curGamePlan.length; i++){
                for (let game of curGamePlan[i]){ 
                    if(game[2] == "TBD"){
                        let score = getScore(game[0], game[1]);
                        if (score){
                            game[2] = score;
                        }
                        else{
                            alert("Error ExL07: Fehler beim simulieren der Saison.");
                            game[2] = "TBD";
                            return;
                        }
                    }
                }
            }
            loadGameDay(currentGameDay);
        }
        else{
            if(simulated == true){
                alert("Saison bereits simuliert!");
                return;
            }
            else{
                alert("Error ExL06: Fehler beim Abrufen des generierten Spielplanes.");
                return;
            }
        }
    }
    simulated = true;
    gameDayOnSims = 42;
    updateTable();
    document.getElementById("simButton").style.display = "none";
    document.getElementById("simSeasonButton").style.display = "none";
    document.getElementById("newSeasonButton").style.display = "block";
}


function getScore(homeTeam, awayTeam){
    let score;
    let homeGoals;
    let awayGoals;

    let homeQuote = 0;
    let awayQuote = 0;
    let drawQuote; //= 1 - (homeQuote + awayQuote)

    if (!homeTeam || !awayTeam) {
        homeGoals = 1;
        awayGoals = 0;
        score = homeGoals + " - " + awayGoals;
        return score;
    }

    if(homeTeam.strength && awayTeam.strength){
        let betterstr = false;
        let betterbetterstr = false;
        let oldRating;
        if(homeTeam.strength > 83){
            homeTeam.strength = homeTeam.strength + 5;
            betterstr = true;
        }
        else if (homeTeam.strength > 89){
            oldRating = homeTeam.strength;
            homeTeam.strength = 99;
            betterbetterstr = true;
        }
        if(homeTeam.strength > awayTeam.strength){
            let strongerTeam = homeTeam;
            let worseTeam = awayTeam;
            let strongerQuote;  
            let worseQuote;
            
            if(strongerTeam.strength - worseTeam.strength == 1){
                strongerQuote = 0.37;
                worseQuote = 0.35;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 2){
                strongerQuote = 0.40;
                worseQuote = 0.33;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 3){
                strongerQuote = 0.42;
                worseQuote = 0.3;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 4){
                strongerQuote = 0.44;
                worseQuote = 0.28;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 5){
                strongerQuote = 0.48;
                worseQuote = 0.25;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 6){
                strongerQuote = 0.52;
                worseQuote = 0.20;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 7){
                strongerQuote = 0.55;
                worseQuote = 0.17;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 8){
                strongerQuote = 0.58;
                worseQuote = 0.15;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 9){
                strongerQuote = 0.70;
                worseQuote = 0.11;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 10){
                strongerQuote = 0.75;
                worseQuote = 0.10;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength > 10 && strongerTeam.strength - worseTeam.strength <= 15){
                strongerQuote = 0.9;
                worseQuote = 0.05;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength > 15 && strongerTeam.strength - worseTeam.strength <= 20){
                strongerQuote = 0.95;
                worseQuote = 0.02;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength > 25 && strongerTeam.strength - worseTeam.strength <= 40){
                strongerQuote = 0.98;
                worseQuote = 0.01;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else {
                strongerQuote = 0.9;
                worseQuote = 0.01;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }

            homeQuote = strongerQuote;
            awayQuote = worseQuote;
        }

        else if(homeTeam.strength < awayTeam.strength){
            let strongerTeam = awayTeam;
            let worseTeam = homeTeam;
            let strongerQuote;
            let worseQuote;
            
            if(strongerTeam.strength - worseTeam.strength == 1){
                strongerQuote = 0.33;
                worseQuote = 0.33;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 2){
                strongerQuote = 0.35;
                worseQuote = 0.31;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 3){
                strongerQuote = 0.39;
                worseQuote = 0.29;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 4){
                strongerQuote = 0.40;
                worseQuote = 0.27;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 5){
                strongerQuote = 0.43;
                worseQuote = 0.25;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 6){
                strongerQuote = 0.49;
                worseQuote = 0.23;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 7){
                strongerQuote = 0.55;
                worseQuote = 0.21;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 8){
                strongerQuote = 0.58;
                worseQuote = 0.19;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 9){
                strongerQuote = 0.6;
                worseQuote = 0.17;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 10){
                strongerQuote = 0.65;
                worseQuote = 0.15;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength > 10 && strongerTeam.strength - worseTeam.strength <= 15){
                strongerQuote = 0.7;
                worseQuote = 0.13;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength > 15 && strongerTeam.strength - worseTeam.strength <= 20){
                strongerQuote = 0.75;
                worseQuote = 0.11;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else {
                strongerQuote = 0.8;
                worseQuote = 0.09;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }

            homeQuote = worseQuote;
            awayQuote = strongerQuote;
        }

        else{
            homeQuote = 0.34;
            awayQuote = 0.33;
            drawQuote = 1 - (homeQuote + awayQuote);
        }


        if (!homeQuote || !awayQuote || !drawQuote) {
            homeQuote = 0.34;
            awayQuote = 0.33;
            drawQuote = 1 - (homeQuote + awayQuote);
        }

        let ranInt = Math.random();

        if (ranInt <= homeQuote){
            let notMuchGoals = 0.5;
            let normalGoals = 0.3;
            let manyGoals = 0.15;
            let veryManyGoals = 0.05;

            if(homeQuote - awayQuote <= 0.03){
                notMuchGoals = 0.55;
                normalGoals = 0.42;
                manyGoals = 0.02;
                veryManyGoals = 0.01;
            }

            else if(homeQuote - awayQuote > 0.03 && homeQuote - awayQuote <= 0.2){
                notMuchGoals = 0.50;
                normalGoals = 0.43;
                manyGoals = 0.05;
                veryManyGoals = 0.02;
            }

            else if(homeQuote - awayQuote > 0.2 && homeQuote - awayQuote <= 0.4){
                notMuchGoals = 0.45;
                normalGoals = 0.43;
                manyGoals = 0.07;
                veryManyGoals = 0.05;
            }

            else if(homeQuote - awayQuote > 0.4 && homeQuote - awayQuote <= 0.6){
                notMuchGoals = 0.30;
                normalGoals = 0.55;
                manyGoals = 0.10;
                veryManyGoals = 0.05;
            }

            else if(homeQuote - awayQuote > 0.6) {
                notMuchGoals = 0.10;
                normalGoals = 0.30;
                manyGoals = 0.40;
                veryManyGoals = 0.09;
            }

            else {
                notMuchGoals = 0.80;
                normalGoals = 0.17;
                manyGoals = 0.02;
                veryManyGoals = 0.01;
            }

            let goalRandom = Math.random();

            if(goalRandom <= notMuchGoals){
                homeGoals = randomInt(1, 2);
                awayGoals = randomInt(0, homeGoals - 1);
            }
            else if(goalRandom <= notMuchGoals + normalGoals){
                homeGoals = randomInt(2, 4);
                awayGoals = randomInt(0, homeGoals - 1);
            }
            else if(goalRandom <= notMuchGoals + normalGoals + manyGoals){
                homeGoals = randomInt(3, 5);
                awayGoals = randomInt(0, homeGoals - 1);
                if(Math.random() < 0.7){
                    awayGoals = randomInt(0, 1);
                }
                if(homeGoals == 5){
                    awayGoals = randomInt(0, 1);
                }
            }
            else {
                homeGoals = randomInt(3, 7);
                awayGoals = randomInt(0, 1);
                if(Math.random() < 0.7){
                    awayGoals = 0;
                }
            }
        }
        else if(ranInt <= homeQuote + awayQuote){
            let notMuchGoals = 0.5;
            let normalGoals = 0.3;
            let manyGoals = 0.15;
            let veryManyGoals = 0.05;

            if(awayQuote - homeQuote <= 0.03){
                notMuchGoals = 0.60;
                normalGoals = 0.37;
                manyGoals = 0.02;
                veryManyGoals = 0.01;
            }

            else if(awayQuote - homeQuote > 0.03 && awayQuote - homeQuote <= 0.2){
                notMuchGoals = 0.50;
                normalGoals = 0.43;
                manyGoals = 0.05;
                veryManyGoals = 0.02;
            }

            else if(awayQuote - homeQuote > 0.2 && awayQuote - homeQuote <= 0.4){
                notMuchGoals = 0.45;
                normalGoals = 0.45;
                manyGoals = 0.05;
                veryManyGoals = 0.05;
            }

            else if(awayQuote - homeQuote > 0.4 && awayQuote - homeQuote <= 0.5){
                notMuchGoals = 0.40;
                normalGoals = 0.40;
                manyGoals = 0.15;
                veryManyGoals = 0.05;
            }

            else if(awayQuote - homeQuote > 0.5) {
                notMuchGoals = 0.10;
                normalGoals = 0.30;
                manyGoals = 0.40;
                veryManyGoals = 0.09;
            }

            else {
                notMuchGoals = 0.80;
                normalGoals = 0.17;
                manyGoals = 0.02;
                veryManyGoals = 0.01;
            }

            let goalRandom = Math.random();

            if(goalRandom <= notMuchGoals){
                awayGoals = randomInt(1, 2);
                homeGoals = randomInt(0, awayGoals - 1);
            }
            else if(goalRandom <= notMuchGoals + normalGoals){
                awayGoals = randomInt(2, 4);
                homeGoals = randomInt(0, awayGoals - 1);
            }
            else if(goalRandom <= notMuchGoals + normalGoals + manyGoals){
                awayGoals = randomInt(3, 4);
                homeGoals = randomInt(0, awayGoals - 1);
            }
            else {
                awayGoals = randomInt(2, 7);
                homeGoals = randomInt(0, 1);
            }
        }
        else{
            notMuchGoals = 0.60;
            normalGoals = 0.30;
            manyGoals = 0.07;
            veryManyGoals = 0.03;

            let goalRandom = Math.random();

            if(goalRandom <= notMuchGoals){
                homeGoals = 1;
                awayGoals = 1;
            }
            else if(goalRandom <= notMuchGoals + normalGoals){
                if(Math.random() < 0.4){
                    homeGoals = 0;
                    awayGoals = 0;
                }
                else{
                    homeGoals = 2;
                    awayGoals = 2;
                }
            }
            else if(goalRandom <= notMuchGoals + normalGoals + manyGoals){
                homeGoals = randomInt(2, 3);
                awayGoals = homeGoals;
            }
            else {
                homeGoals = randomInt(3, 4);
                awayGoals = homeGoals;
            }
        }

        if (homeGoals !== undefined && awayGoals !== undefined) {
            score = homeGoals + " - " + awayGoals;
            

            // Überprüfen, ob die Werte initialisiert wurden
        if (!homeTeam.initialized) {

            // Werte initialisieren
            homeTeam.points = 0;
            awayTeam.points = 0;
            homeTeam.wins = 0;
            awayTeam.wins = 0;
            homeTeam.draws = 0;
            awayTeam.draws = 0;
            homeTeam.losses = 0;
            awayTeam.losses = 0;
            homeTeam.goalsScored = 0;
            homeTeam.goalsConceaded = 0;
            awayTeam.goalsScored = 0;
            awayTeam.goalsConceaded = 0;
            homeTeam.games = 0;
            awayTeam.games = 0;
            homeTeam.easteregg = "Du Spanner was durchsuchst du meine Files?";

            // Setze das Initialisierungs-Flag
            homeTeam.initialized = true;
            awayTeam.initialized = true;
            }
            else {
                //console.log("Werte bereits initialisiert");
            }

            if(homeGoals > awayGoals){
                homeTeam.points += 3;
                awayTeam.points += 0;
                homeTeam.wins++;
                awayTeam.losses++;
            }
            else if (homeGoals < awayGoals){
                homeTeam.points += 0;
                awayTeam.points += 3;
                homeTeam.losses++;
                awayTeam.wins++;
            }
            else{
                homeTeam.points += 1;
                awayTeam.points += 1;
                homeTeam.draws++;
                awayTeam.draws++;
            }

            homeTeam.goalsScored += homeGoals;
            homeTeam.goalsConceaded += awayGoals;
            awayTeam.goalsScored += awayGoals;
            awayTeam.goalsConceaded += homeGoals;
            homeTeam.games++;
            awayTeam.games++;
            
            if(betterstr == true){
                homeTeam.strength = homeTeam.strength - 5;
            }
            if(betterbetterstr == true && oldRating){
                homeTeam.strength = oldRating;
            }

            if(experimentalVersion == true){
                if(homeGoals > awayGoals){
                    if(Math.random() < 0.7){
                        let addedstr = 0;
                        let diff = homeTeam.strength - awayTeam.strength;
                        if(diff <= 3 && diff > 0){
                            if(Math.random() < 0.4){
                                addedstr = 1;
                                homeTeam.strength = homeTeam.strength + 1;
                                awayTeam.strength = awayTeam.strength - 1;
                            }
                        }
                        else if (diff <= 0 && diff >= -3){
                            if(Math.random() < 0.6){
                                addedstr = 2;
                                homeTeam.strength = homeTeam.strength + 2;
                                awayTeam.strength = awayTeam.strength - 2;
                            }
                        }
                        else if (diff <= 0 && diff >= -3){
                            addedstr = 2;
                            homeTeam.strength = homeTeam.strength + 2;
                            awayTeam.strength = awayTeam.strength - 2;
                        }
                        else if(diff < -3){
                            if(Math.random() < 0.5){
                                addedstr = 2;
                                homeTeam.strength = homeTeam.strength + 2;
                                awayTeam.strength = awayTeam.strength - 2;
                            }
                        }
                        //console.log("differenz: "+diff + ", Heimteam ("+homeTeam.short+") Strengh: "+homeTeam.strength+"(+"+ addedstr + "), Auswärtst ("+awayTeam.short+") Strengh: "+awayTeam.strength+ "+ (-"+ addedstr + ")");
                    }
                }
                else if (homeGoals < awayGoals){
                    if(Math.random() < 0.7){
                        let addedstr = 0;
                        let diff = awayTeam.strength - homeTeam.strength;
                        if(diff <= 3 && diff > 0){
                            if(Math.random() < 0.4){
                                addedstr = 1;
                                homeTeam.strength = homeTeam.strength - 1;
                                awayTeam.strength = awayTeam.strength + 1;
                            }
                        }
                        else if (diff <= 0 && diff >= -3){
                            if(Math.random() < 0.6){
                                addedstr = 2;
                                homeTeam.strength = homeTeam.strength - 2;
                                awayTeam.strength = awayTeam.strength + 2;
                            }
                        }
                        else if (diff <= 0 && diff >= -3){
                            addedstr = 2;
                            homeTeam.strength = homeTeam.strength - 2;
                            awayTeam.strength = awayTeam.strength + 2;
                        }
                        else if(diff < -3){
                            if(Math.random() < 0.5){
                                addedstr = 12;
                                homeTeam.strength = homeTeam.strength - 2;
                                awayTeam.strength = awayTeam.strength + 2;
                            }
                        }
                        //console.log("differenz: "+diff + ", Heimteam ("+homeTeam.short+") Strengh: "+homeTeam.strength+"(-"+ addedstr + "), Auswärtst ("+awayTeam.short+") Strengh: "+awayTeam.strength+ "(+"+ addedstr + ")");
                    }
                }
            }

            return score;
        } 
        else {
            return "3 - 0";
        }
    }
}

function _getScore(homeTeam, awayTeam){
    //Variablen
    let homeTeamStrength = homeTeam.strength;
    let awayTeamStrength = awayTeam.strength;
    let betterGoals = 0;
    let worseGoals = 0;

    let betterTeam;
    let worseTeam;

    //Prüfen ob alles geladen wurde
    if(!homeTeamStrength || !awayTeamStrength){
        return "TBD";
    }

    //Checken ob es ein besonderes Team ist
    if (homeTeam.id == "dortmund" ||homeTeam.id == "bayern" || homeTeam.id == "frankfurt"){
        homeTeamStrength = homeTeamStrength + 10;
    }
    else{
        homeTeamStrength = homeTeamStrength + 5;
    }

    //Checken ob es ein besonderes Auswärtsstarkes Team ist
    if (awayTeam.id == "dortmund" ||awayTeam.id == "bayern" || awayTeam.id == "leverkusen" || awayTeam.id == "bremen"){
        awayTeamStrength = awayTeamStrength + 5;
    }

    //Besseres Team definieren, schlechteres Team definieren
    if(homeTeamStrength >= awayTeamStrength){
        betterTeam = homeTeam;
        worseTeam = awayTeam;
    }
    else if (homeTeamStrength < awayTeamStrength){
        betterTeam = awayTeam;
        worseTeam = homeTeam;
    }
    //Quotenvariablen definieren
    let betterOdds = 0.34;
    let drawOdds = 0.33;
    let worseOdds = 0.33;

    //Quoten anhand von der Stärke berechnen
    if(betterTeam.strength - betterTeam.strength == 1){
        //Sieg: 37% - Unentschieden: 35% - Niederlage: 28%
        betterOdds = 0.37;
        drawOdds = 0.35;
        worseOdds = 0.28;
    }
    else if(betterTeam.strength - betterTeam.strength == 2){
        //Sieg: 40% - Unentschieden: 33% - Niederlage: 27%
        betterOdds = 0.40;
        drawOdds = 0.33;
        worseOdds = 0.27;
    }
    else if(betterTeam.strength - betterTeam.strength == 3){
        //Sieg: 42% - Unentschieden: 30% - Niederlage: 28%
        betterOdds = 0.42;
        drawOdds = 0.30;
        worseOdds = 0.28;
    }
    else if(betterTeam.strength - betterTeam.strength == 4){
        //Sieg: 44% - Unentschieden: 28% - Niederlage: 28%
        betterOdds = 0.44;
        drawOdds = 0.28;
        worseOdds = 0.28;
    }
    else if(betterTeam.strength - betterTeam.strength == 5){
        //Sieg: 48% - Unentschieden: 26% - Niederlage: 26%
        betterOdds = 0.48;
        drawOdds = 0.26;
        worseOdds = 0.26;
    }
    else if(betterTeam.strength - betterTeam.strength == 6){
        //Sieg: 52% - Unentschieden: 23% - Niederlage: 25%
        betterOdds = 0.52;
        drawOdds = 0.23;
        worseOdds = 0.25;
    }
    else if(betterTeam.strength - betterTeam.strength == 7){
        //Sieg: 55% - Unentschieden: 20% - Niederlage: 25%
        betterOdds = 0.55;
        drawOdds = 0.20;
        worseOdds = 0.25;
    }
    else if(betterTeam.strength - betterTeam.strength == 8){
        //Sieg: 58% - Unentschieden: 19% - Niederlage: 23%
        betterOdds = 0.58;
        drawOdds = 0.19;
        worseOdds = 0.23;
    }
    else if(betterTeam.strength - betterTeam.strength == 9){
        //Sieg: 60% - Unentschieden: 18% - Niederlage: 22%
        betterOdds = 0.60;
        drawOdds = 0.18;
        worseOdds = 0.22;
    }
    else if(betterTeam.strength - betterTeam.strength == 10){
        //Sieg: 65% - Unentschieden: 15% - Niederlage:20%
        betterOdds = 0.65;
        drawOdds = 0.15;
        worseOdds = 0.20;
    }
    else if(betterTeam.strength - betterTeam.strength >10 && betterTeam.strength - betterTeam.strength <=15){
        //Sieg:70% - Unentschieden:10% - Niederlage:20%
        betterOdds = 0.70;
        drawOdds = 0.10;
        worseOdds = 0.20; 
    }
    else{
        //Sieg:80% - Unentschieden:10% - Niederlage:10%
        betterOdds = 0.33;
        drawOdds = 0.34;
        worseOdds = 0.33; 
    }

    //Outcome definieren
    let winner;
    let loser;
    let outcome = Math.random();

    if(outcome <= betterOdds){
        winner = betterTeam;
        loser = worseTeam;
    }
    else if(outcome <= betterOdds + drawOdds){
        winner = "draw";
        loser = "draw";
    }
    else{
        winner = worseTeam;
        loser = betterTeam;
    }




}



function getPenaltyScore(homeTeam, awayTeam){
    let winner;

    if(homeTeam.strength > awayTeam.strength){
        if(homeTeam.strength - awayTeam.strength == 1){
            if(Math.random() < 0.51){
                winner = homeTeam;
            }
            else{
                winner = awayTeam;
            }
        }
        else if(homeTeam.strength - awayTeam.strength == 2){
            if(Math.random() < 0.55){
                winner = homeTeam;
            }
            else{
                winner = awayTeam;
            }
        }
        else if(homeTeam.strength - awayTeam.strength == 3){
            if(Math.random() < 0.57){
                winner = homeTeam;
            }
            else{
                winner = awayTeam;
            }
        }
        else if(homeTeam.strength - awayTeam.strength == 4){
            if(Math.random() < 0.6){
                winner = homeTeam;
            }
            else{
                winner = awayTeam;
            }
        }
        else{
            if(Math.random() < 0.7){
                winner = homeTeam;
            }
            else{
                winner = awayTeam;
            }
        }
    }
    else if(homeTeam.strength < awayTeam.strength){
        if(awayTeam.strength - homeTeam.strength == 1){
            if(Math.random() < 0.49){
                winner = homeTeam;
            }
            else{
                winner = awayTeam;
            }
        }
        else if(awayTeam.strength - homeTeam.strength == 2){
            if(Math.random() < 0.45){
                winner = homeTeam;
            }
            else{
                winner = awayTeam;
            }
        }
        else if(awayTeam.strength - homeTeam.strength == 3){
            if(Math.random() < 0.42){
                winner = homeTeam;
            }
            else{
                winner = awayTeam;
            }
        }
        else if(awayTeam.strength - homeTeam.strength == 4){
            if(Math.random() < 0.4){
                winner = homeTeam;
            }
            else{
                winner = awayTeam;
            }
        }
        else{
            if(Math.random() < 0.3){
                winner = homeTeam;
            }
            else{
                winner = awayTeam;
            }
        }
    }
    else{
        if(Math.random() < 0.5){
            winner = homeTeam;
        }
        else{
            winner = awayTeam;
        }
    }

    if(winner){
        let random = Math.random() * 100;
    
        if(random < 35){
            if(winner == awayTeam){
                return "4-5";
            }
            else{
                return "5-4";
            }
        }
        else if(random >= 35 && random < 50){
            if(winner == awayTeam){
                return "3-4";
            }
            else{
                return "4-3";
            }
        }
        else if(random >= 50 && random < 60){
            if(winner == awayTeam){
                return "5-6";
            }
            else{
                return "6-5";
            }
        }
        else if(random >= 60 && random < 70){
            if(winner == awayTeam){
                return "2-3";
            }
            else{
                return "3-2";
            }
        }
        else if(random >= 70 && random < 80){
            if(winner == awayTeam){
                return "2-4";
            }
            else{
                return "4-2";
            }
        }
        else if(random >= 80 && random < 85){
            if(winner == awayTeam){
                return "3-5";
            }
            else{
                return "5-3";
            }
        }
        else if(random >= 85 && random < 90){
            if(winner == awayTeam){
                return "4-6";
            }
            else{
                return "6-4";
            }
        }
        else if(random >= 90 && random < 95){
            if(winner == awayTeam){
                return "3-6";
            }
            else{
                return "6-3";
            }
        }
        else if(random >= 95 && random < 100){
            if(winner == awayTeam){
                return "2-5";
            }
            else{
                return "5-2";
            }
        }
    }    
    else{
        return "5-4";
    }
}


function setupTable() {
    if (!teamArrays || teamArrays.length === 0) {
        alert("Error ExL03: Fehler beim Abrufen der Teams.");
        return;
    }

    // Durchlaufe alle Ligen in teamArray
    for (let teamArrayChild of teamArrays) {
        let league = teamArrayChild[0];  // Liga
        let _teams = teamArrayChild[1];  // Teams in der Liga

        // Erstellt eine Tabelle für jede Liga
        let tablePreset = document.getElementById("tablethings");

        var table = document.createElement("tbody");
        table.id = "tablethings_" + league;
        table.className = "tablethings";
        table.innerHTML = tablePreset.innerHTML;  // Vorlageninhalt (falls vorhanden)
        document.getElementById("table").appendChild(table);

        // Durchlaufe jedes Team in der aktuellen Liga
        for (let i = 0; i < _teams.length; i++) {
            var tr = document.createElement("tr");
            tr.id = _teams[i].short;

            // Pos
            var td1 = document.createElement("td");
            td1.innerText = "1";  // Hier kannst du später die Position des Teams berechnen
            td1.id = _teams[i].short + "pos";
            tr.appendChild(td1);

            // Teamcrest & Name
            var td2 = document.createElement("td");
            td2.style.display = "flex";
            td2.style.alignItems = "center";
            td2.style.gap = "5px";

            var img = document.createElement("img");
            let teamID = _teams[i].id;

            
            img.src = "./imgs/teams/" + _teams[i].crest + "/" + teamID + ".png";
            img.alt = _teams[i].name;
            img.style.maxHeight = "20px";
            img.style.maxWidth = "20px";

            img.onerror = function () {
                // Einfach die Fehlerbehandlung übernehmen und Konsole nicht nerven
                this.onerror = null; // wichtig, sonst loop!
                this.src = "./imgs/teams/placeholder.png";
            };
            

            // Erstelle den Textknoten
            var textNode = document.createTextNode(_teams[i].name);

            // Füge das Bild und den Text in die Zelle ein
            td2.appendChild(img);
            td2.appendChild(textNode);

            td2.id = _teams[i].short + "name";
            tr.appendChild(td2);

            // Weitere Spalten (Statistiken)
            ["gamesplayed", "wins", "draws", "losses", "goalsforagainst", "goaldifference", "points"].forEach((stat) => {
                var td = document.createElement("td");
                td.innerText = "0";  // Hier kannst du später echte Werte einsetzen
                td.id = _teams[i].short + stat;
                tr.appendChild(td);
            });

            // Füge das Team zur Tabelle hinzu
            table.appendChild(tr);
        }
    }
}





function updateTable(){
    let _teams = teamArray;
    for (let team of _teams) {

        if(document.getElementById(team.short + "wins") == null){
            console.error("Team " + team.short + " nicht gefunden!");
            continue;
        }
        if(document.getElementById(team.short + "draws") == null){
            console.error("Team " + team.short + " nicht gefunden!");
            continue;
        }
        if(document.getElementById(team.short + "losses") == null){
            console.error("Team " + team.short + " nicht gefunden!");
            continue;
        }
        if(document.getElementById(team.short + "points") == null){
            console.error("Team " + team.short + " nicht gefunden!");
            continue;
        }
        if(document.getElementById(team.short + "gamesplayed") == null){
            console.error("Team " + team.short + " nicht gefunden!");
            continue;
        }
        if(document.getElementById(team.short + "goalsforagainst") == null){
            console.error("Team " + team.short + " nicht gefunden!");
            continue;
        }
        if(document.getElementById(team.short + "goaldifference") == null){
            console.error("Team " + team.short + " nicht gefunden!");
            continue;
        }


        document.getElementById(team.short + "wins").innerText = team.wins;
        document.getElementById(team.short + "draws").innerText = team.draws;
        document.getElementById(team.short + "losses").innerText = team.losses;
        document.getElementById(team.short + "points").innerText = team.points;
        document.getElementById(team.short + "gamesplayed").innerText = team.games;
        document.getElementById(team.short + "goalsforagainst").innerText = team.goalsScored + "-" + team.goalsConceaded;
        document.getElementById(team.short + "goaldifference").innerText = team.goalsScored - team.goalsConceaded;
    }

    sortTable();
}

function sortTable() {
    let table = document.getElementById("tablethings_" + league);
    
    let rows = Array.from(table.getElementsByTagName("tr"));
    

    
    // Sortiert die Teams
    rows.sort((a, b) => {
        // Punkte vergleichen - höhere Punkte kommen zuerst
        let pointsA = parseInt(document.getElementById(a.id + "points").innerText);
        let pointsB = parseInt(document.getElementById(b.id + "points").innerText);
        if (pointsA !== pointsB) return pointsB - pointsA;
        
        // Tordifferenz vergleichen
        let goalDiffA = parseInt(document.getElementById(a.id + "goaldifference").innerText);
        let goalDiffB = parseInt(document.getElementById(b.id + "goaldifference").innerText);
        if (goalDiffA !== goalDiffB) return goalDiffB - goalDiffA;
        
        // Geschossene Tore vergleichen
        let goalsForA = parseInt(document.getElementById(a.id + "goalsforagainst").innerText.split('-')[0]);
        let goalsForB = parseInt(document.getElementById(b.id + "goalsforagainst").innerText.split('-')[0]);
        if (goalsForA !== goalsForB) return goalsForB - goalsForA;
        
        // Alphabetisch nach Teamnamen
        let nameA = document.getElementById(a.id + "name").innerText;
        let nameB = document.getElementById(b.id + "name").innerText;
        return nameA.localeCompare(nameB);
    });
    
    // Entferne alle Zeilen aus der Tabelle
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    
    rows.forEach((row, index) => {
        table.appendChild(row);
        
        let posElement = document.getElementById(row.id + "pos");
        //console.log(`Pos-Element für ${row.id}:`, posElement !== null);
        if (posElement) {
            posElement.innerText = (index + 1).toString();
            //console.log(`Position für ${row.id} auf ${index + 1} gesetzt`);
        } else {
            //console.error(`Pos-Element für ${row.id} nicht gefunden!`);
        }
    });
    
        // Nach der Sortierung
    //console.log("Final check - Positionen nach Sortierung:");
    rows.forEach(row => {
        let pos = document.getElementById(row.id + "pos").innerText;
        //console.log(`${row.id}: Position ${pos}, Punkte: ${document.getElementById(row.id + "points").innerText}`);

        let enabled = false;
        /*
        if(league == "Bundesliga"){
            enabled = true;
        }
        */
        if(enabled){
                if(document.getElementById(row.id + "pos").innerText == 1){
                    document.getElementById(row.id + "pos").style.backgroundColor = "gold";
                    document.getElementById(row.id + "pos").style.border = "1px solid darkgoldenrod";
                }
                else if(document.getElementById(row.id + "pos").innerText > 1 && document.getElementById(row.id + "pos").innerText <= 4){
                    document.getElementById(row.id + "pos").style.backgroundColor = "green";
                    document.getElementById(row.id + "pos").style.border = "1px solid darkgreen";
                }
                else if(document.getElementById(row.id + "pos").innerText == 5){
                    document.getElementById(row.id + "pos").style.backgroundColor = "blueviolet";
                    document.getElementById(row.id + "pos").style.border = "1px solid darkblue";
                }
                else if(document.getElementById(row.id + "pos").innerText == 6){
                    document.getElementById(row.id + "pos").style.backgroundColor = "blue";
                    document.getElementById(row.id + "pos").style.border = "1px solid darkblue";
                }
                else if(document.getElementById(row.id + "pos").innerText == 16){
                    document.getElementById(row.id + "pos").style.backgroundColor = "yellow";
                    document.getElementById(row.id + "pos").style.border = "1px solid darkgoldenrod";
                }
                else if(document.getElementById(row.id + "pos").innerText == 17 || document.getElementById(row.id + "pos").innerText == 18){
                    document.getElementById(row.id + "pos").style.backgroundColor = "red";
                    document.getElementById(row.id + "pos").style.border = "1px solid darkred";
                }
                else{
                    return;
                }



        } 
    });


}

async function newSeason() {

    document.getElementById("loadingScreen").style.display = "flex";
    document.querySelector("#loadingScreen #loadingText").innerText = `Speichere Saison 20${24 + year}/20${25 + year}.`;

    await wait(2000); // künstliche Wartezeit
    loadObj(20);
    year++;
    document.querySelector("#loadingScreen #loadingText").innerText = `Berücksichtige Auf- und Abstiege und setze neue Ligen auf für Saison 20${24 + year}/20${25 + year}.`;

    getPromotednRelegatedTeams(); // falls asynchron, dann hier auch await hinzufügen

    await wait(randomInt(50, 200)); // künstliche Wartezeit
    loadObj(5);
    document.querySelector("#loadingScreen #loadingText").innerText = `Simuliere die 1. Bundesliga - 2. Bundesliga Relegation.`;
    simulateRelegationGermany("Bundesliga", "2_Bundesliga");
    await wait(randomInt(50, 200)); // künstliche Wartezeit
    loadObj(5);
    document.querySelector("#loadingScreen #loadingText").innerText = `Simuliere die 2. Bundesliga - 3. Liga Relegation.`;
    simulateRelegationGermany("2_Bundesliga", "3_Liga");

    await wait(randomInt(50, 200)); // künstliche Wartezeit
    loadObj(5);
    document.querySelector("#loadingScreen #loadingText").innerText = `Simuliere die Premier League - Championship Playoffs.`;
    simulateEnglishPlayoffs("Premier_League", "Championship");
    await wait(randomInt(50, 200)); // künstliche Wartezeit
    loadObj(5);
    document.querySelector("#loadingScreen #loadingText").innerText = `Simuliere die Championship - EFL League One Playoffs.`;
    simulateEnglishPlayoffs("Championship", "EFL_LeagueOne");

    await wait(randomInt(50, 200)); // künstliche Wartezeit
    loadObj(5);
    document.querySelector("#loadingScreen #loadingText").innerText = `Simuliere die LaLiga2 Playoffs.`;
    simulateSpanishPlayoffs();
    
    document.querySelector("#loadingScreen #loadingText").innerText = `Simuliere die Serie B Playoffs.`;;
    await wait(randomInt(50, 200)); // künstliche Wartezeit
    loadObj(5)
    simulateItalianPlayoffs();

    document.querySelector("#loadingScreen #loadingText").innerText = `Simuliere die Eredivisie - Eerste Divisie Qualifikation.`;
    await wait(randomInt(50, 200)); // künstliche Wartezeit
    loadObj(5);
    simulateDutchPlayoffs("Eredivisie", "Eerste_Divisie");

    document.querySelector("#loadingScreen #loadingText").innerText = `Simuliere die Ligue 1 - Ligue 2 Qualifikation.`;
    await wait(randomInt(50, 200)); // künstliche Wartezeit
    loadObj(5);
    simulateFrenchPlayoffs();

    loadObj(10);
    await wait(100); // kleine Wartezeit, um smooth auszublenden
    let teamArraysss = [["Bundesliga", []], ["2_Bundesliga", []], ["3_Liga", []], ["Premier_League", []], ["Championship", []], ["EFL_LeagueOne", []], ["Eredivisie", []], ["Eerste_Divisie", []], ["La_Liga", []], ["La_Liga2", []], ["Serie_A", []], ["Serie_B", []], ["Ligue_1", []], ["Ligue_2", []]];
    let gamePlannnn = [["Bundesliga", []], ["2_Bundesliga", []], ["3_Liga", []], ["Premier_League", []], ["Championship", []], ["EFL_LeagueOne", []], ["Eredivisie", []], ["Eerste_Divisie", []], ["La_Liga", []], ["La_Liga2", []], ["Serie_A", []], ["Serie_B", []], ["Ligue_1", []], ["Ligue_2", []]];
    
    loadObj(10);
    await wait(200); // kleine Wartezeit, um smooth auszublenden
    gamePlanYears.push(gamePlannnn);
    loadObj(20);
    await wait(400); // kleine Wartezeit, um smooth auszublenden
    teamArraysYears.push(teamArraysss);

    loadObj(-100);

    //console.log(gamePlanYears);
    //console.log(teamArraysYears);
    //console.log("END");

    document.getElementById("loadingScreen").style.display = "none";

    // GUI aktualisieren
    document.getElementById("simButton").style.display = "block";
    document.getElementById("simSeasonButton").style.display = "block";
    document.getElementById("newSeasonButton").style.display = "none";

    simulated = false;
    gameDayOnSims = 1;

    document.getElementById("seasonYear").innerText = "Saison 20" + (24 + year) + "/20" + (25 + year);
    if(league == undefined){
        league = "Bundesliga";
    }


    setupNew();
    scrollToSeasonSim();
}

function loadObj(percent) {
    // Aktuelle Breite auslesen (entweder aus inline-style oder computed style)
    let curProc = 0;
    const grassElement = document.querySelector('.grass');

    // Falls width bereits als inline-style gesetzt wurde
    if (grassElement.style.width) {
        curProc = parseInt(grassElement.style.width);
    } else {
        // Falls width nur im CSS definiert ist
        curProc = parseInt(window.getComputedStyle(grassElement).width);
        // Wenn das Ergebnis in Pixeln ist, müssen wir es umrechnen
        if (!isNaN(curProc)) {
            const containerWidth = parseInt(window.getComputedStyle(grassElement.parentElement).width);
            curProc = (curProc / containerWidth) * 100;
        } else {
            curProc = 0;
        }
    }
    
    // Neue Breite setzen
    grassElement.style.width = `${curProc + percent}%`;
}


// Hilfsfunktion zum Warten
function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function simulateRelegationGermany(topLeagueName, bottomLeagueName) {
    let newTopTeam;
    let newBottomTeam;
    let scoreAggregate;
    let scoreFirstGame;

    let topRelegator, bottomRelegator;

    // Finde die Teams
    for (let _teamArray of teamArrays) {
        if (_teamArray[0] === topLeagueName) {
            let sortedTeamArray = sortTeams(_teamArray[1]);
            topRelegator = sortedTeamArray[15]; // 16. Platz
        } else if (_teamArray[0] === bottomLeagueName) {
            let sortedTeamArray = sortTeams(_teamArray[1]);
            bottomRelegator = sortedTeamArray[2]; // 3. Platz
        }
    }

    if (!topRelegator || !bottomRelegator) {
        console.error(`Fehler bei der Relegation zwischen ${topLeagueName} und ${bottomLeagueName}. Teams nicht gefunden.`);
        return;
    }

    // Hinspiel
    let firstLeg = getScore(topRelegator, bottomRelegator);
    let homeGoals1 = parseInt(firstLeg.split(' - ')[0]);
    let awayGoals1 = parseInt(firstLeg.split(' - ')[1]);
    console.log(`Hinspiel der Relegation (${topLeagueName} vs. ${bottomLeagueName}): ${topRelegator.name} ${homeGoals1}:${awayGoals1} ${bottomRelegator.name}`);

    // Rückspiel
    let secondLeg = getScore(bottomRelegator, topRelegator);
    let homeGoals2 = parseInt(secondLeg.split(' - ')[0]);
    let awayGoals2 = parseInt(secondLeg.split(' - ')[1]);
    console.log(`Rückspiel der Relegation (${bottomLeagueName} vs. ${topLeagueName}): ${bottomRelegator.name} ${homeGoals2}:${awayGoals2} ${topRelegator.name}`);

    scoreFirstGame = homeGoals1 + ":" + awayGoals1;

    // Gesamtergebnis
    let totalTopGoals = awayGoals1 + homeGoals2;
    let totalBottomGoals = homeGoals1 + awayGoals2;

    if (totalTopGoals === totalBottomGoals) {
        // Auswärtstorregel
        if (awayGoals1 > awayGoals2) {
            scoreAggregate = totalTopGoals + ":" + totalBottomGoals + " (n.A.)";
            newTopTeam = topRelegator;
            newBottomTeam = bottomRelegator;
        } else if (awayGoals1 < awayGoals2) {
            scoreAggregate = totalTopGoals + ":" + totalBottomGoals + " (n.A.)";
            newTopTeam = bottomRelegator;
            newBottomTeam = topRelegator;
        } else {
            scoreAggregate = totalTopGoals + ":" + (totalBottomGoals + 1); // Random Decision?
            newTopTeam = topRelegator;
            newBottomTeam = bottomRelegator;
        }
    } else if (totalTopGoals > totalBottomGoals) {
        scoreAggregate = totalTopGoals + ":" + totalBottomGoals;
        newTopTeam = topRelegator;
        newBottomTeam = bottomRelegator;
    } else {
        scoreAggregate = totalTopGoals + ":" + totalBottomGoals;
        newTopTeam = bottomRelegator;
        newBottomTeam = topRelegator;
    }

    console.warn(`${newTopTeam.name} gewinnt die Relegation gegen ${newBottomTeam.name}. 
Gesamtergebnis: ${bottomRelegator.short} ${scoreAggregate} ${topRelegator.short} (Hinspiel: ${topRelegator.short} ${scoreFirstGame} ${bottomRelegator.short})`);

    newTopTeam.league = topLeagueName;
    newBottomTeam.league = bottomLeagueName;

    // UI-Update
    const updateUI = (leagueName, team) => {
        let container = document.getElementById("tablethings_" + leagueName);
        let element = document.getElementById(team.short);
        if (container && element) {
            container.appendChild(element);
        } else {
            console.error(`Fehler beim UI-Update: ${team.short} oder Container nicht gefunden.`);
        }
    };

    updateUI(topLeagueName, newTopTeam);
    updateUI(bottomLeagueName, newBottomTeam);
}

function simulateEnglishPlayoffs(league, nextLeague) {
    let premierRelegated = [];
    let promotionCandidates = [];

    for (let _teamArray of teamArrays) {
        if (_teamArray[0] === league) {
            let sorted = sortTeams(_teamArray[1]);
            // Letzten 3 steigen ab
            premierRelegated = sorted.slice(-3);
        } else if (_teamArray[0] === nextLeague) {
            let sorted = sortTeams(_teamArray[1]);
            // Top 2 steigen direkt auf
            promotionCandidates = sorted.slice(2, 6); // 3. bis 6. Platz für Playoffs
        }
    }

    const getWinnerOverTwoLegs = (teamA, teamB) => {
        const score1 = getScore(teamB, teamA); // TeamB hat zuerst Heimrecht
        const score2 = getScore(teamA, teamB);
        const goals1 = score1.split(" - ").map(Number);
        const goals2 = score2.split(" - ").map(Number);
        const totalA = goals1[1] + goals2[0];
        const totalB = goals1[0] + goals2[1];
        console.log(`Hinspiel: ${teamB.name} ${goals1[0]}:${goals1[1]} ${teamA.name}`);
        console.log(`Rückspiel: ${teamA.name} ${goals2[0]}:${goals2[1]} ${teamB.name}`);
        if (totalA > totalB) return teamA;
        if (totalB > totalA) return teamB;
        // Bei Gleichstand: zufälliger Sieger (kein Auswärtstorregel)
        return Math.random() > 0.5 ? teamA : teamB;
    };

    // Halbfinale
    let semiFinal1Winner = getWinnerOverTwoLegs(promotionCandidates[0], promotionCandidates[3]); // 3. vs 6.
    let semiFinal2Winner = getWinnerOverTwoLegs(promotionCandidates[1], promotionCandidates[2]); // 4. vs 5.

    // Finale (ein Spiel im Wembley)
    const finalScore = getScore(semiFinal1Winner, semiFinal2Winner);
    const finalGoals = finalScore.split(" - ").map(Number);
    console.log(`Playoff-Finale im Wembley: ${semiFinal1Winner.name} ${finalGoals[0]}:${finalGoals[1]} ${semiFinal2Winner.name}`);
    const promotedTeam = finalGoals[0] > finalGoals[1] ? semiFinal1Winner : finalGoals[1] > finalGoals[0] ? semiFinal2Winner : (Math.random() > 0.5 ? semiFinal1Winner : semiFinal2Winner);

    console.warn(`${promotedTeam.name} gewinnt die Playoffs und steigt in die ${league} auf!`);

    // Jetzt die drei Letzten aus der oberen Liga runter, die anderen zwei aus der unteren Liga rauf
    let newLeagueTeams = [promotionCandidates[0], promotionCandidates[1], promotedTeam];
    let newLowerLeagueTeams = premierRelegated;

    newLeagueTeams.forEach(team => team.league = league);
    newLowerLeagueTeams.forEach(team => team.league = nextLeague);

    newLeagueTeams.forEach(team => {
        let teamElement = document.getElementById(team.short);
        if (teamElement) {
            document.getElementById(`tablethings_${league}`).appendChild(teamElement);
        }
    });
    newLowerLeagueTeams.forEach(team => {
        let teamElement = document.getElementById(team.short);
        if (teamElement) {
            document.getElementById(`tablethings_${nextLeague}`).appendChild(teamElement);
        }
    });
}

function simulateDutchPlayoffs() {
    let eredivisieRelegated = [];
    let eersteDivisiePlayoff = [];

    for (let _teamArray of teamArrays) {
        if (_teamArray[0] === "Eredivisie") {
            let sorted = sortTeams(_teamArray[1]);
            eredivisieRelegated = sorted.slice(-1); // Platz 16 (also drittletzter)
        } else if (_teamArray[0] === "Eerste_Divisie") {
            let sorted = sortTeams(_teamArray[1]);
            eersteDivisiePlayoff = sorted.slice(2, 8); // Plätze 3 bis 8
        }
    }

    const getWinnerOverTwoLegs = (teamA, teamB) => {
        const score1 = getScore(teamB, teamA); // schwächeres Team hat Heimrecht zuerst
        const score2 = getScore(teamA, teamB);
        const goals1 = score1.split(" - ").map(Number);
        const goals2 = score2.split(" - ").map(Number);
        const totalA = goals1[1] + goals2[0];
        const totalB = goals1[0] + goals2[1];
        if (totalA > totalB) return teamA;
        if (totalB > totalA) return teamB;
        return Math.random() > 0.5 ? teamA : teamB;
    };

    // Runde 1
    let r1match1 = getWinnerOverTwoLegs(eersteDivisiePlayoff[0], eersteDivisiePlayoff[5]); // 3. vs 8.
    let r1match2 = getWinnerOverTwoLegs(eersteDivisiePlayoff[1], eersteDivisiePlayoff[4]); // 4. vs 7.
    let r1match3 = getWinnerOverTwoLegs(eersteDivisiePlayoff[2], eersteDivisiePlayoff[3]); // 5. vs 6.

    // Runde 2
    let r2match1 = getWinnerOverTwoLegs(r1match1, r1match2);
    let r2match2 = getWinnerOverTwoLegs(r1match3, eredivisieRelegated[0]);

    // Finale (ein Spiel simuliert)
    const finalScore = getScore(r2match1, r2match2);
    const finalGoals = finalScore.split(" - ").map(Number);
    const promotedTeam = finalGoals[0] > finalGoals[1] ? r2match1 : finalGoals[1] > finalGoals[0] ? r2match2 : (Math.random() > 0.5 ? r2match1 : r2match2);

    console.warn(`${promotedTeam.name} gewinnt die Playoffs und spielt nächste Saison in der Eredivisie!`);

    // Auf- und Abstieg finalisieren
    let newEredivisieTeams = [promotedTeam];
    let newEersteTeams = [eredivisieRelegated[0]];

    newEredivisieTeams.forEach(team => team.league = "Eredivisie");
    newEersteTeams.forEach(team => team.league = "Eerste_Divisie");

    newEredivisieTeams.forEach(team => {
        let teamElement = document.getElementById(team.short);
        if (teamElement) {
            document.getElementById(`tablethings_Eredivisie`).appendChild(teamElement);
        }
    });
    newEersteTeams.forEach(team => {
        let teamElement = document.getElementById(team.short);
        if (teamElement) {
            document.getElementById(`tablethings_Eerste_Divisie`).appendChild(teamElement);
        }
    });
}

function simulateSpanishPlayoffs(){
    //Teams Initialisieren
    let team1;
    let team2;
    let team3;
    let team4;

    //Teams kriegen
    //team1 = 6. Plazierte der LaLiga2; team2 = 3. Plazierte; team3 = 5. Plazierte; team4 = 4. Plazierte
    for (let _teamArray of teamArrays) {
        if (_teamArray[0] === "La_Liga2") {
            let sorted = sortTeams(_teamArray[1]);
            team1 = sorted[5];
            team2 = sorted[2];
            team3 = sorted[4];
            team4 = sorted[3];
        } 
    }



    if(team1 != undefined && team2 != undefined && team3 != undefined && team4 != undefined){
        //Halbfinal Spiele:
        let winnerHalf1;

        let homeGoalsHalf1_1;
        let awayGoalsHalf1_1;
        let homeGoalsHalf1_2;
        let awayGoalsHalf1_2;

        let winnerHalf2;

        let homeGoalsHalf2_1;
        let awayGoalsHalf2_1;
        let homeGoalsHalf2_2;
        let awayGoalsHalf2_2;

        //Hinspiel 1:
        let scoreHalf1_1 = getScore(team1, team2);
        let split = scoreHalf1_1.split(' - ');

        homeGoalsHalf1_1 = split[0];
        awayGoalsHalf1_1 = split[1];

        console.log(`Halbfinal-1 Hinspiel LaLiga2 PlayOffs: ${team1.name} ${homeGoalsHalf1_1} : ${awayGoalsHalf1_1} ${team2.name}`);
        
        //Hinspiel 2:
        let scoreHalf2_1 = getScore(team3, team4);
        let split_2 = scoreHalf2_1.split(' - ');

        homeGoalsHalf2_1 = split_2[0];
        awayGoalsHalf2_1 = split_2[1];

        console.log(`Halbfinal-2 Hinspiel LaLiga2 PlayOffs: ${team3.name} ${homeGoalsHalf2_1}:${awayGoalsHalf2_1} ${team4.name}`);

        //Rückspiel 1:
        let scoreHalf1_2 = getScore(team2, team1);
        let split_3 = scoreHalf1_2.split(' - ');

        homeGoalsHalf1_2 = split_3[0];
        awayGoalsHalf1_2 = split_3[1];

        if((parseInt(awayGoalsHalf1_1) + parseInt(homeGoalsHalf1_2)) == (parseInt(homeGoalsHalf1_1) + parseInt(awayGoalsHalf1_2))){
            let penScore = getPenaltyScore(team2, team1);
            let penSplit = penScore.split('-');
            if(parseInt(penSplit[0]) > parseInt(penSplit[1])){
                winnerHalf1 = team2;
            }
            else{
                winnerHalf1 = team1;
            }
            console.log(`Halbfinal-1 Rückspiel LaLiga2 PlayOffs: ${team2.name} ${homeGoalsHalf1_2}:${awayGoalsHalf1_2} (Elfmeterschießen: ${penScore}) ${team1.name}`);
        }
        else{
            if((parseInt(awayGoalsHalf1_1) + parseInt(homeGoalsHalf1_2)) > (parseInt(homeGoalsHalf1_1) + parseInt(awayGoalsHalf1_2))){
                winnerHalf1 = team1;
            }
            else{
                winnerHalf1 = team2;
            }
            console.log(`Halbfinal-1 Rückspiel LaLiga2 PlayOffs: ${team2.name} ${homeGoalsHalf1_2}:${awayGoalsHalf1_2} ${team1.name}`);
        }

        console.log(`Halbfinal-1 Rückspiel LaLiga2 PlayOffs: ${winnerHalf1.name} gewinnt das Halbfinale-1 (${parseInt(homeGoalsHalf1_1) + parseInt(awayGoalsHalf1_2)}:${parseInt(awayGoalsHalf1_1) + parseInt(homeGoalsHalf1_2)})!`);

         //Rückspiel 2:
         let scoreHalf2_2 = getScore(team4, team3);
         let split_4 = scoreHalf2_2.split(' - ');
 
         homeGoalsHalf2_2 = split_4[0];
         awayGoalsHalf2_2 = split_4[1];
 
         if((parseInt(awayGoalsHalf2_1) + parseInt(homeGoalsHalf2_2)) == (parseInt(homeGoalsHalf2_1) + parseInt(awayGoalsHalf2_2))){
             let penScore = getPenaltyScore(team4, team3);
             let penSplit = penScore.split('-');
             if(parseInt(penSplit[0]) > parseInt(penSplit[1])){
                 winnerHalf2 = team4;
             }
             else{
                 winnerHalf2 = team3;
             }
             console.log(`Halbfinal-2 Rückspiel LaLiga2 PlayOffs: ${team4.name} ${homeGoalsHalf2_2}:${awayGoalsHalf2_2} (Elfmeterschießen: ${penScore}) ${team3.name}`);
         }
         else{
             if((parseInt(awayGoalsHalf2_1) + parseInt(homeGoalsHalf2_2)) > (parseInt(homeGoalsHalf2_1) + parseInt(awayGoalsHalf2_2))){
                 winnerHalf2 = team4;
             }
             else{
                 winnerHalf2 = team3;
             }
             console.log(`Halbfinal-2 Rückspiel LaLiga2 PlayOffs: ${team4.name} ${homeGoalsHalf2_2}:${awayGoalsHalf2_2} ${team3.name}`);
         }
 
         console.log(`Halbfinal-2 Rückspiel LaLiga2 PlayOffs: ${winnerHalf2.name} gewinnt das Halbfinale-1 (${parseInt(homeGoalsHalf2_1) + parseInt(awayGoalsHalf2_2)}:${parseInt(awayGoalsHalf2_1) + parseInt(homeGoalsHalf2_2)})!`);
    
         //FINALE
         if(winnerHalf1 == undefined || winnerHalf2 == undefined){return;}

         let finalWinner;
         let finalScore = getScore(winnerHalf1, winnerHalf2);
         let finalSplit = finalScore.split(' - ');
         let finalHomeGoals = finalSplit[0];
         let finalAwayGoals = finalSplit[1];

         if(parseInt(finalHomeGoals) == parseInt(finalAwayGoals)){
            let penScore = getPenaltyScore(winnerHalf1, winnerHalf2);
            let penSplit = penScore.split('-');
            if(parseInt(penSplit[0]) > parseInt(penSplit[1])){
                finalWinner = winnerHalf1;
            }
            else{
                finalWinner = winnerHalf2;
            }
            console.warn(`${finalWinner.name} gewinnt die LaLiga2 PlayOffs! Endstand: (${winnerHalf1.short} ${finalHomeGoals}:${finalAwayGoals} ${winnerHalf2.short} (Elfmeterschießen: ${penScore}))`);
         }
         else{
            if(parseInt(finalHomeGoals) > parseInt(finalAwayGoals)){
                finalWinner = winnerHalf1;
            }
            else{
                finalWinner = winnerHalf2;
            }

            console.warn(`${finalWinner.name} gewinnt die LaLiga2 PlayOffs! Endstand: (${winnerHalf1.short} ${finalHomeGoals}:${finalAwayGoals} ${winnerHalf2.short})`)
         }


         if(finalWinner){
            finalWinner.league = "La_Liga";
            document.getElementById(`tablethings_La_Liga`).appendChild(document.getElementById(finalWinner.short));
         }

    }
    else{
        return;
    }
}


function simulateItalianPlayoffs(){
    let itTeams = [];

    //Teams in die Arrays packen nach Reihenfolge

    for (let _teamArray of teamArrays) {
        if (_teamArray[0] === "Serie_B") {
            let sorted = sortTeams(_teamArray[1]);
            itTeams = sorted;
        } 
    }
    if(itTeams.length < 6){return;}

    console.log(itTeams);

    // Viertelfinale 
    let winnerVF1;
    let winnerVF2;
    let homeVF;
    let awayVF;
    for(let i = 0; i < 2 ; i++){   

        if(i == 0){
            homeVF = itTeams[5];
            awayVF = itTeams[6];
        }
        else{
            homeVF = itTeams[4];
            awayVF = itTeams[7];
        }

        let scoreVF = getScore(homeVF, awayVF);
        let splitVF = scoreVF.split(' - ');
        const score1 = parseInt(splitVF[0]);
        const score2 = parseInt(splitVF[1]);
        let penRequired = false;

        // Überprüfen, ob es zu einem Unentschieden kommt, und ggf. die Verlängerung abhandeln
        if (score1 === score2) {
            penRequired = true;
        } else {
            if(i == 0){
                winnerVF1 = score1 > score2 ? homeVF : awayVF;
            }
            else{
                winnerVF2 = score1 > score2 ? homeVF : awayVF;
            }
        }

        if (penRequired) {
            let penScore = getPenaltyScore(homeVF, awayVF);
            let penSplit = penScore.split('-');
            if(i == 0){
                winnerVF1 = parseInt(penSplit[0]) > parseInt(penSplit[1]) ? homeVF : awayVF;
            }
            else{
                winnerVF2 = parseInt(penSplit[0]) > parseInt(penSplit[1]) ? homeVF : awayVF;
            }  
            console.log(`Viertelfinale: ${homeVF.name} ${score1}:${score2} (${penScore} n.E.) ${awayVF.name}`);
        }
        else{
            console.log(`Viertelfinale: ${homeVF.name} ${score1}:${score2} ${awayVF.name}`);
        }
    }

    // Halbfinale 
    let winnerHF1;
    let winnerHF2;
    let homeHF;
    let awayHF;
    for(let i = 0; i < 2 ; i++){   

        if(i == 0){
            homeHF = winnerVF1;
            awayHF = itTeams[2];
        }
        else{
            homeHF = winnerVF2;
            awayHF = itTeams[3];
        }

        //Hinspiel
        let score1;
        let score2;
        {
            let scoreHF = getScore(homeHF, awayHF);
            let splitHF = scoreHF.split(' - ');
            score1 = parseInt(splitHF[0]);
            score2 = parseInt(splitHF[1]);

            console.log(`Halbfinal-Hinspiel: ${homeHF.name} ${score1}:${score2} ${awayHF.name}`);
        }


        //Rückspiel
        {
            let scoreHF = getScore(awayHF, homeHF);
            let splitHF = scoreHF.split(' - ');
            const aggScore1 = parseInt(splitHF[0]) + score2;
            const aggScore2 = parseInt(splitHF[1]) + score1;
            let penRequired = false;

            // Überprüfen, ob es zu einem Unentschieden kommt, und ggf. die Verlängerung abhandeln
            if (aggScore1 === aggScore2) {
                penRequired = true;
            } else {
                if(i == 0){
                    winnerHF1 = aggScore1 > aggScore2 ? awayHF : homeHF;
                }
                else{
                    winnerHF2 = aggScore1 > aggScore2 ? awayHF : homeHF;
                }
            }

            if (penRequired) {
                let penScore = getPenaltyScore(awayHF, homeHF);
                let penSplit = penScore.split('-');
                if(i == 0){
                    winnerHF1 = parseInt(penSplit[0]) > parseInt(penSplit[1]) ? awayHF : homeHF;
                }
                else{
                    winnerHF2 = parseInt(penSplit[0]) > parseInt(penSplit[1]) ? awayHF : homeHF;
                }
                console.log(`Halbfinal-Rückspiel: ${awayHF.name} ${aggScore1}:${aggScore2} (${penScore} n.E.) ${homeHF.name}`);
            }
            else{
                console.log(`Halbfinal-Rückspiel: ${awayHF.name} ${aggScore1}:${aggScore2} ${homeHF.name}`);
            }
        }
    }

    //Finale
    let winnerF;
    let homeF;
    let awayF;

    {
        if(winnerHF1 != undefined && winnerHF2 != undefined){
            homeF = winnerHF1;
            awayF = winnerHF2;
        }

        let scoreF = getScore(homeF, awayF);
        let splitF = scoreF.split(' - ');
        let score1 = splitF[0];
        let score2 = splitF[1];
        let penRequired = false;

        if(score1 == score2){
            penRequired = true;
        }
        else{
            winnerF = score1 > score2 ? homeF : awayF;
        }

        if(penRequired){
            let penScore = getPenaltyScore(homeF, awayF);
            let penSplit = penScore.split('-');

            winnerF = parseInt(penSplit[0]) > parseInt(penSplit[1]) ? homeF : awayF;

            console.log(`Finale: ${winnerHF1.name} ${score1}:${score2} (${penScore} n.E.) ${winnerHF2.name}`);
        }
        else{
            console.log(`Finale: ${winnerHF1.name} ${score1}:${score2} ${winnerHF2.name}`);
        }

        if(winnerF != undefined){
            console.warn(winnerF.name + " gewinnt die Serie B Playoffs! Enstand: " + scoreF);
        }

        winnerF.league = "Serie_A";
        document.getElementById("tablethings_Serie_A").appendChild(document.getElementById(winnerF.short));
    }



}

function simulateFrenchPlayoffs(){
    let ligue1_16;
    let ligue2_3;
    let ligue2_4;
    let ligue2_5;

    //Teams in die Arrays packen nach Reihenfolge
    for (let _teamArray of teamArrays) {
        if (_teamArray[0] === "Ligue_1") {
            let sorted = sortTeams(_teamArray[1]);
            ligue1_16 = sorted[15];
        } 
        else if (_teamArray[0] === "Ligue_2") {
            let sorted = sortTeams(_teamArray[1]);
            ligue2_3 = sorted[2];
            ligue2_4 = sorted[3];
            ligue2_5 = sorted[4];
        } 
    }
    
    if(ligue1_16 == undefined || ligue2_3 == undefined || ligue2_4 == undefined || ligue2_5 == undefined){return;}

    let winnerVF;
    let winnerHF;
    let winnerF;

    //Viertelfinale
    {
        let score = getScore(ligue2_4, ligue2_5);
        let scoreSplit = score.split(' - ');
        let score1 = parseInt(scoreSplit[0]);
        let score2 = parseInt(scoreSplit[1]);

        if(score1 == score2){
            let penScore = getPenaltyScore(ligue2_4, ligue2_5);
            let penScoreSplit = penScore.split('-');
            let penScore1 = parseInt(penScoreSplit[0]);
            let penScore2 = parseInt(penScoreSplit[1]);

            winnerVF = penScore1 > penScore2 ? ligue2_4 : ligue2_5;
            console.log(`Viertelfinale: ${ligue2_4.name} ${score1}:${score2} (${penScore1}:${penScore2} n.E.) ${ligue2_5.name}`);
        }
        else{
            winnerVF = score1 > score2 ? ligue2_4 : ligue2_5;
            console.log(`Viertelfinale: ${ligue2_4.name} ${score1}:${score2} ${ligue2_5.name}`);
        }

        if(winnerVF == undefined){
            winnerVF = Math.random() >= 0.5 ? ligue2_4 : ligue2_5;
        }
    }

    console.log(winnerVF.name);


    //Halbfinale
    {
        let score = getScore(ligue2_3, winnerVF);
        let scoreSplit = score.split(' - ');
        let score1 = parseInt(scoreSplit[0]);
        let score2 = parseInt(scoreSplit[1]);

        if(score1 == score2){
            let penScore = getPenaltyScore(ligue2_3, winnerVF);
            let penScoreSplit = penScore.split('-');
            let penScore1 = parseInt(penScoreSplit[0]);
            let penScore2 = parseInt(penScoreSplit[1]);

            winnerHF = penScore1 > penScore2 ? ligue2_3 : winnerVF;
            console.log(`Halbfinale: ${ligue2_3.name} ${score1}:${score2} (${penScore1}:${penScore2} n.E.) ${winnerVF.name}`);
        }
        else{
            winnerHF = score1 > score2 ? ligue2_3 : winnerVF;
            console.log(`Halbfinale: ${ligue2_3.name} ${score1}:${score2} ${winnerVF.name}`);
        }  
    }

    //FINALE
    {
        let score = getScore(ligue1_16, winnerHF);
        let scoreSplit = score.split(' - ');
        let score1 = parseInt(scoreSplit[0]);
        let score2 = parseInt(scoreSplit[1]);

        console.log(`Final-Hinspiel: ${ligue1_16.name} ${score1}:${score2} ${winnerHF.name}`);

        let score_2 = getScore(winnerHF, ligue1_16);
        let scoreSplit_2 = score_2.split(' - ');
        let score1_2 = parseInt(scoreSplit_2[0]);
        let score2_2 = parseInt(scoreSplit_2[1]);

        let aggScore1 = score1_2 + score2;
        let aggScore2 = score2_2 + score1;

        if(aggScore1 == aggScore2){
            let penScore = getPenaltyScore(winnerHF, ligue1_16);
            let penScoreSplit = penScore.split('-');
            let penScore1 = parseInt(penScoreSplit[0]);
            let penScore2 = parseInt(penScoreSplit[1]);

            winnerF = penScore1 > penScore2 ? winnerHF : ligue1_16;
            console.log(`Final-Rückspiel: ${winnerHF.name} ${score1_2}:${score2_2} (Gesamt: ${aggScore1}:${aggScore2}) (${penScore1}:${penScore2} n.E.) ${ligue1_16.name}`);
        }
        else{
            winnerF = aggScore1 > aggScore2 ? ligue2_3 : winnerVF;
            console.log(`Final-Rückspiel: ${winnerHF.name} ${score1_2}:${score2_2} (Gesamt: ${aggScore1}:${aggScore2}) ${ligue1_16.name}`);
        }  
    }

    if(winnerF.league == "Ligue_1"){
        console.warn(`${ligue1_16.name} hält die Klasse und bleibt in der Ligue 1! ${winnerHF.name} bleibt somit in der Ligue 2!`);
        return;
    }
    else{
        winnerF.league = "Ligue_1";
        ligue1_16.league = "Ligue_2";
        document.getElementById("tablethings_Ligue_1").appendChild(document.getElementById(winnerF.short));
        document.getElementById("tablethings_Ligue_2").appendChild(document.getElementById(ligue1_16.short));
        console.warn(`${winnerF.name} gewinnt die Playoffs und spielt nächste Saison Ligue 1! ${ligue1_16.name} steigt somit in die Ligue 2 ab!`);
    }
}

/*
#TODO:
- [ ] Champions League hinzufügen
- [ ] Europa League hinzufügen
- [ ] Conference League hinzufügen
*/



function getPromotednRelegatedTeams(){
    for (let _league of teamArrays){
        let curLeague = _league[0];
        if(curLeague == "Bundesliga"){
            let sortedleague = sortTeams(_league[1]);
            let relegatedTeam = sortedleague[16];
            let relegatedTeam2 = sortedleague[17];

            relegatedTeam.league = "2_Bundesliga";
            relegatedTeam2.league = "2_Bundesliga";

            console.warn(`Aus der 1. Bundesliga sind ${relegatedTeam.name} und ${relegatedTeam2.name} abgestiegen.`);

            document.getElementById("tablethings_2_Bundesliga").appendChild(document.getElementById(relegatedTeam.short));
            document.getElementById("tablethings_2_Bundesliga").appendChild(document.getElementById(relegatedTeam2.short));
        }
        else if(curLeague == "2_Bundesliga"){
            let sortedleague = sortTeams(_league[1]);
            let relegatedTeam = sortedleague[17];
            let relegatedTeam2 = sortedleague[16];

            relegatedTeam.league = "3_Liga";
            relegatedTeam2.league = "3_Liga";

            document.getElementById("tablethings_3_Liga").appendChild(document.getElementById(relegatedTeam.short));
            document.getElementById("tablethings_3_Liga").appendChild(document.getElementById(relegatedTeam2.short));

            let promotedTeam = sortedleague[0];
            let promotedTeam2 = sortedleague[1];

            promotedTeam.league = "Bundesliga";
            promotedTeam2.league = "Bundesliga";

            console.warn(`Aus der 2. Bundesliga sind ${promotedTeam.name} und ${promotedTeam2.name} aufgestiegen.`);

            document.getElementById("tablethings_Bundesliga").appendChild(document.getElementById(promotedTeam.short));
            document.getElementById("tablethings_Bundesliga").appendChild(document.getElementById(promotedTeam2.short));
        }
        else if(curLeague == "3_Liga"){
            let sortedleague = sortTeams(_league[1]);

            let promotedTeam = sortedleague[0];
            let promotedTeam2 = sortedleague[1];

            promotedTeam.league = "2_Bundesliga";
            promotedTeam2.league = "2_Bundesliga";

            document.getElementById("tablethings_2_Bundesliga").appendChild(document.getElementById(promotedTeam.short));
            document.getElementById("tablethings_2_Bundesliga").appendChild(document.getElementById(promotedTeam2.short));
        }
        /*
        else if(curLeague == "Premier_League"){
            let sortedleague = sortTeams(_league[1]);
            let relegatedTeam = sortedleague[17];
            let relegatedTeam2 = sortedleague[18];
            let relegatedTeam3 = sortedleague[19];

            relegatedTeam.league = "Championship";
            relegatedTeam2.league = "Championship";
            if(relegatedTeam3 != undefined){
                relegatedTeam3.league = "Championship";
            }
            document.getElementById("tablethings_Championship").appendChild(document.getElementById(relegatedTeam.short));
            document.getElementById("tablethings_Championship").appendChild(document.getElementById(relegatedTeam2.short));
            if(relegatedTeam3 != undefined){
                document.getElementById("tablethings_Championship").appendChild(document.getElementById(relegatedTeam3.short));
            }
        }
        else if(curLeague == "Championship"){
            let sortedleague = sortTeams(_league[1]);
            let relegatedTeam = sortedleague[17];
            let relegatedTeam2 = sortedleague[18];
            let relegatedTeam3 = sortedleague[19];

            relegatedTeam.league = "EFL_LeagueOne";
            relegatedTeam2.league = "EFL_LeagueOne";
            relegatedTeam3.league = "EFL_LeagueOne";

            document.getElementById("tablethings_EFL_LeagueOne").appendChild(document.getElementById(relegatedTeam.short));
            document.getElementById("tablethings_EFL_LeagueOne").appendChild(document.getElementById(relegatedTeam2.short));
            document.getElementById("tablethings_EFL_LeagueOne").appendChild(document.getElementById(relegatedTeam3.short));

            let promotedTeam = sortedleague[0];
            let promotedTeam2 = sortedleague[1];

            promotedTeam.league = "Premier_League";
            promotedTeam2.league = "Premier_League";

            document.getElementById("tablethings_Premier_League").appendChild(document.getElementById(promotedTeam.short));
            document.getElementById("tablethings_Premier_League").appendChild(document.getElementById(promotedTeam2.short));
        }
        else if(curLeague == "EFL_LeagueOne"){
            let sortedleague = sortTeams(_league[1]);
            let promotedTeam = sortedleague[0];
            let promotedTeam2 = sortedleague[1];

            promotedTeam.league = "EFL_LeagueOne";
            promotedTeam2.league = "EFL_LeagueOne";

            document.getElementById("tablethings_EFL_LeagueOne").appendChild(document.getElementById(promotedTeam.short));
            document.getElementById("tablethings_EFL_LeagueOne").appendChild(document.getElementById(promotedTeam2.short));
        }
        */
        else if(curLeague == "La_Liga"){
            let sortedleague = sortTeams(_league[1]);
            let relegatedTeam = sortedleague[17];
            let relegatedTeam2 = sortedleague[18];
            let relegatedTeam3 = sortedleague[19];

            relegatedTeam.league = "La_Liga2";
            relegatedTeam2.league = "La_Liga2";
            relegatedTeam3.league = "La_Liga2";

            document.getElementById("tablethings_La_Liga2").appendChild(document.getElementById(relegatedTeam.short));
            document.getElementById("tablethings_La_Liga2").appendChild(document.getElementById(relegatedTeam2.short));
            document.getElementById("tablethings_La_Liga2").appendChild(document.getElementById(relegatedTeam3.short));
        }
        else if(curLeague == "La_Liga2"){
            let sortedleague = sortTeams(_league[1]);
            let promotedTeam = sortedleague[0];
            let promotedTeam2 = sortedleague[1];

            promotedTeam.league = "La_Liga";
            promotedTeam2.league = "La_Liga";

            document.getElementById("tablethings_La_Liga").appendChild(document.getElementById(promotedTeam.short));
            document.getElementById("tablethings_La_Liga").appendChild(document.getElementById(promotedTeam2.short));
        }
        else if(curLeague == "Serie_A"){
            let sortedleague = sortTeams(_league[1]);
            let relegatedTeam = sortedleague[17];
            let relegatedTeam2 = sortedleague[18];
            let relegatedTeam3 = sortedleague[19];

            relegatedTeam.league = "Serie_B";
            relegatedTeam2.league = "Serie_B";
            relegatedTeam3.league = "Serie_B";

            document.getElementById("tablethings_Serie_B").appendChild(document.getElementById(relegatedTeam.short));
            document.getElementById("tablethings_Serie_B").appendChild(document.getElementById(relegatedTeam2.short));
            document.getElementById("tablethings_Serie_B").appendChild(document.getElementById(relegatedTeam3.short));
        }
        else if(curLeague == "Serie_B"){
            let sortedleague = sortTeams(_league[1]);
            let promotedTeam = sortedleague[0];
            let promotedTeam2 = sortedleague[1];

            promotedTeam.league = "Serie_A";
            promotedTeam2.league = "Serie_A";

            document.getElementById("tablethings_Serie_A").appendChild(document.getElementById(promotedTeam.short));
            document.getElementById("tablethings_Serie_A").appendChild(document.getElementById(promotedTeam2.short));
        }
        else if(curLeague == "Ligue_1"){
            let sortedleague = sortTeams(_league[1]);
            let relegatedTeam = sortedleague[16];
            let relegatedTeam2 = sortedleague[17];

            relegatedTeam.league = "Ligue_2";
            relegatedTeam2.league = "Ligue_2";

            document.getElementById("tablethings_Ligue_2").appendChild(document.getElementById(relegatedTeam.short));
            document.getElementById("tablethings_Ligue_2").appendChild(document.getElementById(relegatedTeam2.short));
        }
        else if(curLeague == "Ligue_2"){
            let sortedleague = sortTeams(_league[1]);
            let promotedTeam = sortedleague[0];
            let promotedTeam2 = sortedleague[1];

            promotedTeam.league = "Ligue_1";
            promotedTeam2.league = "Ligue_1";

            document.getElementById("tablethings_Ligue_1").appendChild(document.getElementById(promotedTeam.short));
            document.getElementById("tablethings_Ligue_1").appendChild(document.getElementById(promotedTeam2.short));
        }
        else if(curLeague == "Eredivisie"){
            let sortedleague = sortTeams(_league[1]);
            let relegatedTeam = sortedleague[16];
            let relegatedTeam2 = sortedleague[17];

            relegatedTeam.league = "Eerste_Divisie";
            relegatedTeam2.league = "Eerste_Divisie";

            document.getElementById("tablethings_Eerste_Divisie").appendChild(document.getElementById(relegatedTeam.short));
            document.getElementById("tablethings_Eerste_Divisie").appendChild(document.getElementById(relegatedTeam2.short));
        }
        else if(curLeague == "Eerste_Divisie"){
            let sortedleague = sortTeams(_league[1]);
            let promotedTeam = sortedleague[0];
            let promotedTeam2 = sortedleague[1];

            promotedTeam.league = "Eredivisie";
            promotedTeam2.league = "Eredivisie";

            document.getElementById("tablethings_Eredivisie").appendChild(document.getElementById(promotedTeam.short));
            document.getElementById("tablethings_Eredivisie").appendChild(document.getElementById(promotedTeam2.short));
        }
    }
}



function toggleExperimentalMode() {
    let checkbox = document.getElementById("experimentalMode");
    experimentalVersion = checkbox.checked;
}

function handleRightArrowKey(event) {
    if (event.key === "ArrowRight") {
        nextGameDay();
    }
}
window.addEventListener('keydown', handleRightArrowKey);

function handleLeftArrowKey(event) {
    if (event.key === "ArrowLeft") {
        prevGameDay();
    }
}
window.addEventListener('keydown', handleLeftArrowKey);

function handleOne(event) {
    if (event.key === "1") {
        menuButton("leagueselect");
    }
}
window.addEventListener('keydown', handleOne);
function handleTwo(event) {
    if (event.key === "2") {
        menuButton("seasonsim");
    }
}
window.addEventListener('keydown', handleTwo);
function handleThree(event) {
    if (event.key === "3") {
        menuButton("tableHeader");
    }
}
window.addEventListener('keydown', handleThree);

function handleS(event) {
    if (event.key === "S" || event.key === "s") {  // Akzeptiere auch "s" für Kleinbuchstaben
        event.preventDefault(); // Verhindert Standardaktionen
        if (event.shiftKey) {
            console.log("Shift + S");
            simSeason(); // Shift + S
        } else {
            simGameDay(); // Nur S, ohne Shift
        }
    }
}
window.addEventListener('keydown', handleS);





function sortTeams(_teamArray) {
    // Wir erstellen eine Kopie, um das Original-Array nicht zu verändern
    let sortedTeamArray = [..._teamArray];

    sortedTeamArray.sort((a, b) => {
        // 1. Nach Punkten
        if (b.points !== a.points) {
            return b.points - a.points;
        }

        // 2. Nach Tordifferenz
        let diffA = a.goalsScored - a.goalsConceaded;
        let diffB = b.goalsScored - b.goalsConceaded;
        if (diffB !== diffA) {
            return diffB - diffA;
        }

        // 3. Nach geschossenen Toren
        if (b.goalsScored !== a.goalsScored) {
            return b.goalsScored - a.goalsScored;
        }

        // 4. Alphabetisch
        return a.name.localeCompare(b.name);
    });

    return sortedTeamArray;
}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//#TODO: 
// - Neue Saison einfügen inkl. - Auf- und Absteige hinzufügen; Darauf achten dass 2. Mannschaften nicht aufsteigen können!; CL, EL und ECL machen;
// - Relegation hinzufügen
// - getScore() überarbeiten;
// - vllt Beliebtheit und Heimbonus hinzufügen?; 
// - Championship [NUR TEAMLOGOS], League One [NUR TEAMLOGOS]; LaLiga2 [NUR TEAMLOGOS]; SerieB [NUR TEAMLOGOS], Eerste Divise [NUR TEAMLOGOS] hinzufügen;
// - Champions-, Europa- und Conference League hinzufügen. 


//Fehlermeldungen:
// - Error ExL01: Fehler beim Erstellen der Liga.
// - Error ExL02: Fehler beim erstellen/abrufen des Spielplanes.
// - Error ExL03: Fehler beim abrufen der Teams.
// - Error ExL04: Fehler beim Abrufen der Teams: Zu wenig Teams aus der Liga gefunden, fehlerhaft.
// - Error ExL05: Fehler beim erstellen des Spielplans, fehlerhafte initialisierung.
// - Error ExL06: Fehler beim Abrufen des generierten Spielplanes.
// - Error ExL07: Fehler beim simulieren der Saison.
// - 
// - 
// - 
//...