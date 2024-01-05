const express = require("express");
const { MongoClient } = require("mongodb");
const app = express();
const port = 4000;

const uri =
  "mongodb+srv://lalumang03:EDbREbfsl6JpikO3@defcluster.qgfxvrk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
const MemberRoutes = require("./Routes/Members");
const TasksRoutes = require("./Routes/Tasks");
const SignUpRoutes = require("./Routes/Newusers");
const EventsRoutes = require("./Routes/Events");
const InductionsRoutes = require("./Routes/Induction");
const mongoose = require("mongoose");

//middleware
app.use(express.json()); //lets us use the returned objects for comparison and stuff ?

app.use((req, res, next) => {
  console.log(req.method, req.path);
  next();
});

//routes
app.use("/api/Members", MemberRoutes);
app.use("/api/Newusers", SignUpRoutes);
app.use("/api/Tasks", TasksRoutes);
app.use("/api/Events", EventsRoutes);
app.use("/api/Inductions", InductionsRoutes);

// connect to db
mongoose
  .connect(uri) //asynchronous function, will take some time. So, you need to wait before listening to requests
  //since you don't want to listen for requests before connecting to the database. so, add a promise.
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
