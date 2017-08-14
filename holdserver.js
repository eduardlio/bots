var express = require('express');
var app = express();
var fs = require('fs');

// JSON Object
var obj;
var num_holds;
var holds = [];
var num_moves;
var moves = [];
var grade= "v";
// read the file
fs.readFile('holds.json', 'utf8', (err, data) => {
	if (err) console.error(err);
	obj = JSON.parse(data);
	console.log(JSON.stringify(obj));
	console.log("holds");
	obj.holds.forEach((item)=>{
		console.log(item);
	});
});

// gets a random hold from the json file
function randomHold(){
	// number of holds
	// between 1 - 6
	num_holds= (Math.random() * 6 + 1).toFixed(0);

	// which hold to use
	var pos_hold = (Math.random()*obj.holds + 1).toFixed(0);
	var hold = (num_holds==1 ? obj.holds[pos_hold].name : obj.holds[pos_hold].plural);	
	return hold;
}

// gets a random move from the json file
function randomMove(){
	num_moves= (Math.random() * 6 + 1).toFixed(0);

	// which move to have
	var pos_move = (Math.random() * obj.moves + 1).toFixed(0);
	var move = (num_moves==1 ? obj.moves[pos_move].name : obj.moves[pos_move].plural);
	return move;
}
// picks from a few identifiers
function randomIdentifier(){
	var pos = (Math.random() * obj.identifiers.length + 1)
	return obj.identifiers[pos];
}
// sets a random grade
function setRandomGrade(){
	grade+=""+(Math.random()*6+1).toFixed(0);
}
app.listen(80, function () { 
	console.log('Chatfuel Bot-Server listening on port 80...'); 
});


app.get('/*', function (req, res) {
	req.on("data", (data)=>{
		var jsonResponse = [];
		jsonResponse.push({"text": "Make a " + grade + " climb\n"});
		jsonResponse.push({
			"text": "Using" + randomIdentifier() + num_holds+ " "+ + randomHold() + "\n"
		});
		jsonResponse.push({"text": "and" + randomIdentifier() + num_moves +" "+ randomMove()}); 
		res.send(jsonResponse);
	});
});
