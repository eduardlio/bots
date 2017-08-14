var express = require('express');
var app = express();
var fs = require('fs');

// JSON Object
var obj;
var holds=[];
var moves = [];
var grade "v";
fs.readFile('holds.json', 'utf8', (err, data) => {
    if (err) console.error(err);
    obj = JSON.parse(data);
    console.log(JSON.stringify(obj));
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
