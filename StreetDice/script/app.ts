class DomElement {
    typeOfRoll: HTMLElement;
    dice1: HTMLElement;
    dice2: HTMLElement;
    goal: HTMLElement;
    roundGoal: HTMLElement;
    roundCount: HTMLElement;

    constructor() {
        this.typeOfRoll = document.getElementById("typeOfRoll");
        this.dice1 = document.getElementById("dice1");
        this.dice2 = document.getElementById("dice2");
        this.goal = document.getElementById("goal");
        this.roundGoal = document.getElementById("roundGoal");
        this.roundCount = document.getElementById("roundCount");
    }
}
enum RegularRolls {
    "Ace Deuce" = 3,
    "Easy Four",
    "Fever Five",
    "Easy Six",
    "Seven Out",
    "Easy Eight",
    "Nina",
    "Easy Ten",
    "Yo-leven",
}
enum PairRolls {
    "Snake Eyes" = 1,
    "Hard Four",
    "Hard Six",
    "Hard Eight",
    "Hard Ten",
    "Midnight"
}

let record: number = 0;
let bet: number = 0;
let wins: number = 3;
let gameOver: boolean;
let count: number = 1;
let d1: number;
let d2: number;
let firstDiceSum: number;

writePins();
updateRecord();

function game(): void {
    gameOver ? reset(new DomElement()) : roll(new DomElement());
}

function roll(model: DomElement) : void{
    count++;

    this.roundCount.innerHTML = "Round: " + count;
    d1 = Math.floor((Math.random() * 6) + 1);
    d2 = Math.floor((Math.random() * 6) + 1);
    model.dice1.innerHTML = diceImageProvider(d1);
    model.dice2.innerHTML = diceImageProvider(d2);
    if(d1==d2)
        model.typeOfRoll.innerHTML = PairRolls[d1];
    else
        model.typeOfRoll.innerHTML = RegularRolls[d1 + d2]; 

    if (count == 2) {
        firstDiceSum = d1 + d2;
        if (firstDiceSum === 7 || firstDiceSum === 11) {
            win(new DomElement());
        } else if (firstDiceSum === 2 || firstDiceSum === 3 || firstDiceSum === 12) {
            lost(new DomElement());
        } else {
            model.goal.innerHTML = "Hit your goal to win! Hit Seven Out to loose!"
            model.roundGoal.innerHTML = firstDiceSum.toString();
            model.typeOfRoll.style.color = "blue";
        }
    } else if (count > 2) {
        if (firstDiceSum === d1 + d2) {
            win(new DomElement());
        } else if (d1 + d2 === 7) {
            lost(new DomElement());
        } else {
            model.typeOfRoll.style.color = "orange";
        }
    }
}

function win(model: DomElement): void {
    model.goal.innerHTML = "Congratulations!"
    model.roundGoal.style.color = "green";
    model.typeOfRoll.style.color = "green";
    wins += bet;
    writePins();
    updateRecord();
    gameOver = true;
}

function lost(model: DomElement) : void{
    model.typeOfRoll.style.color = "red";
    model.goal.innerHTML = "Lost!"
    model.roundGoal.style.color = "RED";
    gameOver = true;
    bet = 0;
    writePins();
}

function reset(model: DomElement) : void{
    let roundCount: HTMLElement = document.getElementById("roundCount");
    count = 1;
    roundCount.innerHTML = "Round: " + count;
    model.goal.innerHTML = "Roll Seven Out(7) or Yo-leven(11) to WIN! Roll Snake Eyes(1,1), Ace Deuce(1,2), or Midnight(6,6) to LOOSE!";
    model.roundGoal.innerHTML = "Seven Out   Yo-leven";
    model.typeOfRoll.innerHTML = "BET & ROLL!"
    model.typeOfRoll.style.color = "green";
    model.roundGoal.style.color = "blue";
    model.dice1.innerHTML = diceImageProvider(d1);
    model.dice2.innerHTML = diceImageProvider(d2);
    gameOver = false;
}

function pinStringAppender(title: string, amount: number): string {
    let pins: string = title;
    for (var i = 0; i < amount; i++) {
        pins = pins + "I";
    }
    return pins;
}

function makeBet() : void{
    let model = new DomElement();
    if (count == 1 && wins > 0 || gameOver && wins > 0) {
        wins--;
        bet++;
        writePins();
    }
    else if (count > 1 && !gameOver) {
        model.typeOfRoll.style.color = "pink";
        model.typeOfRoll.innerHTML = "Only allowed in Round 1";
    }

}

function cashIn(model: DomElement) :void {
    if (count === 1 && bet !== 0 || gameOver && bet !== 0) {
        bet--;
        wins++;
        writePins();
    }
    else if (count > 1 && !gameOver) {
        model.typeOfRoll.style.color = "pink";
        model.typeOfRoll.innerHTML = "Only allowed in Round 1";
    }
}

function writePins() : void {
     let winPoints = document.getElementById("winPoints");
     let bets = document.getElementById("bets");
    winPoints.innerHTML = pinStringAppender("WALLET: ", wins);
    bets.innerHTML = pinStringAppender("BETS: ", bet);
}

function pickPocket() : void {
    let previousRecord: number;
    let successionRate = Math.floor((Math.random() * 5) + 1);
    if (successionRate <= 3) {
        wins++;
        previousRecord = record;
        updateRecord();
    }
    else if (successionRate > 3) {
        wins -= Math.floor((Math.random() * wins) + 1);
        bet = 0;
    }
    writePins();

}

function diceImageProvider(roll: number):string {
    switch (roll) {
        case 1:
            return '<img src ="img/dice/1c.gif" height="57">';

        case 2:
            return '<img src ="img/dice/2c.gif" height="57">';

        case 3:
            return '<img src ="img/dice/3c.gif" height="57">';

        case 4:
            return '<img src ="img/dice/4c.gif" height="57">';

        case 5:
            return '<img src ="img/dice/5c.gif" height="57">';

        case 6:
            return '<img src ="img/dice/6c.gif" height="57">';
    }
}

function updateRecord() : void{
    let totalCash: number = wins + bet;
    if (totalCash >= record) {
        var recordBox: HTMLElement = document.getElementById("recordBox");
        record = totalCash;
        recordBox.innerHTML = "RECORD: " + totalCash;
    }
}





