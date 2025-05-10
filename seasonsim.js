let league;
let gamePlan = [];
let oldGameDay = document.getElementById("gameDays").innerHTML;
let currentGameDay = 1;
let simulated = false;
let simulatedOneGameday = false;
let teamArray = [];

let oldTableHTML = document.getElementById("table").innerHTML;
let oldGameDayHTML = document.getElementById("seasonsim").innerHTML;

let experimentalVersion = true;

function bundesligaclick(){
    league = "Bundesliga";
    setupNew(true);
}

function secbundesligaclick(){
    league = "2_Bundesliga";
    setupNew(true);
}

function drligaclick(){
    league = "3_Liga";
    setupNew(true);
}

function premclick(){
    league = "Premier_League";
    setupNew(true);
}

function eredivisieclick(){
    league = "Eredivisie";
    setupNew(true);
}

function laligaclick(){
    league = "La_Liga";
    setupNew(true);
}

function serieaclick(){
    league = "Serie_A";
    setupNew(true);
}

function setupNew(bool){
    if(bool == false){
        teamArray = [];
        simulated = false;
        simulatedOneGameday = false;
        gamePlan = [];
        currentGameDay = 1;

        document.getElementById("seasonsim").style.display = "block";
        document.getElementById("table").style.display = "table";
        document.getElementById("tableHeader").hidden = false;

        loadSeason();
    }

    if(simulated == true || simulatedOneGameday == true){
        document.getElementById("promptField2").style.display = "flex";
    }
    else{
        document.getElementById("promptField2").style.display = "none";
        document.getElementById("table").innerHTML = oldTableHTML;
        document.getElementById("seasonsim").innerHTML = oldGameDayHTML;
    
        document.getElementById("seasonsim").style.display = "block";
        document.getElementById("table").style.display = "table";
        document.getElementById("tableHeader").hidden = false;

        teamArray = [];
        simulated = false;
        simulatedOneGameday = false;
        gamePlan = [];
        currentGameDay = 1;
        loadSeason();
    }
}

function loadSeason(){
    if (typeof league === 'undefined') {
        alert("Error ExL01: Fehler beim Erstellen der Liga.");
        return; // beendet die Funktion
    }

    if(gamePlan.length < 1){
        gamePlan = generateGamePlan(league);
    }

    loadGameDay(currentGameDay);
    setupTable();
}

function generateGamePlan(_league){
    if (typeof _league === 'undefined') {
        alert("Error ExL02: Fehler beim erstellen/abrufen des Spielplanes.");
        return; // beendet die Funktion
    }
    if (typeof teams === 'undefined') {
        alert("Error ExL03: Fehler beim Abrufen der Teams.");
        return; // beendet die Funktion
    }
    
    for(let i = 0; i < teams.length; i++){
        if(teams[i].league == league){
            teamArray.push(teams[i]);
            let homeTeam = teams[i];
            homeTeam.points = 0;
            homeTeam.wins = 0;
            homeTeam.draws = 0;
            homeTeam.losses = 0;
            homeTeam.goalsScored = 0;
            homeTeam.goalsConceaded = 0;
            homeTeam.games = 0;
            homeTeam.easteregg = "Du Spanner was durchsuchst du meine Files?";
        }
    }

    if (teamArray.length < 10){
        alert("Error ExL04: Fehler beim Abrufen der Teams: Zu wenig Teams aus der Liga gefunden, fehlerhaft.");
        return; // beendet die Funktion
    }

    let numTeams = teamArray.length;
    let numMatchdays = (numTeams - 1) * 2;
    let gameDays = [];

    let rotatingTeams = teamArray.slice(1); // Erstes Team bleibt fix, die anderen rotieren

    for (let day = 0; day < numMatchdays; day++) {
        let gamesForDay = [];

        // Erstes Spiel (fixes Team gegen rotierendes Team)
        let home = day % 2 === 0 ? teamArray[0] : rotatingTeams[0];
        let away = day % 2 === 0 ? rotatingTeams[0] : teamArray[0];
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
    if(gamePlan == []){
        alert("Error ExL06: Fehler beim Abrufen des generierten Spielplanes.");
        return; // beendet die Funktion
    }

    let curGameDay = gamePlan[gameDay - 1]; // Hole den aktuellen Spieltag
    let gameDayTemplate = document.querySelector("#gameDayTemplate .game"); // Vorlage abrufen

    // Füge das neue Element in den Container (NICHT die Vorlage!) ein
    document.getElementById("gameDays").innerHTML = oldGameDay;
    curGamedayDiv = document.createElement("div");
    curGamedayDiv.id = "gameDay" + gameDay;
    curGamedayDiv.innerHTML = document.querySelector("#gameDayTemplate").innerHTML;
    curGamedayDiv.className = "gameDay";
    document.getElementById("gameDays").appendChild(curGamedayDiv);
    document.getElementById("gameDayTemplate").style.display = "none";

    for (let i = 0; i < curGameDay.length; i++) {
        let curGame = document.createElement("div"); // Neues Spielelement erstellen
        curGame.innerHTML = gameDayTemplate.innerHTML; // Vorlage kopieren
        curGame.id = "game" + (1 + i); // ID setzen
        curGame.className = "game"; // Class setzen
        
        // Teams einfügen
        curGame.querySelector(".team-container:first-child #team1").innerHTML = curGameDay[i][0].name;
        curGame.querySelector(".team-container:last-child #team2").innerHTML = curGameDay[i][1].name;

        let homelogo = curGame.querySelector(".team-container:first-child #team1logo");
        let awaylogo = curGame.querySelector(".team-container:last-child #team2logo");

        


        curGame.querySelector("#score").innerHTML = curGameDay[i][2];
        curGame.querySelector("#score").className = "score";

        curGame.querySelector("#score").addEventListener("mouseenter", function() {
            //console.log("LOL");
            this.dataset.originalText = this.innerText;
            /*
            if(this.innerText == "TBD"){
                this.innerText = "Simulieren";
                this.addEventListener("click", function(){
                    let homeTeam = curGameDay[i][0];
                    let awayTeam = curGameDay[i][1];
                    let score = getScore(homeTeam, awayTeam);
                    curGameDay[i][2] = score;
                    loadGameDay(currentGameDay);
                    updateTable();
                    console.log("Hey");
                });            
            }
                */
        });
        
        curGame.querySelector("#score").addEventListener("mouseleave", function() {
            this.innerText = this.dataset.originalText;
        });

        homelogo.src = "./imgs/"+"teams/"+league+"/"+curGameDay[i][0].id+".png";
        awaylogo.src = "./imgs/"+"teams/"+league+"/"+curGameDay[i][1].id+".png";

        homelogo.onerror = function() {
            homelogo.src = "./imgs/teams/placeholder.png";
        };

        awaylogo.onerror = function() {
            awaylogo.src = "./imgs/teams/placeholder.png";
        };

        document.querySelector("#gameDay" + gameDay).appendChild(curGame);

        //console.log(curGameDay[i][2]);
    }

    //#TODO: Spielplanerstellung überarbeiten, Ergebnisse Simulieren, Tabelle einfügen

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
    let scores = [];
    let gameDayDiv = document.getElementById("gameDay" + currentGameDay);

    for (let game of gameDayDiv.children){
        for (let gameChild of game.children){
            if (gameChild.id == "score"){
                if(gameChild.innerText == "TBD"){
                    let homeTeam;
                    let awayTeam;
                    let curGameDayPlan = gamePlan[currentGameDay - 1];

                    if(curGameDayPlan.length <= 0) {
                        alert("Error ExL06: Fehler beim Abrufen des generierten Spielplanes.");
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
                        loadGameDay(currentGameDay);
                        
                        console.log("Update Tabelle")
                        updateTable();
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
                        alert("Das Spiel: "+homeTeamName+" - "+awayTeamName+", wurde bereits simuliert.");
                        return;
                    }
                }
            }
        }
    }

}


function simSeason(outcome){
    if (outcome == 0){
        document.getElementById("promptField").style.display = "flex";
    }
    else if (outcome == 2){
        document.getElementById("promptField").style.display = "none";
    }
    else{
        document.getElementById("simSeasonButton").style.display = "none";
        document.getElementById("simButton").style.display = "none";
        document.getElementById("promptField").style.display = "none";
        if(gamePlan != undefined && simulated == false){
            simulated = true;
            for (let i = 0; i < gamePlan.length; i++){
                for (let game of gamePlan[i]){ 
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

    updateTable();
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
                worseQuote = 0.26;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 6){
                strongerQuote = 0.52;
                worseQuote = 0.23;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 7){
                strongerQuote = 0.55;
                worseQuote = 0.2;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 8){
                strongerQuote = 0.58;
                worseQuote = 0.19;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 9){
                strongerQuote = 0.6;
                worseQuote = 0.18;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 10){
                strongerQuote = 0.65;
                worseQuote = 0.15;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength > 10 && strongerTeam.strength - worseTeam.strength <= 15){
                strongerQuote = 0.7;
                worseQuote = 0.10;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength > 15 && strongerTeam.strength - worseTeam.strength <= 20){
                strongerQuote = 0.75;
                worseQuote = 0.06;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength > 25 && strongerTeam.strength - worseTeam.strength <= 40){
                strongerQuote = 0.8;
                worseQuote = 0.04;
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
                notMuchGoals = 0.49;
                normalGoals = 0.40;
                manyGoals = 0.10;
                veryManyGoals = 0.01;
            }

            else if(homeQuote - awayQuote > 0.03 && homeQuote - awayQuote <= 0.06){
                notMuchGoals = 0.43;
                normalGoals = 0.35;
                manyGoals = 0.20;
                veryManyGoals = 0.02;
            }

            else if(homeQuote - awayQuote > 0.06 && homeQuote - awayQuote <= 0.1){
                notMuchGoals = 0.39;
                normalGoals = 0.36;
                manyGoals = 0.25;
                veryManyGoals = 0.05;
            }

            else if(homeQuote - awayQuote > 0.1 && homeQuote - awayQuote <= 0.15){
                notMuchGoals = 0.3;
                normalGoals = 0.38;
                manyGoals = 0.25;
                veryManyGoals = 0.07;
            }

            else {
                notMuchGoals = 0.20;
                normalGoals = 0.35;
                manyGoals = 0.35;
                veryManyGoals = 0.10;
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
                notMuchGoals = 0.46;
                normalGoals = 0.37;
                manyGoals = 0.16;
                veryManyGoals = 0.01;
            }

            else if(awayQuote - homeQuote > 0.03 && awayQuote - homeQuote <= 0.06){
                notMuchGoals = 0.44;
                normalGoals = 0.36;
                manyGoals = 0.17;
                veryManyGoals = 0.03;
            }

            else if(awayQuote - homeQuote > 0.06 && awayQuote - homeQuote <= 0.1){
                notMuchGoals = 0.38;
                normalGoals = 0.38;
                manyGoals = 0.20;
                veryManyGoals = 0.05;
            }

            else if(awayQuote - homeQuote > 0.1 && awayQuote - homeQuote <= 0.15){
                notMuchGoals = 0.33;
                normalGoals = 0.37;
                manyGoals = 0.30;
                veryManyGoals = 0.07;
            }

            else {
                notMuchGoals = 0.10;
                normalGoals = 0.30;
                manyGoals = 0.40;
                veryManyGoals = 0.09;
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
                        console.log("differenz: "+diff + ", Heimteam ("+homeTeam.short+") Strengh: "+homeTeam.strength+"(+"+ addedstr + "), Auswärtst ("+awayTeam.short+") Strengh: "+awayTeam.strength+ "+ (-"+ addedstr + ")");
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
                        console.log("differenz: "+diff + ", Heimteam ("+homeTeam.short+") Strengh: "+homeTeam.strength+"(-"+ addedstr + "), Auswärtst ("+awayTeam.short+") Strengh: "+awayTeam.strength+ "(+"+ addedstr + ")");
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



function setupTable(){
   if(teamArray == []){
        alert("Error ExL03: Fehler beim abrufen der Teams.");
        return;
   }

   let _teams = teamArray;
  
     

   for (let i = 0; i < _teams.length; i++) {
    var table = document.getElementById("tablethings");

    var tr = document.createElement("tr");
    tr.id = _teams[i].short;

    // Pos
    var td1 = document.createElement("td");
    td1.innerText = "1";
    td1.id = _teams[i].short + "pos";
    tr.appendChild(td1);

    // Teamcrest & Name
    var td2 = document.createElement("td");
    td2.style.display = "flex";
    td2.style.alignItems = "center";
    td2.style.gap = "5px";

    var img = document.createElement("img");
    let teamID = _teams[i].id; // Speichere den Team-Namen in einer lokalen Variablen

    img.src = "./imgs/teams/" + league + "/" + teamID + ".png";
    img.alt = _teams[i].name;
    img.style.maxHeight = "20px";
    img.style.maxWidth = "20px";

    img.onerror = ((image) => {
        return function () {
            if (image.src.includes("placeholder.png")) return;
            image.src = "./imgs/teams/placeholder.png";
            console.log("Hi: " + teamID);
        };
    })(img);

    // Erstelle den Textknoten
    var textNode = document.createTextNode(_teams[i].name);

    // Füge das Bild und den Text in die Zelle ein
    td2.appendChild(img);
    td2.appendChild(textNode);

    td2.id = _teams[i].short + "name";
    tr.appendChild(td2);

    // Weitere Spalten
    ["gamesplayed", "wins", "draws", "losses", "goalsforagainst", "goaldifference", "points"].forEach((stat) => {
        var td = document.createElement("td");
        td.innerText = "0";
        td.id = _teams[i].short + stat;
        tr.appendChild(td);
    });

    table.appendChild(tr);
}


}

function updateTable(){
    let _teams = teamArray;
    for (let team of _teams) {
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
    let table = document.getElementById("tablethings");
    
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


function toggleExperimentalMode() {
    let checkbox = document.getElementById("experimentalMode");
    experimentalVersion = checkbox.checked;
}




function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


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