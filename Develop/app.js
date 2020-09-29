const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

//all employee info will be stored here
let employees = [];

//starting off w/ prompts for manager
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
    //push manager info to array    
    ]).then(data => {
        const manager = new Manager(data.name, data.id, data.email, data.officeNumber)

        employees.push(manager)

        nextEmployee();
    })
}
//add employee or create output if finished
const nextEmployee = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "Please select next employee",
            choices: [
                "Engineer",
                "Intern",
                "No more employees"
            ],
            name: "employeeType"
        }
    //determines questions to ask based off prompt choice
    ]).then(({ employeeType }) => {
        if(employeeType === "Engineer") {
            askEngineer();
        }
        else if(employeeType === "Intern") {
            askIntern();
        }
        //info in the employee array is written to output
        else {
            const newHtml = render(employees);
            
            fs.writeFile(outputPath, newHtml, err => {
            if (err)
            throw err
            })
        }
    })
}
//prompts for engineer
const askEngineer = () => {
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
        //push engineer info to employee array
        ]).then(data => {
            const engineer = new Engineer(data.name, data.id, data.email, data.github)
            
            employees.push(engineer)
    
            nextEmployee();
        })
    }
//prompts for intern
const askIntern = () => {
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
        //push intern info to employee array
        ]).then(data => {
            const intern = new Intern(data.name, data.id, data.email, data.school)
            
            employees.push(intern)
            
            nextEmployee();
        })
    }

