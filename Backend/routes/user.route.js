import express from 'express'

const route=express.Router()



// home route
route.get('/', (req, res ) =>
{
    res.send('Welcome to home')
})


export default route