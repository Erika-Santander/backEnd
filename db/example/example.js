'use strict'

const db = require('../index')

async function run() {
    const { User } = await db().catch(handleFatalError)
    let result = await User.encuentraTodo()
    console.log(result)
}

function handleFatalError(err) {
    console.error(err.message)
    console.error(err.stack)
    process.exit(1)
}

run()