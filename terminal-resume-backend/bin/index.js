#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const figlet = require('figlet');
const inquirer = require('inquirer');

// Load resume data
const resumeRaw = fs.readFileSync(path.join(__dirname, '../data/resume.json'), 'utf8');
const resumeData = JSON.parse(resumeRaw);

// Display Banner
function showBanner() {
  console.clear();
  const banner = figlet.textSync('Jatin Narang', {
    font: 'Slant',
    horizontalLayout: 'default',
    verticalLayout: 'default',
  });

  console.log(chalk.hex('#0D47A1').bold(banner)); // Name in blue
  console.log(chalk.bold.gray('\n=============================='));
  console.log(chalk.hex('#43A047').bold('💼 Full Stack Developer')); // Green
  console.log(chalk.hex('#FF9800').bold('📍 India | 🖥️  JavaScript, Node.js, MongoDB, React, Vue\n')); // Orange
  console.log(chalk.bold.gray('==============================\n'));
}

// Work Experience
function displayWorkExperience() {
  console.log(chalk.hex('#FF5722').bold('\n💼 Work Experience:\n')); // Work Experience in orange
  resumeData.workExperience.forEach((exp) => {
    console.log(chalk.hex('#8BC34A').bold(`🔹 ${exp.role} at ${exp.company}`)); // Role in green
    console.log(chalk.hex('#9E9E9E').bold(`📅 ${exp.duration}`)); // Duration in gray
    exp.details.forEach((detail, index) => {
      console.log(`   ${index + 1}. ${chalk.white(detail)}`);
    });
    console.log('');
  });
}

// Projects
function displayProjects() {
  console.log(chalk.hex('#03A9F4').bold('\n🚀 Projects:\n')); // Projects in blue
  resumeData.projects.forEach((project) => {
    console.log(chalk.hex('#9C27B0').bold(`🔸 ${project.name}`)); // Project name in purple
    console.log(chalk.hex('#9E9E9E').bold(`🔗 Link: ${project.link}`)); // Link in gray
    project.details.forEach((detail, index) => {
      console.log(`   ${index + 1}. ${chalk.white(detail)}`);
    });
    console.log('');
  });
}

// Skills
function displaySkills() {
  console.log(chalk.hex('#4CAF50').bold('\n🧠 Skills:\n')); // Skills in green
  for (let category in resumeData.skills) {
    console.log(chalk.hex('#1976D2').bold(`📘 ${category}:`)); // Category in blue
    const skills = resumeData.skills[category];
    if (Array.isArray(skills)) {
      console.log('   ' + skills.map(skill => chalk.white(`🔧 ${skill}`)).join('\n   '));
    } else {
      console.log(`   🔧 ${chalk.white(skills)}`);
    }
    console.log('');
  }
}

// Education
function displayEducation() {
  const edu = resumeData.education;
  console.log('\n\n' + chalk.hex('#4A90E2').bold('🎓 Education\n')); // Title in professional blue

  console.log(chalk.white.bold(`🏫 ${edu.degree}`) + chalk.gray(` at ${edu.university}`));
  console.log(''); // spacing

  console.log(chalk.white(`📅 Duration: `) + chalk.gray(edu.duration));
  console.log(''); // spacing

  console.log(chalk.white(`📊 CGPA: `) + chalk.gray(edu.CGPA));
  console.log(''); // spacing
}


// Interactive Menu
async function promptUser() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'section',
      message: chalk.hex('#1976D2').bold('📂 What would you like to view?'), // Blue prompt message
      choices: ['Work Experience', 'Projects', 'Skills', 'Education', 'Exit'],
    },
  ]);

  console.clear();
  showBanner();

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
      console.log(chalk.hex('#D32F2F').bold('\n👋 Exiting. Thanks for viewing my terminal resume!\n')); // Red exit message
      process.exit();
  }

  await promptUser();
}

// Start
showBanner();
promptUser();
