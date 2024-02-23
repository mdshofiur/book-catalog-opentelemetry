import mongoose from 'mongoose';

const connectDB = async () => {
   try {
      await mongoose.connect('mongodb://localhost:27017/mydatabase');
      console.log('MongoDB connected');
   } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1); // Exit process with failure
   }
};

export default connectDB;
