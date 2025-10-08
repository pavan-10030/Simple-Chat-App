const mongoose=require('mongoose');
const chat=require('./models/chat.js');
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}
main()
.then(()=>{
    console.log('Connection Successful');
}).catch(err=>{
    console.log(err);
})

let allChats=[
    {
        from:"pavan",
        to:"aditya",
        msg:"Send me the assignment problems",
        createdAt:new Date()
    },
    {
        from:"pavan",
        to:"aditya",
        msg:"Send me the assignment problems",
        createdAt:new Date()
    },
    {
        from:"rahul",
        to:"virat",
        msg:"congratulations",
        createdAt:new Date()
    },
    {
        from:"rohit",
        to:"tanya",
        msg:"Hey!",
        createdAt:new Date()
    },
    {
        from:"aditya",
        to:"karthik",
        msg:"Lets meet today",
        createdAt:new Date()
    }
];

chat.insertMany(allChats).then((res)=>{
    console.log(res);
})