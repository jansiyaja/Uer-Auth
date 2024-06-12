import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const Profile = 'https://avatar.iran.liara.run/public/59'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage : 
    {
        type : String,
        default : Profile
    },
      isAdmin: {
        type: Boolean,
        default: false,
      },
    },
 {
    timestamps: true
});

userSchema.pre('save', async function(next) {
 
    if (!this.isModified('password')) {
        return next();
    }

   
       
        const salt = await bcrypt.genSalt(10);
        
        this.password = await bcrypt.hash(this.password, salt);

});
 userSchema.methods.matchPassword= async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
 }
const User = mongoose.model('User', userSchema);
export default User;
