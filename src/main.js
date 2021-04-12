const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const schemas = require('./schema');

const app = express();
const host = 'localhost'; // Utiliser 0.0.0.0 pour être visible depuis l'exterieur de la machine
const port = process.env.PORT || 8000

const ACCESS_TOKEN_SECRET = "123456789";
const ACCESS_TOKEN_LIFE = 120;

const consignes = [
    "Je suis un serveur qui parle",
    "Super encore un message",
    "STOP"
];

var compteur = 0;

function login(data,res) {
    var Validator = require('jsonschema').Validator;
    var v = new Validator();
    compteur = 0;
    validation = v.validate(data, schemas.loginSchema);
    if (validation.valid){
        if (data.username == "test" && data.password == "pass") {
            let j = jwt.sign({"username":data.username}, ACCESS_TOKEN_SECRET, {
                algorithm: "HS512",
                expiresIn: ACCESS_TOKEN_LIFE
            });
            // Reply to client as error code 200 (no error in HTTP); Reply data format is json
            res.writeHead(200, {'Content-Type': 'application/json'});
            // Send back reply content
            res.end(JSON.stringify({"error":0,"message":j}));
        } else {
            // Reply to client as error code 200 (no error in HTTP); Reply data format is json
            res.writeHead(401, {'Content-Type': 'application/json'});
            // Send back reply content
            res.end(JSON.stringify({"error":-1,"message":"login error"}));
        }
    }else{
        // Reply to client as error code 200 (no error in HTTP); Reply data format is json
        res.writeHead(401, {'Content-Type': 'application/json'});
        // Send back reply content
        res.end(JSON.stringify({"error":-2,"message":"json erreur attention"}));
    }

}

function postdata(data,res) {
    // Check JWT validity
    jwt.verify(data.jwt, ACCESS_TOKEN_SECRET, function(err, decoded) {
        if (err) { // There is an error: invalid jwt ...
            res.end(JSON.stringify({"error":-1,"message":"JWT error"}));
        } else {
            res.send(JSON.stringify({"message": consignes[compteur]}))
            compteur++;
        }
    });
}


/**
 *
 * Occur when an unkown url was called
 *
 */
function f404(data,res) {
    res.setHeader('Content-Type', 'application/json');
    res.status(404);
    res.end(JSON.stringify({"error":-1,"message":"404"}));
}


function run() {

    app.use(bodyParser.json());

    app.post('/pushdata', (req, res) => {
        var body = req.body;
        postdata(body,res);
    });

    app.post("/login", (req, res) => {
        var body = req.body;
        login(body,res);
    });

    app.post('/pull', (req, res) => {
        var body = req.body;
        pull(body,res);
    });

    app.get('/*', (req, res) => {
        f404(null,res);
    });



    app.post('/*', (req, res) => {
        f404(null,res);
    });

    app.listen(port, host, () => {
        console.log(`Server is running at http://${host}:${port}`);
    });
}


exports.run = run;
