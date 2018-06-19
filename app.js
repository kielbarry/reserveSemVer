require("dotenv").config();

const
express = require("express"),
app = express(),
router = express.Router(),
http = require("http"),
path = require("path"),
PORT = process.env.PORT || 3000,
bodyParser = require("body-parser"),
request = require("request"),
URL = require("url-parser"),
assert = require("assert"),
program = require("commander"),
inquirer = require("inquirer")
chalk = require("chalk")
figlet = require("figlet")
clear = require("clear"),
// readline = require("readline-sync");
readline = require("readline");

const semverRegex = require('semver-regex');

program.version('0.0.1').description('semver comparison system');


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
			// after validity set and numbers only

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
	console.log(semverRegex().test(input))
}

function printValidPrecendence(input) {
	var validInput = returnValidInput(input)
	var firstValid = validInput[0].split(".")
	var secondValid = validInput[1].split(".")
	var equal = false;

	firstValid.some((num, i) => {
		if(equal === false && num < secondValid[i]) {
			console.log("before\n")
		}
	})

	for(var i = 0; i <=2; i++) {
		if(equal === false && firstValid[i] < secondValid[i]) {
			console.log("before\n")
			break;
		} else if(equal === false && firstValid[i] > secondValid[i]) {
			console.log("after\n")
			break;
		} else if(equal === true && i === 2) {
			console.log("equal\n")
		} else if(firstValid[i] === secondValid[i]) {
			equal = true;
		} 
	}
}

// var msg = [
//       {
//         name: 'semverInput',
//         type: 'input',
//         message: 'Please enter your semvers:',
//         // validate: function(value) {
//         // 	// clearConsole();
//         // 	console.log("HEREEE", value)
//         // }
//       }
//     ]

// var userInput =readline.question("What are your semvers?")
// console.log("here is input: ", userInput)

// 1.3.6 1.4.2
// 1.7.9 1.3.5 0.0.2
//     4.2.3-beta    4.2.3-alpha
//     1.6 1.6.3

// clearConsole();

// inquirer.prompt(msg).then(ans => {
//     console.log("there...", ans)
// });

// program
//   .command('addContact <firstame> <lastname> <phone> <email>')
//   .alias('a')
//   .description('Add a contact')
//   .action((firstname, lastname, phone, email) => {
//     addContact({firstname, lastname, phone, email});
//   });

// program
//   .command('getContact <name>')
//   .alias('r')
//   .description('Get contact')
//   .action(name => getContact(name));

var userInput = {
	message: "Please enter input",
	input: {}
}


function checkValid(ui) {
}



// program
// 	.command('checkValid') // No need of specifying arguments here
//   	.alias('a')
//  	.description('Add a contact')
// 	.action(() => {
//     	prompt(msg).then((answers) => {
//     		console.log(answers)
//     	})
//     });

// app
// 	.use(bodyParser.json())
// 	.use(bodyParser.urlencoded({ extended : true }))
// 	.use(express.static(__dirname + "/"))
// 	.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

// http
// 	.createServer(app)
// 	.listen(PORT)
// 	.on("error", (error) => console.log("error: ", error))
// 	.on("listening", () => console.log("serving port: ", PORT))


