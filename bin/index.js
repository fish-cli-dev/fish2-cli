#!/usr/bin/env node
const path = require('path')
const cp = require('child_process')

let shellPath = path.resolve(__dirname, 'test.sh')
cp.execFile(`bash ${shellPath}`, function (err, stdout, stderr) {
    console.log(err)
    console.log(stdout)
    console.log(stderr)
})
// let child = cp.spawn(process.platform === "win32" ? "npm.cmd" : "npm", ['install'], {
//     cwd: path.resolve('D:/workSpace/fish2-cli/fish2-cli-lib')
// })
// child.stdout.on('data', function (chunk) {
//     console.log('out', chunk.toString())
// })
// child.stderr.on('data', function (chunk) {
//     console.log('err', chunk.toString())
// })


cp.spawn('./test.sh', function (err, stdout, stderr) {
})

