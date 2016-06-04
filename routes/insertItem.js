var express = require('express');

var router = express.Router();
var fs = require('fs');
var nextId = 0;

router.post('/', function (req, res) {
    nextId++;
    fs.readFile('./fixtures.json', 'UTF-8', function (err, data) {
        var items = JSON.parse(data);
        var isContained = false;
        
        if (items.length === 0) {
            items.push({
                id: 1, barcode: req.body.barcode,
                name: req.body.name, unit: req.body.unit, price: req.body.price, nextId: nextId+1
            });
        } else {
            items.push({
                id: nextId, barcode: req.body.barcode,
                name: req.body.name, unit: req.body.unit, price: req.body.price, nextId: nextId+1
            });

        }

        if((typeof req.body.barcode == "string") && (typeof req.body.name == "string")
            &&  (typeof req.body.unit == "string") && (typeof req.body.price == "number")){
            isContained = true;
        }

        fs.writeFile('./fixtures.json', JSON.stringify(items), function (err, data) {
            if(isContained){
                res.status(201).json({
                    id:nextId,
                    barcode: req.body.barcode, name: req.body.name,
                    unit: req.body.unit, price: req.body.price
                });
            }else{
                res.status(401).send("")
            }

        });
    });
});

module.exports = router;


