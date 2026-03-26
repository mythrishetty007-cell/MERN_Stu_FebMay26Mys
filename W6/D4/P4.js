// Handling different GET routes
const http = require("http");

const server = http.createServer(function(req,res){
    if(req.method === "GET" && req.url === "/") {
        res.writeHead(200,{"Content-type":"text/plain"});
        res.end("Home Page / Dashboard");
        return;
    }
    if(req.method === "GET" && req.url === "/about") {
        res.writeHead(200,{"Content-type":"text/plain"});
        res.end("About Route. Welcome to About Us Page.");
        return;
    }
    if(req.method === "GET" && req.url === "/products") {
        res.writeHead(200,{"Content-type":"text/plain"});
        res.end("products Route. Welcome to products Page.");
        return;
    }
    if(req.method === "GET" && req.url === "/users") {
        res.writeHead(200,{"Content-type":"text/plain"});
        res.end("Returnig all users.");
        return;
    }
    // POST = create 
    // curl -X POST http://localhost:3001/users
    // curl: Client URL: free, open src cli tool used to transfer data to or 
    // from a server using various network protocol.
    if(req.method === "POST" && req.url === "/users") {
        res.writeHead(201,{"Content-type":"text/plain"});
        res.end("New User Created.");
        return;
    }
    // Unknown route fallback
    res.writeHead(404,{"Content-type":"text/plain"});
    res.end("Route not found.");
});    

server.listen(3001,function(){
    console.log("Server is running at http://localhost:3001");
});