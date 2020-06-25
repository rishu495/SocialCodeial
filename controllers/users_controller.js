const User=require("../models/user");
module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){
        return res.render("users",{
            heading:"User Name",
            profile_user:user
        });    
    });
    
}


module.exports.update=function(req,res){
    if(req.user.id==req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            return res.redirect("back");
        });
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}


// for rendering the signup page
module.exports.signUp=function(req,res){

    if(req.isAuthenticated()){
         return res.redirect('/users/profile');
    }
    return res.render("users_sign_up",{
        title:"Codeial | SignUp"
    });
}

// for rendering the signin page
module.exports.signIn=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render("users_sign_in",{
        title:"Codeial | SignIn"
    });
}



module.exports.create=function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,data){
        if(err){console.log("error in creating the User",err);return}
        if(!data){
            User.create(req.body,function(err,data){
                if(err){console.log("Error in signing up the user",err);return}
                return res.redirect("/users/sign-in");
            });
        }
        else{
            return redirect("back");
        }
    });
    console.log("hi");
}



module.exports.createSession=function(req,res){
    return res.redirect('/');
}


module.exports.destroySession=function(req,res){
    req.logout();
    return res.redirect('/');
}