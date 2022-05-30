const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017/";
const app = express();
const fs = require('fs');
const PDFDocument = require('pdfkit');
const blobStream = require('blob-stream');
const { doesNotMatch } = require("assert");
const doc = new PDFDocument;
app.use(cors());
app.use(bodyparser.json());
app.get('/users', function (request, response) {
    var data = "jjf";
    const p = parseInt(request.query.pID);
    // console.log(p);
    // console.log("YEEPPP");
    MongoClient.connect(url, function (err, db) {
        if (err) { throw err; }
        var dbo = db.db("kidneyhealth");
        // console.log("*&"+p);
        var query = { pid: p };
        // console.log(query);
        //console.log("pp");
        dbo.collection("kh").find(query).toArray(function (err, result) {
            if (err) { throw err; }
           console.log("KL");
           console.log(result);
            data = JSON.stringify(result);
            db.close();
            doc.pipe(fs.createWriteStream('output.pdf'));
            // doc.pipe(response);
            doc.fontSize(30).font('Helvetica-Bold').text('KIDNEY HEALTH CENTER',{
                align:'center',
            });
            doc.moveDown(3);
            //console.log(result[0].name);
            doc.font('Courier-Oblique');
            let name=result[0].name;
            let address=result[0].address;
            let phoneNumber=result[0].phoneNumber;
            let res=result[0].result;
            doc.moveTo(50,200).lineTo(600,200).lineWidth(10).stroke();
            doc.fontSize(15).text('Name',100,230);
            doc.fontSize(15).text(name,400,230);
            doc.fontSize(15).text('Address',100,270);
            doc.fontSize(13).text(address,350,270);
            doc.fontSize(15).text('Phone-Number',100,310);
            doc.fontSize(15).text(phoneNumber,400,310);
            doc.moveTo(50,350).lineTo(600,350).lineWidth(10).stroke();
            doc.fontSize(15).text('Result',100,390);
            doc.fontSize(15).text(res,350,390);
            const url="../ultrasonic_images/"+result[0].pid+".jpg";
            doc.image(url,100,460,{width:400,height:300});
            doc.end();
        });
    });
});
app.listen(3000, () => {
    console.log("Server listening at port 3000.....");
});