import mongoose from "mongoose";


const userSchema= mongoose.Schema(
    {
        name:
        {
            type:String,
            required:[true, "name is required"],
            maxLength:[20, "max length of the name is 20 char"]
        },
        email:
        {
            type:String,
            required:[true, "email is required"],
            unique:true
        },
        phone_no:
        {
            type:Number,
            required:[true, "phoneno is required"],
            
        },
        password:
        {
            type:Number,
            required:[true, "password is required"],
            minLength:[8, "password must be above 8 char"],
            select:false
            
        },
        token: {
            type: String,
            // unique: true //  required:[true,'send aan email']
        }
    },
    {
        timeStamps:true
    }
)

export default mongoose.model('User', userSchema)