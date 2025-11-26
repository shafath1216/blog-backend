const path = require ('path')
const express = require ('express')
const rootDir= require ('./utils/pathUtil.js')
const { default: mongoose } = require('mongoose')
const todoItemsRouter = require('./routes/todoItemsRouter.js')
const errorsController = require ('./controllers/errors.js')
const cors= require('cors')
const DB_PATH='mongodb+srv://root:root@completecoding.lupxs76.mongodb.net/todo?appName=CompleteCoding'



const app = express()
app.use(express.urlencoded())
app.use(cors())
app.use(express.json()) 
app.use(express.static(path.join(rootDir,'public')))
app.use('/api/todo',todoItemsRouter)

app.use(errorsController.pageNotFound)







const PORT = 3000




mongoose.connect(DB_PATH).then(
  app.listen(PORT,()=>{
    console.log('server is running ')
 })
).catch(err=>{
  console.log("could not connect",err)
})