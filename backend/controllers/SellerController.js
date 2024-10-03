const Seller = require("../models/Seller");
const bcrypt = require("bcryptjs");

const registerSeller =  async(req,res) =>{
    const{name,email,password} = req.body
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt);

        let seller = new Seller({
            ...req.body,
            password:hashedpassword,
       });
       const emailExist = await Seller.findOne({email});
       if(emailExist)
        {
            res.send({message:"email already exist."});
        }else{
            seller = await seller.save();
            res.status(200).send({
                _id:seller._id,
                name:seller.name,
                email:seller.email,
                role:seller.role,
            });
        }
    }
    catch(err)
    {
        res.status(500).send(err.message);
    }

};

const loginSeller =async(req,res) =>{
    const {email,password} = req.body;

    try{
        if(req.body.email && req.body.password){
            let seller = await Seller.findOne({email});
            if(seller){
                let validated = await bcrypt.compare(password,seller.password);
                if(validated){
                    res.send({
                        _id:seller._id,
                        name:seller.name,
                        email:seller.email,
                        role:seller.role,
                    })
                }else{
                    res.send({message:"Invalid password."})
                }
            }
            else{
                res.send({message:"Email doesn't exist."})
            }
        }
        else{
            res.send({message:"Email and password are required"});
        }
    }
    catch (error) {
        res.send({message:error})
    }
}



module.exports={
    registerSeller,
    loginSeller,
};
