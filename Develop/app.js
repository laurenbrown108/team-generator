const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { listenerCount } = require("process");

let employees = [];

askManager();

function askManager() {
    inquirer.prompt([
        {
            type: "input",
            message: "Enter manager's name",
            name: "name"
        },
        { 
            type: "input",
            message: "Enter manager's ID",
            name: "id"
        },
        {
            type: "input",
            message: "Enter manager's email",
            name: "email"
        },
        {
            type: "input",
            message: "Enter manager's office number",
            name: "officeNumber"
        }
    ]).then(data => {
        const manager = new Manager(data.name, data.id, data.email, data.officeNumber)
        console.log(manager);
        employees.push(manager)

        nextEmployee();
    })
}
function nextEmployee() {
    inquirer.prompt([
        {
            type: "list",
            message: "Please select next employee",
            choices: [
                "Intern",
                "Engineer",
                "No more employees"
            ],
            name: "employeeType"
        }
    ]).then(function({ employeeType }){
        if(employeeType === "Engineer") {
            askEngineer();
        }
        else if(employeeType === "Intern") {
            askIntern();
        }
        else {
            const newHtml = render(employees);
            
            fs.writeFile(outputPath, newHtml, err => {
            if (err)
            throw err
            })
        }
    })
}
function askEngineer() {
    inquirer.prompt( [
        {
            type: "input",
            message: "What is your team member's name?",
            name: "name"
        },
        {
            type: "input",
            message: "Enter team member's ID",
            name: "id"
        },
        {
            type: "input",
            message: "Enter team member's email",
            name: "email"
        },
        {
            type: "input",
            message: "Enter team member's github",
            name: "github"
        }
        ]).then(data => {
            const engineer = new Engineer(data.name, data.id, data.email, data.github)
            console.log(engineer);
            employees.push(engineer)
    
            nextEmployee();
        })
    }
function askIntern() {
    inquirer.prompt( [
        {
            type: "input",
            message: "What is your team member's name?",
            name: "name"
        },
        {
            type: "input",
            message: "Enter team member's ID",
            name: "id"
        },
        {
            type: "input",
            message: "Enter team member's email",
            name: "email"
        },
        {
            type: "input",
            message: "Enter team member's school",
            name: "school"
        }
        ]).then(data => {
            const intern = new Intern(data.name, data.id, data.email, data.school)
            console.log(intern);
            employees.push(intern)
            //console.log(employees);
        
            nextEmployee();
        })
    }


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
