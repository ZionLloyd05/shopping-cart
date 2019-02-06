var Product = require('../models/product');

var mongoose = require('mongoose');

//connecting to mongoose
mongoose.connect('mongodb://localhost:27017/shopping');

var products = [
    new Product({
        imagePath: 'https://compass-ssl.xbox.com/assets/0f/e2/0fe2dc18-a88e-46e8-aac7-b57215b9bc81.jpg?n=E3-Games-Hub-2017_Content-Placement-0_Sea-of-Thieves_740x417.jpg',
        title: 'Gorthic Video Game',
        description: 'So cool a game!!',
        price: 135
    }),
    new Product({
        imagePath: 'https://compass-ssl.xbox.com/assets/7c/a1/7ca1528b-b69e-42f4-8c3c-ec8c166cb5f6.jpg?n=Windows-10-Games_Content-Placement-0_AOEDE_740x417.jpg',
        title: 'Age of Empires',
        description: 'Build and Conquer!!',
        price: 255
    }),
    new Product({
        imagePath: 'https://compass-ssl.xbox.com/assets/e0/10/e010db2d-4548-4cee-a8b2-1c2b36d6b7bb.jpg?n=E3-Games-Hub-2017_Content-Placement-0_FM7_740x417.jpg',
        title: 'Speed of Light',
        description: 'Meet me like you can',
        price: 300
    }),
    new Product({
        imagePath: 'https://compass-ssl.xbox.com/assets/00/d7/00d7907e-6141-4bb2-abb1-f6d37964b2fa.jpg?n=Windows-10_2-3-Col-0_Cuphead_740x417.jpg',
        title: 'Cup Head Brothers',
        description: 'Lovely Adventure in Gorgi',
        price: 199
    }),
    new Product({
        imagePath: 'https://compass-ssl.xbox.com/assets/ba/a5/baa5ee73-4145-489b-b1f6-78a6c643ecbe.jpg?n=Windows-10-Games_Content-Placement-0_SLT_740x417.jpg',
        title: 'Super Lucky',
        description: 'Yay, best game ever!!',
        price: 230
    }),
    new Product({
        imagePath: 'https://compass-ssl.xbox.com/assets/90/7b/907b947c-4c4d-4ae1-a2f6-620d1d843a52.jpg?n=XPA_2-3-Col-0_Halo-Wars-2_740x417.jpg',
        title: 'Halo Wars',
        description: 'Wow, fun halo',
        price: 500
    })
];

var done = 0;
for(var i = 0; i < products.length; i++){
    products[i].save(function(err, result){
        done++;
        if(done === products.length){
            exit();
        }
    });
    
}

function exit(){
    mongoose.disconnect();
}