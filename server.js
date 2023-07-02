require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
// const workoutRoutes = require('./routes/workouts')
// const userRoutes = require('./routes/user')
// const sectionRoutes = require('./routes/sections')
// const taskRoutes = require('./routes/tasks')
const userRoutes = require("./routes/user");
const agendaRoutes = require("./routes/agenda");
const layananRoutes = require("./routes/layanan");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/user", userRoutes);
// app.use('/agenda/user', agendaRoutes)
// app.use('/layanan/user', layananRoutes)

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
