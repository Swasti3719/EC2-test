const express = require("express") ;
const app = express() ;
const { PrismaClient } = require('@prisma/client');
const cors = require("cors") ;
const JWT_SECRET = "HI" ;
const jwt = require("jsonwebtoken") ;
const z = require("zod") ;
const prisma = new PrismaClient();


app.use(express.json()) ;
app.use(cors()) ;


const signin = z.object({
    username : z.string() ,
    password : z.string() ,
})

app.post("/signup",async(req,res)=>{
    const a = req.body ;
    const { success } = signin.safeParse(a) ;
    if(!success){
        return res.json({
            msg : "pls enter correct credentials" 
        })
    }
    
    

    const person = await prisma.user.create({
        data : {
            username : req.body.username ,
            password : req.body.password 
        }
    })

    const msg = jwt.sign(person.id,JWT_SECRET) ;

    return res.json({
        jwt : msg  
    })
})



app.get("/",(req,res)=>{
    return res.json({
        name : "swasti" ,
        password : "232424"
    })
})

app.listen(3000,()=>{
    console.log("server listening to 3000") ;
})