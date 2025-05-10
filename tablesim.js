//Globale Variablen
var _teams = [];
let inttable = document.getElementById("inttablethings");
//Funktionen


//Buttonklick-Funktion

//DE
function bundesligaclick(){
    if(_teams){
        let table = document.getElementById("tablethings");

        _teams = [];

        if(!table.hidden){
            table.innerHTML = "";
        }

        resetGui();
    }
    filltable("Bundesliga");
}

function resetGui(){
    document.getElementById("inttable").hidden = true;
    document.getElementById("tournament").style.display = "none";
    document.getElementById("qualifiers").style.display = "none";
    document.getElementById("comp").style.display = "none";
    document.getElementById("tablefooter").hidden = true;
    document.getElementById("fsfooter").hidden = true;
    document.getElementById("tableheader").hidden = true;
    document.getElementById("koButton").hidden = true;

    console.log("CLEAR");
}

function secbundesligaclick(){
    if(_teams){
        let table = document.getElementById("tablethings");
        _teams = [];
        if(!table.hidden){
            table.innerHTML = "";
        }

        resetGui();
    }
    filltable("2_Bundesliga");
}

function drligaclick(){
    if(_teams){
        let table = document.getElementById("tablethings");
        _teams = [];
        if(!table.hidden){
            table.innerHTML = "";
        }

        resetGui();
    }
    filltable("3_Liga");
}

//EN
function premclick(){
    if(_teams){
        let table = document.getElementById("tablethings");
        _teams = [];
        if(!table.hidden){
            table.innerHTML = "";
        }

        resetGui();
    }
    filltable("Premier_League");
}

//NL
function eredivisieclick(){
    if(_teams){
        let table = document.getElementById("tablethings");
        _teams = [];
        if(!table.hidden){
            table.innerHTML = "";
        }

        resetGui();
    }
    filltable("Eredivisie");
}

//IT
function serieaclick(){
    if(_teams){
        let table = document.getElementById("tablethings");
        _teams = [];
        if(!table.hidden){
            table.innerHTML = "";
        }

        resetGui();
    }
    filltable("Serie_A");
}

//SP
function laligaclick(){
    if(_teams){
        let table = document.getElementById("tablethings");
        _teams = [];
        if(!table.hidden){
            table.innerHTML = "";
        }

        resetGui();
    }
    filltable("La_Liga");
}

//Tabelle-füllen-Funktion
//Füllt die Tablle Stück für Stück anhand der Teams.

function filltable(vleague){
    for (let i = 0; i < teams.length; i++){
        if (teams[i] && teams[i].league == vleague) {
            _teams.push(teams[i]);
            //console.log("Team: " + teams[i].name + " zu den Teams hinzugefügt!");
        } else {
            //console.log("Ungültiges Team oder fehlende 'league' Eigenschaft bei Index " + i);
        }
    }

    if (vleague == "Bundesliga"){
        document.getElementById("vtablefooter").hidden = false;
        document.querySelector("#vtablefooter #text").innerHTML = "Abkürzungen: <br>'#': Tabellenposition <br>'SP': Absolvierte Spiele <br>'G'; 'U'; 'V': Siege, Unentschieden und Niederlagen <br>'+/-': Geschossene Tore / Gegentore <br>'TD': Tordifferenz <br>'PKT': Punkte <br><br>Platzierungen:<br>1: Bundesliga-Sieger<br>1-4: Direkte Qualifikation für die Champions League <br>5: Direkte Qualifikation für die Europa League<br>6: Direkte Qualifikation für die Conference League <br>16: Relegation zur 2. Bundesliga <br>17&18: Direkter Abstieg in die 2. Bundesliga";
    } 
    else if (vleague == "2_Bundesliga"){
        document.getElementById("vtablefooter").hidden = false;
        document.querySelector("#vtablefooter #text").innerHTML = "Abkürzungen: <br>'#': Tabellenposition <br>'SP': Absolvierte Spiele <br>'G'; 'U'; 'V': Siege, Unentschieden und Niederlagen <br>'+/-': Geschossene Tore / Gegentore <br>'TD': Tordifferenz <br>'PKT': Punkte <br><br>Platzierungen:<br>1&2: Direkter Aufstieg in die 1. Bundesliga<br>3: Relegation zur 1. Bundesliga <br>16: Relegation zur 3. Liga <br>17&18: Direkter Abstieg in die 3. Liga";
    } 
    else if (vleague == "3_Liga"){
        document.getElementById("vtablefooter").hidden = false;
        document.querySelector("#vtablefooter #text").innerHTML = "Abkürzungen: <br>'#': Tabellenposition <br>'SP': Absolvierte Spiele <br>'G'; 'U'; 'V': Siege, Unentschieden und Niederlagen <br>'+/-': Geschossene Tore / Gegentore <br>'TD': Tordifferenz <br>'PKT': Punkte <br><br>Platzierungen:<br>1&2: Direkter Aufstieg in die 2. Bundesliga<br>3: Relegation zur 2. Bundesliga <br>17-20: Direkter Abstieg in die Regionalliga";
    } 
    else if (vleague == "Premier_League"){
        document.getElementById("vtablefooter").hidden = false;
        document.querySelector("#vtablefooter #text").innerHTML = "Abkürzungen: <br>'#': Tabellenposition <br>'SP': Absolvierte Spiele <br>'G'; 'U'; 'V': Siege, Unentschieden und Niederlagen <br>'+/-': Geschossene Tore / Gegentore <br>'TD': Tordifferenz <br>'PKT': Punkte <br><br>Platzierungen:<br>1: Premier_League-Sieger<br>1-4: Direkte Qualifikation für die Champions League <br>5: Direkte Qualifikation für die Conference League <br>18-20: Direkter Abstieg in die EFL Championship";
    } 

    else if (vleague == "Eredivisie"){
        document.getElementById("vtablefooter").hidden = false;
        document.querySelector("#vtablefooter #text").innerHTML = "Abkürzungen: <br>'#': Tabellenposition <br>'SP': Absolvierte Spiele <br>'G'; 'U'; 'V': Siege, Unentschieden und Niederlagen <br>'+/-': Geschossene Tore / Gegentore <br>'TD': Tordifferenz <br>'PKT': Punkte <br><br>Platzierungen:<br>1: Eredivisie-Sieger<br>1-2: Direkte Qualifikation für die Champions League <br>3: Qualifikations-Play-Off's für die Champions League <br>4: Qualifikations-Play-Off's für die Europa League <br>5-8: Qualifikations-Play-Off's für die Conference League <br>16: Relegation zur Eerste Divisie <br>17&18: Direkter Abstieg in die Eerste Divisie";
    }

    else if (vleague == "Serie_A"){
        document.getElementById("vtablefooter").hidden = false;
        document.querySelector("#vtablefooter #text").innerHTML = "Abkürzungen: <br>'#': Tabellenposition <br>'SP': Absolvierte Spiele <br>'G'; 'U'; 'V': Siege, Unentschieden und Niederlagen <br>'+/-': Geschossene Tore / Gegentore <br>'TD': Tordifferenz <br>'PKT': Punkte <br><br>Platzierungen:<br>1: Serie_A-Sieger<br>1-4: Direkte Qualifikation für die Champions League <br>5: Direkte Qualifikation für die Europa League<br>6: Qualifikations-Play-Off's für die Conference League <br>18-20: Direkter Abstieg in die Serie B";
    } 

    else if (vleague == "La_Liga"){
        document.getElementById("vtablefooter").hidden = false;
        document.querySelector("#vtablefooter #text").innerHTML = "Abkürzungen: <br>'#': Tabellenposition <br>'SP': Absolvierte Spiele <br>'G'; 'U'; 'V': Siege, Unentschieden und Niederlagen <br>'+/-': Geschossene Tore / Gegentore <br>'TD': Tordifferenz <br>'PKT': Punkte <br><br>Platzierungen:<br>1: La_Liga-Sieger<br>1-4: Direkte Qualifikation für die Champions League <br>5: Direkte Qualifikation für die Europa League<br>6: Qualifikations-Play-Off's für die Conference League <br>18-20: Direkter Abstieg in die LaLiga2";
    } 


    if(_teams){
        for(let i = 0; i < _teams.length; i++){
            var table = document.getElementById("tablethings");

            var tr = document.createElement("tr");
            tr.id = _teams[i].short;

            //Pos
            var td1 = document.createElement("td");
            td1.innerText = "1"; 
            td1.id = _teams[i].short+"pos"
            tr.appendChild(td1); 

            //Name
            var td2 = document.createElement("td");
            td2.innerText = _teams[i].name; 
            td2.id = _teams[i].short+"name"
            tr.appendChild(td2);  

            var td3 = document.createElement("td");
            td3.innerText = "0"; 
            td3.id = _teams[i].short+"gamesplayed"
            tr.appendChild(td3); 

            var td4 = document.createElement("td");
            td4.innerText = "0"; 
            td4.id = _teams[i].short+"wins";
            tr.appendChild(td4);

            var td5 = document.createElement("td");
            td5.innerText = "0";
            td5.id = _teams[i].short+"draws";
            tr.appendChild(td5);

            var td6 = document.createElement("td");
            td6.innerText = "0";
            td6.id = _teams[i].short+"losses";
            tr.appendChild(td6);

            var td7 = document.createElement("td");
            td7.innerText = "0-0";
            td7.id = _teams[i].short+"goalsforagainst";
            tr.appendChild(td7);

            var td8 = document.createElement("td");
            td8.innerText = "0";
            td8.id = _teams[i].short+"goaldifference";
            tr.appendChild(td8);

            var td9 = document.createElement("td");
            td9.innerText = "0";
            td9.id = _teams[i].short+"points";
            tr.appendChild(td9);



            table.appendChild(tr);
            //console.log("Team " + _teams[i].name + " zur Tabelle hinzugefügt.")
        }
    }

    document.getElementById("table").hidden = false;
    simTable(vleague);
}

//Tabelle simulieren funktion.

function simTable(curLeague){
    var gamedays;
    if(curLeague == "Bundesliga" || curLeague == "2_Bundesliga" || curLeague == "Serie_A" || curLeague == "Eredivisie"){
        gamedays = 34;
    }
    else if(curLeague == "Premier_League" || curLeague == "La_Liga" || "3_Liga"){
        gamedays = 38;
    }
    
    //Attribute initialisieren
    for (let i = 0; i < _teams.length; i++){
        _teams[i].pos = 1;
        _teams[i].gamesPlayed = 0;
        _teams[i].wins = 0;
        _teams[i].draws = 0;
        _teams[i].losses = 0;
        _teams[i].goalsScored = 0;
        _teams[i].goalsConceaded = 0;
        _teams[i].points = 0;
    }
    //#TODO: Spiele simulieren

    let matches = [];

    // **Hin- & Rückrunde erstellen**
    for (let i = 0; i < _teams.length; i++) {
        for (let j = i + 1; j < _teams.length; j++) {
            matches.push({ home: _teams[i], away: _teams[j] });  // Hinspiel
            matches.push({ home: _teams[j], away: _teams[i] });  // Rückspiel
        }
    }

    // **Alle Spiele durchgehen und simulieren**
    for (let match of matches) {
        let homeTeam = match.home;
        let awayTeam = match.away;

        // **Stärke mit Zufallsfaktor**
        let homeStrength = homeTeam.strength + Math.random() * 15 - Math.random() * 10;  
        let awayStrength = awayTeam.strength + Math.random() * 15 - Math.random() * 10;
        let homeGoals = 0;
        let awayGoals = 0;

        

        if(homeTeam.league == "2_Bundesliga"){
            if(homeTeam.strength >= 70){
                homeGoals = Math.round(Math.random() * 4);
            }
            else if(homeTeam.strength >= 67 && homeTeam.strength <= 69){
                homeGoals = Math.round(Math.random() * 3);
            }
            else if (homeTeam.strength < 67 && homeTeam.strength >= 65){
                homeGoals = Math.round(Math.random() * 2);
            }
            else if (homeTeam.strength < 65 && homeTeam.strength >= 60){
                homeGoals = Math.round(Math.random() * 1);
            }
            else{
                homeGoals = Math.round(Math.random() * 2);
            }
    
            if(awayTeam.strength >= 70){
                awayGoals = Math.round(Math.random() * 4);
            }
            else if (awayTeam.strength < 67 && awayTeam.strength >= 68){
                awayGoals = Math.round(Math.random() * 3);
            }
            else if (awayTeam.strength < 67 && awayTeam.strength >= 65){
                awayGoals = Math.round(Math.random() * 2);
            }
            else if (awayTeam.strength < 65 && awayTeam.strength >= 60){
                awayGoals = Math.round(Math.random() * 1);
            }
            else{
                awayGoals = Math.round(Math.random() * 1);
            }

            
        }
        else if(homeTeam.league == "3_Liga"){
            if(homeTeam.strength >= 60){
                homeGoals = Math.round(Math.random() * 4);
            }
            else if(homeTeam.strength >= 57 && homeTeam.strength <= 59){
                homeGoals = Math.round(Math.random() * 3);
            }
            else if (homeTeam.strength < 57 && homeTeam.strength >= 55){
                homeGoals = Math.round(Math.random() * 2);
            }
            else if (homeTeam.strength < 55 && homeTeam.strength >= 50){
                homeGoals = Math.round(Math.random() * 1);
            }
            else{
                homeGoals = Math.round(Math.random() * 2);
            }
    
            
            if(awayTeam.strength >= 60){
                awayGoals = Math.round(Math.random() * 4);
            }
            else if (awayTeam.strength < 57 && awayTeam.strength >= 59){
                awayGoals = Math.round(Math.random() * 3);
            }
            else if (awayTeam.strength < 57 && awayTeam.strength >= 55){
                awayGoals = Math.round(Math.random() * 2);
            }
            else if (awayTeam.strength < 55 && awayTeam.strength >= 50){
                awayGoals = Math.round(Math.random() * 1);
            }
            else{
                awayGoals = Math.round(Math.random() * 1);
            }
        }
        else if(homeTeam.league == "Eredivisie"){
            if(homeTeam.strength >= 80){
                homeGoals = Math.round(Math.random() * 4);
            }
            else if(homeTeam.strength >= 75 && homeTeam.strength <= 79){
                homeGoals = Math.round(Math.random() * 3);
            }
            else if (homeTeam.strength < 75 && homeTeam.strength >= 70){
                homeGoals = Math.round(Math.random() * 2);
            }
            else if (homeTeam.strength < 70 && homeTeam.strength >= 65){
                homeGoals = Math.round(Math.random() * 2);
            }
            else{
                homeGoals = Math.round(Math.random() * 1);
            }
    
            
            if(awayTeam.strength >= 80){
                awayGoals = Math.round(Math.random() * 4);
            }
            else if (awayTeam.strength <= 79 && awayTeam.strength >= 75){
                awayGoals = Math.round(Math.random() * 3);
            }
            else if (awayTeam.strength < 75 && awayTeam.strength >= 70){
                awayGoals = Math.round(Math.random() * 2);
            }
            else if (awayTeam.strength < 70 && awayTeam.strength >= 65){
                awayGoals = Math.round(Math.random() * 1);
            }
            else{
                awayGoals = Math.round(Math.random() * 1);
            }
        }
        else{
            if(homeTeam.strength >= 89){
                homeGoals = Math.round(Math.random() * 6);
            }
            else if(homeTeam.strength >= 85 && homeTeam.strength <= 88){
                homeGoals = Math.round(Math.random() * 5);
            }
            else if (homeTeam.strength < 85 && homeTeam.strength >= 77){
                homeGoals = Math.round(Math.random() * 4);
            }
            else if (homeTeam.strength < 77 && homeTeam.strength >= 74){
                homeGoals = Math.round(Math.random() * 3);
            }
            else{
                homeGoals = Math.round(Math.random() * 2);
            }
    
            if(awayTeam.strength >= 88){
                awayGoals = Math.round(Math.random() * 5);
            }
            else if (awayTeam.strength < 88 && awayTeam.strength >= 86){
                awayGoals = Math.round(Math.random() * 4);
            }
            else if (awayTeam.strength < 86 && awayTeam.strength >= 75){
                awayGoals = Math.round(Math.random() * 3);
            }
            else if (awayTeam.strength < 77 && awayTeam.strength >= 74){
                awayGoals = Math.round(Math.random() * 2);
            }
            else{
                awayGoals = Math.round(Math.random() * 1);
            }
        }

        // **Punkte verteilen**
        if (homeGoals > awayGoals) {
            homeTeam.wins++;
            awayTeam.losses++;
            homeTeam.gamesPlayed++;
            awayTeam.gamesPlayed++;
            homeTeam.goalsScored += homeGoals;
            homeTeam.goalsConceaded += awayGoals;
            awayTeam.goalsScored += awayGoals;
            awayTeam.goalsConceaded += homeGoals;
            homeTeam.points += 3;
        } else if (homeGoals < awayGoals) {
            awayTeam.wins++;
            homeTeam.losses++;
            homeTeam.gamesPlayed++;
            awayTeam.gamesPlayed++;
            awayTeam.points += 3;
            homeTeam.goalsScored += homeGoals;
            homeTeam.goalsConceaded += awayGoals;
            awayTeam.goalsScored += awayGoals;
            awayTeam.goalsConceaded += homeGoals;
        } else {
            homeTeam.draws++;
            awayTeam.draws++;
            homeTeam.gamesPlayed++;
            awayTeam.gamesPlayed++;
            homeTeam.points++;
            awayTeam.points++;
            homeTeam.goalsScored += homeGoals;
            homeTeam.goalsConceaded += awayGoals;
            awayTeam.goalsScored += awayGoals;
            awayTeam.goalsConceaded += homeGoals;
        }
    }

    document.getElementById("header").innerText = "Simulierte Tabelle - " + curLeague + ":"
    document.getElementById("header").hidden = false;

    // **Tabelle aktualisieren**
    for (let team of _teams) {
        document.getElementById(team.short + "wins").innerText = team.wins;
        document.getElementById(team.short + "draws").innerText = team.draws;
        document.getElementById(team.short + "losses").innerText = team.losses;
        document.getElementById(team.short + "points").innerText = team.points;
        document.getElementById(team.short + "gamesplayed").innerText = team.gamesPlayed;
        document.getElementById(team.short + "goalsforagainst").innerText = team.goalsScored + "-" + team.goalsConceaded;
        document.getElementById(team.short + "goaldifference").innerText = team.goalsScored - team.goalsConceaded;
    }


    
    //console.log("Funktion existiert: ", typeof sortTableByMultipleCriteria === "function");
    BLsortTableByMultipleCriteria();

}


//Tabelle sortieren Funktion
function BLsortTableByMultipleCriteria() {
    //console.log("beginne sortierung");
    let table = document.getElementById("tablethings");
    //console.log("Table gefunden:", table !== null);
    
    let rows = Array.from(table.getElementsByTagName("tr"));
    //console.log("Anzahl Zeilen:", rows.length);
    
    if (rows.length > 0) {
       // console.log("Erste Zeilen-ID:", rows[0].id);
    }
    

    
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

        let enabled = false

        if(enabled){
            for(let j = 1; j <= 18; j++){

                if(j == 1){
                    if(document.getElementById(row.id + "pos").innerText == j.toString()){
                        document.getElementById(row.id + "pos").style.backgroundColor = "gold";
                        document.getElementById(row.id + "pos").style.border = "1px solid darkgoldenrod";
                    }
                }
                if(j > 1 && j <= 4){
                    if(document.getElementById(row.id + "pos").innerText == j.toString()){
                        document.getElementById(row.id + "pos").style.backgroundColor = "green";
                        document.getElementById(row.id + "pos").style.border = "1px solid darkgreen";
                    }
                }
                else if (j == 5) {
                    if(document.getElementById(row.id + "pos").innerText == j.toString()){
                        document.getElementById(row.id + "pos").style.backgroundColor = "blueviolet";
                        document.getElementById(row.id + "pos").style.border = "1px solid darkblue";
                    }
                }
                else if (j == 6) {
                    if(document.getElementById(row.id + "pos").innerText == j.toString()){
                        document.getElementById(row.id + "pos").style.backgroundColor = "blue";
                        document.getElementById(row.id + "pos").style.border = "1px solid darkblue";
                    }
                }
                else if (j == 16) {
                    if(document.getElementById(row.id + "pos").innerText == j.toString()){
                        document.getElementById(row.id + "pos").style.backgroundColor = "yellow";
                        document.getElementById(row.id + "pos").style.border = "1px solid darkgoldenrod";
                    }
                }
                else if (j > 16) {
                    if(document.getElementById(row.id + "pos").innerText == j.toString()){
                        document.getElementById(row.id + "pos").style.backgroundColor = "red";
                        document.getElementById(row.id + "pos").style.border = "1px solid darkred";
                    }
                }
            }
        } 
    });


}

