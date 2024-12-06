import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Routes
import AuthRoute from './routes/AuthRoute.js';
import UserRoute from './routes/UserRoute.js';
import PostRoute from './routes/PostRoute.js';
import UploadRoute from './routes/UploadRoute.js';
import ChatRoute from './routes/ChatRoute.js';
import MessageRoute from './routes/MessageRoute.js';

// Initialize express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware setup
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

// Enable CORS for React app running on 13.201.11.1:3000
app.use(cors({
  origin: env.originURL , // Allow requests from React frontend on port 3000
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
  credentials: true, // Allow cookies or authorization headers
}));

// Serve static files (images, etc.)
app.use(express.static('public'));
app.use('/images', express.static('images'));

// MongoDB connection
const connectDB = async () => {
  try {
    const CONNECTION = process.env.MONGODB_CONNECTION;
    await mongoose.connect(CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process if connection fails
  }
};

// Set Mongoose query strict mode (for compatibility with MongoDB)
mongoose.set('strictQuery', false);

// Initialize routes
app.use('/auth', AuthRoute);
app.use('/user', UserRoute);
app.use('/posts', PostRoute);
app.use('/upload', UploadRoute);
app.use('/chat', ChatRoute);
app.use('/message', MessageRoute);

// Start the server after DB connection is successful
const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

// Call the startServer function to initialize everything
startServer();
