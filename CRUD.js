const express=require('express')
const app=express()

const bodyParser=require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const mongoose=require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/student',{
    useNewUrlParser:true
})


let apiSchema=mongoose.Schema({
    name:String,
    email:String,
    contactNo:Number,
    address:String,
    age:String,
    dept:String,
    mark:Number
})

let api_model=mongoose.model("details", apiSchema);

//post Method
app.post("/post",(req,res)=>{

 let new_api=[
    {
        "name":"Manikandan",
        "email":"Manikandan@gmail.com",
        "contactNo":805544046,
        "age":20,
        "address":"JJ NAGAR",
        "dept":"EEE",
        "mark":90
    
    },
    {
        "name":"Sathish",
        "email":"sathish@gmail.com",
        "contactNo":8055554046,
        "age":20,
        "address":"KK NAGAR",
        "dept":"EEE",
        "mark":50
    
    },
        {
            "name":"MuthuKumar",
            "email":"MuthuKumar@gmail.com",
            "contactNo":8055543046,
            "age":20,
            "address":"MM NAGAR",
            "dept":"EEE",
            "mark":50
        
        },
        {
            "name":"MariKumar",
            "email":"MariKumar@gmail.com",
            "contactNo":8055543046,
            "age":25,
            "address":"MM NAGAR",
            "dept":"CIVIL",
            "mark":60
        
        },
        {
            "name":"Kannan",
            "email":"Kanna@gmail.com",
            "contactNo":8555543046,
            "age":20,
            "address":"MM NAGAR",
            "dept":"CSE",
            "mark":40
        
        },
        {
            "name":"Kailash",
            "email":"Kailash@gmail.com",
            "contactNo":8555543046,
            "age":25,
            "address":"MM NAGAR",
            "dept":"MECH",
            "mark":13
        
        },
        {
            "name":"Antony",
            "email":"Antony@gmail.com",
            "contactNo":8555543046,
            "age":20,
            "address":"MM NAGAR",
            "dept":"EEE",
            "mark":60
        
        },
        {
            "name":"Ravi",
            "email":"Ravi@gmail.com",
            "contactNo":8555543046,
            "age":25,
            "address":"MM NAGAR",
            "dept":"ECE",
            "mark":80
        
        },
        {
            "name":"Siva",
            "email":"Siva@gmail.com",
            "contactNo":8555543046,
            "age":20,
            "address":"MM NAGAR",
            "dept":"ECE",
            "mark":90
        
        },
        {
            "name":"Sivakumar",
            "email":"SivaKumar@gmail.com",
            "contactNo":8555543046,
            "age":25,
            "address":"MM NAGAR",
            "dept":"CIVIL",
            "mark":70
        
        }
    ]
  
    res.send("Data Add Successfully")
    api_model.insertMany(new_api)

})



//Get Method

app.get("/get", async (req, res) => {
    try {
        let result = await api_model.find({},{mark:1,_id:0});
        res.send(result);
       } catch (error) {
        res.status(500).send(error);
      }
});


//Put Method

app.put("/put/:id", async (req, res) => {
    try {
        const Update= await api_model.updateOne({_id:req.params.id },{$inc:{mark:100}})
        res.send("Update Success")
    }   catch (error) {
        res.status(500).send(error);
    }
});

//Delete Method

app.delete("/:id", async(req,res)=>{

    try {
     let Delete= await api_model.findByIdAndDelete(req.params.id)
     res.send("Delete Success")
    } catch (error) {
        res.status(500).send(error)
    }
})



app.listen(5000)



