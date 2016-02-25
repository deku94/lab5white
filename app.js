
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var about = require('./routes/about');
var soundtest = require('./routes/soundtest');
//var addEnvironment = require('./routes/addEnvironment');
var equipment = require('./routes/equipment');
var environment = require('./routes/environment');
var community = require('./routes/community');
var EditEnv=require('./routes/EditEnv');
//var toAddEquipment=require('./routes/toAddEquipment');
var EditEquip=require('./routes/EditEquip');
// Example route
// var user = require('./routes/user');

var app = express();

// Custom handlebars helpers
var handlebars = handlebars.create({
    'helpers': {
        'compare': function (lvalue, operator, rvalue, options) {

            var operators, result;
            
            if (arguments.length < 3) {
                throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
            }
            
            if (options === undefined) {
                options = rvalue;
                rvalue = operator;
                operator = "===";
            }
            
            operators = {
                '==': function (l, r) { return l == r; },
                '===': function (l, r) { return l === r; },
                '!=': function (l, r) { return l != r; },
                '!==': function (l, r) { return l !== r; },
                '<': function (l, r) { return l < r; },
                '>': function (l, r) { return l > r; },
                '<=': function (l, r) { return l <= r; },
                '>=': function (l, r) { return l >= r; },
                'typeof': function (l, r) { return typeof l == r; }
            };
            
            if (!operators[operator]) {
                throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
            }
            
            result = operators[operator](lvalue, rvalue);
            
            if (result) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        }
    }
})

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', index.view);
app.get('/equipment', equipment.view);
app.get('/about', about.view);
app.get('/community', community.view);
app.get('/environment', environment.view);
app.get('/soundtest', soundtest.view);

app.get('/soundtest/updateJSON/:value',soundtest.updateJSON);

app.get('/addEnv', EditEnv.addEnv);
app.get('/addingEnv',EditEnv.addingEnv);
app.get('/environment/view/:id',EditEnv.view);
app.get('/environment/edit/:idnum',EditEnv.edit);
app.get('/EdittingEnv/:original',EditEnv.editting);
app.get('/environment/pickEnv',EditEnv.pickEnv);


app.get('/AddEquip',EditEquip.addEquipment);
app.get('/AddingEquip',EditEquip.addingEquip);
app.get('/equipment/view/:id',EditEquip.view);
app.get('/equipment/edit/:id',EditEquip.editpage);
app.get('/EdittingEquipment/:id',EditEquip.editting);

// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
