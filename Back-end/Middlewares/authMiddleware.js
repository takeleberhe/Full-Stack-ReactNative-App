require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../Model/User");

/* how to allow user to access and manipulate back-end resources in our App?
       1:Authentication: it all about checking weather the user login and registrred in 
                         our database.
                         --check the email ,username,and password weather this user is legally
                          registered in our database.
       1.1how we can authenticate?--we can authenticate the user using jwt tokens.
       2:Authorization:after we assure the user is lagally registed in our database then 
                       all legally registerd users to manipulate everything in our database.
                    --we have to restrict our users..we have to give them d/t roles...permissions
                      and privillages.
                  --what are the types of user roles in our full stack Aoo?
                    1:Admin: admin can add,delete,update,read...each resource in our database
                             --can add users,products,orders or delete users,products,update,read
                              everything in our database.
                    2:user:users can have d/t roles...adding,reading,updating,deleting there own 
                           data or resource they create in our database...adding profile,deleting it,
                           updating it...reading it and reading the public resources...in our front-end..
        #3: what is the main goal of jwt.verify() method????Authentication phase
      --what is the main goal of jwt tokens,cookies and verify method?
        Ans:it is to check weather the user is valid or not with out logging to database 
            again and again just using token +secret key saved in server using the verify method 
            the server decodes the token and verifies it using secret key and extracts the user 
            and add to the request object as a valid user and send it to the next middleware
            by calling the next() method with out logging to database to validate user!!!!
        --cookies and sessions are places where to save our token cookies in browser and 
          sessions in our server memory,redis,database and so on for highly secure applications like
          bank applications save there token in session server and cookies for web applications and e-
          commerce applications!!!
 #4:Authorization phase
  --what is Authorization middleware do?
    step 1: it accepts authenticated user from the authentication middleware
    step2: after it gets authenticated user from the authentication middleware then 
           it do its bussiness logic and allow the respected resource for the user
           ex:--if the user normal user it allows to add and manipulate his/her personal
              and private resources in the public routes or resources.
             -- if the user is admin then it allows to manipulate all or partial 
              resources of the server to add and manipulate it 
            --finally we can have different user roles and different resources they manipulate 
             in our server or database or backend period this the main goal of authorization.
    NB:the main goal of tokens is to reduce the time a server takes to validate a user 
       every time loges to the databse to validate it and to validate users for evry 
       reource in the server...but tokens do every thing with out going to database 
       just using simple jwt.verify() method ans giving inputes from the header of 
       request and the signiture or the secret key from the server(only found in server) that no 
       body can access and modify it!!!!
              
    Authorization :isAuth is higher order Function or wrapper function.
  --what is the advantage of higher order functions or why we use them?
  --step 1: it addes any properties or varibales to our functions.
  --step 2:if our middleware function has limit in accepting varibales we can define it 
    inside a wrapper funtion and declare the need veriable in the higher order function and 
    our child middleware function has the privillage to access any propertie of 
    the parent function or varibales.
  --step 3:to add additional functionality to our functions.our function is defined with
    its inputes and it returnes the expected value but add addtional functionalities from the
    wrapper functions.

     */

/* Step one :Authentication */

const verifyToken = async (req, res, next) => {
  const cookies = req.headers.cookie;
  const token = cookies?.split("=")[1];
  if (!token) {
    return res.status(400).json({ message: "token not found!" });
  }

  jwt.verify(String(token), process.env.JWT_VERIFY_KEY, (err, user) => {
    if (err) {
      return res.status(400).json({ message: " invalid token " });
    }
    req.user = user;
    next();
  });
};

/* Authorization for normal user and admin */
const isAuth = async (req, res, next) => {
  /* acceshe token) by previous object! */
  verifyToken(req, res, () => {
    if (req.user.id || req.user.isAdmin) {
      next();
    } else {
      res.send("you are not authorized!");
    }
  });
};

/* Authorization only for Admin */
const isAdmin = async (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.send("you are not authorized!");
    }
  });
};
module.exports = {
  verifyToken,
  isAuth,
  isAdmin,
};
