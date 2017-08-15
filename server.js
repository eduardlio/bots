var express = require('express');
var app = express();
var fs = require('fs');

// JSON Object
var obj;

// Current Black card
var cBlack;
var cPick;

var queue = [];

var whites = [];
var iWhite = 0;
fs.readFile('cards.json', 'utf8', (err, data) => {
    if (err) console.error(err);
    obj = JSON.parse(data);
    console.log("There are " + obj.blackCards.length + " black cards.");
    console.log("There are " + obj.whiteCards.length + " white cards.");
});

function randomBlack(){
console.log("random Black start");
	if(queue.length>=25){
	queue.shift();
    }
    var randBlack = (Math.random() * obj.blackCards.length + 1).toFixed(0);

    var blackCard = obj.blackCards[randBlack];

    
    // if the blackcard isn't contained in the queue
    if(queue.indexOf(blackCard.text)==-1){
    	// process the card
    	processBlackCard(blackCard);
	}
	console.log("queue: " + queue);
    console.log("queue length: "+ queue.length);
   console.log("random black end"); 
    return blackCard;
}
function processBlackCard(card){
console.log('processing black card');
	// push the card to the queue
	queue.push(card.text);
	var blackCardT = card.text;
	blackCardT.replaceAll = (search, replacement)=>{
	    search = "<br>";
	    replacement = "\n";
	    var target = this;
	    return target.split(search).join(replacement);
	};
	card.text = blackCardT;
console.log('done processing blcak card');	
}

function randomWhites(){
console.log("random white");
    var things = [];
    var count = 0;
    while (count<5){
        var white = (Math.random() * obj.whiteCards.length+1).toFixed(0);
        var thing = obj.whiteCards[white];
        things.push("\n" + thing.slice(0, thing.length));
        count++;
    }
console.log("done randome white");
    return things;
}

app.listen(80, function () {
    console.log('Chatfuel Bot-Server listening on port 80...');
});

app.get('/*', function (req, res) {
    var jsonResponse = [];
console.log("getting random pick thing ");
    var bRandom = randomBlack();
console.log("deciding which word to use ('card vs cards')");
    var card = (bRandom.pick == 1 ? "card":"cards");
console.log("random text");
    jsonResponse.push({"text": "Your black card is: " + bRandom.text + "\n" + ""});
    jsonResponse.push({"text": "You'll need " + bRandom.pick + " white "+card+" for this one"});
    jsonResponse.push({"text": "Your white cards are: " + randomWhites()});
    res.send(jsonResponse);
});

