const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import routes
const patientsRouter = require("./routes/patients");
const { router: vitalsRouter } = require("./routes/vitals");
const alertsRouter = require("./routes/alerts");

// Import middleware
const { errorHandler, notFoundHandler } = require("./middleware/errorHandler");

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:5174").split(",");
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "✅ ResGuard Backend is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// Mount routes
app.use("/api/patients", patientsRouter);
app.use("/api/vitals", vitalsRouter);
app.use("/api/alerts", alertsRouter);

// 404 handler
app.use(notFoundHandler);

// Global error handler (must be last)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════╗
║   🏥 ResGuard Smart Health Monitoring      ║
║        Backend Server Started ✅           ║
╠════════════════════════════════════════════╣
║  📡 Server: http://localhost:${PORT}             
║  🔗 Health: http://localhost:${PORT}/health      
║  👥 Patients: http://localhost:${PORT}/api/patients  
║  💓 Vitals: http://localhost:${PORT}/api/vitals    
║  🚨 Alerts: http://localhost:${PORT}/api/alerts   
╠════════════════════════════════════════════╣
║  CORS Origins: ${allowedOrigins.join(", ")}
║  Environment: ${process.env.NODE_ENV || "development"}
║  Twilio Mode: ${process.env.TWILIO_ACCOUNT_SID ? "🟢 ACTIVE" : "🔵 TEST (Console)"}
╚════════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("\n⚠️  SIGTERM received. Shutting down gracefully...");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("\n⚠️  SIGINT received. Shutting down gracefully...");
  process.exit(0);
});
