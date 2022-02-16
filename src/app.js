import express from 'express'
import cors from 'cors'

const app = express()

 app.use(cors())
 app.use(express.json)

 let onlineUsers=[]
 app.get('/online-users', (req, res, next) =>{
     res.send({onlineUsers: onlineUsers })
 })
 export default app