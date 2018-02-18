var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var db = mongojs('mongodb://russ:russ@ds225608.mlab.com:25608/myeventlist_russ',['Events']);

//Get All Events
router.get('/events', function(req, res, next){
    db.Events.find(function(err, events){
        if(err){
            res.send(err);
        }
        console.log(events);
        res.json(events);
    })
});

//Get Single Event
router.get('/event/:id', function(req, res, next){
    db.Events.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, event){
        if(err){
            res.send(err);
        }
        console.log(event);
        res.json(event);
    })
});

//Save Event
router.post('/event', function(req, res, next){
    var event = req.body;
    if(!event.title || !(event.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.events.save(event, function(err, event){
            if(err){
                res.send(err);
            }
            res.json(event);
        })
    }    
});

//Delete Event
router.delete('/event:id', function(req, res, next){
        db.events.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, event){
            if(err){
                res.send(err);
            }
            res.json(event);
        });
});

//Update Event
router.put('/event:id', function(req, res, next){
    var event = req.body;
    var updEvent = {};

    if(event.isDone){
       updEvent.isDone = event.isDone;
    } 

    if(event.title){
        upEvent.title = event.title;
    }

    if(!updEvent){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.events.update({id: mongojs.ObjectId(req.params.id)}, updEvent, {}, function(err, event){
            if(err){
                res.send(err);
            }
            res.json(event);
        })  
    }
});

module.exports = router;