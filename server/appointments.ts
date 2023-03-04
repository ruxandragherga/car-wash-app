const appointments_express = require("express");
const appointments_db = require("./config/db.ts");
const appointments_cors = require("cors");

const appointments_app = appointments_express();
const appointments_USERSPORT = 3004;
appointments_app.use(appointments_cors());
appointments_app.use(appointments_express.json());

// Route to get all appointments
appointments_app.get("/api/get", (req, res) => {
    appointments_db.query("SELECT * FROM appointments", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get one appointment
appointments_app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  appointments_db.query("SELECT * FROM appointments WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route for creating the appointment
appointments_app.post("/api/create", (req, res) => {
  const appointmentId = req.body.appointmentId;
  const appointmentUserId = req.body.appointmentUserId;
  const appointmentServices = req.body.appointmentServices;
  const appointmentDateAndTime = req.body.appointmentDateAndTime;
  const appointmentCarNumber = req.body.appointmentCarNumber;
  const appointmentUserFirstName = req.body.appointmentUserFirstName;
  const appointmentUserLastName = req.body.appointmentUserLastName;
  const appointmentUserPhoneNumber = req.body.appointmentUserPhoneNumber;

  appointments_db.query(
    "INSERT INTO appointments (appointment_id, appointment_user_id, appointment_services, appointment_date_time, appointment_car_number, appointment_user_first_name, appointment_user_last_name, appointment_user_phone_number) VALUES (?,?,?,?,?,?,?,?)",
    [appointmentId, appointmentUserId, appointmentServices, appointmentDateAndTime, appointmentCarNumber, appointmentUserFirstName, appointmentUserLastName, appointmentUserPhoneNumber],
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