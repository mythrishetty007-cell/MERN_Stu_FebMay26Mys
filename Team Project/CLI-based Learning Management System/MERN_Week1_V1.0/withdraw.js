const lmsEvents = require('./events');

const withdraw = (courseId, enrolledCourses) => {
    const index = enrolledCourses.findIndex(c => c.id === courseId);
    if (index === -1) throw new Error("You are not enrolled in this course.");
    
    const removed = enrolledCourses.splice(index, 1);
    lmsEvents.emit('courseWithdrawn', removed[0].title);
    return enrolledCourses;
};

module.exports = { withdraw };