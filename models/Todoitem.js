
const {ObjectId} = require('mongodb');
const mongoose = require ('mongoose')


const todoItemSchema = mongoose.Schema({
  task:{type:String,required:true},
  date:Date,
  completed:{
    type:Boolean,
    default:false
  }
},
  {timestamps:true}
)


//homeSchema.pre('findOneAndDelete',async function(next){
  // const homeId = this.getQuery()["_id"];
   //await Favourite.deleteMany({houseId:homeId})
   //next()
//})

module.exports=mongoose.model('TodoItem',todoItemSchema)