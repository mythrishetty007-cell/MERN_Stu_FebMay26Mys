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