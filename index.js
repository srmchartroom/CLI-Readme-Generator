// import dependencies
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter your project title:",
    },
    {
      type: "editor",
      name: "description",
      message: "Enter your project description:",
    },
    {
      type: "editor",
      name: "installation",
      message: "Enter the steps required to install the application:",
    },
    {
      type: "editor",
      name: "usage",
      message:
        "Provide examples and instructions for use. Include screenshots as needed using markdown format - e.g. '![imageDescription](http://url.here.com)':",
    },
    {
      type: "editor",
      name: "credits",
      message:
        "List your collaborators (with links to GitHub profiles), as well as any 3rd-party assets/creators, tutorials, etc.",
    },
    {
      type: "list",
      name: "license",
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
      name: "contributing",
      message: "Does this project allow outside/additional contributions under the Contributors Convenant?",
    },
    {
      type: "editor",
      name: "tests",
      message: "Please detail any/all tests that should be conducted.",
    },
    {
      type: "input",
      name: "questions",
      message: "Which email address should be used for follow-up questions?",
    },
  ]);
  console.log("All Done!");
}

function makeReadMe(answers) {
  const licenseSpaced = answers.license;
  const licenseCleaned = licenseSpaced.replace(/\s/g, "%20");
  if (answers.contributing == true) {
    answers.contributing = `To contribute, please follow the [Contributor Covenant](https://www.contributor-covenant.org/).`;
  } else {
    answers.contributing = "Contributions are not open at this time.";
  }
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

## Credits

${answers.credits}

`;
}

async function init() {
  try {
    const answers = await promptUser();

    const markdown = makeReadMe(answers);

    await writeFileAsync("example/README.md", markdown);

    console.log("Successfully constructed your README.md");
  } catch (err) {
    console.log(err);
  }
}

init();
