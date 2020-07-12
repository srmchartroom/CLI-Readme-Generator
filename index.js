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
      message: "Enter your project title.",
    },
    {
      type: "input",
      name: "description",
      message: "Enter your project description.",
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
