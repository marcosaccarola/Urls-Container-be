import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import listEndpoints from 'express-list-endpoints'
import userRouter from './users/index.js'
import groupRouter from './groups/index.js'
import urlRouter from './urls/index.js'
import googleStrategy from './utils/oauth.js'
import passport from 'passport'

const server=express()
const port=process.env.PORT||3001

//*______________________________________________ MIDDLEWARES
const corsOptions={
    origin:process.env.FE_DEV_URL
}
passport.use('google',googleStrategy)
server.use(cors())
server.use(passport.initialize())
server.use(express.json())
server.use('/user',userRouter)
server.use('/group',groupRouter)
server.use('/url',urlRouter)

//*______________________________________________ ROUTES

//*______________________________________________ ERROR HANDLERS

//*______________________________________________ CONNECTION
mongoose.connect(process.env.MONGO_CONNECTION)
mongoose.connection.on('connected',()=>{
    console.log('CONNECTED TO MONGO')
    server.listen(port,()=>{
        console.table(listEndpoints(server))
        console.log(`PORT ${port}`)
    })
})
mongoose.connection.on('error',(err)=>{
    console.log(err)
})