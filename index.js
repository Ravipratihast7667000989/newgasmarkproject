

const  express = require('express');
const cors = require('cors');
const mongooes = require('mongoose'); 
 const bodyParser = require('body-parser');
const info = require('./src/model');
const model = require('./src/model');
const { Db } = require('mongodb');
const app = express()
const PORT = process.env.PORT||4000
 app.use(bodyParser.urlencoded({extended : false}));
 app.use(bodyParser.json());
 app.use(cors());
mongooes.connect("mongodb+srv://ravipratihast71:LCtQ1SB82Dr5ITu3@cluster0.hkwcuwh.mongodb.net/GasMark").then( function(){
    console.log("db connected");

   
 const consumer_id = Math.floor(Math.random() * 65766607880);
   console.log(consumer_id); 
//    var cureentdate = new Date();
//    console.log(cureentdate);


   
   
const sch ={
    firstname:String,
    lastname:String,
    mobilenumber:String,
    email:String,
    idproof:String,
    address:String,
    pincode:String,
    gender:String,
    dob:String,
    agency:String,
    nationality:String,
    cylindertype:String,
    consumer_id:{
        default:consumer_id,
        type:String,
        
    },
    knowlegement_number:{

        default:Date.now(),
        type:String,
    },
    dateandtime:{
        default:Date.now(),
        type:Date,
        unique:true,
        requrie:true
    }
   
}

const monmodel1 = mongooes.model("newconnection_user",sch);

 
// insert data
app.post("/post", async(req,res)=>{
   
    const data = new monmodel1({
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    mobilenumber:req.body.mobilenumber,
    email:req.body.email,
    idproof:req.body.idproof,
    address:req.body.address,
    pincode:req.body.pincode,
    gender:req.body.gender,
    dob:req.body.dob,
    agency:req.body.agency,
    nationality:req.body.nationality,
    cylindertype:req.body.cylindertype,
    consumer_id:req.body. consumer_id,
    knowlegement_number:req.body.knowlegement_number,
    dateandtime:req.body.dateandtime,


    });
    const val = await data.save();
    res.send(val);


});

const sch1 ={
    delivery_type:String,
    day:String,
    time:String,
    consumer_id:String

}
const monmodel2 = mongooes.model("order_cylinder",sch1);
//insert data 

app.post("/booking", async(req,res)=>{
    const data = new monmodel2({
    delivery_type:req.body.delivery_type,
    day:req.body.day,
    time:req.body.time,
    consumer_id:req.body.consumer_id,

    });
    const val = await data.save();
    res.send(val);


});

// Update by id
app.put("/booking/:_id",async(req,res)=>{
    const {_id} = req.params;
    const {delivery_type} = req.body;
    const {day} = req.body;
    const {time} = req.body;
    const {consumer_id} = req.body;
    try {
        const updateProfile = await monmodel2.findByIdAndUpdate(_id,{delivery_type,day,time,consumer_id},{new:true});
        if(!updateProfile){
            return res.status(404).json({error:"Profile not found"});
        }
        res.json(updateProfile);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({error:"server error"});
        
    };
});


    app.get('/details', async function(req,res){
        var getinfo= await monmodel1.find();
        res.json(getinfo);
        

    });
    //delete api
    
    app.delete('/booking/_id', async function(req,res){
         await monmodel2.deleteOne({_id:req.params._id});
    
        const Response = {message : "Deleted sucessfully"};
        res.json(Response);
        

    });


 
});


// app.delete("/booking/delete/:_id",async(req,res)=>{
//     const {_id} = req.params;
//     try {
//         const deleteProfile = await monmodel2.findByIdAndDelete(_id);
//         if(!deleteProfile){
//             return res.status(404).json({error:"Profile not found"});
//         }
//         res.json(updateProfile);
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({error:"server error"});
        
//     };
// });

   
    app.listen(PORT, () => console.log(
        `Server is Started ${PORT}`
    
    ));
