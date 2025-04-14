// src/server.ts
import mongoose from 'mongoose';
import app from './app';

// const PORT = process.env.PORT || 5000;
// const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/secondhand';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('🟢 Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('🔴 Error connecting to MongoDB:', err);
  });
