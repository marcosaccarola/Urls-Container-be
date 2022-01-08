import express from 'express'
import GroupModel from './schema.js'

const groupRouter=express.Router()

groupRouter
.post('/',async(req,res,next)=>{
    try {
        const newGroup=new GroupModel(req.body)
        const{_id}=await newGroup.save()
        res.status(201).send(_id)
    } catch (error) {
        next(error)
    }
})
.get

export default groupRouter