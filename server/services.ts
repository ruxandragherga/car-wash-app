const services_express = require("express");
const services_db = require("./config/db.ts");
const services_cors = require("cors");

const services_app = services_express();
const services_USERSPORT = 3003;
services_app.use(services_cors());
services_app.use(services_express.json());

// Route to get all services
services_app.get("/api/get", (req, res) => {
    services_db.query("SELECT * FROM services", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get one service
services_app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  services_db.query("SELECT * FROM services WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get one service
services_app.get("/api/getFromName/:name", (req, res) => {
  const name = req.params.name;
  services_db.query("SELECT * FROM services WHERE service_name= ?", name, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route for creating the service
services_app.post("/api/create", (req, res) => {
  const serviceId = req.body.serviceId;
  const serviceCategory = req.body.serviceCategory;
  const serviceName = req.body.serviceName;
  const servicePrice1 = req.body.servicePrice1;
  const servicePrice2 = req.body.servicePrice2;
  const servicePrice3 = req.body.servicePrice3;

  services_db.query(
    "INSERT INTO services (service_id, service_category, service_name, service_price_1, service_price_2, service_price_3) VALUES (?,?,?,?,?,?)",
    [serviceId, serviceCategory, serviceName, servicePrice1, servicePrice2, servicePrice3],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      console.log(result);
    }
  );
});

// // Route to like a post
// services_app.post('/api/s_id/:id',(req,res)=>{

// const id = req.params.id;
// services_db.query("UPDATE services SET service_id = service_id - 1 WHERE id = ?",id, (err,result)=>{
//     if(err) {
//    console.log(err)   }
//    console.log(result)
//     });
// });

 // Route to delete a post

 services_app.delete('/api/delete/:id',(req,res)=>{
 const id = req.params.id;

 services_db.query("DELETE FROM services WHERE service_id= ?", id, (err,result)=>{
 if(err) {
 console.log(err)
 res.send({error: err.message});
         }
        res.send(result);
      }) })

services_app.listen(services_USERSPORT, () => {
  console.log(`Server is running on ${services_USERSPORT}`);
});