const appointments_express = require("express");
const appointments_db = require("./config/db.ts");
const appointments_cors = require("cors");

const appointments_app = appointments_express();
const appointments_USERSPORT = 3002;
appointments_app.use(cors());
appointments_app.use(appointments_express.json());

// Route to get all users
appointments_app.get("/api/get", (req, res) => {
    appointments_db.query("SELECT * FROM appointments", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get one user
appointments_app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  appointments_db.query("SELECT * FROM appointment WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route for creating the user
appointments_app.post("/api/create", (req, res) => {
  const appointmentId = req.body.appointmentId;
  const appointmentUserId = req.body.appointmentUserId;
  const appointmentServices = req.body.appointmentServices;
  const appointmentDateAndTime = req.body.appointmentDateAndTime;
  const appointmentCarNumber = req.body.appointmentCarNumber;

  appointments_db.query(
    "INSERT INTO users (appointment_id, appointment_user_id, appointment_services, appointment_date_and_time, appointment_car_number) VALUES (?,?,?,?,?)",
    [appointmentId, appointmentUserId, appointmentServices, appointmentDateAndTime, appointmentCarNumber],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// // Route to like a post
// app.post('/api/like/:id',(req,res)=>{

// const id = req.params.id;
// db.query("UPDATE posts SET likes = likes + 1 WHERE id = ?",id, (err,result)=>{
//     if(err) {
//    console.log(err)   }
//    console.log(result)
//     });
// });

// // Route to delete a post

// app.delete('/api/delete/:id',(req,res)=>{
// const id = req.params.id;

// db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
// if(err) {
// console.log(err)
//         } }) })

appointments_app.listen(appointments_USERSPORT, () => {
  console.log(`Server is running on ${appointments_USERSPORT}`);
});