module.exports.profile=function(req,res){
    return res.render("users",{
        heading:"User Name"
    });
}