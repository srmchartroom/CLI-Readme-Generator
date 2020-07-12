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
  ]);
}

function makeReadMe(answers) {
  return `
#${answers.title}

## Description

${answers.description}

`;
}

async function init() {
  try {
    const answers = await promptUser();
    const markdown = makeReadMe(answers);

    await writeFileAsync("example/README.md", markdown);

    console.log("Successfully wrote to index.html");
  } catch (err) {
    console.log(err);
  }
}

init();
