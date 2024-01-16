const fs = require("fs");
const requestHandler = (req, res) =>{
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">button</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {  // data 들어오면 이ㄴㅡ가 발ㅇㅏ고 들어온 데이터를 chunk로 하여 구조를 변환 
            console.log(chunk);
            body.push(chunk); 
        });
    
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString(); // chunk 데이터를 보이게 하려면 Buffer에 추가한다. 스트림 형태의 값을 일련의 데이터로 표현하는 것이 Buffer 
            console.log(parsedBody);
            const message = parsedBody.split("=")[1];
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
    // 위에 조건에 대한 비동기 처리는 먼저 수행되지 않습니다.
    // 아래 내용이 먼저 수행되고 조건에 맞는 조치가 있을때 비동기로 수행됩니다. 
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>');
    res.write('</html>');
    res.end();
};

module.exports = {
    handler : requestHandler,
    someText : "Some hard coded Text"
};