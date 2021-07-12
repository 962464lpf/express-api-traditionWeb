const fs = require('fs')
const {promisify} = require('util')
const path = require('path')
const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)
const dbPath = path.join(__dirname, '../db.json')

async function reqdFileFun() {
    const data = await readFile(dbPath, 'utf8')
    return JSON.parse(data)
}

 function writeFileFun (data){
    writeFile(dbPath, data)
}

module.exports = {
    reqdFileFun,
    writeFileFun
}