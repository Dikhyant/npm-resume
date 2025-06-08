#!/usr/bin/env node

// No Supabase import needed as data is hardcoded
import chalk from 'chalk'; // Still using chalk for attractive terminal output

// --- Hardcoded Resume Data ---
// Personal Info (for name in header)
const personalInfo = [
    { name: "Dhyant Krishna Dalal" }
];

// Experience Data
const experienceData = [
    {
        company_name: "Wednesday Solutions",
        role: "Next.js Developer",
        start_date: "2024-10-01",
        end_date: "2025-06-08",
        description: "Currently contributing as a Next.js Developer, building the frontend for an AI chat application that helps users with SEO, keyword research, and creating social media posts for their brand. Integrated GraphQL for data fetching, utilized AWS Cognito for authentication, and implemented Stripe for payment processing.",
        technologies: "Next.js, GraphQL, AWS Cognito, Stripe"
    },
    {
        company_name: "Across the Globe",
        role: "Software Developer",
        start_date: "2023-09-01",
        end_date: "2024-04-30",
        description: "Worked on Sconto, a student-centric shopping platform, offering a seamless experience for users. Elevated user retention from 13% to 18% with locally cached data and optimized API calls. Leveraged NodeJS for backend REST API development, ensuring robust security. Crafted polished frontend interfaces using React and Tailwind CSS, contributing to a seamless shopping journey. Worked on Evallo, an EdTech solution for SAT aspirants, aiding in SAT preparation by offering mock tests, assignments, and 1-to-1 chat with tutors. Played a pivotal role within Evallo, using HTML, CSS, and JS skills, in implementing a subscription dashboard for Organization Admins. Responsibilities included developing features enabling admins to purchase privileges tailored to their needs, such as increasing tutor, assignment, and session limits. Leveraged NodeJS for backend development, ensuring robust functionality and seamless operations. Successfully integrated the frontend with Stripe for secure payment processing, enhancing user experience. Worked on Treato, a salon service booking application. Leveraged React Native expertise, ensuring seamless user experiences, allowing effortless Browse and service selection. Built backend with Python and stored salon data in an SQL database, contributing to a polished mobile application experience.",
        technologies: "NodeJS, React, Tailwind CSS, HTML, CSS, JavaScript, React Native, Python, SQL, Stripe"
    },
    {
        company_name: "Bombay Play",
        role: "Software Developer",
        start_date: "2021-10-01",
        end_date: "2022-03-31",
        description: "As a developer for Bingo Piggy, a hyper-social video game, specialized in crafting smooth animations, responsive UI design, and seamless REST API integration. Additionally, integrated the Facebook Instant SDK for multiplayer matchmaking and leaderboard functionality. Leveraged expertise to ensure an engaging and dynamic gaming experience for players, fostering social interaction and competition.",
        technologies: "Cocos Creator, REST API, Facebook Instant SDK"
    }
];

// Institute/Education Data
const instituteData = [
    {
        institute: "Odisha University of Technology and Research, Bhubaneswar",
        degree_program: "Bachelor of Technology | Computer Science Engineering",
        start_year: 2019,
        end_year: 2023
    },
    {
        institute: "Stewart School, Bhubaneswar",
        degree_program: "Higher secondary",
        start_year: 2016,
        end_year: 2018
    },
    {
        institute: "Stewart School, Bhubaneswar",
        degree_program: "Matriculation",
        start_year: 2015,
        end_year: 2016
    }
];

// Skills Data
const skillsData = [
    { category: "Languages/Frameworks", skill_name: "Python" },
    { category: "Languages/Frameworks", skill_name: "Flask" },
    { category: "Languages/Frameworks", skill_name: "Django" },
    { category: "Languages/Frameworks", skill_name: "Javascript" },
    { category: "Languages/Frameworks", skill_name: "Typescript" },
    { category: "Languages/Frameworks", skill_name: "NodeJS" },
    { category: "Languages/Frameworks", skill_name: "ExpressJS" },
    { category: "Languages/Frameworks", skill_name: "React Native" },
    { category: "Languages/Frameworks", skill_name: "React JS" },
    { category: "Languages/Frameworks", skill_name: "Cocos Creator" },
    { category: "Languages/Frameworks", skill_name: "HTML" },
    { category: "Languages/Frameworks", skill_name: "CSS" },
    { category: "Languages/Frameworks", skill_name: "Tailwind" },
    { category: "Languages/Frameworks", skill_name: "C#" },
    { category: "Languages/Frameworks", skill_name: "Unity" },
    { category: "Databases/Cloud", skill_name: "MongoDB" },
    { category: "Databases/Cloud", skill_name: "SQL" },
    { category: "Databases/Cloud", skill_name: "Firebase" },
    { category: "Databases/Cloud", skill_name: "AWS" }
];


// --- Helper Functions for Formatting ---
const primaryHeader = (text) => chalk.bold.underline.magenta(`\n##### ${text.toUpperCase()} #####\n`);
const sectionHeader = (text) => chalk.bold.cyan(`\n--- ${text} ---\n`);
const lineBreak = () => console.log('');
const bulletPoint = (text) => chalk.gray(`  • ${text}`);

// Function to format dates (for experience)
const formatDate = (dateString) => {
    if (!dateString) return 'Present';
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', timeZone: 'Asia/Kolkata' });
    } catch (e) {
        return dateString; // Return as is if parsing fails
    }
};

// --- Main Display Function ---
async function displayResume() { // Renamed from fetchAndDisplayResume
    console.log(chalk.blue.bold('Displaying your resume details...'));

    // Display a generic header if personal_info isn't set up, or use the fetched name
    const userName = personalInfo && personalInfo.length > 0 && personalInfo[0].name ? personalInfo[0].name : 'Your';
    console.log(primaryHeader(`${userName} Resume`));

    // Education Section
    console.log(sectionHeader('Education'));
    if (instituteData && instituteData.length > 0) {
        instituteData.forEach(edu => {
            console.log(chalk.bold.yellow(`  ${edu.degree_program || 'N/A'}`));
            console.log(chalk.white(`  ${edu.institute || 'N/A'} | ${edu.start_year || 'N/A'} - ${edu.end_year || 'N/A'}`));
            lineBreak();
        });
    } else {
        console.log(chalk.yellow('No education details found.'));
        lineBreak();
    }

    // Skills Section
    console.log(sectionHeader('Skills'));
    if (skillsData && skillsData.length > 0) {
        const skillsByCategory = skillsData.reduce((acc, skill) => {
            const category = skill.category || 'Miscellaneous';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(skill.skill_name);
            return acc;
        }, {});

        for (const category in skillsByCategory) {
            console.log(chalk.bold.green(`  ${category}:`));
            console.log(chalk.white(`    ${skillsByCategory[category].join(chalk.gray(' | '))}\n`));
        }
    } else {
        console.log(chalk.yellow('No skills found.'));
        lineBreak();
    }

    // Experience Section
    console.log(sectionHeader('Work Experience'));
    if (experienceData && experienceData.length > 0) {
        experienceData.forEach(job => {
            const startDate = formatDate(job.start_date);
            const endDate = formatDate(job.end_date);
            const technologies = job.technologies ? job.technologies.split(',').map(t => t.trim()) : [];

            console.log(chalk.bold.yellow(`  ${job.role || 'N/A'}`));
            console.log(chalk.white(`  ${job.company_name || 'N/A'} | ${startDate} - ${endDate}`));
            lineBreak();
            if (job.description) {
                const descriptionPoints = job.description.split('. ').filter(point => point.trim() !== '');
                descriptionPoints.forEach(point => console.log(bulletPoint(point.trim() + (point.endsWith('.') ? '' : '.'))));
                lineBreak();
            }
            if (technologies.length > 0) {
                console.log(chalk.blue(`  Technologies: ${technologies.join(chalk.gray(' | '))}`));
            }
            lineBreak(); // Add extra line for separation between jobs
        });
    } else {
        console.log(chalk.yellow('No work experience details found.'));
        lineBreak();
    }

    console.log(chalk.blue.bold('Resume displayed successfully!'));
}

// Run the function
displayResume();
