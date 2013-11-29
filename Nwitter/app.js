var express = require('express');
var app = express();
app.listen(8000);

//Routes

var nweets = [];

app.get('/', function(req, res){
    res.render('index.jade', {
        'title' : 'Chirpie',
        'header' : 'Welcome to Chirpie',
        'nweets' : nweets,
        stylesheets: ['public/style.css']
    });
});

app.post('/send', express.bodyParser(), function(req, res) {
    if (req.body && req.body.nweet) {
        nweets.push(req.body.nweet);

        if (acceptsHtml(req.headers['accept'])) {
            res.redirect(302,'/');
        } else {
            res.send({status:"ok", message:"Nweet received"})
        }
    } else {
        //no nweet?
        res.send({status:"nok", message:"No nweet received"});
    }
});

app.get('/nweets', function(req, res) {
    res.send(nweets);
});

function acceptsHtml(header) {
    if (header) {
        var accepts = header.split(',');
        for (i=0;i<accepts.length;i+=0) {
            if (accepts[i] === 'text/html') {
                return true
            }
        }
    }
    return false;
}


