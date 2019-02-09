const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

app.set('views', './public/views');
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
 res.render('index');
});

app.listen(port, () => console.log(`The app is listening on port ${port}`));

