const jwt=require('jsonwebtoken')


exports.JwtAuth=async(req,res,next)=>{
    const token=req.cookies.token
    try {
         const user=jwt.verify(token,JWT_SECRET_KEY);
          /* what is the main goal of the jwt.verify() method?
            --a user was given a token when first login
            -- when a user wants to access a resource again it is not fair to login again and again
            --verify token eliminates this login again and again by verifying the token how?
            --token has three elements:the header +payload+signiture
            --header and payload are added from user objects properties and the encoding algorithms
              but the signiture is added by the server and it will be saved inside the server for later 
              verification?
            --users or huckers can change the header or the payload or the signiture or totally
              the token in the middle or from the cookies saved in the browser.
            --how can the server identifies weather the token is valid or not?
            --jwt tokens are base64 encodded and any one can decode them easily? so how the server 
             verify it just by calculating the token again ?how 
             JWT token=base64decoded header+base64decoded payload+its own secret key???


             step 1:first it calculates the jwt token decoded header +payload+the secret key in client.
             step2:second calculate the jwt token decoded header+payload+the secret key in server
             if (step1===step2){
                 //then the token is correct and it will decode the token to extract 
                  who is the user and then it will add to the request object and 
                  call the next middleware and send the request object with the 
                  extracted user and the next middleware can use this user as a valid user 
                  or user who is registerd in our database with out checking by calling 
                  database methods and allow access to the respected resource in the 
                  server or send un authorised errors if the user is not allowed to access the 
                  resource.....this is the main concept of tokens.....it reduces the 
                  system from login users again and agian....and stop server verifying user 
                  always by checking in database for each user to validate.....and keep user 
                  stay login until this token or temporary coupen expired and if it expires...
                  we use a verify token to generate a access token or coupen to the user and 
                  stay login in our system or web app until he wants to stay login with out login 
                  again and again.
             }



           */
         request.user=user;
    } catch (error) {
        res.clearCookie(token);
        return res.redirect('/');
    }     
}