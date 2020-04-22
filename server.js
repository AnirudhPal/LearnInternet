//importing libraries
const express = require('express')
const app = express()
const port = 3000
const path = require('path')

//sending index.html
app.get('/', (req, res) => res.sendFile(path.join (__dirname, 'index.html')))

//starting server
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
