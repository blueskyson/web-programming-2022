#!/usr/bin/env node

import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import bodyParser from 'body-parser'
import * as fs from 'fs'

let https
try {
    https = await
    import ('node:https')
} catch (err) {
    console.log('https support is disabled!')
}

const __filename = fileURLToPath(
    import.meta.url)

const __dirname = dirname(__filename)

const port = 1401

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(`${__dirname}/static`))

/* HTTPS Support */
// const cert = fs.readFileSync("/home/tiffany/ssl/certificate.crt")
// const ca = fs.readFileSync("/home/tiffany/ssl/ca_bundle.crt")
// const key = fs.readFileSync("/home/tiffany/ssl/private.key")
// https.createServer({
//     key: key,
//     cert: cert,
//     ca: ca,
// }, app).listen(port)

app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})

var students = {
    "E123456789": "Amy",
    "E445678891": "Bob",
    "F452136975": "Cathy",
    "H785631492": "Dora",
    "A147895631": "Elsa",
    "F759314862": "Frank",
    "D456217986": "Gina",
    "K567812463": "Helen",
    "E436975123": "Irene",
    "G789631546": "Jack",
    "Z178934564": "Kelly",
    "Q864130759": "Lisa",
    "R759114233": "Mike",
    "Q785321256": "Nick",
    "E781344459": "Opera",
    "F100234798": "Penny",
    "W744411551": "Question",
}


app.get('/list', (req, res) => {
    res.json(JSON.stringify(students))
})

app.all('/search', (req, res) => {
    var id = req.body.stuID
    if (id in students) {
        res.send("Hello, " + students[id] + ".")
    } else {
        res.send("No such student.")
    }
})

app.all('/add', (req, res) => {
    var id = req.body.stuID
    var name = req.body.stuName
    students[id] = name
    res.json(JSON.stringify(students))
})

app.all('/delete', (req, res) => {
    var id = req.body.stuID
    delete students[id]
    res.json(JSON.stringify(students))
})