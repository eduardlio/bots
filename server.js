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
    console.log(JSON.stringify(obj));
    console.log("There are " + obj.blackCards.length + " black cards.");
    console.log("There are " + obj.whiteCards.length + " white cards.");
});

function randomBlack(){
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
    
    return blackCard;
}
function processBlackCard(card){
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
	
}

function randomWhites(){
    var things = [];
    var count = 0;
    while (count<5){
        var white = (Math.random() * obj.whiteCards.length+1).toFixed(0);
        var thing = obj.whiteCards[white];
        things.push("\n" + thing.slice(0, thing.length));
        count++;
    }
    return things;
}

app.listen(80, function () {
    console.log('Chatfuel Bot-Server listening on port 80...');
});

app.get('/*', function (req, res) {
	// var body = '';
	// res.on("data", (data)=>{
	// 	body+=data;
	// });
	// res.on("error", (e)=>{
	// 	console.error(e);
	// })
	// res.on("end", ()=>{
	// 	console.log("Body: " + body);
	// })
    var jsonResponse = [];
    var bRandom = randomBlack();
    var card = (bRandom.pick == 1 ? "card":"cards");
    jsonResponse.push({"text": "Your black card is: " + bRandom.text + "\n" + ""});
    jsonResponse.push({"text": "You'll need " + bRandom.pick + " white "+card+" for this one"});
    jsonResponse.push({"text": "Your white cards are: " + randomWhites()});
    res.send(jsonResponse);
});

