const User=require("../models/user");
module.exports.profile=function(req,res){
    return res.render("users",{
        heading:"User Name"
    });
}

// for rendering the signup page
module.exports.signUp=function(req,res){
    return res.render("users_sign_up",{
        title:"Codeial | SignUp"
    });
}

// for rendering the signin page
module.exports.signIn=function(req,res){
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

}

