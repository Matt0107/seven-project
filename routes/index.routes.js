const express = require('express');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});


// création de véhicule (par Admin)
router.post("/create", (res,req) => {
  const {name , model, year} = req.body
  const car = new Car({name , model, year})
  car.save()
    .then(()=> {
      res.send("new car added")
    })
    .catch(err => console.log(err))
})

// Récupération des véhicules dans la DataBase

router.get("/cars", (res,req)=>{
  Car.find()
    .then((cars)=>{
      res.render("cars", {cars})
    })
    .catch((err)=> console.log(err))
})




//creation de compte
router.post("/register", (res,req) => {
  const {name , model, year} = req.body
  const car = new Car({name , model, year})
  car.save()
    .then(()=> {
      
      res.send("new car added")
    })
    .catch(err => console.log(err))
})




//Creation de compte
router.get("/register", (req,res)=>{
  res.render("auth/login")
})
router.post("/register", (req,res) => {
  const {email, password} = req.body
  User.findOne({email})
    .then(user =>{
      if (user){
        res.render("signup", { message: "Email is already taken" })
      }
      else{
        const user = new User({email , password})
        user.save()
        .then(()=> res.send("Thank you for your registration"))
      }
    })
})





// Connection au compte
router.get('/login', (req, res) => res.render('auth/login'));
router.post('/login', (req, res, next) => {
  const { email, password } = req.body;
 
  if (email === '' || password === '') {
    res.render('auth/login', {
      errorMessage: 'Please enter both, email and password to login.'
    });
    return;
  }
 
  User.findOne({ email })
    .then(user => {
      if (!user) {
        res.render('auth/login', { errorMessage: 'Email is not registered. Try with other email.' });
        return;
      } else if (bcryptjs.compareSync(password, user.passwordHash)) {
        res.render('users/user-profile', { user });
      } else {
        res.render('auth/login', { errorMessage: 'Incorrect password.' });
      }
    })
    .catch(error => next(error));
});



module.exports = router;
