function validateName(name, callback) {
    if (!name || name.trim().length <= 2) {
        return callback("Name must be more than 2 characters", null);
    }
    callback(null, name.trim());
}

function validateenrollSelection(courses, courseid, callback) {
    if (!Array.isArray(courses)) {
        return callback("Courses data is invalid (not an array)", null);
    }

    const id = Number(courseid);

    if (isNaN(id)) {
        return callback("Invalid course ID format", null);
    }

    const selectedenroll = courses.find((course) => course.id === id);

    if (!selectedenroll) {
        return callback("Invalid course selection. Choose a valid course ID.", null);
    }

    callback(null, selectedenroll);
}


function validatelimitCount(limit, callback) {
    const count = Number(limit);

    if (isNaN(count) || count <= 0) {
        return callback("Limit seat is not available", null);
    }

    callback(null, count);
}

module.exports = {
    validateenrollSelection,
    validatelimitCount,
    validateName
};