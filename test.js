#!/usr/bin/env node

const os = require('os')
const path = require('path')
const { execSync } = require('child_process')

const cpuCount = os.cpus().length
let threads = 0

console.log('| Threads | Duration (s) |')
console.log('|---------|--------------|')

while (threads++ < cpuCount) {
    const startTime = Date.now()

    execSync(`node ${path.join(__dirname, 'index.js')}`, {
        env: {
            THREADS: threads
        },
        encoding: 'utf8',
    })

    const duration = Date.now() - startTime

    console.log(`| ${threads.toString().padStart(7, ' ')} | ${Math.round(duration / 1e3).toString().padStart(12, ' ')} |`)
}
