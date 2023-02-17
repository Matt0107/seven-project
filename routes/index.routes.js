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


const express = require('express');
const router = express.Router();
let connected = null;

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/confirmation",(req, res, next) => {
  res.render("cone")
})

const User = require('../models/User.model');

// création comptex 
router.get("/signup", (req, res, next) => {
  res.render("signup");
});

router.post("/signup", (req, res, next) => {
  console.log('log')
  const { email, password, name, adress } = req.body;
  const user = new User({ email, password, name, adress });
  user.save()
    .then(user => {
      connected = user;
      res.redirect("/profile");
    })
    .catch(err => console.log(err));
});

// LOGIN
router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email , password})
    .then(user => {
      console.log('USER LOGGED IN')
      if (user) {
        connected = user;
        res.redirect("/profile", {user});
      } else {
        res.redirect("/login");
      }
    })
    .catch(err => {
      console.log(err);
      res.redirect("/login");
    });
});

// PROFILE
router.get("/profile", (req, res, next) => {
  Booking.find()
  .then((books) => {
  if (connected) {
    res.render("profile", { user: connected , books});
  } else {
    res.redirect("/login");
  }})
});

// CRÉATION DES VÉHICULES
const Car = require("../models/car.model.js");

router.get("/inventory", (req, res, next) => {
  res.render("inventory");
});

router.post("/inventory", (req, res, next) => {
  const { brand, model, doors, type, seats, transmission } = req.body;
  const car = new Car({ brand, model, doors, type, seats, transmission });
  car.save()
    .then(() => {
      res.redirect("/vehicles");
    })
    .catch(err => console.log(err));
});

// AFFICHAGE DE LA LISTE DES VEHICULES
router.get('/vehicles', (req, res, next) => {
  Car.find()
    .then(cars => {
      res.render("cars", { cars });
    })
    .catch(err => console.log(err));
});

// AFFICHAGE D'UN VEHICULE UNIQUE
router.get("/vehicles/:id", (req, res) => {
  const id = req.params.id;
  Car.findById(id)
    .then(car => {
      res.render("/vehicle", { car });
    })
    .catch(err => console.log(err));
});

//BOOOOOOOOOOOOOOOOOOOOOKIIIIIIIINNNNGG
const Booking = require("../models/booking.js");



router.post("/booking", (req,res,next)=>{
  const {name, email, phone, pickupOption, pickupDate, returnDate, car, } = req.body
  const booking = new Booking({name, email, phone, pickupOption, pickupDate, returnDate, car, connected })
  booking.save()
  .then(()=> {
    res.redirect("/confirmation")
  })
})


let a = new Car ({
  brand: " Mercedes-Benz" ,
  model: "S-Class"  ,
  doors: 4  ,
  type: "Gasoline"  ,
  seats: 5  ,
  transmission: "Automatic"  ,
  image: "https://imgd.aeplcdn.com/1056x594/n/cw/ec/48067/s-class-exterior-right-front-three-quarter-3.jpeg?q=75&wm=1",
})
let b = new Car({
  brand: "BMW"  ,
  model: "7 Series" ,
  doors: 4  ,
  type:  "Gasoline" ,
  seats: 5,
  transmission: "Automatic " ,
  image: "https://mediapool.bmwgroup.com/cache/P9/202204/P90458181/P90458181-the-new-bmw-i7-xdrive60-04-2022-600px.jpg  " ,
})
let c = new Car({
  brand: 'Audi '  ,
  model: 'A8  ',
  doors: 4,
  type: 'Gasoline or Hybrid  ',
  seats: 5,
  transmission:'Automatic  ' ,
  image: 'https://mediaservice.audi.com/media/live/50900/fly1400x601n1/4nc0da/2022.png?imwidth=850',
})
let d = new Car({
  brand: "Rolls-Royce",
  model: "Ghost",
  doors: 4,
  type: "Gasoline or Hybrid",
  seats: 5,
  transmission: "Automatic",
  image:"https://autoartmodels.de/wp-content/uploads/2020/04/78868w-scaled.jpg  " ,
})
let e = new Car({
    brand: "Lexus",
  model: "LS",
  doors: 4,
  type: "Gasoline",
  seats: 5,
  transmission: "Automatic",
  image:"https://e7.pngegg.com/pngimages/464/370/png-clipart-porsche-porsche.png  " ,
})
let f = new Car({
    brand: "Porsche",
  model: "Panamera",
  doors: 4,
  type: "Gasoline or Hybrid",
  seats: 5,
  transmission: "Automatic",
  image:"https://www.nicepng.com/png/detail/66-663928_2018-rolls-royce-phantom-rolls-royce-ghost-2018.png  " ,
})
a.save()
b.save()
c.save()
d.save()
e.save()
f.save()

module.exports = router;
