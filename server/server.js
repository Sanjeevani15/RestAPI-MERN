//this is for to add http library , reqire is used here
const http=require('http');
const app=require('./app');

//this is to create server 
const server = http.createServer(app);


//server konse port m listen hoga, here its 3000
server.listen(3000,console.log("App is running"));