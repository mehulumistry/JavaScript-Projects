// import * as fs from 'fs';
// import * as path from 'path';
// import * as readline from 'readline';
let fs = require('fs');
let readline = require('readline');
let pattern = "   |";
let pp = "";
let pp1 = "";
let pp2 = "";
let pattern2 = "---";
let pattern3 = "+";
let rc = [];
let r = [];
let c = [];
let count = 0;
let crn  = 0;
let pl = [];
let pls = [];
let no = 0;
let d = [];
let win = 0;
let temp = 0;
let scoreArray= [];
let namep = "";
let nameOfPlayer = ['X','O','A','B','C','D','E','F','G','H','I','J','K','L','M','N','P','Q','R','S','T','U','V','W','Y','Z'];


const rl = readline.createInterface({   // it is printing double values so I have write one extra command terminal:false in case of Mac
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

startGame();


function userInput(){
    
    rl.question('How many Players (enter below 26 and above 2) : ', (player) => {
        if(player>26 && player<2){
            console.log("Err : enter below 26 players and above 2 players")
            userInput();
        }
           rl.question('Please enter the Board Size (enter below 999 and above 3) : ', (board) => {
            if(board>999 && board < 3){
                console.log("Err : enter below 999 and above 3 for board size ")
                userInput();
            }
                rl.question('What is the win Sequence (enter below 999 and above 3) : ', (sequence) =>{
                    if(sequence>999 && sequence < 3){
                        console.log("Err : enter sequence below 999 and above 3 ")
                        userInput();
                    }
                    saveGame(player,board,sequence);
                    winningPossibileOrNot(player,board,sequence);


    //rl.close();
    
  
            });
        });
    });
    
}
function winningPossibileOrNot(p,b,s){
   if((s>b) || Math.ceil((b*b)/p)){
        console.log("\n>>>>>>>>  Winning is Possible, New game is starting....\n");





        newGame(p,b,s);  // player, board size , sequence
   }
   else{
        console.log("\n>>>>>>>> Winning is not possible, Enter the Input Again\n");
        userInput();
   }
}
function newGame(p,b,s){  // no of player , board size, sequence




    let nOP = p;
    let noOfPLayers=new Array(nOP-1);
    let sequence = s;
    for(let q= 0 ; q < nOP;q++) {
        noOfPLayers[q] = new Array();
    }

    console.log("Rules \n");
    console.log("1. Input Format : Row (space) Column ");
    console.log("2. Enter Unique location ");
    console.log("3. Press Capital Q for Quit the Game\n")

    console.log("Below is the generated board according to the criteria entered \n")
    printBoard(b);

    location(0,nOP,b,nameOfPlayer);

    function location(h,b,s,nameOfPlayer) {  // h is counter , b = noOfPlayers, s = board size

        if (r.length < (s * s)) {

            if ((b == h) && (noOfPLayers[h - 1][no] !== null)) {
                h = 0;
                no++;
                //location(h, b, s, nameOfPlayer);
            }
            h++;

            namep = nameOfPlayer[h - 1];
            rl.question(`Player ${namep}, enter location : `, ansr => {


                if (ansr !== 'Q') {

                    rc = ansr.split(" ");

                    r[crn] = parseInt(rc[0]);
                    c[crn] = parseInt(rc[1]);
                    pl[crn] = nameOfPlayer[h - 1];
                    pls[crn] = h;

                    noOfPLayers[h - 1][no] = locationToNumber(r[crn], c[crn], s);


                    //console.log(noOfPLayers);
                    if (noOfPLayers[h - 1].length >= sequence) {

                        //console.log("hi");
                        // for(let w = 0;w<sequence;w++){
                        //     scoreArray[w] = noOfPLayers[h-1][windowCount+w];
                        // }

                        //scoreArray = sort(scoreArray);
                        noOfPLayers[h - 1] = sort(noOfPLayers[h - 1]);
                        scoreArray = noOfPLayers[h - 1];
                        algorithm(scoreArray);

                        //console.log(noOfPLayers[h - 1]);


                    }


                    for (let y = 1; y <= s; y++) {   /// prints upper row number 1 2 3 4
                        if (y < 10) {
                            pp2 = pp2 + "   " + y;
                        }
                        else if (y >= 10 && y < 100) {
                            pp2 = pp2 + "  " + y;
                        }
                        else {
                            pp2 = pp2 + " " + y;
                        }
                    }
                    console.log(" " + pp2);
                    pp2 = "";


                    for (var t = 1; t <= s; t++) {

                        for (var i = 1; i <= s; i++) {   // prints "   | | | | |   "


                            for (let g = 0; g < r.length; g++) {

                                i = checksUserInput(`${pl[g]}`, r[g], c[g]);
                            }


                            if (count == 1) {
                                count = 0;
                            }
                            else {
                                if (i <= (s - 1)) {
                                    pp = pp + pattern;
                                }
                            }

                        }

                        if (t <= (s - 1)) {
                            for (let j = 0; j < s; j++) {  // prints    " ---+---+--- "
                                pp1 = pp1 + pattern2 + pattern3;
                                if (j == (s - 2)) {
                                    pattern3 = "";
                                }
                            }
                        }

                        if (t < 10) {      // condtions because otherwise it will deform the shape
                            console.log(t + "  " + pp);
                        }
                        else if (t < 100 && t >= 10) {
                            console.log(t + " " + pp);
                        }
                        else {
                            console.log(t + "" + pp);
                        }

                        console.log("   " + pp1);
                        pp = "";
                        pp1 = "";
                        pattern3 = "+";
                    }

                    function checksUserInput(input, r, c) {


                        if (t == r && (i == c)) {
                            count = 0;
                            if (i == s) {
                                pp = pp + " " + input;   // otherwise it will print extra |
                                count++;
                                //i = i+1;

                            }

                            else {
                                pattern = " |";
                                pp = pp + " " + input + pattern;
                                count++;

                            }
                            pattern = "   |";
                        }

                        return i;
                    }


                    //automaticSave(h,r,c); // h is player number


                    //  else if(ansr = 'Q'){
                    //      console.log("Quitting the Game.....");
                    //      saveGame(5,3,6);

                    //}


                    //h++;


                    crn++;
                    location(h, b, s, nameOfPlayer);
                    //console.log(pl);
                    //console.log(c);
                }
                else {
                    console.log("Quitting and Saving the Game ");
                    saveGame(b, s, sequence, crn, r, c, pl, pls);
                    rl.close();
                    process.exit();

                }



            });
        }

        else
        {
            console.log(">>>>>>>>> Tie Occurs <<<<<<<\n");
            startGame();
        }

    }




    function locationToNumber(r,c,b){
        return (((r-1)*b)+c);
    }
    function sort(arr){
        let tem = 0;
        for(let i=0;i<arr.length-1;i++)
        {
            for(let j=0;j<arr.length-i-1;j++)
            {
                if(arr[j]>arr[j+1])
                {
                    tem=arr[j];
                    arr[j]=arr[j+1];
                    arr[j+1]=tem;
                }
            }
        }

        return arr;

    }
    function algorithm(scoreArray) {

        //console.log(scoreArray);
        let seqArray = new Array();
        let possibilities = Array();
        let counter = 1;
        let number = 0;
        let seq = 0;
        let poss = 0;
        if(sequence === scoreArray.length){
            console.log("inside == ");
            differenceAlgorithm(scoreArray);
        }
        else {


            for (let cycle = 0; cycle < scoreArray.length; cycle++) {
                seqArray[0] = scoreArray[cycle];

                for (poss = 0; poss < (scoreArray.length - 1); poss++) {

                    for (seq = 1; seq < sequence; seq++) {

                        if ((cycle + poss + seq) >= (scoreArray.length)) {

                            //console.log("**");

                            //number = 0;
                            seqArray[seq] = scoreArray[seq + poss - ((parseInt(scoreArray.length)) - cycle)];

                            //console.log((seq + poss) - ((scoreArray.length) - cycle));


                        }
                        else {
                            //seqArray[seq] = scoreArray[seq + ((poss + cycle) * counter)];
                            seqArray[seq] = scoreArray[seq + ((poss + cycle))];
                        }
                    }
                    // for(let check = 0; check < sequence;check++){
                    //     if(seqArray[check] == undefined){
                    //         seqArray[seq] = scoreArray[0];
                    //     }
                    // }

                    possibilities[poss] = seqArray;
                    seq = 0;
                    differenceAlgorithm(sort(possibilities[poss]));

                }
                poss = 0;


            }
        }
    }
    function differenceAlgorithm(scoreArrayUpdate){


        let counta;
        let tempa;
        let cc = 0
        let as = 0;
        tempa = 0;
        counta = 0;

        for (let f = 0; f < sequence-1; f++) {



            d[f] = scoreArrayUpdate[f + 1] - scoreArrayUpdate[f];
            //console.log(d[f]);



            if(d[f] == (parseInt(b)-1)){

                for(let ia = 0;ia<s ; ia++){
                    tempa = as;
                    //console.log(f," ",tempa," ",as," ",counta);
                    as = numberToLocation(scoreArrayUpdate[ia],b);

                    if(tempa === as) {
                        counta++;
                        //console.log(counta);
                        if (counta === (parseInt(s) - 1)) {
                            console.log(` >>>>>>>  Player ${namep} is winner <<<<<<<`);
                            //fs.writeFileSync('game.txt', "");
                            saveGame(b, s, sequence, crn, r, c, pl, pls);
                            process.exit();

                        }

                    }


                }
                tempa = 0;
                counta = 0;


            }


           if ((d[f] === (parseInt(b) + 1)) || (d[f] === parseInt(b)) || (d[f] === 1)) {
                //console.log(d[f]);
                if (d[f] === temp) {

                    win++;
                    //console.log(win);
                    if (win == (sequence - 2)) {
                        console.log(` >>>>>>>  Player ${namep} is winner <<<<<<<`);
                        fs.writeFileSync('game.txt',"");
                        process.exit();
                    }
                }

                else {
                    temp = d[f];
                }
            }

        }
        temp = 0;
        win = 0;

    }

}
function startGame(){
    rl.question(' Dont Resume Game Before Playing New Game \n1. Start New Game\n2. Resume Saved Game\nEnter one or two : ', (an) =>{
        if(an == 1){
            console.log('\n>>>>>>>>> New Game is starting....\n');
            fs.openSync('game.txt','a');

            userInput();
        }
        else{
            console.log('\n>>>>>>>>> Resuming Game....\n');
            let contents = fs.readFileSync('game.txt','utf-8');

            if(contents == ""){
                console.log("No Previous Record, Start with new Game\n");
                startGame();
            }
            else {
                let data = contents.split(",");
                resumeGame(data);
            }
        } 
    });
}
function resumeGame(data) {


    let noptxt = parseInt(data[0]);
    let sizetxt = parseInt(data[1]);
    let seqtxt = parseInt(data[2]);
    let crntxt = parseInt(data[3]);
    let notxt = 0;
    let rtxt = [];
    let ctxt = [];
    let pltxt = [];
    let plstxt = [];
    let nOP = noptxt;

    let noOfPLayers = new Array();

    for (let q = 0; q < nOP; q++) {
        noOfPLayers[q] = new Array();
    }


    for (let res = 0; res < crntxt; res++) {

        rtxt[res] = data[res + 4];
        ctxt[res] = data[res + 4 + crntxt];
        pltxt[res] = data[res + 4 + (2 * crntxt)];
        plstxt[res] = data[res + 4 + (3 * crntxt)];

    }
    ///console.log(rtxt);
   // console.log(rtxt);


    for (let comp = 0; comp < crntxt; comp++) {
        for (let q = 0; q < noptxt; q++) {


            if ((q + (comp * noptxt)) < crntxt) {
                noOfPLayers[q][comp] = locationToNumber(parseInt(rtxt[q + comp * noptxt]), parseInt(ctxt[q + comp * noptxt]), sizetxt);
            }

        }

    }


    //console.log((noOfPLayers));

    resumeBoardPrint(sizetxt, rtxt, ctxt, pltxt);
    notxt = (noOfPLayers[plstxt[crntxt - 1] - 1].length)-1;  // write condition if notxt < 0  then call function  location;
    //console.log(notxt);
    //crntxt++;
    //console.log(parseInt(plstxt[crntxt - 1]));
    locationResume(parseInt(plstxt[crntxt - 1]), nOP, sizetxt, nameOfPlayer);

    function locationResume(h, b, s, nameOfPlayer) {  // h is counter , b = noOfPlayers, s = board size


            if (rtxt.length < (sizetxt * sizetxt)) {


                // namep = nameOfPlayer[h+1];
                if ((h === b) && (nameOfPlayer[h-1][notxt] !== null)) {
                    h = 0;
                    notxt++;
                    //console.log("notxt : ",notxt);
                   // locationResume(h, b, s, nameOfPlayer);
                }


                    h++;

                    namep = nameOfPlayer[h - 1];

                    rl.question(`Player ${namep}, enter location : `, ansr => {
                        if (ansr !== 'Q') {

                            rc = ansr.split(" ");

                            rtxt[crntxt] = parseInt(rc[0]);
                            ctxt[crntxt] = parseInt(rc[1]);
                            pltxt[crntxt] = nameOfPlayer[h - 1];
                            plstxt[crntxt] = h;


                            noOfPLayers[h - 1][notxt] = locationToNumber(rtxt[crntxt], ctxt[crntxt], s);

                            //noOfPLayers[h][notxt-1]     = locationToNumber(rtxt[crntxt], ctxt[crntxt], s);


                            //console.log(noOfPLayers);
                            //console.log(rtxt);
                            //console.log(ctxt);
                            if (noOfPLayers[h - 1].length >= seqtxt) {

                                //console.log("hi");
                                noOfPLayers[h - 1] = sort(noOfPLayers[h - 1]);
                                scoreArray = noOfPLayers[h - 1];
                                algorithm(scoreArray);
                            }


                            for (let y = 1; y <= s; y++) {   /// prints upper row number 1 2 3 4
                                if (y < 10) {
                                    pp2 = pp2 + "   " + y;
                                }
                                else if (y >= 10 && y < 100) {
                                    pp2 = pp2 + "  " + y;
                                }
                                else {
                                    pp2 = pp2 + " " + y;
                                }
                            }
                            console.log(" " + pp2);
                            pp2 = "";


                            for (var t = 1; t <= s; t++) {

                                for (var i = 1; i <= s; i++) {   // prints "   | | | | |   "


                                    for (let g = 0; g < rtxt.length; g++) {

                                        i = checksUserInput(`${pltxt[g]}`, parseInt(rtxt[g]), parseInt(ctxt[g]));
                                    }


                                    if (count == 1) {
                                        count = 0;
                                    }
                                    else {
                                        if (i <= (s - 1)) {
                                            pp = pp + pattern;
                                        }
                                    }

                                }

                                if (t <= (s - 1)) {
                                    for (let j = 0; j < s; j++) {  // prints    " ---+---+--- "
                                        pp1 = pp1 + pattern2 + pattern3;
                                        if (j == (s - 2)) {
                                            pattern3 = "";
                                        }
                                    }
                                }

                                if (t < 10) {      // condtions because otherwise it will deform the shape
                                    console.log(t + "  " + pp);
                                }
                                else if (t < 100 && t >= 10) {
                                    console.log(t + " " + pp);
                                }
                                else {
                                    console.log(t + "" + pp);
                                }

                                console.log("   " + pp1);
                                pp = "";
                                pp1 = "";
                                pattern3 = "+";
                            }

                            function checksUserInput(input, r, c) {


                                if (t == r && (i == c)) {
                                    count = 0;
                                    if (i == s) {
                                        pp = pp + " " + input;   // otherwise it will print extra |
                                        count++;
                                        //i = i+1;

                                    }

                                    else {
                                        pattern = " |";
                                        pp = pp + " " + input + pattern;
                                        count++;

                                    }
                                    pattern = "   |";
                                }

                                return i;
                            }


                            crntxt++;
                            //notxt++;
                             locationResume(h, b, s, nameOfPlayer);


                        }
                        else {
                            console.log("Quitting and Saving the Game ");
                            saveGame(b, s, seqtxt, crntxt, rtxt, ctxt, pltxt, plstxt,);
                            rl.close();
                            process.exit();

                        }
                    });


            }
            else {
                console.log(">>>>>>>>> Tie Occurs <<<<<<<\n");
                startGame();
            }
            //notxt++;

    }

    function locationToNumber(r, c, b) {
        return (((r - 1) * b) + c);
        }

    function sort(arr) {
            let tem = 0;
            for (let i = 0; i < arr.length - 1; i++) {
                for (let j = 0; j < arr.length - i - 1; j++) {
                    if (arr[j] > arr[j + 1]) {
                        tem = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = tem;
                    }
                }
            }

            return arr;

        }

    function algorithm(scoreArray) {

            //console.log(scoreArray);
            let seqArray = new Array();
            let possibilities = Array();

            let seq = 0;
            let poss = 0;
            if (seqtxt === scoreArray.length) {
                differenceAlgorithm(scoreArray);
            }
            else {


                for (let cycle = 0; cycle < scoreArray.length; cycle++) {
                    seqArray[0] = scoreArray[cycle];

                    for (poss = 0; poss < (scoreArray.length -1); poss++) {

                        for (seq = 1; seq < seqtxt; seq++) {

                            if ((cycle + poss + seq) >= (scoreArray.length)) {

                                //console.log("**");

                                //number = 0;
                                seqArray[seq] = scoreArray[seq + poss - ((parseInt(scoreArray.length)) - cycle)];

                                //console.log((seq + poss) - ((scoreArray.length) - cycle));


                            }
                            else {
                                //seqArray[seq] = scoreArray[seq + ((poss + cycle) * counter)];
                                seqArray[seq] = scoreArray[seq + ((poss + cycle))];
                            }
                        }
                        // for(let check = 0; check < sequence;check++){
                        //     if(seqArray[check] == undefined){
                        //         seqArray[seq] = scoreArray[0];
                        //     }
                        // }

                        possibilities[poss] = seqArray;
                        seq = 0;
                        //console.log(seqArray);
                        differenceAlgorithm(sort(possibilities[poss]));

                    }
                    poss = 0;


                }
            }
        }

    function differenceAlgorithm(scoreArrayUpdate) {

        let counta;
        let tempa;
        let cc = 0
        let as = 0;
        tempa = 0;
        counta = 0;
            //console.log(scoreArrayUpdate);

            for (let f = 0; f < seqtxt-1 ; f++) {

                //console.log(scoreArrayUpdate);
                d[f] = scoreArrayUpdate[f + 1] - scoreArrayUpdate[f];

                if(d[f] == (parseInt(sizetxt)-1)) {

                    for (let ia = 0; ia < seqtxt; ia++) {
                        tempa = as;
                        //console.log(f," ",tempa," ",as," ",counta);
                        as = numberToLocation(scoreArrayUpdate[ia], sizetxt);

                        if (tempa === as) {
                            counta++;
                            //console.log(counta);
                            if (counta === (parseInt(seqtxt) - 1)) {
                                console.log(` >>>>>>>  Player ${namep} is winner <<<<<<<`);
                                fs.writeFileSync('game.txt', "");
                                process.exit();

                            }

                        }


                    }
                    tempa = 0;
                    counta = 0;


                }


                if ((d[f] == (sizetxt + 1)) || (d[f] == sizetxt) || (d[f] == 1)) {

                    if (d[f] == temp) {

                        win++;
                        //console.log("win",win);
                        if (win == (seqtxt - 3)) {
                            console.log(` >>>>>>>  Player ${namep} is winner <<<<<<<`);
                            //fs.writeFileSync('game.txt',"");
                            process.exit();
                        }
                    }

                    else {
                        temp = d[f];
                    }
                }

            }
            temp = 0;
            win = 0;
            // windowCount++;


        }

}
function printBoard(sizeOfBoard,playerInput){

        let s = sizeOfBoard;
        let input = playerInput;

    
        for(let y = 1; y<= s; y++){   /// prints upper row number 1 2 3 4
            if(y<10){
            pp2 = pp2+"   "+y;
            }
            else if(y>=10 && y<100){
                pp2 = pp2+"  "+y;
            }
            else{
                pp2 = pp2+" "+y;
            }
        }
        console.log(" "+pp2);
    
    
    
        for(let t  = 1; t<= s; t++ ){ 
            
            for(let i = 1; i<=s;i++){   // prints "   | | | | |   "
            
    
               
                //i = checksUserInput(t,i,s,row,column);  // checks every time that it matches with the user input or not
    
                if(i <= (s-1)){
                    pp = pp+pattern;
                }
                
            }
            
            if(t <= (s-1)){
                for(let j = 0; j<s;j++){  // prints    " ---+---+--- " 
                    pp1 =pp1 + pattern2 + pattern3;
                    if(j == (s-2)){
                        pattern3 = "";
                    }
                }
            }
            
            if(t< 10){      // condtions because otherwise it will deform the shape
            console.log(t+"  "+pp);
            }
            else if(t<100 && t >= 10){
                console.log(t+" "+pp);
            }
            else{
                console.log(t+""+pp);
            }
    
            console.log("   "+pp1);
            pp = "";
            pp1 = "";
            pattern3 = "+";
        }
    
        // function checksUserInput(t,i,s,r,c){
        //     if(t==r && i==c){
        //         if(i == s){
        //             pp = pp + " "+input;   // otherwise it will print extra |
        //
        //         }
        //         else{
        //             pattern = " |";
        //             pp = pp + " "+input + pattern;
        //             i= i+1;
        //
        //         }
        //         pattern = "   |";
        //     }
        //     return i;
        // }
    }
function saveGame(b,s,sequence,crn,r,c,pl,pls){  // nOP,size,sequence,row,column,nameOfPlayer,counter of no of inputs

    let stack = [b,s,sequence,crn,r,c,pl,pls];
    fs.writeFileSync('game.txt',stack);

}
function resumeBoardPrint(s,r,c,pl) {

    for (let y = 1; y <= s; y++) {   /// prints upper row number 1 2 3 4
        if (y < 10) {
            pp2 = pp2 + "   " + y;
        }
        else if (y >= 10 && y < 100) {
            pp2 = pp2 + "  " + y;
        }
        else {
            pp2 = pp2 + " " + y;
        }
    }
    console.log(" " + pp2);
    pp2 = "";


    for (var t = 1; t <= s; t++) {

        for (var i = 1; i <= s; i++) {   // prints "   | | | | |   "


            for (let g = 0; g < r.length; g++) {

                i = checksUserInput(`${pl[g]}`, r[g], c[g]);
            }


            if (count == 1) {
                count = 0;
            }
            else {
                if (i <= (s - 1)) {
                    pp = pp + pattern;
                }
            }

        }

        if (t <= (s - 1)) {
            for (let j = 0; j < s; j++) {  // prints    " ---+---+--- "
                pp1 = pp1 + pattern2 + pattern3;
                if (j == (s - 2)) {
                    pattern3 = "";
                }
            }
        }

        if (t < 10) {      // condtions because otherwise it will deform the shape
            console.log(t + "  " + pp);
        }
        else if (t < 100 && t >= 10) {
            console.log(t + " " + pp);
        }
        else {
            console.log(t + "" + pp);
        }

        console.log("   " + pp1);
        pp = "";
        pp1 = "";
        pattern3 = "+";
    }

    function checksUserInput(input, r, c) {


        if (t == r && (i == c)) {
            count = 0;
            if (i == s) {
                pp = pp + " " + input;   // otherwise it will print extra |
                count++;
                //i = i+1;

            }

            else {
                pattern = " |";
                pp = pp + " " + input + pattern;
                count++;

            }
            pattern = "   |";
        }

        return i;
    }
}

function numberToLocation(numbera,sizea){

    for(let ra = 0; ra<=sizea;ra++){
        for(let ca=0;ca<=sizea;ca++){
            if((ca+(ra-1)*sizea) == parseInt(numbera)){
                return ra+ca;
            }
        }
    }

}
