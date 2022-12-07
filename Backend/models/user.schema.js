import mongoose from "mongoose";


const userSchema= mongoose.Schema(
    {
        name:
        {
            type:String,
            require:[true, "name is required"],
            maxLength:[20, "max length of the name is 20 char"]
        },
        email:
        {
            type:String,
            require:[true, "email is required"],
            unique:true
        },
        phone_no:
        {
            type:Number,
            require:[true, "phoneno is required"],
            
        },
        password:
        {
            type:Number,
            require:[true, "password is required"],
            minLength:[8, "password must be above 8 char"]
            
        },
    },
    {
        timeStamps:true
    }
)

export default userSchema=mongoose.model('User', userSchema)