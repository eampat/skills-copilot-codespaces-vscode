// Create web server

// Create web server for comment
//=========================================================

const http = require('http');
const fs = require('fs');
const path = require('path');

const commentsPath = path.join(__dirname, 'comments.json');

const server = http.createServer((req, res) => {
    const { method } = req;

    if (method === 'GET') {
        fs.readFile(commentsPath, 'utf8', (err, commentsJSON) => {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.end('Server Error');
                return;
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(commentsJSON);
        });
    }
    else if (method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const { comment } = JSON.parse(body);

            fs.readFile(commentsPath, 'utf8', (err, commentsJSON) => {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.end('Server Error');
                    return;
                }

                const comments = JSON.parse(commentsJSON);

                comments.push(comment);

                const updatedCommentsJSON = JSON.stringify(comments);

                fs.writeFile(commentsPath, updatedCommentsJSON, (err) => {
                    if (err) {
                        console.error(err);
                        res.statusCode = 500;
                        res.end('Server Error');
                        return;
                    }

                    res.statusCode = 201;
                    res.end();
                });
            });
        });
    }
    else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

server.listen(3000, 'localhost', () => {
    console.log('Server running at http://localhost:3000/');
});

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello, World!');
});

server.listen(3000, 'localhost', () => {
    console.log('Server running at http://localhost:3000/');
});
