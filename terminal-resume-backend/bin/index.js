const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

// Load resume data from the JSON file
const resumeRaw = fs.readFileSync(path.join(__dirname, '../data/resume.json'), 'utf8');
const resumeData = JSON.parse(resumeRaw);

// Function to display the work experience section
function displayWorkExperience() {
  console.log(chalk.bold.green('\nWork Experience:'));
  resumeData.workExperience.forEach((exp) => {
    console.log(chalk.blue(`\n${exp.role} at ${exp.company}`));
    console.log(chalk.gray(`Duration: ${exp.duration}`));
    exp.details.forEach((detail, index) => {
      console.log(`${index + 1}. ${detail}`);
    });
  });
}

// Function to display the projects section
function displayProjects() {
  console.log(chalk.bold.green('\nProjects:'));
  resumeData.projects.forEach((project) => {
    console.log(chalk.blue(`\n${project.name}`));
    console.log(chalk.gray(`Link: ${project.link}`));
    project.details.forEach((detail, index) => {
      console.log(`${index + 1}. ${detail}`);
    });
  });
}

// Function to display the skills section
function displaySkills() {
  console.log(chalk.bold.green('\nSkills:'));
  for (let category in resumeData.skills) {
    console.log(chalk.blue(`\n${category}:`));
    const skills = resumeData.skills[category];
    if (Array.isArray(skills)) {
      skills.forEach((skill) => {
        console.log(`- ${skill}`);
      });
    } else {
      console.log(`- ${skills}`);
    }
  }
}

// Function to display the education section
function displayEducation() {
  console.log(chalk.bold.green('\nEducation:'));
  const edu = resumeData.education;
  console.log(chalk.blue(`${edu.degree} at ${edu.university}`));
  console.log(chalk.gray(`Duration: ${edu.duration}`));
  console.log(chalk.gray(`GPA: ${edu.GPA}`));
}

// Function to allow the user to choose which section of the resume to view
async function promptUser() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'section',
      message: 'What would you like to view?',
      choices: ['Work Experience', 'Projects', 'Skills', 'Education', 'Exit'],
    },
  ]);

  switch (answers.section) {
    case 'Work Experience':
      displayWorkExperience();
      break;
    case 'Projects':
      displayProjects();
      break;
    case 'Skills':
      displaySkills();
      break;
    case 'Education':
      displayEducation();
      break;
    case 'Exit':
      console.log(chalk.red('Exiting resume viewer.'));
      process.exit();
      break;
  }

  // Prompt again after displaying a section
  await promptUser();
}

// Start the application
promptUser();
