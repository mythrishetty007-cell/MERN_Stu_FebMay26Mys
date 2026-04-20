// const EventEmitter = require('events');
// const chalk = require('chalk');

// const lmsEvents = new EventEmitter();

// lmsEvents.on('sessionStarted', (name) => {
//     console.log(chalk.blue("Welcome " + name));
// });

// lmsEvents.on('courseViewed', () => {
//     console.log(chalk.cyan("Courses shown"));
// });

// lmsEvents.on('enrollmentStarted', () => {
//     console.log(chalk.yellow("Enrollment started"));
// });

// lmsEvents.on('enrollmentConfirmed', (title) => {
//     console.log(chalk.green("Enrolled in " + title));
// });

// lmsEvents.on('lessonCompleted', (data) => {
//     console.log(chalk.green("Lesson completed: " + data.lesson));
// });

// lmsEvents.on('progressViewed', () => {
//     console.log(chalk.magenta("Showing progress"));
// });

// lmsEvents.on('courseWithdrawn', (title) => {
//     console.log(chalk.red("Withdrawn from " + title));
// });

// lmsEvents.on('operationFailed', (err) => {
//     console.log(chalk.red("Error: " + err));
// });

// module.exports = lmsEvents;

const EventEmitter = require("events");

const enrollEmitter = new EventEmitter();

module.exports = enrollEmitter;