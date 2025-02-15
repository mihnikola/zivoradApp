// const express = require("express");
// const mongoose = require("mongoose");
// const admin = require("firebase-admin");
// const bodyParser = require("body-parser");
// const serviceAccount = require("./barber-demo-218de-firebase-adminsdk-fbsvc-190d9f7677.json");
// const connectDB = require("./dbConnection");
// const cors = require("cors"); // Import the cors middleware
// const { Expo } = require("expo-server-sdk");
// const app = express();

// const expo = new Expo();
// // Initialize Firebase Admin SDK with service account credentials
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// // Create an Express app
// app.use(bodyParser.json());
// app.use(cors()); // This enables CORS for all routes and all origins
// // Connect to MongoDB (ensure MongoDB is running or use MongoDB Atlas)
// connectDB();

// // Define MongoDB Schema for storing FCM tokens
// const tokenSchema = new mongoose.Schema({
//   token: String,
// });

// const Token = mongoose.model("Token", tokenSchema);

// const corsOptions = {
//   origin: "http://example.com", // Replace with the allowed origin(s)
//   methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
//   allowedHeaders: "Content-Type,Authorization", // Allowed headers
// };

// app.use(cors(corsOptions)); // Use the CORS middleware with specific options

// // API route to save FCM Token
// app.post("/api/save-token", async (req, res) => {
//   const { token } = req.body;
//   try {
//     // Save the token to MongoDB
//     const newToken = new Token({ token });
//     await newToken.save();

//     res.status(200).send("Token saved successfully");
//     console.log("Token saved successfully");
//   } catch (error) {
//     console.error("Error saving token:", error);
//     res.status(500).send("Failed to save token");
//   }
// });
// app.post("/api", async (req, res) => {
//   const { comment, name } = req.body;
//   const message = {
//     message: {
//       data: {
//         title: "Hello, ",
//         body: `${name} says: ${comment}`,
//       },
//     },
//   };
//   const response = await fetch("https://fcm.googleapis.com/fcm/send", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: "key=your_server_key",
//     },
//     body: JSON.stringify(message),
//   });
//   const data = await response.json();
//   if (data.success) {
//     res.status(200).send("Message sent successfully");
//     console.log("Message sent successfully");
//   } else {
//     res.status(500).send("Failed to send message");
//     console.error("Error sending message:", data);
//   }
// });
// // API route to send push notification
// app.post("/api/send-notification", async (req, res) => {
//   const { message } = req.body;
//   console.log("api/send-notification", message);
//   try {
//     // Fetch all stored tokens from MongoDB
//     const tokens = await Token.find();

//     // Prepare push notifications payload for each token
//     let messages = [];
//     for (let token of tokens) {
//       if (Expo.isExpoPushToken(token.token)) {
//         messages.push({
//           to: token.token, // Expo push token
//           sound: "default",
//           body: "hey bolan",
//         });
//       } else {
//         console.log(`Invalid Expo push token: ${token.token}`);
//       }
//     }

//     if (messages.length > 0) {
//       // Send notifications through Expo's service
//       const chunks = expo.chunkPushNotifications(messages);
//       const tickets = [];

//       for (let chunk of chunks) {
//         try {
//           const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
//           tickets.push(...ticketChunk);
//         } catch (error) {
//           console.error(error);
//         }
//       }

//       console.log("Push notifications sent:", tickets);
//       res.status(200).send("Notification sent successfully");
//     } else {
//       res.status(400).send("No valid Expo tokens found");
//     }
//   } catch (error) {
//     console.error("Error sending notification:", error);
//     res.status(500).send("Failed to send notification");
//   }
// });

// // Start the Express server
// app.listen(5000, () => {
//   console.log("Server is running on port 5000");
// });



const express = require('express');
const cors = require('cors');
const serviceRoutes = require('./routes/serviceRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const userRoutes = require('./routes/userRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const customerRoutes = require('./routes/customerRoutes');
const timesRoutes = require('./routes/timesRoutes');
const connectDB = require('./dbConnection');
const bodyParser = require('body-parser');

const app = express();
app.use(cors())

// Middleware to parse JSON
// app.use(express.json());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// Use routes
app.use('/services', serviceRoutes);
app.use('/reservations', reservationRoutes);
app.use('/employees', employeeRoutes);
app.use('/customers', customerRoutes);
app.use('/times', timesRoutes);
app.use('/users', userRoutes);





connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
