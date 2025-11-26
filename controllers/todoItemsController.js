const TodoItem = require('../models/Todoitem');

exports.createTodoItem=async (req,res,next)=>{
   console.log(req.body); 
   const {task, date} = req.body;
   const todoItem=new TodoItem({task,date});
   await todoItem.save()
   res.status(201).json(todoItem);
   
   // Logic to create a new todo item (e.g., save to database)
   }

   exports.getTodoItem = async (req, res, next) => {
      try{
         const todoItems=await TodoItem.find()
         res.status(200).json(todoItems);
      }catch(err){
         console.log(err);
         res.status(500).json({message:"Fetching todo items failed."});
      }
   }

   exports.deleteTodoItem = async (req, res, next) => {
      const todoItemId= req.params.id;
      try{
         const deletedItem = await TodoItem.findByIdAndDelete(todoItemId)
         if(!deletedItem){ 
           return res.status(404).json({message:"Todo item not found."});
         }
         res.status(200).json({ message: "Todo item deleted successfully.",id: todoItemId });
      }catch(err){
         console.log(err);
         res.status(500).json({message:"Deleting todo item failed."}); 
      }
   }

   exports.markCompleted= async(req,res,next)=>{
      const todoItemId=req.params.id;
      const {task,date,completed}= req.body;
      try{
         const todoItem = await TodoItem.findById(todoItemId);
         if(!todoItem){
            return res.status(404).json({message:"Todo item not found."});
         }
         todoItem.task= task !== undefined ? task : todoItem.task;
         todoItem.date= date !== undefined ? date : todoItem.date;
         todoItem.completed= completed=true;
         await todoItem.save();
         res.status(200).json(todoItem);
      }catch(err){   
         console.log(err);
         res.status(500).json({message:"Updating todo item failed."});
      }
   }