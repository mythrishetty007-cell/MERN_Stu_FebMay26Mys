const courses = [
    {
        id:1,
        title:"Frontend Developer",
        description:"Client based development",
        lessons:[
            {name:"HTML"},
            {name:"CSS"},
            {name:"JavaScript"}
        ],
        limit:50
    },
    {
        id:2,
        title:"Backend Developer",
        description:"Server based development",
        lessons:[
            {name:"Python"},
            {name:"MongoDB"},
            {name:"Java"}
        ],
        limit:100
    },
    {
        id:3,
        title:"Full Stack Developer",
        description:"Client and Server based development",
        lessons:[
            {name:"HTML"},
            {name:"CSS"},
            {name:"JavaScript"},
            {name:"NodeJS"},
            {name:"ExpressJS"}
        ],
        limit:150
    }
];

module.exports = courses;