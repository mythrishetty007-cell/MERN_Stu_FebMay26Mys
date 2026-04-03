// How Cookie is used to track session ID

// Simulated server-side session store
const sessionStore = {
    "abc123":{
        userId:107,
        username:"Mythri",
        role:"admin"
    }
} ;
// Simulated browser cookie value
const browserCookieSessionId = "abc123";

const sessionData = sessionStore[browserCookieSessionId];
console.log("Server-side session data:",sessionData);