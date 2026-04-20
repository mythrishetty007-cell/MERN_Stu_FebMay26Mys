const readline = require('readline');
const chalk = require('chalk');
const lmsEvents = require('./events');
const courses = require('./courses');
const {validateenrollSelection, validatelimitCount, validateName } = require('./validator');
const { enrollInCourse } = require('./enroll');
const { updateProgress } = require('./progress');
const { withdraw } = require('./withdraw');

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

let currentUser = { name: '', enrolled: [] };
let retryCount = 0;

lmsEvents.on('enrollmentConfirmed', (title) => console.log(chalk.green(`\n Successfully enrolled in: ${title}`)));
lmsEvents.on('lessonCompleted', (data) => console.log(chalk.cyan(`\n Lesson "${data.lesson}" done! New progress in ${data.title}: ${data.progress}%`)));
lmsEvents.on('courseWithdrawn', (title) => console.log(chalk.red(`\n Withdrew from: ${title}`)));
lmsEvents.on('operationFailed', (err) => console.log(chalk.bgRed(` ERROR: ${err} `)));

function mainMenu() {
    console.log(chalk.blue.bold('\n--- LMS MENU ---'));
    console.log('1. View Courses\n2. View Course Details\n3. Enroll\n4. View Enrolled Courses\n5. My Progress\n6. Mark Lesson Done\n7. Withdraw\n8. Exit');
    
    rl.question('Choose an option: ', (choice) => {
        switch (choice) {
            case '1':
                viewAllCourses();
                break;
            case '2':
                viewCourseDetails();
                break;
            case '3':
                handleEnrollment();
                break;
            case '4':
                viewEnrolledCourses();
                break;
            case '5':
                viewProgress();
                break;
            case '6':
                handleLessonCompletion();
                break;
            case '7':
                handleWithdrawal();
                break;
            case '8':
                console.log(chalk.yellow('Goodbye!'));
                process.exit();
            default:
                console.log(chalk.red('Invalid choice.'));
                mainMenu();
        }
    });
}

function viewAllCourses() {
    console.log(chalk.blue.bold("\n--- Available Courses ---"));

    console.log(
        courses.map(c => ({
            ID: c.id,
            Title: c.title,
            Instructor: c.instructor,
            Level: c.level,
            Seats: `${c.enroll_status}/${c.limit}`
        }))
    );

    mainMenu();
}

function viewCourseDetails() {
    rl.question('Enter Course ID to view details: ', (id) => {
        const course = courses.find(c => c.id === parseInt(id));

        if (!course) {
            console.log(chalk.red("Course not found."));
            return mainMenu();
        }

        console.log(chalk.green.bold(`\n--- ${course.title} ---`));
        console.log(`Instructor: ${course.instructor}`);
        console.log(`Description: ${course.description}`);
        console.log(`Level: ${course.level}`);
        console.log(`Category: ${course.category}`);
        console.log(`Seats: ${course.enroll_status}/${course.limit}`);

        console.log(chalk.cyan("\nLessons:"));
        course.lessons.forEach((l, i) => {
            console.log(`${i + 1}. ${l.name}`);
        });

        mainMenu();
    });
}

function viewEnrolledCourses() {
    if (currentUser.enrolled.length === 0) {
        console.log(chalk.yellow("\nNo enrolled courses yet."));
    } else {
        console.log(chalk.blue.bold("\n--- Your Enrolled Courses ---"));

        currentUser.enrolled.forEach((course, index) => {
            console.log(
                chalk.green(
                    `${index + 1}. ${course.title} (ID: ${course.id})`
                )
            );
        });
    }

    mainMenu();
}

function handleEnrollment() {
    rl.question('Enter Course ID to enroll: ', (id) => {
        enrollInCourse(currentUser.name, parseInt(id), currentUser.enrolled)
            .then(newEnrollment => {
                currentUser.enrolled.push(newEnrollment);
                mainMenu();
            })
            .catch(err => {
                lmsEvents.emit('operationFailed', err);
                mainMenu();
            });
    });
}

async function handleLessonCompletion() {
    if (currentUser.enrolled.length === 0) {
        console.log(chalk.warning("Enroll in a course first!"));
        return mainMenu();
    }
    
    rl.question('Enter Course ID: ', async (cId) => {
        const course = currentUser.enrolled.find(c => c.id === parseInt(cId));
        if (!course) {
            console.log(chalk.red("Not enrolled in this ID."));
            return mainMenu();
        }
        rl.question(`Enter lesson name (${course.lessons.join(', ')}): `, async (lesson) => {
            try {
                await updateProgress(course, lesson);
            } catch (err) {
                lmsEvents.emit('operationFailed', err.message);
            }
            mainMenu();
        });
    });
}

function viewProgress() {
    if (currentUser.enrolled.length === 0) {
        console.log(chalk.yellow("No active enrollments."));
    } else {
        currentUser.enrolled.forEach(c => {
            console.log(chalk.magenta(`${c.title}: [${c.progress}%] - Lessons: ${c.completedLessons.join(', ') || 'None'}`));
        });
    }
    mainMenu();
}

function handleWithdrawal() {
    rl.question('Enter Course ID to withdraw: ', (id) => {
        try {
            withdraw(parseInt(id), currentUser.enrolled);
        } catch (err) {
            lmsEvents.emit('operationFailed', err.message);
        }
        mainMenu();
    });
}

function startSession() {
    rl.question('Enter your name to begin: ', (name) => {
        validateName(name, (err, validName) => {
            if (err) {
                console.log(chalk.red(err));
                return startSession(); // retry
            }

            currentUser.name = validName;
            console.log(chalk.green(`Welcome, ${validName}!`));
            mainMenu();
        });
    });
}
startSession();