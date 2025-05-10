let _clteamids = ["liverpool", "barcelona", "arsenal", "inter", "atletico", "leverkusen", "lille", "astonvilla", "atalanta", "dortmund", "realmadrid", "bayern", "milan", "psv", "psg", "benfica", "monaco", "brest", "feyenoord", "juventus", "celtic", "mancity", "sporting", "brugge", "zagreb", "stuttgart", "shaktar", "bologna", "zvezda", "graz", "prag", "leipzig", "girona", "salzburg", "bratislava", "youngboys"];
let _elteamids = ["olympiakos","frankfurt","hoffenheim","manunited","tottenham","asrom","laziorom","athletic","realsociedad","ogcnizza","olympiquelyon","azalkmaar","fctwente","ajax","fcporto","braga","unionsg","anderlecht","rangers","fenerbahce","galatasaray","besiktas","kiew","slaviaprag","viktoriapilsen","bodoglimt","midtjylland","paok","maccabitelaviv","malmo","elfsborg","ferencvaros","fcsb","ludogorets","qarabag","fkrfs"];
let _eclteamids = ["chelsea","fiorentina","realbetis","panathinaikos","kopenhagen","kaagent","cerclebrugge","basaksehir","heidenheim","vitoriaguimaraes","lask","lugano","rapidwien","tscbackatopola","molde","legia","stgallen","pafos","hearts","omonia","djurgardens","jagiellonia","apoel","nkcelje","mladaboleslav","olimpijaljubljana","astana","noah","hjk","borac","dinamominsk","petrocub","shamrock","larne","vikingur","newsaints"];

let _teamsforsim = [];

let boolSetupQualifiers = false;
let boolSetupRO16 = false;
 
let oldTable =  document.getElementById("inttable").innerHTML;
let oldHTML1 = document.getElementById("tournament").innerHTML;
let oldHTML2 = document.getElementById("qualifiers").innerHTML;

function clclick(){

    document.getElementById("tableheader").hidden = false;
    document.getElementById("tablefooter").hidden = false;

    if(document.getElementById("table").hidden == false){
        document.getElementById("table").hidden = true;
    }

    if(document.getElementById("inttable").hidden == false){
        document.getElementById("inttable").innerHTML = oldTable;
        document.getElementById("vtablefooter").hidden = true;
        document.getElementById("tournament").innerHTML = oldHTML1;
        document.getElementById("tournament").style.display = "none";
        document.getElementById("qualifiers").innerHTML = oldHTML2;
        document.getElementById("qualifiers").style.display = "none";
        document.getElementById("koButton").innerText = "Play-off's";
        document.getElementById("comp").style.display = "flex";
        boolSetupQualifiers = false;
        boolSetupRO16 = false;
    }
    else{
        document.getElementById("inttable").innerHTML = oldTable;
        document.getElementById("tournament").innerHTML = oldHTML1;
        document.getElementById("vtablefooter").hidden = true;
        document.getElementById("tournament").style.display = "none";
        document.getElementById("qualifiers").innerHTML = oldHTML2;
        document.getElementById("qualifiers").style.display = "none";
        document.getElementById("koButton").innerText = "Play-off's";
        document.getElementById("comp").style.display = "flex";
        boolSetupQualifiers = false;
        boolSetupRO16 = false;
    }

    if(_teamsforsim){
        _teamsforsim = [];
    }

    intfilltable("Champions League");
}


function elclick(){

    document.getElementById("tableheader").hidden = false;
    document.getElementById("tablefooter").hidden = false;

    if(document.getElementById("table").hidden == false){
        document.getElementById("table").hidden = true;
    }

    if(document.getElementById("inttable").hidden == false){
        document.getElementById("inttable").innerHTML = oldTable;
        document.getElementById("tournament").innerHTML = oldHTML1;
        document.getElementById("tournament").style.display = "none";
        document.getElementById("qualifiers").innerHTML = oldHTML2;
        document.getElementById("qualifiers").style.display = "none";
        document.getElementById("koButton").innerText = "Play-off's";
        document.getElementById("comp").display = "flex";
        boolSetupQualifiers = false;
        boolSetupRO16 = false;
    }

    if(_teamsforsim){
        _teamsforsim = [];
    }

    intfilltable("Europa League");
}

function eclclick(){

    document.getElementById("tableheader").hidden = false;
    document.getElementById("tablefooter").hidden = false;

    if(document.getElementById("table").hidden == false){
        document.getElementById("table").hidden = true;
    }

    if(document.getElementById("inttable").hidden == false){
        document.getElementById("inttable").innerHTML = oldTable;
        document.getElementById("tournament").innerHTML = oldHTML1;
        document.getElementById("tournament").style.display = "none";
        document.getElementById("qualifiers").innerHTML = oldHTML2;
        document.getElementById("qualifiers").style.display = "none";
        document.getElementById("koButton").innerText = "Play-off's";
        document.getElementById("comp").display = "flex";
        boolSetupQualifiers = false;
        boolSetupRO16 = false;
    }

    if(_teamsforsim){
        _teamsforsim = [];
    }

    intfilltable("Conference League");
}









function koClick() {
    let koButton = document.getElementById("koButton");

    if (koButton.innerText === "Turnierbaum ab Achtelfinale") {
        // Wechsle zu Turnierbaum
        koButton.innerText = "Play-off's";
       // document.getElementById("inttable").style.display = "none";  // Tabelle ausblenden
        document.getElementById("qualifiers").style.display = "none"; // Quali-Runde ausblenden
        document.getElementById("tournament").style.display = "flex"; // Turnier anzeigen
        document.getElementById("fsfooter").hidden = false;


    } else {
        // Wechsle zu Qualifiers
        koButton.innerText = "Turnierbaum ab Achtelfinale";
        //document.getElementById("inttable").style.display = "none";
        document.getElementById("tournament").style.display = "none";
        document.getElementById("qualifiers").style.display = "block";
        document.getElementById("fsfooter").hidden = true;

        if (!boolSetupQualifiers) {
            boolSetupQualifiers = true;
            setupQualifiers();
        }
    }
}






function setupQualifiers(){
    let matchBoxes = []; // Ein Array, um die verschiedenen matchBox-Elemente zu speichern

    for (let i = 1; i <= 4; i++) {
        // Speichern von match1 und match2 für jede qualBox
        matchBoxes[i] = document.querySelector("#qualBox" + i + " #match1");
        matchBoxes[i + 4] = document.querySelector("#qualBox" + i + " #match2");
    }

    for (let i = 1; i <= 8; i++) {
        let drawBox = document.getElementById("draws"+i)
        
        if (drawBox.id == "draws1"){
            let teamNames = "" + _teamsforsim[14].short + " & <br>" + _teamsforsim[15].short;
            drawBox.innerHTML = teamNames;
        }

        else if (drawBox.id == "draws2"){
            let teamNames = "" + _teamsforsim[16].short + " & <br>" + _teamsforsim[17].short;
            drawBox.innerHTML = teamNames;
        }

        else if (drawBox.id == "draws3"){
            let teamNames = "" + _teamsforsim[8].short + " & <br>" + _teamsforsim[9].short;
            drawBox.innerHTML = teamNames;
        }

        else if (drawBox.id == "draws4"){
            let teamNames = "" + _teamsforsim[22].short + " & <br>" + _teamsforsim[23].short;
            drawBox.innerHTML = teamNames;
        }

        else if (drawBox.id == "draws5"){
            let teamNames = "" + _teamsforsim[10].short + " & <br>" + _teamsforsim[11].short;
            drawBox.innerHTML = teamNames;
        }

        else if (drawBox.id == "draws6"){
            let teamNames = "" + _teamsforsim[20].short + " & <br>" + _teamsforsim[21].short;
            drawBox.innerHTML = teamNames;
        }

        else if (drawBox.id == "draws7"){
            let teamNames = "" + _teamsforsim[12].short + " & <br>" + _teamsforsim[13].short;
            drawBox.innerHTML = teamNames;
        }

        else if (drawBox.id == "draws8"){
            let teamNames = "" + _teamsforsim[18].short + " & <br>" + _teamsforsim[19].short;
            drawBox.innerHTML = teamNames;
        }

        else {
            drawBox.innerHTML = "Fehler";
        }
    }

    let qualwinner1;
    let qualwinner2;
    let qualwinner3;
    let qualwinner4;
    let qualwinner5;
    let qualwinner6;
    let qualwinner7;
    let qualwinner8;
    
    if (matchBoxes[1] && matchBoxes [5]){
        let teamArray = [_teamsforsim[14], _teamsforsim[15], _teamsforsim[16], _teamsforsim[17]]

        let opponent;
        let opponent2;

        if (Math.random <= 0.5){
            opponent = teamArray[2];
            opponent2 = teamArray[3];
        }
        else{
            opponent = teamArray[3];
            opponent2 = teamArray[2];
        }

        let score1 = getAggregateScore(opponent, teamArray[0]); // Beispiel
        let score2 = getAggregateScore(opponent2, teamArray[1]); // Beispiel

        if(score1){
            let parts = score1.split("-");
            let homeGoals = parseInt(parts[0]);
            let awayGoals = parseInt(parts[1]);

            if(homeGoals > awayGoals) {
                qualwinner1 = opponent;
            }
            else{
                qualwinner1 = teamArray[0];
            }
        }

        if(score2){
            let parts = score2.split("-");
            let homeGoals = parseInt(parts[0]);
            let awayGoals = parseInt(parts[1]);

            if(homeGoals > awayGoals) {
                qualwinner2 = opponent2;
            }
            else{
                qualwinner2 = teamArray[1];
            }
        }

        console.log(qualwinner1); 
        console.log(qualwinner2);


        matchBoxes[1].innerHTML = opponent.short + "&emsp; "+ score1 +" &emsp;" + teamArray[0].short;
        matchBoxes[5].innerHTML = opponent2.short + "&emsp; "+ score2 +" &emsp;" + teamArray[1].short;
    }

    if (matchBoxes[2] && matchBoxes [6]){
        let teamArray = [_teamsforsim[8], _teamsforsim[9], _teamsforsim[22], _teamsforsim[23]]

        let opponent;
        let opponent2;

        if (Math.random <= 0.5){
            opponent = teamArray[2];
            opponent2 = teamArray[3];
        }
        else{
            opponent = teamArray[3];
            opponent2 = teamArray[2];
        }

        let score1 = getAggregateScore(opponent, teamArray[0]); // Beispiel
        let score2 = getAggregateScore(opponent2, teamArray[1]); // Beispiel

        if(score1){
            let parts = score1.split("-");
            let homeGoals = parseInt(parts[0]);
            let awayGoals = parseInt(parts[1]);

            if(homeGoals > awayGoals) {
                qualwinner3 = opponent;
            }
            else{
                qualwinner3 = teamArray[0];
            }
        }

        if(score2){
            let parts = score2.split("-");
            let homeGoals = parseInt(parts[0]);
            let awayGoals = parseInt(parts[1]);

            if(homeGoals > awayGoals) {
                qualwinner4 = opponent2;
            }
            else{
                qualwinner4 = teamArray[1];
            }
        }

        console.log(qualwinner3); 
        console.log(qualwinner4);


        matchBoxes[2].innerHTML = opponent.short + "&emsp; "+ score1 +" &emsp;" + teamArray[0].short;
        matchBoxes[6].innerHTML = opponent2.short + "&emsp; "+ score2 +" &emsp;" + teamArray[1].short;
    }

    if (matchBoxes[3] && matchBoxes [7]){
        let teamArray = [_teamsforsim[10], _teamsforsim[11], _teamsforsim[20], _teamsforsim[21]]

        let opponent;
        let opponent2;

        if (Math.random <= 0.5){
            opponent = teamArray[2];
            opponent2 = teamArray[3];
        }
        else{
            opponent = teamArray[3];
            opponent2 = teamArray[2];
        }

        let score1 = getAggregateScore(opponent, teamArray[0]); // Beispiel
        let score2 = getAggregateScore(opponent2, teamArray[1]); // Beispiel

        if(score1){
            let parts = score1.split("-");
            let homeGoals = parseInt(parts[0]);
            let awayGoals = parseInt(parts[1]);

            if(homeGoals > awayGoals) {
                qualwinner5 = opponent;
            }
            else{
                qualwinner5 = teamArray[0];
            }
        }

        if(score2){
            let parts = score2.split("-");
            let homeGoals = parseInt(parts[0]);
            let awayGoals = parseInt(parts[1]);

            if(homeGoals > awayGoals) {
                qualwinner6 = opponent2;
            }
            else{
                qualwinner6 = teamArray[1];
            }
        }

        console.log(qualwinner5); 
        console.log(qualwinner6);


        matchBoxes[3].innerHTML = opponent.short + "&emsp; "+ score1 +" &emsp;" + teamArray[0].short;
        matchBoxes[7].innerHTML = opponent2.short + "&emsp; "+ score2 +" &emsp;" + teamArray[1].short;
    }

    if (matchBoxes[4] && matchBoxes [8]){
        let teamArray = [_teamsforsim[12], _teamsforsim[13], _teamsforsim[18], _teamsforsim[19]]

        let opponent;
        let opponent2;

        if (Math.random <= 0.5){
            opponent = teamArray[2];
            opponent2 = teamArray[3];
        }
        else{
            opponent = teamArray[3];
            opponent2 = teamArray[2];
        }

        let score1 = getAggregateScore(opponent, teamArray[0]); // Beispiel
        let score2 = getAggregateScore(opponent2, teamArray[1]); // Beispiel

        if(score1){
            let parts = score1.split("-");
            let homeGoals = parseInt(parts[0]);
            let awayGoals = parseInt(parts[1]);

            if(homeGoals > awayGoals) {
                qualwinner7 = opponent;
            }
            else{
                qualwinner7 = teamArray[0];
            }
        }

        if(score2){
            let parts = score2.split("-");
            let homeGoals = parseInt(parts[0]);
            let awayGoals = parseInt(parts[1]);

            if(homeGoals > awayGoals) {
                qualwinner8 = opponent2;
            }
            else{
                qualwinner8 = teamArray[1];
            }
        }

        console.log(qualwinner7); 
        console.log(qualwinner8);


        matchBoxes[4].innerHTML = opponent.short + "&emsp; "+ score1 +" &emsp;" + teamArray[0].short;
        matchBoxes[8].innerHTML = opponent2.short + "&emsp; "+ score2 +" &emsp;" + teamArray[1].short;
    }


    if (!boolSetupRO16) {
        boolSetupRO16 = true;
        setupRO16(qualwinner1, qualwinner2, qualwinner3, qualwinner4, qualwinner5, qualwinner6, qualwinner7, qualwinner8);
    }




}



function setupRO16(w1, w2, w3, w4, w5, w6, w7, w8){
    let tbl1 = _teamsforsim[0];
    let tbl2 = _teamsforsim[1];
    let tbl3 = _teamsforsim[2];
    let tbl4 = _teamsforsim[3];
    let tbl5 = _teamsforsim[4];
    let tbl6 = _teamsforsim[5];
    let tbl7 = _teamsforsim[6];
    let tbl8 = _teamsforsim[7];

    let table8 = [tbl1, tbl2, tbl3, tbl4, tbl5, tbl6, tbl7, tbl8];
    let qual8 = [w1, w2, w3, w4, w5, w6, w7, w8];

    let ro16m1;
    let ro16m2;
    let ro16m3;
    let ro16m4;
    let ro16m5;
    let ro16m6;
    let ro16m7;
    let ro16m8;

    if(qual8[0] && qual8[1]){
        if(Math.random() <= 0.5){
            ro16m1 = [qual8[0], table8[0]];
            ro16m2 = [qual8[1], table8[1]];
        }
        else{
            ro16m1 = [qual8[0], table8[1]];
            ro16m2 = [qual8[1], table8[0]];
        }
    }
    if(qual8[2] && qual8[3]){
        if(Math.random() <= 0.5){
            ro16m3 = [qual8[2], table8[2]];
            ro16m4 = [qual8[3], table8[3]];
        }
        else{
            ro16m3 = [qual8[2], table8[3]];
            ro16m4 = [qual8[3], table8[2]];
        }
    }
    if(qual8[4] && qual8[5]){
        if(Math.random() <= 0.5){
            ro16m5 = [qual8[4], table8[4]];
            ro16m6 = [qual8[5], table8[5]];
        }
        else{
            ro16m5 = [qual8[4], table8[5]];
            ro16m6 = [qual8[5], table8[4]];
        }
    }
    if(qual8[6] && qual8[7]){
        if(Math.random() <= 0.5){
            ro16m7 = [qual8[6], table8[6]];
            ro16m8 = [qual8[7], table8[7]];
        }
        else{
            ro16m7 = [qual8[6], table8[7]];
            ro16m8 = [qual8[7], table8[6]];
        }
    }
    //Achtelfinale
    let r16matches = [ro16m1, ro16m2, ro16m3, ro16m4, ro16m5, ro16m6, ro16m7, ro16m8];
    let r16matchobj = [];


    for (let i = 1; i <= 8; i++){
        r16matchobj.push(document.querySelector("#ro16 #match"+i));
    }

    console.log(r16matchobj);

    let ro16winners = [];

    for (let i = 0; i < r16matchobj.length; i++){

        let score = getAggregateScore(r16matches[i][0], r16matches[i][1]);
        let divider = score.split("-");
        let homeGoals = parseInt(divider[0]);
        let awayGoals = parseInt(divider[1]);

        if(homeGoals > awayGoals){
            ro16winners.push(r16matches[i][0]);
        }
        else{
            ro16winners.push(r16matches[i][1]);
        }

        r16matchobj[i].innerHTML = r16matches[i][0].short + "&emsp; "+ score +" &emsp;" + r16matches[i][1].short;

    }

    //Viertelfinale

    let quartMatchobj = [];

    for (let i = 1; i <= 4; i++){
        quartMatchobj.push(document.querySelector("#quart #quart"+i));
    }

    let quartMatches = [];

    for (let i = 0; i < ro16winners.length; i += 2) {
        let quartMatch = [ro16winners[i], ro16winners[i+1]];
        quartMatches.push(quartMatch);
    }
    


    let quartWinners = [];

    for (let i = 0; i < quartMatches.length; i++){
        console.log(quartMatches[i][0]);
        let score = getAggregateScore(quartMatches[i][0], quartMatches[i][1]);
        let divider = score.split("-");
        let homeGoals = parseInt(divider[0]);
        let awayGoals = parseInt(divider[1]);

        if(homeGoals > awayGoals){
            quartWinners.push(quartMatches[i][0]);
        }
        else{
            quartWinners.push(quartMatches[i][1]);
        }

        quartMatchobj[i].innerHTML = quartMatches[i][0].short + "&emsp; "+ score +" &emsp;" + quartMatches[i][1].short;

    }

    console.log(quartWinners);

    //Halbfinale

    let halfMatchobj = [];

    for (let i = 1; i <= 2; i++){
        halfMatchobj.push(document.querySelector("#half #half"+i));
    }

    let halfMatches = [];

    for (let i = 0; i < quartWinners.length; i += 2) {
        let halfMatch = [quartWinners[i], quartWinners[i+1]];
        halfMatches.push(halfMatch);
    }
    
    let halfWinners = [];

    for (let i = 0; i < halfMatches.length; i++){
        let score = getAggregateScore(halfMatches[i][0], halfMatches[i][1]);
        let divider = score.split("-");
        let homeGoals = parseInt(divider[0]);
        let awayGoals = parseInt(divider[1]);

        if(homeGoals > awayGoals){
            halfWinners.push(halfMatches[i][0]);
        }
        else{
            halfWinners.push(halfMatches[i][1]);
        }

        halfMatchobj[i].innerHTML = halfMatches[i][0].short + "&emsp; "+ score +" &emsp;" + halfMatches[i][1].short;

    }
    
   // FINALE

    console.log("HF-SIEGER! " + halfWinners[0].name + ", " + halfWinners[1].name);  // Ausgabe der HF-Sieger

    let finalObj = document.querySelector("#final #final");  // Finalobj vor der Schleife setzen

    let finalMatch = [halfWinners[0], halfWinners[1]];  // Finalisten: halfWinners[0] und [1]

    // Ausgabe der Finalisten
    console.log("FINALISTEN! " + finalMatch[0].name + ", " + finalMatch[1].name);


    let finalWinner;
    let score = getFinalScore(finalMatch[0], finalMatch[1]);  // Score für die beiden Finalisten holen
    let divider = score.split("-");
    console.log(score);

    let homeGoals = parseInt(divider[0]);
    let awayGoals = parseInt(divider[1]);


    // Bestimmung des Siegers
    if(homeGoals > awayGoals){
        finalWinner = finalMatch[0];  // Heimteam gewinnt
    }
    else{
        finalWinner = finalMatch[1];  // Auswärtsteam gewinnt
    }

    // Anzeige des Ergebnisses im HTML
    finalObj.innerHTML = finalMatch[0].short + " " + score + " " + finalMatch[1].short;
    document.querySelector("#final #winner").innerHTML = "SIEGER:<br> " + finalWinner.name;

}




function getFinalScore(team1, team2){
    let homeOdds = 0.5;
    let penaltyOdds = 0.5;

    console.log("FINALISTEN! "+team1.name + ", " + team2.name);

    if (team1.strength > team2.strength){
        if (team1.strength - team2.strength <= 2){
            //55% Chance team1 win, 45% Chance team2 win
            //60% Normaler Sieg 40% Elfmeterschiessensieg  
            homeOdds = 0.55;
            penaltyOdds = 0.3;
        }
        else if (team1.strength - team2.strength > 2 && team1.strength - team2.strength <= 7){
            //65% Chance team1 win, 35% Chance team2 win
            //70% Normaler Sieg 30% Elfmeterschiessensieg  
            homeOdds = 0.65;
            penaltyOdds = 0.2;
        }
        else if (team1.strength - team2.strength > 2 && team1.strength - team2.strength <= 7){
            //60% Chance team1 win, 40% Chance team2 win
            //65% Normaler Sieg 35% Elfmeterschiessensieg  
            homeOdds = 0.60;
            penaltyOdds = 0.15;
        }
        else if (team1.strength - team2.strength > 7 && team1.strength - team2.strength <= 13){
            //70% Chance team1 win, 30% Chance team2 win
            //65% Normaler Sieg 25% Elfmeterschiessensieg  
            homeOdds = 0.70;
            penaltyOdds = 0.10;
        }
        else {
            //75% Chance team1 win, 25% Chance team2 win
            //70% Normaler Sieg 30% Elfmeterschiessensieg  
            homeOdds = 0.75;
            penaltyOdds = 0.30;
        }
    }

    else if (team1.strength < team2.strength){
        if (team2.strength - team1.strength <= 2){
            //45% Chance team1 win, 45% Chance team2 win
            //60% Normaler Sieg 40% Elfmeterschiessensieg  
            homeOdds = 0.45;
            penaltyOdds = 0.25;
        }
        else if (team2.strength - team1.strength > 2 && team2.strength - team1.strength <= 7){
            //55% Chance team1 win, 35% Chance team2 win
            //65% Normaler Sieg 35% Elfmeterschiessensieg  
            homeOdds = 0.35;
            penaltyOdds = 0.2;
        }
        else if (team2.strength - team1.strength > 2 && team2.strength - team1.strength <= 7){
            //70% Chance team1 win, 30% Chance team2 win
            //70% Normaler Sieg 30% Elfmeterschiessensieg  
            homeOdds = 0.30;
            penaltyOdds = 0.15;
        }
        else if (team2.strength - team1.strength > 7 && team2.strength - team1.strength <= 13){
            //75% Chance team1 win, 25% Chance team2 win
            //75% Normaler Sieg 35% Elfmeterschiessensieg  
            homeOdds = 0.25;
            penaltyOdds = 0.15;
        }
        else {
            //80% Chance team1 win, 20% Chance team2 win
            //60% Normaler Sieg 40% Elfmeterschiessensieg  
            homeOdds = 0.80;
            penaltyOdds = 0.10;
        }
    }

    else if (team1.strength == team2.strength){
        homeOdds = 0.5;
        penaltyOdds = 0.5;
    }

    if(Math.random() <= homeOdds){
        if (Math.random() >= penaltyOdds){
            homeGoals = Math.floor(Math.random() * 2) + 1;  
            awayGoals = Math.floor(Math.random() * 2);     
            if(homeGoals == awayGoals){
                homeGoals++;
            }
        }
        else {
            homeGoals = Math.floor(Math.random() * 3) + 3; 
            awayGoals = Math.floor(Math.random() * 3) + 3; // awayGoals ist zwischen 3 und 5
        
            if(homeGoals == awayGoals) {
                homeGoals++; 
            }
            return homeGoals + " - " + awayGoals + " (n.E.)";
        }
    }
    else{
        if (Math.random() >= penaltyOdds){
            awayGoals = Math.floor(Math.random() * 2) + 1;  
            homeGoals = Math.floor(Math.random() * 2);     
            if(homeGoals == awayGoals){
                awayGoals++;
            }
        }
        else {
            awayGoals = Math.floor(Math.random() * 3) + 3; 
            homeGoals = Math.floor(Math.random() * 3) + 3; // awayGoals ist zwischen 3 und 5
        
            if(homeGoals == awayGoals) {
                awayGoals++; 
            }

            return homeGoals + " - " + awayGoals + " (n.E.)";
        }
    }


    return homeGoals + " - " + awayGoals;
    

}



function getAggregateScore(homeTeam, awayTeam){
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
                worseQuote = 0.34;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 3){
                strongerQuote = 0.42;
                worseQuote = 0.33;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 4){
                strongerQuote = 0.44;
                worseQuote = 0.32;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 5){
                strongerQuote = 0.48;
                worseQuote = 0.31;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 6){
                strongerQuote = 0.52;
                worseQuote = 0.3;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 7){
                strongerQuote = 0.55;
                worseQuote = 0.27;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 8){
                strongerQuote = 0.58;
                worseQuote = 0.25;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 9){
                strongerQuote = 0.6;
                worseQuote = 0.24;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 10){
                strongerQuote = 0.65;
                worseQuote = 0.20;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength > 10 && strongerTeam.strength - worseTeam.strength <= 15){
                strongerQuote = 0.7;
                worseQuote = 0.18;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength > 15 && strongerTeam.strength - worseTeam.strength <= 20){
                strongerQuote = 0.75;
                worseQuote = 0.15;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else {
                strongerQuote = 0.8;
                worseQuote = 0.1;
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
                strongerQuote = 0.37;
                worseQuote = 0.35;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 2){
                strongerQuote = 0.40;
                worseQuote = 0.34;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 3){
                strongerQuote = 0.42;
                worseQuote = 0.33;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 4){
                strongerQuote = 0.44;
                worseQuote = 0.32;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 5){
                strongerQuote = 0.48;
                worseQuote = 0.31;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 6){
                strongerQuote = 0.52;
                worseQuote = 0.3;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 7){
                strongerQuote = 0.55;
                worseQuote = 0.27;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 8){
                strongerQuote = 0.58;
                worseQuote = 0.25;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 9){
                strongerQuote = 0.6;
                worseQuote = 0.24;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength == 10){
                strongerQuote = 0.65;
                worseQuote = 0.20;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength > 10 && strongerTeam.strength - worseTeam.strength <= 15){
                strongerQuote = 0.7;
                worseQuote = 0.18;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else if(strongerTeam.strength - worseTeam.strength > 15 && strongerTeam.strength - worseTeam.strength <= 20){
                strongerQuote = 0.75;
                worseQuote = 0.15;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }
            else {
                strongerQuote = 0.8;
                worseQuote = 0.1;
                drawQuote = 1 - (strongerQuote + worseQuote);
            }

            homeQuote = worseQuote;
            awayQuote = strongerQuote;
        }

        else{
            let homeQuote = 0.34;
            let awayQuote = 0.33;
            let drawQuote = 1 - (homeQuote + awayQuote);
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
                notMuchGoals = 0.35;
                normalGoals = 0.45;
                manyGoals = 0.15;
                veryManyGoals = 0.05;
            }

            else if(homeQuote - awayQuote > 0.03 && homeQuote - awayQuote <= 0.06){
                notMuchGoals = 0.32;
                normalGoals = 0.43;
                manyGoals = 0.18;
                veryManyGoals = 0.06;
            }

            else if(homeQuote - awayQuote > 0.06 && homeQuote - awayQuote <= 0.1){
                notMuchGoals = 0.39;
                normalGoals = 0.30;
                manyGoals = 0.21;
                veryManyGoals = 0.1;
            }

            else if(homeQuote - awayQuote > 0.1 && homeQuote - awayQuote <= 0.15){
                notMuchGoals = 0.27;
                normalGoals = 0.35;
                manyGoals = 0.25;
                veryManyGoals = 0.13;
            }

            else {
                notMuchGoals = 0.20;
                normalGoals = 0.30;
                manyGoals = 0.30;
                veryManyGoals = 0.20;
            }

            let goalRandom = Math.random();

            if(goalRandom <= notMuchGoals){
                homeGoals = randomInt(1, 2);
                awayGoals = randomInt(0, homeGoals - 1);
                if(Math.random <= 0.7){
                    homeGoals = homeGoals * 2;
                    awayGoals = awayGoals * 2;
                }
            }
            else if(goalRandom <= notMuchGoals + normalGoals){
                homeGoals = randomInt(2, 4);
                awayGoals = randomInt(0, homeGoals - 1);
                if(Math.random <= 0.4){
                    homeGoals = homeGoals * 2;
                    awayGoals = awayGoals * 2;
                }
            }
            else if(goalRandom <= notMuchGoals + normalGoals + manyGoals){
                homeGoals = randomInt(3, 5);
                awayGoals = randomInt(0, homeGoals - 1);
                if(Math.random <= 0.1){
                    homeGoals = homeGoals * 2;
                    awayGoals = awayGoals * 2;
                }
            }
            else {
                homeGoals = randomInt(4, 7);
                awayGoals = randomInt(0, 1);
                if(Math.random <= 0.4){
                    homeGoals = homeGoals * 2;
                }
            }
        }
        else if(ranInt <= homeQuote + awayQuote){
            let notMuchGoals = 0.5;
            let normalGoals = 0.3;
            let manyGoals = 0.15;
            let veryManyGoals = 0.05;

            if(awayQuote - homeQuote <= 0.03){
                notMuchGoals = 0.35;
                normalGoals = 0.45;
                manyGoals = 0.15;
                veryManyGoals = 0.05;
            }

            else if(awayQuote - homeQuote > 0.03 && awayQuote - homeQuote <= 0.06){
                notMuchGoals = 0.33;
                normalGoals = 0.42;
                manyGoals = 0.18;
                veryManyGoals = 0.06;
            }

            else if(awayQuote - homeQuote > 0.06 && awayQuote - homeQuote <= 0.1){
                notMuchGoals = 0.39;
                normalGoals = 0.30;
                manyGoals = 0.21;
                veryManyGoals = 0.1;
            }

            else if(awayQuote - homeQuote > 0.1 && awayQuote - homeQuote <= 0.15){
                notMuchGoals = 0.35;
                normalGoals = 0.27;
                manyGoals = 0.25;
                veryManyGoals = 0.13;
            }

            else {
                notMuchGoals = 0.30;
                normalGoals = 0.20;
                manyGoals = 0.30;
                veryManyGoals = 0.20;
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
                awayGoals = randomInt(3, 5);
                homeGoals = randomInt(0, awayGoals - 1);
            }
            else {
                awayGoals = randomInt(4, 7);
                homeGoals = randomInt(0, 1);
            }
        }
        else{
            notMuchGoals = 0.60;
            normalGoals = 0.25;
            manyGoals = 0.10;
            veryManyGoals = 0.05;

            let goalRandom = Math.random();

            if(goalRandom <= notMuchGoals){
                homeGoals = randomInt(3, 5);
                awayGoals = homeGoals - randomInt(1, 2);
            }
            else if(goalRandom <= notMuchGoals + normalGoals){
                homeGoals = randomInt(4, 7);
                awayGoals = homeGoals - randomInt(1, 2);
            }
            else if(goalRandom <= notMuchGoals + normalGoals + manyGoals){
                homeGoals = randomInt(2, 3);
                awayGoals = homeGoals - randomInt(0, homeGoals - 1);
            }
            else {
                homeGoals = randomInt(1, 4);
                awayGoals = homeGoals - randomInt(0, homeGoals - 1);
            }

            if(Math.random() <= 0.5){
                awayGoals = homeGoals;
                homeGoals = awayGoals - randomInt(1, 6);
                if (homeGoals < 0){
                    homeGoals = 0;
                }
            }
        }

        if (homeGoals !== undefined && awayGoals !== undefined) {
            score = homeGoals + " - " + awayGoals;
            return score;
        } 
        else {
            return "1 - 0";
        }
    }
}






function intfilltable(league){
    let teamammounts;
    let teamIds = [];

    if(league == "Champions League" || league == "Europa League" || league == "Conference League"){
        teamammounts = 36;
        if(league == "Champions League"){
            teamIds = _clteamids;
        }
        else if(league == "Europa League"){
            teamIds = _elteamids;
        }
        else if(league == "Conference League"){
            teamIds = _eclteamids;
        }
        else{
            teamIds = _clteamids;
        }
    }

    //console.log(teamIds.length);

    for(let i = 0; i < teams.length; i++){
        if(teamIds.includes(teams[i].id)){
            //console.log("Team gefunden! - " + teams[i].name + "("+ teams[i].id + ")");
            _teamsforsim.push(teams[i])
            //console.log(_teamsforsim.length)
        } else {
            let notFoundIds = teamIds.filter(id => !teams.some(team => team.id === id));

            //console.log("ERR Teams nicht gefunden! :", notFoundIds);

        }
    }



    if(teamammounts == _teamsforsim.length){

        document.getElementById("header").innerText = league
        document.getElementById("header").hidden = false;

        for(let i = 0; i < _teamsforsim.length; i++){
            var table = document.getElementById("inttablethings");

            var tr = document.createElement("tr");
            tr.id = _teamsforsim[i].short;

            //Pos
            var td1 = document.createElement("td");
            td1.innerText = "1"; 
            td1.id = _teamsforsim[i].short+"intpos"
            tr.appendChild(td1); 

            //Name
            var td2 = document.createElement("td");
            td2.innerText = _teamsforsim[i].name; 
            td2.id = _teamsforsim[i].short+"intname"
            tr.appendChild(td2);  

            var td3 = document.createElement("td");
            td3.innerText = "0"; 
            td3.id = _teamsforsim[i].short+"intgamesplayed"
            tr.appendChild(td3); 

            var td4 = document.createElement("td");
            td4.innerText = "0"; 
            td4.id = _teamsforsim[i].short+"intwins";
            tr.appendChild(td4);

            var td5 = document.createElement("td");
            td5.innerText = "0";
            td5.id = _teamsforsim[i].short+"intdraws";
            tr.appendChild(td5);

            var td6 = document.createElement("td");
            td6.innerText = "0";
            td6.id = _teamsforsim[i].short+"intlosses";
            tr.appendChild(td6);

            var td7 = document.createElement("td");
            td7.innerText = "0-0";
            td7.id = _teamsforsim[i].short+"intgoalsforagainst";
            tr.appendChild(td7);

            var td8 = document.createElement("td");
            td8.innerText = "0";
            td8.id = _teamsforsim[i].short+"intgoaldifference";
            tr.appendChild(td8);

            var td9 = document.createElement("td");
            td9.innerText = "0";
            td9.id = _teamsforsim[i].short+"intpoints";
            tr.appendChild(td9);



            table.appendChild(tr);
            //console.log("Team " + _teamsforsim[i].name + " zur Tabelle hinzugefügt.")
        }


        document.getElementById("inttable").hidden = false;
        

        setupTeamStats();
        var schedule = generateRandomTable(_teamsforsim);
        //console.log(schedule);
        updateTable();
        sortTableByMultipleCriteria();
        document.getElementById("koButton").hidden = false;
    }
    else{
        alert("Fehler. "+league+" kann nicht simuliert werden.")
    }
}


function setupTeamStats(){
    for(let team of _teamsforsim){
        team.pos = 1;
        team.gamesPlayed = 0;
        team.wins = 0;
        team.draws = 0;
        team.losses = 0;
        team.goalsScored = 0;
        team.goalsConceaded = 0;
        team.points = 0;
    }
}

function updateTable(){
    for (let team of _teamsforsim){
        document.getElementById(team.short + "intwins").innerText = team.wins;
        document.getElementById(team.short + "intdraws").innerText = team.draws;
        document.getElementById(team.short + "intlosses").innerText = team.losses;
        document.getElementById(team.short + "intpoints").innerText = team.points;
        document.getElementById(team.short + "intgamesplayed").innerText = team.gamesPlayed;
        document.getElementById(team.short + "intgoalsforagainst").innerText = team.goalsScored + "-" + team.goalsConceaded;
        document.getElementById(team.short + "intgoaldifference").innerText = team.goalsScored - team.goalsConceaded;
    }
}


function generateRandomTable() {
    // Teams nach Stärke sortieren
    let sortedTeams = [..._teamsforsim].sort((a, b) => b.strength - a.strength);

    // Zufällige Tabellenposition mit Gewichtung nach Stärke
    shuffleArrayWeighted(sortedTeams);

    // Punkte, Tore und Gegentore zufällig verteilen
    for (let i = 0; i < sortedTeams.length; i++) {
        let team = sortedTeams[i];

        team.pos = i + 1; // Tabellenplatz basierend auf Sortierung


        let totalGames = 8; // 8 Spiele in der Gruppenphase



        if (team.strength < 75) {
            // Punkteberechnung: Maximalpunkte anhand der Teamstärke anpassen, Punkte zwischen 0 und 8
            team.points = Math.floor((team.strength / 100) * 8 + Math.random() * 4);
        } else if (team.strength >= 75 && team.strength < 80) {
            // Punkteberechnung: Maximalpunkte anhand der Teamstärke anpassen, Punkte zwischen 0 und 12
            team.points = Math.floor((team.strength / 100) * 12 + Math.random() * 6);
        } else if (team.strength >= 80 && team.strength < 85) {
            // Punkteberechnung: Maximalpunkte anhand der Teamstärke anpassen, Punkte zwischen 0 und 14
            team.points = Math.floor((team.strength / 100) * 14 + Math.random() * 7);
        } else if (team.strength >= 85 && team.strength < 90) {
            // Punkteberechnung: Maximalpunkte anhand der Teamstärke anpassen, Punkte zwischen 0 und 16
            team.points = Math.floor((team.strength / 100) * 16 + Math.random() * 8);
        } else if (team.strength >= 90 && team.strength < 95) {
            // Punkteberechnung: Maximalpunkte anhand der Teamstärke anpassen, Punkte zwischen 0 und 20
            team.points = Math.floor((team.strength / 100) * 20 + Math.random() * 10);
        } else if (team.strength >= 95) {
            // Punkteberechnung: Maximalpunkte anhand der Teamstärke anpassen, Punkte zwischen 0 und 24
            team.points = Math.floor((team.strength / 100) * 24 + Math.random() * 12);
        } else {
            // Punkteberechnung für schwächere Teams
            team.points = Math.floor((team.strength / 100) * 12 + Math.random() * 6);  // Punkte zwischen 0 und 18
        }
        
        // Sicherstellen, dass die Punkte nicht höher als die maximal erlaubte Anzahl sind
        team.points = Math.min(team.points, 24);  // Setzt max. Punkte auf 24
        team.points = Math.max(team.points, 0);   // Setzt min. Punkte auf 0, falls nötig
        
        
        // Tore & Gegentore für größere Streuung
        team.goalsScored = Math.floor((team.strength / 100) * 10 + Math.random() * 10);  // Tore im Bereich 3-20
        team.goalsConceaded = Math.floor(((100 - team.strength) / 100) * 10 + Math.random() * 10); // Gegentore im Bereich 3-20
        
        // Berechnung von Siegen, Unentschieden und Niederlagen
        let winsEstimate = Math.floor(team.points / 3);
        let drawsEstimate = Math.floor((team.points % 3) / 1);
        let lossesEstimate = totalGames - (winsEstimate + drawsEstimate);

        if(lossesEstimate < 0){
            lossesEstimate = 0;
            drawsEstimate -= 1;
        }
        
        team.wins = winsEstimate;
        team.draws = drawsEstimate;
        team.losses = lossesEstimate;
        team.gamesPlayed = totalGames;
        


    }

    // Nach Punkten & Tordifferenz sortieren
    _teamsforsim.sort((a, b) => b.points - a.points || (b.goalsScored - b.goalsConceaded) - (a.goalsScored - a.goalsConceaded));
}

// Weighted Shuffle - Teams mit hoher Stärke bleiben eher oben
function shuffleArrayWeighted(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));

        // Tausche Elemente mit einer Wahrscheinlichkeit basierend auf Stärke
        if (Math.random() > 0.3) {
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
}


function sortTableByMultipleCriteria() {
    let table = document.getElementById("inttablethings"); // Holt den Tabellen-Body
    let rows = Array.from(table.getElementsByTagName("tr")); // Holt alle Team-Zeilen
    
    // Sortiert die Teams nach Punkten, Tordifferenz, geschossenen Toren und Teamnamen
    rows.sort((a, b) => {
        // Punkte (PKT) vergleichen
        let pointsA = parseInt(document.getElementById(a.id + "intpoints").innerText);
        let pointsB = parseInt(document.getElementById(b.id + "intpoints").innerText);
        if (pointsA !== pointsB) return pointsB - pointsA; // Wenn Punkte unterschiedlich sind, nach Punkten sortieren

        // Tordifferenz (TD) vergleichen
        let goalDifferenceA = parseInt(document.getElementById(a.id + "intgoaldifference").innerText);
        let goalDifferenceB = parseInt(document.getElementById(b.id + "intgoaldifference").innerText);
        if (goalDifferenceA !== goalDifferenceB) return goalDifferenceB - goalDifferenceA; // Wenn Tordifferenz unterschiedlich ist, nach TD sortieren

        // Mehr geschossene Tore (G) vergleichen
        let goalsForA = parseInt(document.getElementById(a.id + "intgoalsforagainst").innerText.split('-')[0]);
        let goalsForB = parseInt(document.getElementById(b.id + "intgoalsforagainst").innerText.split('-')[0]);
        if (goalsForA !== goalsForB) return goalsForB - goalsForA; // Wenn Tore unterschiedlich sind, nach geschossenen Toren sortieren

        // Alphabetisch nach Teamnamen (falls alles gleich ist)
        let nameA = document.getElementById(a.id + "intname").innerText;
        let nameB = document.getElementById(b.id + "intname").innerText;
        return nameA.localeCompare(nameB); // Wenn alles gleich, alphabetisch sortieren

        updateTable();
    });


    // Löscht den aktuellen Inhalt der Tabelle und fügt die Zeilen neu in sortierter Reihenfolge ein
    table.innerHTML = "";
    rows.forEach((row, index) => {
        table.appendChild(row); // Fügt die Zeile in neuer Reihenfolge hinzu
        document.getElementById(row.id + "intpos").innerText = index + 1; // Aktualisiert Position
        
        for(let j = 0; j <= 24; j++){

            if(j <= 8){
                if(document.getElementById(row.id + "intpos").innerText == j.toString()){
                    document.getElementById(row.id + "intpos").style.backgroundColor = "green";
                    document.getElementById(row.id + "intpos").style.border = "1px solid darkgreen";
                }
            }
            else{
                if(document.getElementById(row.id + "intpos").innerText == j.toString()){
                    document.getElementById(row.id + "intpos").style.backgroundColor = "yellow";
                    document.getElementById(row.id + "intpos").style.border = "1px solid darkyellow";
                }
            }
        }
        

    });
}









function simMatches(_matches){
    if(!_matches){ 
        console.log("Keine Matches übergeben!");
        return;
    }

    console.log("Anzahl der Spieltage:", _matches.length);

    for (let i = 0; i < _matches.length; i++) {
        console.log("Spiele am Spieltag", i + 1, ":", _matches[i]);

        for (let j = 0; j < 4; j++) {
            if (_matches[i].matches && _matches[i].matches[j] && _matches[i].matches[j].home && _matches[i].matches[j].away) {
                console.log(`Simuliere: ${_matches[i].matches[j].home} vs ${_matches[i].matches[j].away}`);
                getScore(_matches[i].matches[j].home, _matches[i].matches[j].away);
            } else {
                console.log('Fehler bei Match:', i, j, _matches[i].matches[j]);
            }
        }
    }

    console.log("Starte Update der UI");
    for (let team of _teamsforsim){
        console.log("Update UI für Team:", team.short);
        document.getElementById(team.short + "intwins").innerText = team.wins;
        document.getElementById(team.short + "intdraws").innerText = team.draws;
        document.getElementById(team.short + "intlosses").innerText = team.losses;
        document.getElementById(team.short + "intpoints").innerText = team.points;
        document.getElementById(team.short + "intgamesplayed").innerText = team.gamesPlayed;
        document.getElementById(team.short + "intgoalsforagainst").innerText = team.goalsScored + "-" + team.goalsConceaded;
        document.getElementById(team.short + "intgoaldifference").innerText = team.goalsScored - team.goalsConceaded;
    }
    
    console.log("Simulation abgeschlossen.");
}


function getScore(homeTeam, awayTeam) {
    console.log(`Simuliere Spiel: ${homeTeam.short} (${homeTeam.strength}) vs ${awayTeam.short} (${awayTeam.strength})`);

    if (!homeTeam || !awayTeam) {
        console.log("Fehler: Mindestens ein Team ist undefined!");
        return;
    }

    if (typeof homeTeam.strength !== "number" || typeof awayTeam.strength !== "number") {
        console.log("Fehler: Teamstärke fehlt oder ist kein Zahlentyp!", homeTeam, awayTeam);
        return;
    }

    let homeWinChance = Math.random();
    let awayWinChance = Math.random();
    let drawChance = Math.random();

    let homeGoals, awayGoals;

    if (homeTeam.strength > awayTeam.strength) {
        if (homeWinChance >= 0.60) {
            homeGoals = Math.floor(Math.random() * 4) + 1;
            awayGoals = Math.floor(Math.random() * homeGoals);
        } else if (drawChance >= 0.40 && drawChance < 0.60) {
            homeGoals = awayGoals = Math.floor(Math.random() * 4) + 1;
        } else {
            awayGoals = Math.floor(Math.random() * 4) + 1;
            homeGoals = Math.floor(Math.random() * awayGoals);
        }
    } else if (awayTeam.strength > homeTeam.strength) {
        if (awayWinChance >= 0.70) {
            awayGoals = Math.floor(Math.random() * 4) + 1;
            homeGoals = Math.floor(Math.random() * awayGoals);
        } else if (drawChance >= 0.40 && drawChance < 0.70) {
            homeGoals = awayGoals = Math.floor(Math.random() * 4) + 1;
        } else {
            homeGoals = Math.floor(Math.random() * 4) + 1;
            awayGoals = Math.floor(Math.random() * homeGoals);
        }
    } else {
        if (homeWinChance >= 0.75) {
            homeGoals = Math.floor(Math.random() * 4) + 1;
            awayGoals = Math.floor(Math.random() * homeGoals);
        } else if (drawChance >= 0.50 && drawChance < 0.75) {
            homeGoals = awayGoals = Math.floor(Math.random() * 4) + 1;
        } else {
            awayGoals = Math.floor(Math.random() * 4) + 1;
            homeGoals = Math.floor(Math.random() * awayGoals);
        }
    }

    console.log(`${homeTeam.short} ${homeGoals} - ${awayGoals} ${awayTeam.short}`);

    homeTeam.goalsScored += homeGoals;
    homeTeam.goalsConceaded += awayGoals;
    awayTeam.goalsScored += awayGoals;
    awayTeam.goalsConceaded += homeGoals;

    if (homeGoals > awayGoals) {
        homeTeam.wins++;
        homeTeam.points += 3;
        awayTeam.losses++;
    } else if (homeGoals < awayGoals) {
        awayTeam.wins++;
        awayTeam.points += 3;
        homeTeam.losses++;
    } else {
        homeTeam.draws++;
        awayTeam.draws++;
        homeTeam.points += 1;
        awayTeam.points += 1;
    }

    homeTeam.gamesPlayed++;
    awayTeam.gamesPlayed++;
}

//Random Number Generator

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}