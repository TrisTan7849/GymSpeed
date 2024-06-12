import mongoose from "mongoose"


const machineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: {
    type: String,
    enum: ['Pectoraux', 'Dorsaux', 'Jambes'],
  },
});

const machines = mongoose.model('machines', machineSchema);

export default machines;
