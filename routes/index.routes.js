// const express = require('express');
// const router = express.Router();
// let connected = ""
// /* GET home page */
// router.get("/", (req, res, next) => {
//   res.render("index");
// });

// const User = require('../models/user.model')

// //création  compte
// router.get("/signup", (req, res, next)=>{
//   res.render("signup")
// })
// router.post("/signup", (req, res, next)=>{
//   const { email, password } = req.body;
//   User.findOne({ email })
//     .then(existingUser => {
//       if (existingUser) {
//         // Email already exists in database, redirect back to signup with an error message
//         const error = "A user with this  already exists";
//         res.render("signup", { error });email
//       } else {
//         // Email doesn't exist, create new user and redirect to userProfile
//         const user = new User({ email, password });
//         user.save()
//           .then(() => {
//             connected = user;
//             res.redirect("/profile");
//           })
//           .catch(err => console.log(err));
//       }
//     })
//     .catch(err => console.log(err));
// })
// //profile
// router.get("/profile",(req,res,next) => {
//   res.render("profile", {user: connected})
// })

// //LOGIN
// router.get("/login", (req,res,next)=>{
//   res.render("login")
// })
// // router.post("/login", (req,res,next)=>{
// //   const {email, password} = req.body
// //   connected = {email,password}
// //   User.find()
// //   .then(user =>{
// //     res.redirect("/profile", connected)
// //   })
// //   .catch(message =>{
// //     res.redirect("/login", {message} )
// //   })
// // })
// router.post("/login", (req,res,next)=>{
//   const {email, password} = req.body
//   User.findOne({email, password})
//     .then(user => {
//       if(user) {
//         connected = user
//         res.redirect("/profile")
//       }
//     })
//     .catch(err =>{
//       res.redirect("/login", {err} )
//     })
// })

// //Création des véhicules
// const Car = require("../models/car.model.js")
// router.get("/inventory", (req, res, next)=>{
//   res.render("inventory")
// })

// router.post("/inventory", (req, res, next)=>{
//   const {brand,model,doors,type,seats,transmission} = req.body
//   const car = new Car({brand,model,doors,type,seats,transmission})
//   car.save()
//     .then(()=>{
//       res.redirect("/vehicles")
//     })
// })

// //affichage de la liste des vehicules
// router.get('/vehicles', (req, res, next) => {
//   Car.find()
//     .then(cars => {
//       res.render("cars", { cars });
//     })
//     .catch(err => console.log(err));
// });

// //affichage d'un vehicule unique
// router.get("/vehicles/:id", (req, res) => {
//   const id = req.params.id;
//   Car.findById(id)
//     .then(car => {
//       res.render("/vehicle", { car });
//     })
//     .catch(err => console.log(err));
// });

// module.exports = connected;
// module.exports = router;

const express = require("express");
const router = express.Router();
let connected = null;

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

const User = require("../models/User.model");

// création compte
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {
  console.log("log");
  const { email, password, name, adress } = req.body;
  const user = new User({ email, password, name, adress });
  user
    .save()
    .then((user) => {
      connected = user;
      res.redirect("/profile");
    })
    .catch((err) => console.log(err));
});

// LOGIN
router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email, password })
    .then((user) => {
      console.log("USER LOGGED IN");
      if (user) {
        connected = user;
        res.redirect("/profile", { user });
      } else {
        res.redirect("/login");
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/login");
    });
});

// PROFILE
router.get("/profile", (req, res, next) => {
  if (connected) {
    res.render("profile", { user: connected });
  } else {
    res.redirect("/login");
  }
});

// CRÉATION DES VÉHICULES
const Car = require("../models/car.model.js");

router.get("/inventory", (req, res, next) => {
  res.render("inventory");
});

router.post("/inventory", (req, res, next) => {
  const { brand, model, doors, type, seats, transmission } = req.body;
  const car = new Car({ brand, model, doors, type, seats, transmission });
  car
    .save()
    .then(() => {
      res.redirect("/vehicles");
    })
    .catch((err) => console.log(err));
});

// AFFICHAGE DE LA LISTE DES VEHICULES
router.get("/vehicles", (req, res, next) => {
  Car.find()
    .then((cars) => {
      res.render("cars", { cars });
    })
    .catch((err) => console.log(err));
});

// AFFICHAGE D'UN VEHICULE UNIQUE
router.get("/vehicles/:id", (req, res) => {
  const id = req.params.id;
  Car.findById(id)
    .then((car) => {
      res.render("/vehicle", { car });
    })
    .catch((err) => console.log(err));
});

//BOOOOOOOOOOOOOOOOOOOOOKIIIIIIIINNNNGG
const Booking = require("../models/booking.js");

router.get("/booking", (req, res) => {
  res.render("booking", {
    title: "Book a Car",
    minDate: new Date().toISOString().split("T")[0], // set minimum date to today
  });
});

router.post("/booking", async (req, res) => {
  const { name, email, phone, pickupOption, pickupDate, returnDate } = req.body;

  // validate form data
  if (
    !name ||
    !email ||
    !phone ||
    !pickupOption ||
    !pickupDate ||
    !returnDate
  ) {
    return res.render("booking", {
      title: "Book a Car",
      minDate: new Date().toISOString().split("T")[0],
      error: "Please fill in all fields",
    });
  }

  const booking = new Booking({
    name,
    email,
    phone,
    pickupOption,
    pickupDate,
    returnDate,
    Car,
  });
  connected.push(booking);

  await booking.save();

  res.redirect("/booking/confirmation");
});

router.get("/booking/confirmation", (req, res, next) => {
  res.render("confiramtion");
});

router.post("/name", (req, res, next) => {
  const { name } = req.body;
  connected
    .find()
    .then((user) => {
      user.findByIdAndUpdate(name, { name: name });
      connected = user;
      res.redirect("/profile", { user });
    })
    .catch((err) => console.log(err));
});

module.exports = router;

// router.post("/booking", (req,res,next)=>{
//   const book = req.body
//   book.user =
// }
// )
