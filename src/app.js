const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
inquirer.registerPrompt("recursive", require("inquirer-recursive"));
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const addEmployee = [
  {
    type: "recursive",
    message: "Add an employee?",
    name: "employees",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Enter your full name",
      },
      {
        type: "list",
        name: "jobTitle",
        message: "Choose job title",
        choices: ["Manager", "Engineer", "Intern"],
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Please state Office Number",
        when: (answers) => {
          return answers.jobTitle === "Manager";
        },
      },
      {
        type: "input",
        name: "id",
        message: "Enter ID number",
      },
      {
        type: "input",
        name: "email",
        message: "Enter email address",
        validate: validateEmail,
      },
      {
        type: "input",
        name: "github",
        message: "Enter github username",
        when: (answers) => {
          return answers.jobTitle === "Engineer";
        },
      },
      {
        type: "input",
        name: "school",
        message: "Enter school Intern belongs to",
        when: (answers) => {
          return answers.jobTitle === "Intern";
        },
      },
    ],
  },
];

const processAnswers = (response) => {
  console.log(response);
};
function init() {
  inquirer.prompt(addEmployee).then(processAnswers);
}

init();

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
