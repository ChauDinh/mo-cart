# Convert PSD to HTML

Converting a mock e-commerce PSD design into HTML, CSS.

### Structures, Planning

* Use a mock E-commerce Photoshop design
* Use Bootstrap to make the responsive of the site
* Use Bootstrap Carousel
* Use NodeJS for the server

<hr>

### Static Web Server & Dynamic Web Server

#### Static web server

* Easy to build
* Cheap to host (HTML, CSS)
* Fixed content

#### Dynamic web server

* Little hard to build
* Costly than static server host
* Easily edit content by their own

#### Frameworks for dynamic web server 

* PHP: Laravel, Symfony, CakePHP, etc.
* Java: Spring, Play Framework, etc.
* Python: Django, Flask, etc.
* Ruby: Rails
* JavaScript: ExpressJS, SailsJS, MeteorJS, KoaJS, etc.

<hr>

### Single Page Application (SPA) and Multipages Application

#### Single Page Application

* Content rendered in the front-end
* No page reloading
* Interact with data via some JSON API


#### Multipages Application

* Receive a request from client and response a HTML
* Use page reloading

<hr>

### Creating form to search data

* Use form action
* Use GET method

Create a search form (pug)
```pug
form(action="/users/search", method="GET")
 input(type="text", name="q")
 button Search
```
Then add logic for searching the typed text
```js
app.get("/users/search", (req, res) => {
 let q = req.query.q;
 let matchedUsers = users.filter(user => {
  return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
 })
 
 res.render('users/index', {
  users: matchedUsers
 })
});
```
<hr>

### Creating form to add data

* Use form action
* Use POST method
* Use req.body

Create a form 
```pug
form(action="/users/create", method="POST")
 label Name
 input(type="text", name="name")
 button Create
```

Then use body-parser middleware to retreive POST query parameters
##### Installation
```
npm install body-parser --save
```
##### Write middleware
```js
const bodyParser = require("body-parser");
...
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
...
app.post("/users/create", (req, res) => {
 users.push(req.body);
 res.redirect("/users");
});
```
