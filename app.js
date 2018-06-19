require("dotenv").config();

const
chalk = require("chalk")
figlet = require("figlet")
clear = require("clear"),
readline = require("readline");

const semverRegex = require('semver-regex');


// clearConsole prettifies the workspace.
function clearConsole() {
	clear();
	console.log(
	  chalk.yellow(
	    figlet.textSync('SEMVER COMPARE', { horizontalLayout: 'full' })
	  )
	);
}

clearConsole();
console.log("What are your semvers to compare?")

process.stdin.setEncoding('utf8');
var rl = readline.createInterface({
  input: process.stdin,
  terminal: false
});

rl.on('line', readLine);

// readLine treats each line as a separate input to operate on.
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

// Reduces whitespace to standardize inputs for other functions.
function returnValidInput(input) {
	return input.trim().replace(/\s+/g, " ").split(" ")
}

// returnIsInvalid checks whether a string with 2 valid semvers has been passed.
function returnIsInvalid(input){

	var checker = input.match(/^[a-zA-Z0-9-.]*[\s]*[a-zA-Z0-9-.]*[\s]*/)

	var checkSame = returnValidInput(checker[0])
	var originalCheck = returnValidInput(input)

	if(checkSame.join('') == originalCheck.join('')) {
		return true
	} else {
		return false
	}

	// return semverRegex().test(input)
}

function printValidPrecendence(input) {
	var validInput = returnValidInput(input)
	var firstValid = validInput[0].split(".")
	var secondValid = validInput[1].split(".")
	var equal = false;

	for(var i = 0; i <=2; i++) {
		if(firstValid[i] < 0 || secondValid[i] < 0){
			console.log("invalid\n")
			break;
		} else if(equal === false && firstValid[i] < secondValid[i]) {
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
