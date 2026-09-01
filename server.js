//import expres app
const server = require('./src/app');

//set the port
const PORT = process.env.PORT || 3000;



//start the server
// server.listen(PORT,"0.0.0.0", () => {
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Site is live at: http://localhost:${PORT}`);
});