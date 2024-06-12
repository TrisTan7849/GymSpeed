import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' 
  },
  type: {
    type: String,
    required: true,
    enum: ['standard', 'premium']
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

export default Subscription;
