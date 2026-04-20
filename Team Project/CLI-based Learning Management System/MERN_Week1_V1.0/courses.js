const courses = [
    {
        id:1,
        title:"Frontend Developer",
        instructor:"Rakesh",
        description:"Client based development",
        total_lessons:3,
        lessons:[
            {name:"HTML"},
            {name:"CSS"},
            {name:"JavaScript"}
        ],
        level:"Easy",
        category:"Web Development",
        limit:50,
        enroll_status:0
    },
    {
        id:2,
        title:"Backend Developer",
        instructor:"Rakesh",
        description:"Server based development",
        total_lessons:3,
        lessons:[
            {name:"Python"},
            {name:"MongoDB"},
            {name:"Java"}
        ],
        level:"Modern",
        category:"Database",
        limit:100,
        enroll_status:0
    },
    {
        id:3,
        title:"Full Stack Developer",
        instructor:"Rakesh",
        description:"Client and Server based development",
        total_lessons:5,
        lessons:[
            {name:"HTML"},
            {name:"CSS"},
            {name:"JavaScript"},
            {name:"NodeJS"},
            {name:"ExpressJS"}
        ],
        level:"Modern",
        category:"Programming",
        limit:150,
        enroll_status:0
    },
    {
        id:4,
        title:"Verbal Ability",
        instructor:"Viganesh",
        description:"Communication based Skills",
        total_lessons:5,
        lessons:[
            {name:"Grammer"},
            {name:"Tenses"},
            {name:"Formal Writing"}
        ],
        level:"Modern",
        category:"Soft Skills",
        limit:100,
        enroll_status:0
    }
];

module.exports = courses;