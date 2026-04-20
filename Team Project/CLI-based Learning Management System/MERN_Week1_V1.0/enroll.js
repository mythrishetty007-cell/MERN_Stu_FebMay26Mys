// const enrollEmitter = require("./events");
// const courses = require('./courses');
// let currentEnrollement = null;
// function getEnrollement() {
//     return currentEnrollement;
// }
// function clearEnrollement() {
//     currentEnrollement = null;
// }
// function Enrollmentduplicate(course, limit, lessons) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (currentEnrollement &&
//                 currentEnrollement.courseid === course.id &&
//                 currentEnrollement.enrolllimit === limit.enrolllimit &&
//                 currentEnrollement.enrolllessons === lessons.enrolllessons) {
//                 return reject("duplicate enroll detected")
//             }
//             resolve("No duplicate enrollement found")
//         }, 1000)

//     });
// }

// function checklimitsAvailability(limit, title) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (title.enroll_status >= title.limit) {
//                 return reject(`Only ${limit.limitsAvailable} limit(s) are available.`);
//             }
//             resolve("limits are available");
//         }, 300);
//     });
// }
// function confirmEnroll(enroll, lesson) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             lesson.lessonsAvailable -= enroll.limit;
//             currentEnrollement = enroll;
//             enrollEmitter.emit("enrollConfirmed", enroll);
//             resolve(enroll);
//         }, 300);

//     });

// }

// function enrolllogic(limit, course) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {

//             if (course.enroll <= course.limit) {
//                 resolve("Enrollment limit  not reached");
//             }
//             reject("Enrollment limit reached");
//         });
//     });

// }
// function generateenroll(course, limit, lessons) {
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             const enroll = {
//                 enrollId: `ENROLL-${Date.now()}`,
//                 courseid: course.id,
//                 courseTitle: course.title,
//                 lesson: lessons.lesson,
//                 limit
//             };
//             resolve(enroll);
//         }, 500);
//     });
// }

// function processenroll(course, limit, lessons) {
//     enrollEmitter.emit("enrollStarted");

//     return Enrollmentduplicate(course, limit, lessons)
//         .then(() => {
//             enrollEmitter.emit("enrollValidater");
//             return Enrollmentduplicate(lessons, limit);
//         })
//         .then(() => generateenroll(course, limit, lessons))
//         .then((enroll) => confirmEnroll(enroll, course))
//         .then((confirmEnroll) => saveenrollToFile(confirmEnroll))
//         .catch((error) => {
//             enrollEmitter.emit("enrollFailed", error);
//             throw error;
//         });
// }

// async function processenrollAsync(course, limit, lessons) {
//     try {
//         enrollEmitter.emit("enrollStarted");

//         await Enrollmentduplicate(course, limit, lessons);
//         enrollEmitter.emit("enrollValidated");

//         const enroll = await generateenroll(course, limit, lessons);

//         const confirmedenroll = await confirmEnroll(enroll, lessons);

//         const enrollLogic = await enrolllogic(enroll,course);

//         await saveenrollToFile(confirmEnroll);
//         await saveenrollToFile(enrollLogic);

//         return confirmedenroll;
//     }
//     catch (error) {
//         enrollEmitter.emit("enrollFailed", error);
//         throw error;
//     }
// }
// async function saveenrollToFile(enroll) {
//     await appendenrollAsync(enroll);
//     await appendLogAsync(`enroll saved: ${enroll.enrollId} for {enroll.enrollId}`);

//     enrollEmitter.emit("enrollSaved.", enroll);
//     return enroll;
// }
// function enrollInCourse(userName, courseId, enrolledCourses) {
//     return new Promise((resolve, reject) => {

//         const courses = require('./courses');
//         const course = courses.find(c => c.id === courseId);

//         if (!course) return reject("Course not found");

//         const already = enrolledCourses.find(c => c.id === courseId);
//         if (already) return reject("Already enrolled");

//         if (course.enroll_status >= course.limit) {
//             return reject("Course is full");
//         }

//         course.enroll_status++;

//         const newEnrollment = {
//             id: course.id,
//             title: course.title,
//             progress: 0,
//             completedLessons: [],
//             lessons: course.lessons.map(l => l.name)
//         };

//         enrollEmitter.emit("enrollmentConfirmed", course.title);

//         resolve(newEnrollment);
//     });
// }

// module.exports = {
//     processenroll,
//     enrolllogic,
//     getEnrollement,
//     clearEnrollement,
//     processenrollAsync,
//     enrollInCourse   
// };

const enrollEmitter = require("./events");
const courses = require('./courses');

function enrollInCourse(userName, courseId, enrolledCourses) {
    return new Promise((resolve, reject) => {

        const courses = require('./courses');
        const course = courses.find(c => c.id === courseId);

        if (!course) return reject("Course not found");

        const already = enrolledCourses.find(c => c.id === courseId);
        if (already) return reject("Already enrolled");

        if (course.enroll_status >= course.limit) {
            return reject("Course is full");
        }

        course.enroll_status++;

        const newEnrollment = {
            id: course.id,
            title: course.title,
            progress: 0,
            completedLessons: [],
            lessons: course.lessons.map(l => l.name)
        };

        enrollEmitter.emit("enrollmentConfirmed", course.title);

        resolve(newEnrollment);
    });
}

module.exports = {
    enrollInCourse   
};