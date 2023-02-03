const express = require('express')
const fs = require('fs')
const https = require('https')
const app = express()

app.use(express.static('static'))

app.get('/', (req, res) => {
    res.send('bla')
})

const httpsServer = https.createServer(
    {
        key: fs.readFileSync('key.pem'),
        cert: fs.readFileSync('cert.pem'),
    },
    app
)

httpsServer.listen(3443, () => {
    console.log(`Local https server listening at https://localhost:3443`)
})
