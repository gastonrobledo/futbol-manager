var gm = require('gm').subClass({imageMagick: true}),
    _ = require('lodash'),
    mongoose = require('mongoose'),
    Async = require('async'),
    processor = require('../utils/processor'),
    //Models
    Template = mongoose.model('PDFTemplate'),
    Fields = mongoose.model('PDFFields'),
    TemplateItem = mongoose.model('PDFTemplateItem');

require('gm-buffer');


// function to encode file data to base64 encoded string
function base64_encode(data) {
    // convert binary data to base64 encoded string
    return new Buffer(data, 'binary').toString('base64');
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
    // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
    var bitmap = new Buffer(base64str, 'base64');
    return bitmap;
}


var oneSocket2RuleThemAll = null;

exports.setSocket = function (socket) {
    socket.on('connection', function (sckt) {
        console.log("socket connected:", sckt.id);
    });
    socket.emit('process', {message: "Init Process..."});
    oneSocket2RuleThemAll = socket;
};

exports.get_templates = function (req, res) {
    Template.find({}, function (err, results) {
        if (err) {
            res.send(500, 'Error getting templates');
        } else {
            res.send(200, results);
        }
    });
};

exports.save_field = function (req, res) {
    Template.findOne({"_id": req.params.template_id}, function (err, template) {
        if (err) {
            res.send(500, 'Error getting templates');
        } else {
            var field = new Fields({
                name: req.body.name,
                template: template._id
            });
            field.save(function(err, result){
                if(err){
                    res.send(500, 'Error saving field');
                }else{
                    res.send(201, field);
                }
            });
        }
    });
};

exports.get_one_template = function (req, res) {
    Template.findOne({'_id': req.params.id}, function (err, result) {
        if (err) {
            res.send(500, 'Error getting templates');
        } else {
            TemplateItem.find({template: result.id}, function (err, items) {
                var obj = result.toObject({getters: true, virtuals: false});
                obj.selections = items;
                res.send(200, obj);
            });
        }
    });
};

exports.get_fields = function (req, res) {
    Fields.find({'template': req.params.template_id}, function (err, results) {
        if (err) {
            res.send(500, 'Error getting fields');
        } else {
            res.send(200, results);
        }
    });
};

exports.process_template = function (req, res) {
    var file = req.files.file;
    gm(file.path).setFormat('jpeg').buffer(function (err, stdout, stderr) {
        if (!err) {
            var data = base64_encode(stdout);
            res.send(200, data);
        }
    });
};

exports.save_template_data = function (req, res) {

    var addItems = function (id, selections) {

        var iterateItems = function (items) {
            _.forEach(items, function (item, key) {
                var item_extended = _.extend(item, {template: id});
                var new_ti = new TemplateItem(item_extended);
                new_ti.save();
            });
        };
        Async.series([
            function (callback) {
                TemplateItem.find({"template": id}).remove(callback).exec();
            },
            function (callback) {
                iterateItems(selections);
                callback();
            }
        ]);


    };

    var template = null;
    if (req.body._id) {
        //editing
        template = Template.update({"_id": req.body._id}, {
            name: req.body.name,
            image: req.body.image,
            width: req.body.width,
            height: req.body.height
        }, {multi: false}, function (err, affected_rows) {
            if (affected_rows) {
                addItems(req.body._id, req.body.selections);
            }
        });
        res.send(200, {});
    } else {
        //new item
        template = new Template({
            name: req.body.name,
            image: req.body.image,
            width: req.body.width,
            height: req.body.height
        });
        template.save(function (err, obj) {
            addItems(obj.id, req.body.selections);
            res.send(201, obj);
        });
    }

};

exports.process = function (req, res) {
    var file = req.files.file;
    var data = req.body.data;

    var isImage = file.type.indexOf('image') !== -1;

    Template.findOne({'_id': data}, function (err, template) {

        TemplateItem.find({template: template._id}, function (err, items) {
            if (err) res.send(500, err.message);

            Fields.populate(items, {path: 'field'}, function (err, selections) {
                if (err) res.send(500, err.message);

                if (!isImage) {
                    processor.processPDF(template, selections, file.path, function(err, results){
                        if(err) throw  err;
                        res.send(200, results);
                    });
                } else {
                    processor.processImage(template, selections, file.path, function(err, results){
                        if(err) throw  err;
                        res.send(200, results);
                    });
                }
            });
        });
    });
};