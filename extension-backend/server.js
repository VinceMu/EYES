const express = require('express')
const app = express()
var mongo = require('./mongohandler')

app.get('/', (req, res)=>{
    res.send('Hello World!')
});
//TODO: we forward the posted data to mongodb. 
app.post('/send', function (req, res) {
    res.send('POST request to the homepage')
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))
