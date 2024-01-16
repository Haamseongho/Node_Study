const http = require("http");
const routes = require("./routes");
const server = http.createServer(routes.handler);
var port = process.env.PORT || 2721;
server.listen(port);