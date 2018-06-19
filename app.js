require("dotenv").config();

const
chalk = require("chalk")
figlet = require("figlet")
clear = require("clear"),
// readline = require("readline-sync");
readline = require("readline");

const semverRegex = require('semver-regex');


function clearConsole() {
	clear();
	console.log(
	  chalk.yellow(
	    figlet.textSync('SEMVER COMPARE', { horizontalLayout: 'full' })
	  )
	);
}

clearConsole();
console.log("what are your semvers?")

process.stdin.setEncoding('utf8');
var rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

rl.on('line', readLine);



function readLine(input){
	var onlyWhiteSpace = input.replace(/\s/g, "")
	// If the line shouldn't be ignored, otherwise ignored.
	if(input !== null && input !== undefined && onlyWhiteSpace !== "") {
		// Currently only working numeric only semver comparisons
		if(returnIsInvalid(input) == false) {
			console.log("invalid\n");
		} else {
			printValidPrecendence(input);
		}
	}
}

function returnValidInput(input) {
	return input.trim().replace(/\s+/g, " ").split(" ")
}

function returnIsInvalid(input){
	return semverRegex().test(input)
}

function printValidPrecendence(input) {
	var validInput = returnValidInput(input)
	var firstValid = validInput[0].split(".")
	var secondValid = validInput[1].split(".")
	var equal = false;

	for(var i = 0; i <=2; i++) {
		if(equal === false && firstValid[i] < secondValid[i]) {
			console.log("before\n")
			break;
		} else if(equal === false && firstValid[i] > secondValid[i]) {
			console.log("after\n")
			break;
		} else if(equal === true && firstValid[i] < secondValid[i]) {
			console.log("before\n")
			break;
		} else if(equal === true && firstValid[i] > secondValid[i]) {
			console.log("after\n")
			break;
		} else if(equal === true && i === 2) {
			console.log("equal\n")
		} else if(firstValid[i] === secondValid[i]) {
			equal = true;
		} 
	}
}
