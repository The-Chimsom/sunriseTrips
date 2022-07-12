const express = require('express')
const server = require('./server')

;(function (expressInstance) {
    const PORT = 2001
    console.log(PORT)
    expressInstance.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })
})(server)

