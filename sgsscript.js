var homeTeam;
var awayTeam;
var homeTeamName;
var awayTeamName;

// script.js
document.getElementById("searchHome").addEventListener("input", function() {
    filterTeams("searchHome", "teamListHome");
});

document.getElementById("searchAway").addEventListener("input", function() {
    filterTeams("searchAway", "teamListAway");
});

// Funktion zum Filtern der Teams und Anzeigen der Optionen
function filterTeams(inputId, listId) {
    const input = document.getElementById(inputId).value.toLowerCase(); // Benutzerinput
    const filteredTeams = teams.filter(team => team.name.toLowerCase().includes(input)); // Filterteams

    const teamList = document.getElementById(listId);
    teamList.innerHTML = ""; // Vorherige Ergebnisse löschen

    if (filteredTeams.length > 0) {
        teamList.style.display = "block"; // Zeige das Dropdown an, wenn es gefilterte Teams gibt
    } else {
        teamList.style.display = "none"; // Verstecke das Dropdown, wenn keine Übereinstimmungen gefunden wurden
    }

    filteredTeams.forEach(team => {
        const listItem = document.createElement("li");
        listItem.textContent = team.name;
        listItem.addEventListener("click", () => {
            document.getElementById(inputId).value = team.name; // Setze den Text des ausgewählten Teams in das Input-Feld
            teamList.innerHTML = ""; // Lösche die Liste
            teamList.style.display = "none"; // Verstecke das Dropdown nach Auswahl
            if(inputId == "searchHome"){
                homeTeamName = team.name;
                homeTeam = team;
            }
            else if(inputId == "searchAway"){
                awayTeamName = team.name;
                awayTeam = team;
            }
        });
        teamList.appendChild(listItem); // Füge das Listenelement hinzu
    });
}

function setupMatch(){
    document.getElementById("homeTeamSelect").hidden = true;
    document.getElementById("awayTeamSelect").hidden = true;	
    document.getElementById("startButton").hidden = true;
    document.getElementById("gameWindow").hidden = false;

    document.getElementById("gameTitle").innerText = homeTeamName + " - " + awayTeamName;
    var gameInfo = document.getElementById("gameInfo");

    if (homeTeam.league && awayTeam.league) {
        if(homeTeam.league == awayTeam.league){
           gameInfo.innerHTML += "Liga: " + homeTeam.league;
        }
        else{
            gameInfo.innerHTML += "Freundschaftsspiel";
        }

    }
    else{
        gameInfo.innerHTML += "Freundschaftsspiel";
    }

    if(homeTeam.stadium){
    gameInfo.innerHTML += ", Stadion: " + homeTeam.stadium;
    }

    document.getElementById("time").innerText = "00:00";

    document.getElementById("homeShort").innerText = homeTeam.short;
    document.getElementById("awayShort").innerText = awayTeam.short;

    startMatch();
}




let time = 0;
let seconds = 0;
let isChance = false;
let matchInterval;
let simSpeed = 25; // 1 Sekunde = 1000 Millisekunden, 1/100 Sekunde = 10 Millisekunden

var homeTeamStrengh;
var awayTeamStrengh;
var momentum = 0;
var homeGoals = 0;
var awayGoals = 0;
var homePossession = 0;
var awayPossession = 0;
var homeShots = 0;
var awayShots = 0;
var homeShotsOnTarget = 0;
var awayShotsOnTarget = 0;
var homeCorners = 0;
var awayCorners = 0;
var homeFouls = 0;
var awayFouls = 0;
var homeYellowCards = 0;
var awayYellowCards = 0;
var homeRedCards = 0;
var awayRedCards = 0;

var curPossessingTeam;
var extraTimeOne = 0;
var extraTimeTwo = 0;

function updateClock() {
    let formattedTime = (time < 10 ? "0" : "") + time + ":" + (seconds < 10 ? "0" : "") + seconds;
    document.getElementById("time").innerText = formattedTime;
}

function startMatch() {
    homeTeamStrengh = homeTeam.strengh;
    awayTeamStrengh = awayTeam.strengh;

    let matchSecondsTimer = setInterval(timer, simSpeed); // Initial starte

    matchTimer = setInterval(() => {
        clearInterval(matchSecondsTimer); // Alten Timer stoppen
    
        if (isChance) {
            simSpeed = 1000;
        } else {
            simSpeed = 25;
            setPossession();
            checkIfChance();
        }
        
    

        timer(); 
        matchSecondsTimer = setInterval(timer, simSpeed); // Neuen Timer starten

        
       
    }, 1000);
    
    
}


function checkIfChance(){
    var homeChances = Math.floor(Math.random() * 100);
    var awayChances = Math.floor(Math.random() * 100);

    if (curPossessingTeam == homeTeam) {
        if (homeChances > Math.max(1, 100 - homeTeam.strength + awayTeam.strength)) { //#TODO: Das klappt nicht!
            isChance = true;
            simSpeed = 1000;
            updateActionText("Chance für " + homeTeamName + "! " + getVariationText(false, false, true));
            setTimeout(() => {  // Warte 2 Sekunden, dann führe die Aktion aus
                homeShots++;
                homeShotsOnTarget++;
                if (Math.random() * 10 > 7) {
                    homeGoals++;
                    document.getElementById("homeScore").innerText = homeGoals.toString();
                    updateActionText("TOR! " + getVariationText(true, false, false));
                    simSpeed = 25;
                    isChance = false; // Nach der Chance wieder zurücksetzen
                }
                else{
                    updateActionText("Chance vergeben! " + getVariationText(false, true, false));
                    simSpeed = 25;
                    isChance = false; // Nach der Chance wieder zurücksetzen
                }
            }, 2000);
        } 
        else if (homeChances < 15) {
            homeShots++;
        } 
        else {
            isChance = false; // Falls keine Bedingung zutrifft
            simSpeed = 25;
            console.log("Keine Chance");
        }
    }
    
    else{
        if (awayChances > Math.max(1, 100 - awayTeam.strength + homeTeam.strength)) {

            isChance = true;
            simSpeed = 1000;
            updateActionText("Chance für " + awayTeamName + "! " + getVariationText(false, false, true));
            setTimeout(() => {  // Warte 2 Sekunden, dann führe die Aktion aus
                awayShots++;
                awayShotsOnTarget++;   
                if (Math.random() * 10 > 7) {
                    awayGoals++;
                    document.getElementById("awayScore").innerText = awayGoals.toString();
                    updateActionText("TOR! " + getVariationText(true, false, false));
                    simSpeed = 25;
                    isChance = false; // Nach der Chance wieder zurücksetzen
                }
                else{
                    updateActionText("Chance vergeben! " + getVariationText(false, true, false));
                    simSpeed = 25;
                    isChance = false; // Nach der Chance wieder zurücksetzen
                }
                
            }, 2000);
        } 
        else if (awayChances < 15) {
            awayShots++;
        } 
        else {
            simSpeed = 25;
            isChance = false; // Falls keine Bedingung zutrifft
            console.log("Keine Chance");
        }
    }

    
}

function getVariationText(isGoal, isChanceAway, _isChance){
    var variationText = "";
    if(isGoal){
        var goalTexts = ["Der Ball ist perfekt geschossen!", "Guter Schuss!", "Torwartfehler, der Ball ist drin!", "Traumtooor!", "Der Ball schlägt im Winkel ein!", "Der Ball ist im Tor!", "Der Ball ist drin!", "Etwas Glück, aber Tor!"];
        variationText = goalTexts[Math.floor(Math.random() * goalTexts.length)];
    }

    else if(isChanceAway){
        var chanceAwayTexts = ["Der Ball fliegt knapp vorbei!", "Der Stürmer rutscht weg!", "Der Ball geht knapp am Tor vorbei!", "Der Ball wird abgeblockt!", "Der Ball geht ins Aus!", "Der Ball wird abgefangen!", "Der Ball wird geklärt!", "Der Ball wird abgewehrt!", "Was eine Parade vom Torwart", "Der Ball geht knapp über das Tor!"];
        variationText = chanceAwayTexts[Math.floor(Math.random() * chanceAwayTexts.length)];
    }    

    else if(_isChance){
        var chanceAwayTexts = ["Es gibt Eckball!", "Jetzt gibt es Freistoß!", "Gefährlicher Einwurf!", "Konter!", "Gute Schussgelegenheit!", "Jetzt könnte er schießen!", "Der Ball ist im Strafraum!", "Der Ball ist im 16er!", "Der Ball ist im Mittelfeld!", "Der Ball ist im Angriffsdrittel!"];
    } 

    return variationText;

}

function updateActionText(text){
    document.getElementById("actionText").innerText = text;
}

function setPossession() {
    // Dominanzwerte berechnen (0.1 - 1.0)
    var dominanceHome = homeTeamStrengh * (Math.random() * (1 - 0.1) + 0.1);
    var dominanceAway = awayTeamStrengh * (Math.random() * (1 - 0.1) + 0.1);

    if (!curPossessingTeam) {
        // Anstoß bestimmen
        curPossessingTeam = Math.random() < 0.5 ? homeTeam : awayTeam;
        homePossession = curPossessingTeam === homeTeam ? 55 : 45;
        awayPossession = 100 - homePossession;
        return updatePossession();
    }

    // Wahrscheinlichkeit berechnen (dynamischer Ansatz)
    var totalDominance = dominanceHome + dominanceAway;
    var homeWinChance = (dominanceHome / totalDominance) * 100;
    var awayWinChance = (dominanceAway / totalDominance) * 100;

    var possessionChangeRoll = Math.random() * 100;

    // Sanftere Ballbesitz-Übergänge (anstatt 100 -> 0 direkt)
    var possessionChange = Math.floor(Math.random() * 10) + 3; // 3-12% Ballbesitz-Änderung pro Wechsel

    if (curPossessingTeam === homeTeam && possessionChangeRoll > homeWinChance) {
        curPossessingTeam = awayTeam;
        homePossession = Math.max(0, homePossession - possessionChange);
        awayPossession = 100 - homePossession;
    } 
    else if (curPossessingTeam === awayTeam && possessionChangeRoll > awayWinChance) {
        curPossessingTeam = homeTeam;
        awayPossession = Math.max(0, awayPossession - possessionChange);
        homePossession = 100 - awayPossession;
    }

    updatePossession();
}



function updatePossession(){
    if(curPossessingTeam == homeTeam){
        if(!(homePossession >= 100)){
            homePossession += 1;
            if(!(awayPossession < 0)){
                awayPossession -= 1;
            }
        }
    }
    else{
        if(!(awayPossession >= 100)){
            awayPossession += 1;
            if(!(homePossession < 0)){
                homePossession -= 1;
            }
        }
    }
    console.log("Ballbesitz: " + homePossession + " - " + awayPossession);
}

function timer()
{
    if(time == 45 && seconds == 0){
        document.getElementById("time").innerText = "Halbzeit";
        clearInterval(matchTimer);
        clearInterval(matchSecondsTimer);
        
        return;
    }
    else if (time == 90){
        clearInterval(matchTimer);
        clearInterval(matchSecondsTimer);
        return;
    }
    else{
        seconds ++;
        if (seconds >= 60) {
            seconds = 0;
            if (!(time == 45 || time == 90)) {    
                time++; 
            }
        }
        document.getElementById("time").innerText = time + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    
    
}   


document.getElementById("startButton").addEventListener("click", function() {
    if(homeTeamName && awayTeamName){
        console.log("Starte Spiel: " + homeTeamName + " vs. " + awayTeamName);
        setupMatch();
        
    }
    else {
        if (homeTeamName == null && awayTeamName) {
            document.getElementById("searchHome").value = "";
            alert("Bitte wähle ein Heimteam aus!");
        } else if (homeTeamName && awayTeamName == null) {
            document.getElementById("searchAway").value = "";
            alert("Bitte wähle ein Auswärtsteam aus!");
        } else {
            document.getElementById("searchHome").value = "";
            document.getElementById("searchAway").value = "";
            alert("Bitte wähle ein Heim- und Auswärtsteam aus!");
        }        
    }

});