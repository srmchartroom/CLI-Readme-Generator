// import dependencies
const fs = require("fs");
const inquirer = require("inquirer");
const util = require("util");
const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'Enter your project title.',
    },
],