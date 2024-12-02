import {getUsers, addUser} from "./models/user.mjs";
import {createServer, IncomingMessage, ServerResponse} from "http";

const PORT = 3000;

const parseBody = async (req) =>{
    return new Promise((resolve, reject) =>{
        let body = ""
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            }catch (e) {
                reject(new Error('Invalid JSON'))
            }
        })
    })
}

const server = createServer(async (req, res) => {
    const {method, url} = req;

    switch (`${method} ${url}`) {
        case('GET /api/users'): {
            const users = getUsers();
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(users));
            break;
        }
        case('POST /api/users'): {
            const body = await parseBody(req);
            if(addUser(body)) {
                res.writeHead(200, {'Content-Type': 'text/plain'});
                res.end('User added');
            } else {
                res.writeHead(404, {'Content-Type': 'text/plain'});
                res.end('Error adding');
            }
            break;
        }
        default: {
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Error');
            break;
        }
    }
})

server.listen(PORT, () =>{
    console.log(`Started on address : http://localhost:${PORT}`);
    console.log(`Users on address : http://localhost:${PORT}/api/users`);
})
