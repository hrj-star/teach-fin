const express = require("express");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
const session = require("express-session");
const flash = require("connect-flash");

const Users = require("./models/users");

const authenticateUser = require("./middlewares/authenticateUser");

const app = express();

// mongdb cloud connection is here
mongoose
  .connect("mongodb://localhost:27017/user", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to mongodb cloud! :)");
  })
  .catch((err) => {
    console.log(err);
  });

// middlewares
app.use(express.urlencoded({ extened: true }));
app.use(express.static("views"));
app.set("view engine", "ejs");

// cookie session
app.use(
  cookieSession({
    keys: ["randomStringASyoulikehjudfsajk"],
  })
);


// session , flash 
app.use(
    session({
        secret:'secret',
        cookie:{maxAge:60000},
        resave:false,
        saveUninitialized:false
    })
);

app.use(flash());



app.use((req,res,next)=>{
    res.locals.message=req.session.message;
    delete req.session.message;
    next();
}
);

app.use((req, res, next) =>{
  res.locals.user = req.session.user;
  next();
});


// route for serving frontend files
app
  .get("/", (req, res) => {
    res.render("index");
  })
  .get("/login", (req, res) => {
    res.render("login");
  })
  .get("/register", (req, res) => {
    res.render("register");
  })
  .get("/miniage", (req, res) => {
    
    res.render("miniage", { users: logged });
    
  })
  .get("/teenage", (req, res) => {

    res.render("teenage", { users: logged});
  })
  .get("/pointsboard", (req, res) => {
    
    res.render("pointsboard", { users: logged });
    
  })
  .get("/pointsboard2", (req, res) => {
    
    res.render("pointsboard2", { users: logged });
    
  })

  .get("/savingquiz", (req, res) => {

    res.render("./quizzes/saving/savingquiz", { users: logged });
  })

  .get("/saving", (req, res) => {

    res.render("./quizzes/saving/saving", { users: logged });
  })

  .get("/economy_teenage_quiz", (req, res) => {

    res.render("./quizzes/economy_teenage/economy_teenage_quiz", { users: logged });
  })

  .get("/economy_teenage", (req, res) => {

    res.render("./quizzes/economy_teenage/economy_teenage", { users: logged });
  })

  .get("/money_quiz", (req, res) => {

    res.render("./quizzes/money/moneyquiz", { users: logged });
  })

  .get("/money", (req, res) => {

    res.render("./quizzes/money/money", { users: logged });
  })

  .get("/workquiz", (req, res) => {

    res.render("./quizzes/work/workquiz", { users: logged });
  })

  .get("/work", (req, res) => {

    res.render("./quizzes/work/work", { users: logged });
  })

  .get("/spendingquiz", (req, res) => {

    res.render("./quizzes/spending/spendingquiz", { users: logged });
  })

  .get("/spending", (req, res) => {

    res.render("./quizzes/spending/spending", { users: logged });
  })

  .get("/budgetingquiz", (req, res) => {

    res.render("./quizzes/budgeting/budgetingquiz", { users: logged });
  })

  .get("/budgeting", (req, res) => {

    res.render("./quizzes/budgeting/budgeting", { users: logged });
  })


  .get("/taxquiz", (req, res) => {

    res.render("./quizzes/tax/taxquiz", { users: logged });
  })

  .get("/tax", (req, res) => {

    res.render("./quizzes/tax/tax", { users: logged });
  })

  .get("/saving2quiz", (req, res) => {

    res.render("./quizzes/saving2/saving2quiz", { users: logged });
  })

  .get("/saving2", (req, res) => {

    res.render("./quizzes/saving2/saving2", { users: logged });
  })



  .get("/investmentquiz", (req, res) => {

    res.render("./quizzes/investment/investmentquiz", { users: logged });
  })

  .get("/investment", (req, res) => {

    res.render("./quizzes/investment/investment", { users: logged });
  })
  

  .get("/retirementquiz", (req, res) => {

    res.render("./quizzes/retirement/retirementquiz", { users: logged });
  })

  .get("/retirement", (req, res) => {

    res.render("./quizzes/retirement/retirement", { users: logged });
  })

  .get("/home", (req, res) => {
    res.render("home", { users: logged });
  });



  // UPDATE the Profile
app.put("/:id", authenticateUser, function (req, res) {

  var name = req.body.username;
  var score = req.body.totalscore;

  User.findOneAndUpdate({_id: req.session.user}, { $set: { "username": name, "points": score } }, function (err, result) {
      if (err) {
          res.send("Error" + err);
      } else {
          // res.redirect("/profile/" + req.params.id);
          res.send("From router Put: Worked!");
      }
  });
});


// route for handling post requirests
app
  .post("/login", async (req, res) => {
    const { username, password } = req.body;

     //check for missing filds
   if (!username || !password) {

      //res.send("Please enter all the fields");
      req.session.message={
          type:'danger',
          intro:'Empty fields ',
          message:'Please enter all the fields'
      }
      res.redirect('/login');
    //  return;
    }

  
    const doesUserExits = await Users.findOne({ username });



    if (!doesUserExits) {
        req.session.message={
            type:'danger',
            intro:'Oops !  ',
            message:'Looks like you landed here for the first time ! Time to Register'
        }
        res.redirect('/register');
    }

    const doesPasswordMatch = await bcrypt.compare(
      password,
      doesUserExits.password
    );

    if (!doesPasswordMatch) {
        req.session.message={
            type:'danger',
            intro:'Oops !  ',
            message:'Invalid Password ! Try again ...'
        }
        res.redirect('/login');
    }
    /*
    Users.findOneAndUpdate(
      {
        dailycheckin:doesUserExits.dailycheckin+10
      },(err,docs)=>{
        console.log("updated checkin");
        console.log(doesUserExits.dailycheckin);
      }
    )

    */

    
    // else user logged in
   logged = [{
     
    username:username,
    points:doesUserExits.points,
    dailycheckin:doesUserExits.dailycheckin
  
    }];

  

    //res.redirect("/home");
    if(doesUserExits.age === "miniage"){
     
        res.redirect('/miniage');
    }
    else{
        res.redirect('/teenage');

    }
  })
  .post("/register", async (req, res) => {
    const { username, password ,age} = req.body;


    if (!username || !password || !age) {

      
        req.session.message={
            type:'danger',
            intro:'Empty fields ! ',
            message:'Please enter all the fields !'
        }
        res.redirect('/register');

      }
    const doesUserExitsAlready = await Users.findOne({ username });
    
 

    if (doesUserExitsAlready) {
        req.session.message={
            type:'danger',
            intro:'Seems like ... ',
            message:'A geek like you already exists ! Try again with another username !'
        }
        res.redirect('/register');
    }






    //  hash the password
    const hashedPassword = await bcrypt.hash(password, 12);
    const latestUser = new Users({ username, password: hashedPassword,age,points:0,dailycheckin:0 });

    latestUser
      .save()
      .then(() => {
        req.session.message={
            type:'success',
            intro:'Success ! ',
            message:'You are IN ! Lets start ! '
        }
      //  safe:true;
        
            res.redirect('/login');
        
        console.log(latestUser);
      })
      .catch((err) => console.log(err));
  });

//logout
app.get("/logout", authenticateUser, (req, res) => {
  req.session.user = null;
  res.redirect("/login");
});

// server config
const PORT = 8888;
app.listen(PORT, () => {
  console.log(`Server started listening on port: ${PORT}`);
});