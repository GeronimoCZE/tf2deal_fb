const express = require('express');
const app = express();
const cors = require('cors');
const path = require("path");
const rateLimit = require('express-rate-limit')

app.set('views', path.join(__dirname, '/view'));
app.use('/public',express.static(path.join(__dirname,'static')));
app.use(express.static(__dirname + '/public'));
app.set('view engine','ejs');
app.set('trust proxy', true)

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({
  extended: true
})); // to support URL-encoded bodies

app.use(cors({
  origin: [`http://tf2deal.com`, `https://tf2deal.com/`],
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}))

const reqLimiter = rateLimit({
        windowMs: 10 * 60 * 1000, 
        max: 60, 
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    })

const offlineTimer = Date.now();

app.get('/', reqLimiter, (req, res) => {
  res.render('index', {offlineTimer})
});

// Start the server
app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});