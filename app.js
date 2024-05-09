// const express = require('express');
// const app = express();
// const PORT = 3000;
//
// app.use(express.static('public'));
//
// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });
//
// app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const corsOptions ={
    origin:'*',
    credentials:true,
}
app.use(cors(corsOptions)) // Use this after the variable declaration

app.use(express.static(path.join(__dirname, 'public'), {
    extensions: ['html']
}));

app.get('/*', function(request, response) {
    response.sendFile(path.join(__dirname, 'index.html'));
});

// app.get('/stylesheet.css', function(req, res) {
//     res.sendFile(__dirname + "/stylesheet.css");
// });
//
// app.get('/script.js', function(req, res) {
//     res.sendFile(__dirname + "/script.js");
// });

app.use(express.static('public'));

app.listen(port);
console.log('Server started at http://localhost:' + port)