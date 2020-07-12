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
  ]);
  console.log("All Done!");
}

function makeReadMe(answers) {
  const licenseSpaced = answers.license;
  const licenseCleaned = licenseSpaced.replace(/\s/g, "%20");
  console.log(licenseCleaned);
  return `
# ${answers.title} ![](https://img.shields.io/badge/-${licenseCleaned}-orange)

## Description

${answers.description}

## Table of Contents
  * [Installation](#installation)
  * [Credits](#credits)
  * [License](#license)

## Installation

${answers.installation}

## Credits

${answers.credits}

## License

This project is licensed under: 
${answers.license}

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
