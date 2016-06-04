var express = require('express');
var fs = require('fs');

var router = express.Router();

router.get('/:id', function (req, res) {
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
                res.status(200).json({id:items[i].id,barcode:items[i].barcode,name:items[i].name,
                    unit:items[i].unit,price:items[i].price});
                break;
            }
        }
    });
});

module.exports = router;

