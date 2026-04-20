const lmsEvents = require('./events');

async function updateProgress(course, lessonName) {
    if (!course.lessons.includes(lessonName)) throw new Error("Lesson not found in this course.");
    if (course.completedLessons.includes(lessonName)) throw new Error("Lesson already completed.");

    course.completedLessons.push(lessonName);
    course.progress = Math.round((course.completedLessons.length / course.lessons.length) * 100);
    
    lmsEvents.emit('lessonCompleted', { title: course.title, lesson: lessonName, progress: course.progress });
    return course;
}

module.exports = { updateProgress };