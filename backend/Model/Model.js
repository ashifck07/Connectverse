const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
       username:{
        type:String,
        required:[true]
       },
       email:{
        type:String,
        required:[true],
        unique:true
       },
       password:{
        type:String,
        required:[true]
       },
       resetToken:
        { type: String },

      resetTokenExpiry: 
      { type: Date },
    },
   {
    timestamps:true,
   }
)
module.exports = mongoose.model("connectverse",userSchema);