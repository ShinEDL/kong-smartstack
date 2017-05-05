import http from 'http';
import express from 'express';
import 'babel-polyfill';


http.globalAgent.maxSockets = Infinity ;
let app = express();
app.server = http.createServer(app);

// health check api
app.get('/health',(req,res) => {
    console.log('health');
    res.json(new Payload());
})

// catch 404 and forward to error handler
app.use( (req, res, next) => {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use( (err, req, res, next) => {
        res.status(err.status || 500);
        res.json( new Payload ({ error: err }, err.status || 500 , err.message));
    });
}

// production error handler
// no stacktraces leaked to user
app.use( (err, req, res, next) => {
    res.status(err.status || 500);
    res.json( new Payload ({ error: {} }, err.status || 500 , err.message));
});

//uncaughtException
process.on ('uncaughtException' , (err) => {
    console.error(`Caught exception: ${err}`) ;
});

app.server.listen(process.env.PORT || 3001);

console.log(`Started on port ${app.server.address().port}`);

export default app;