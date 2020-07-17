// import dependencies
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

// prompt user function
function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title", // prompt a simple input for project title
      message: "Enter your project title:",
    },
    {
      type: "editor",
      name: "description", // prompt an editor window for project description
      message: "Enter your project description:",
    },
    {
      type: "editor",
      name: "installation", // prompt an editor widow for installation steps
      message: "Enter the steps required to install the application:",
    },
    {
      type: "editor",
      name: "usage", // prompt an editor window for usage
      message:
        "Provide examples and instructions for use. Include screenshots as needed using markdown format - e.g. '![imageDescription](http://url.here.com)':",
    },
    {
      type: "editor",
      name: "credits", // prompt an editor window for credits
      message:
        "List your collaborators (with links to GitHub profiles), as well as any 3rd-party assets/creators, tutorials, etc.",
    },
    {
      type: "list",
      name: "license", // prompt a list selection for license
      message: "Select a license for your project.",
      choices: [
        "Apache License 2.0",
        "GNU General Public License v3.0",
        "MIT License",
        'BSD 2 Clause "Simplified" License',
        'BSD 3 Clause "New" or "Revised" License',
        "Boost Software License 1.0",
        "Creative Commons Zero v1.0 Universal",
        "Eclipse Public License 2.0",
        "GNU Affero General Public License v3.0",
        "GNU General Public License v2.0",
        "GNU Lesser General Public License v2.1",
        "Mozilla Public License 2.0",
        "The Unilicense",
      ],
    },
    {
      type: "confirm",
      name: "contributing", // prompt a confirmation for contributions
      message: "Does this project allow outside/additional contributions under the Contributors Convenant?",
    },
    {
      type: "editor",
      name: "tests", // promot an editor window for tests
      message: "Please detail any/all tests that should be conducted.",
    },
    {
      type: "input",
      name: "gituser", // prompt a simple input for github username
      message: "Please enter your GitHub username.",
    },
    {
      type: "input",
      name: "questions", // prompt a simple input for email address to send follow-up questions to
      message: "Which email address should be used for follow-up questions?",
    },
  ]);
  console.log("All Done!");
}

// function that creates the readme based on the inputs from the inquirer prompts above
function makeReadMe(answers) {
  const licenseSpaced = answers.license;
  // makes the selected license usable in a URL query string for creating badges
  const licenseCleaned = licenseSpaced.replace(/\s/g, "%20");
  // sets the contribution text if the user opts to allow contributions
  if (answers.contributing == true) {
    answers.contributing = `To contribute, please follow the [Contributor Covenant](https://www.contributor-covenant.org/).`;
  } else {
    answers.contributing = "Contributions are not open at this time.";
  }
  // the markdown to be created follows:
  return `
# ${answers.title} ![](https://img.shields.io/badge/-${licenseCleaned}-orange) ![](https://img.shields.io/badge/-Node.js-blue) ![](https://img.shields.io/badge/-ES6-red)

## Description

${answers.description}

## Table of Contents
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Contributing](#contributing)
  * [Tests](#tests)
  * [Questions](#questions)
  * [Credits](#credits)
 
## Installation

${answers.installation}

## Usage

${answers.usage}

## License

This project is licensed under: 
${answers.license}

## Contributing

${answers.contributing}

## Tests

${answers.tests}

## Questions

For questions, please contact [${answers.questions}](mailto:${answers.questions}).
See ${answers.gituser}(https://github.com/${answers.gituser}) for additional repositories and contact information.

## Credits

${answers.credits}

`;
}

// the kickoff function to run on launch of the index.js file
async function init() {
  try {
    // async..await - awaits the result of inquirer prompts...
    const answers = await promptUser();
    // ...  before creating the ReadMe.md
    const markdown = makeReadMe(answers);
    // ... then writes the final result to a README.md file to be stored in the example folder
    await writeFileAsync("result/README.md", markdown);
    // ... and then logs out to the console that the README.md is created.
    console.log("Successfully constructed your README.md");
  } catch (err) {
    // try..catch to stop script and catch any errors should they occur.
    console.log(err);
  }
}

init();
