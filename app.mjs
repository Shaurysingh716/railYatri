// Importing the Node Libararies
import express  from "express";
import path from "path";
const app = express();
const port = 8000;

import { dirname } from 'path';
import { fileURLToPath } from 'url';

import mongoose from "mongoose";
mongoose.connect("mongodb://127.0.0.1:27017/testdb",{
    useNewUrlParser:true, 
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connection Succeded");
}).catch((err)=>{
    console.log(err);
});

const userInfoSchema = new mongoose.Schema({
    PhoneNo: Number,
    mailId: String,
    password:String
});

const Userinfo = new mongoose.model('UserInfoData',userInfoSchema);

// Serving the static files of the document
app.use('/static',express.static('static'));

// Using parsers 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookieParser());

app.set('view engine', 'pug');
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set('views', path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    res.status(200).render('index.pug');
});

app.post('/',(req,res)=>{
    var body_ = new Userinfo(req.body);
    // var id_ = req.body.UserId
    body_.save().then(()=>{
        console.log('Item Saved To Database');
        res.status(200).redirect('/trains');
    });
});

app.get('/trains',(req,res)=>{
    res.status(200).render('trains.pug');
});

app.get('/favicon.ico', (req, res) => {
    res.status(204).end();
});

import updateExcelFile from "./updateDatabase.mjs";
app.get('/:databaseCode',(req,res)=>{
    const databaseCode = req.params.databaseCode;
    console.log('databaseCode: ', databaseCode);
    res.render('checkOut.pug',{databaseCode});
    app.post('/:databaseCode',async (req,res)=>{
        // const databaseCode = req.params.databaseCode;
        console.log("database code is:",databaseCode);
        console.log(req.body);
        await updateExcelFile('../Project API/TrainsData.xlsx',databaseCode,req.body.Tickets);
        res.send("Booked");
    });
});

app.listen(port,()=>{
    console.log(`Application Is Running At 127.0.0.1 at Port ${port}`);
});