import express from 'express';
import dotenv from "dotenv";
import cors from 'cors';
import {connectDB} from './config/db.js'; // Adjust the path as necessary
import locationRoutes from "./routes/location.routes.js";
import movieRoutes from "./routes/movie.routes.js";
import theatreRoutes from "./routes/theatre.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;  // Set default port

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/locations", locationRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/theatres", theatreRoutes);



const startServer = async () => {
  try {
    // First connect to database
    await connectDB();
    
    // Then start the server
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();