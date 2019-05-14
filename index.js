#!/usr/bin/env node

// the line up top requires us to run this file with a custom command.  Also, we need to add some code in the package.json ... 
// "bin": {
//     "scrape": "./index.js"
// }

// import required dependencies
const inquirer = require('inquirer'),
    chalk = require('chalk'),
    figlet = require('figlet'),
    shell = require('shelljs'),
    uniqueFilename = require('unique-filename'),
    cheerio = require('cheerio');

// pull fonts from figlet.. decide which font is best.
// console.log(figlet.fontsSync());

// templating the CLI

// introduction 
const init = () => {
    console.log(
        chalk.bold.magentaBright(
            figlet.textSync('Scrape  Those  Job  Boards', {
                font: 'Doom',
                horizontalLayout: 'default',
                verticalLayout: 'default'
            })
        )
    );
};

// ask for login information
const askLogin = () => {
    const login = [{
            name: 'USERNAME',
            type: 'input',
            message: 'Username: '
        },
        {
            type: 'input',
            name: 'PASSWORD',
            message: 'Password: '
            // filter: function(val) {
            //     return val.split('.')[1];
            // }
        }
    ];
    return inquirer.prompt(login);
};

// create a file for login date and also information from scrapped job boards
const createFile = () => {
    const filepath = uniqueFilename('./scrapped', 'scraped');
    console.log(filepath);
    shell.touch(filepath);
    return console.log('created');
};

const success = filepath => {
    console.log(
        chalk.white.bgGreen.bold('Done!')
    );
};



const run = async () => {
    // show the script introduction
    init();
    // ask for login info
    const secureLogin = await askLogin();
    const {
        USERNAME,
        PASSWORD
    } = secureLogin;
    // create the file
    const filepath = createFile();
    // show success message
    success(filepath);
};

run();