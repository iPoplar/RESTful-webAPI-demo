var express = require('express');

var router = express.Router();
var fs = require('fs');

router.put('/:id', function (req, res) {
    var id = req.params.id;

    fs.readFile('./fixtures.json', 'UTF-8', function (err, data) {
        var items = JSON.parse(data);
        var isContained = false;

        items.forEach(function (element) {
            if (element.id === parseInt(id))
                isContained = true;
        });

        if (isContained === false) {
            res.status(404).send("");
            return;
        }

        for (var i = 0; i < items.length; i++) {
            if (items[i].id === parseInt(id)) {
                items[i] = {
                    id: items[i].id, barcode: req.body.barcode,
                    name: req.body.name, unit: req.body.unit, price: req.body.price, nextId: items[i].nextId
                };
                fs.writeFile('./fixtures.json', JSON.stringify(items), function (err, data){
                    res.status(201).json({ id: items[i].id, barcode: req.body.barcode,
                        name: req.body.name, unit: req.body.unit, price: req.body.price, nextId: items[i].nextId});
                });
                break;
            }
        }
    });
});

module.exports = router;


