const https = require('http');



/**
 Function POST: post the data "jdata" to the url "url".
 "f" is the callback when it's finished
 */
function POST(jdata,url,f) {

    const data = JSON.stringify(jdata);

    const options = {
        hostname: 'localhost',
        port: 8000,
        path: url,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(options, res => {
        console.log(`statusCode: ${res.statusCode}`);

        res.on('data', (d) => {
            let jd = JSON.parse(d.toString('utf-8'));
            f(jd);
        });
    });

    req.on('error', error => {
        console.error(error);
    });

    req.write(data);
    req.end();
}

console.log(process.argv);

// Setting default value
let login = 1;
let password = 2;
// If some parameters are there, use them...
if (process.argv.length > 3) {
    login = process.argv[2];
    password = process.argv[3];
}

/* Doing POST ... Imbricate them*/
POST({username: login,password: password},"/login",d => {
    console.log("test", d);
    POST({jwt:d.message,data:'ok'},"/pull",d => {
        console.log(d.message);
    });
});
