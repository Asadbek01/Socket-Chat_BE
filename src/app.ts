// import express from 'express'
// import cors from 'cors'
// import RoomModel from './room/model.js'

// const app = express()

//  app.use(cors())
//  app.use(express.json)

//  let onlineUsers=[]
//  app.get('/online-users', (req, res, next) =>{
//      res.send({onlineUsers: onlineUsers })
//  })

//  app.get('/chats/:room', async (req, res) => {
//     const room = await RoomModel.findOne({ name: req.params.room })

//     res.send({ messages: room.messages })
// })
//  export default app