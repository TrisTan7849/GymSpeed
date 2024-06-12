import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'This property Prenom is required'],
    },
    lastname: {
        type: String,
        required: [true, 'This property Nom is required'],
    },
    
    dateOfBirth: {
        type: Date, 
        required: [true, 'This property Date de Naissance is required'],
    },
    
    phone: {
         type: String, 
        required: [true, 'This property Numéro is required'],
    },
    email: {
        type: String,
        required: [true, 'This property Email is required'],
        match: /.+\@.+\..+/,
        unique: true,
    },
    
    city: {
        type: String,
        required: [true, 'This property Ville is required'],
    },

    password: {
        type: String,
        required: [true, 'This property Password is required'],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    
}, {
    timestamps: true,
    versionKey: false
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
    


