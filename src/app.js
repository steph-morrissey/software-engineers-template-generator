const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
inquirer.registerPrompt("recursive", require("inquirer-recursive"));

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Function to validate email
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Initialisation of empty array which will hold class instances for Manager/Engineers/Interns
const renderTeamMembers = [];

// Array of questions specific to Manager
const generateManager = [
  {
    type: "input",
    name: "name",
    message: "Enter your full name",
  },
  {
    type: "list",
    name: "role",
    message: "Choose job title",
    choices: ["Manager"],
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
    name: "officeNumber",
    message: "Please state Office Number",
  },
];

// Array of questions specific to Engineers/Interns
const generateTeamMembers = [
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
        name: "role",
        message: "Choose job title",
        choices: ["Engineer", "Intern"],
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
          return answers.role === "Engineer";
        },
      },
      {
        type: "input",
        name: "school",
        message: "Enter school Intern belongs to",
        when: (answers) => {
          return answers.role === "Intern";
        },
      },
    ],
  },
];

// Creates new instance of Manager class
const newManager = (employee) => {
  const manager = new Manager(
    employee.name,
    employee.id,
    employee.email,
    employee.officeNumber
  );
  renderTeamMembers.push(manager);
};

// Creates new instance of Engineer class
const newEngineer = (employee) => {
  const engineer = new Engineer(
    employee.name,
    employee.id,
    employee.email,
    employee.username
  );
  renderTeamMembers.push(engineer);
};

// Creates new instance of Intern class
const newIntern = (employee) => {
  const intern = new Intern(
    employee.name,
    employee.id,
    employee.email,
    employee.school
  );
  renderTeamMembers.push(intern);
};

// Maps over employees object and creates new instance of class specific to job role
const processTeam = (answers) => {
  const employees = answers.employees;
  let teamMembers = employees.map((employee) => {
    if (employee.role === "Engineer") {
      newEngineer(employee);
    } else if (employee.role === "Intern") {
      newIntern(employee);
    }
  });
  // Once all employee classes have been instantiated
  // It then calls the render method and passes in the array info to be displayed
  fs.writeFileSync(outputPath, render(renderTeamMembers));
};

// Prompts user to add a series of employees using a series of questions
// Then executes processTeam()
const generateTeam = (employee) => {
  newManager(employee);
  inquirer.prompt(generateTeamMembers).then(processTeam);
};

// Prompts Manager to answer a series of questions
// Then executes generateTeam()
function init() {
  inquirer.prompt(generateManager).then(generateTeam);
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
