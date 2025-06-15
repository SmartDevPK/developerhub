import mongoose from "mongoose";

const userScheme = new mongoose.Schema({
    username:{
        type: String,
        reqyuired:[true, "Username is required"],
        trim: true,
        unique:true,
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please enter a valid email"],

    },
    password:{
        type:String,
        required: [true, "Password is required"],
        unique: true,
        lowercase:true,
         minlength: [8, "Password must be at least 6 characters long"],
    }
}, {
    timestamps: true 
});

const User = mongoose.model("User", userScheme)

export default User;