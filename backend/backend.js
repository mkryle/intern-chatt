const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
const sqlite = require('sqlite')
app.use(function (request, result, next) {
    result.header('Access-Control-Allow-Origin', '*');
    result.header('Access-Control-Allow-Headers', 'Content-Type');
    result.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

let database
sqlite.open('adata.sqlite').then(database_ => {
    database = database_
})

app.get('/', (response) => {
    database.all('SELECT * FROM ateam;', ).then(texten => {
        response.send(texten)
    })
    response.status(201)
})

app.post('/', (request, response) => {
    database.run('INSERT INTO ateam VALUES (?,?, "spot")',
        [request.body.text, request.body.name]
    ).then(() => {
        database.all('SELECT * FROM ateam').then(texten => {
            response.send(texten)
        })
        response.status(201)
    })
})

app.delete('/', (response) => {
    database.run('DELETE FROM ateam').then(() => {
        database.all('SELECT * FROM ateam').then(texten => {
            response.send(texten)
        })
        response.status(201)
    })
})

app.listen(3000)