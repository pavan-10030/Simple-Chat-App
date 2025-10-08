const express=require('express');
const app=express();
const path=require('path');
const Chat=require('./models/chat.js')
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
const methodOverride=require('method-override');
app.use(methodOverride("_method"));
const mongoose = require('mongoose');

main().then(()=>{
    console.log("Connection Successful")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.listen(8080,()=>{
    console.log(`Server is running on port 8080`);
});

app.get("/",(req,res)=>{
    res.send("Home route");
})

//Index Route
app.get('/chats',async(req,res)=>{
    let allChats=await Chat.find();
    // console.log(allChats);
    res.render("index.ejs",{allChats});
})

// New Chat Route
app.get('/chats/new',(req,res)=>{
    res.render('new.ejs');
})

// Create Route
app.post('/chats',(req,res)=>{
    let {from,msg,to}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        msg:msg,
        createdAt:new Date()
    });
    newChat.save().then((res)=>{console.log(res)}).catch(err=>{console.log(err)});
    res.redirect('/chats');
})

//Edit Route
app.get('/chats/:id/edit', async(req,res)=>{
    let {id}=req.params;
    let chatt= await Chat.findById(id);
    res.render('edit.ejs',{chatt});
})

// Update Route
app.put('/chats/:id',async(req,res)=>{
    let {id}=req.params;
    let newMsg=req.body.msg;
    console.log(newMsg);
    let chatt= await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidators:true,new:true});
    res.redirect('/chats');
})

//Delete 
app.delete('/chats/:id',async(req,res)=>{
    let {id}=req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect('/chats');
})