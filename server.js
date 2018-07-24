//NOTE: Html forms: 1) Homepage.html (DIVIDED INTO HEAD, TAIL, FORM) and form with action= '/login' and a link/button: signup to "/register"
                 // 2) register: just replace login form with register form. a form to sign up (action= "addMe"): must contain 3 text fields: id, password, fname and a radio button titled Student, Teacher, Librarian (name= status)
                    //2a) Students and Teachers have an extra attribute called borrowedBooks which will contain ISBN of the book borrowed.
                 // 3) student.html, teacher. html, librarian.html (served after checking status after succesfull login)
                    //3a) : Search present in each user class:
                          //action= "/search",
                          //search query: name= searchVal
                          //dropdown: name= dropDownVal (options: attributes of book table)
                          //search query: name= searchVal (value of the drop down selection)
                          //checkboxes: name="colNames" (default: none) (used for projection. Options= all attributes of books): only those will be displayed who are checked.
                              //does it return an array of values? (implemented as an array)
                    //3b) : Only on librarian page:
                              // Option to view all checkedout books: link redirected to "/allCheckedOut"
                              // Option to view all the workbooks (request to '/allWorkBooks')
                              // Option to view students/teachers who have checked out all the books. (request to '/allcheckouters')
                          //Only on Students and Teachers:
                              // After search query, result a page with a check box against each result, and a final "check-out" button. (A form with action: '/checkout', name of value: mybooks)
                              //Check-in : Results a page with all checked out books of that user. Can check in by using a check-box against each book, and clicking on a button called "check-in"
                              //This is a form with action= '/checkmein', name= "checkinthese"
                              // an option to delete account (remove user from db);
                          //Only on Teachers :
                              //a button sending a get request to myworkbooks that lists all the workbooks of that teacher.

                  // 4) Tables: Books(bookISBN,..., count), Student(fname, id, password), Teacher, Librarian, checkedOutBooks(bookISBN,id), workbooks(book, teacherid)

//NOTE: Queries:
    //1) Projection Query: Done using checkboxes on student, teacher, librarian page along side search query.
    //2) Selection Query: Done using drop down menu present in each interface of users.
    //3) Join: checkedout books joined with all the users. (by defualt)

var express= require('express');
var http= require('http');
var session= require('express-session');
var flash= require('express-flash');
var fs= require('fs');
var app= express();

var port= 8080;
var server= http.createServer(app).listen(port);

app.use(flash());
app.use(express.static("."));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//enabling sessions
app.use(session({
  name: "session",
  secret: "players",
  maxAge: 1000*60*(1000)     //10 MINUTES OF SESSION TIME.
}));

function isLoggedIn(req, res, next)     //middleware
{
  if(req.session.user != null)
  {
    next();
  }
  else
  {
    req.flash('error', 'Please Login first');
    res.redirect('/')
  }
}

var head= `<!DOCTYPE html>
<html>
<head>
<title> myLibrary | Homepage </title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<link rel= "stylesheet" href='./homepage.css'>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>`

var body= `<body>
  <nav class="navbar navbar-inverse navbar-static-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <a class="navbar-brand" href="#" style="border-right: 1px solid white;">Welcome to <span style="color: white">myLibrary</span></a>
    </div>
    <ul class="nav navbar-nav navbar-right">
     <li><a href="/signup.html"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
   </ul>
   </nav>`
//serving homepage: must contain a way to login (post request to login), and a link to sign up which sends a get request to "/register".
app.get('/', function(req, res, next)
{
  var errorMessage= req.flash('error');
  var successRegister= req.flash('success');
  var formHead= `<p>`+errorMessage+`</p>`+`<p>`+successRegister+`</p>`
  var form= `<div style="margin: 10px"><h4> Please login first </h4><br> <form action= "/loginMe" method="POST">
  <label for="userid"><b> User id: </b></label>
  <input type="text" name= "id" id= "userid"><br><br>
  <label for="fname"><b> First Name: </b></label>
  <input type= "text" name= "fname" id= "fname"><br><br>
  <label for="password"><b> Password: </b></label>
  <input type= "password" name= "password" id= "password"><br><br>
  <input type="submit" value="Login" id= "submit">
  </form></div>
 </body>
</html>`
  res.write(head+body+formHead+form);
  res.end();
});

//user has clicked on "login" on homepage (form action= '/login')
app.post('/loginMe', function(req, res, next)
{
  //check database to see if user exists.
  console.log("here");
  var user= null;
  //users table: 3 tables with 2 columns each. : Student(Id, Passowrd), Teacher(id, password), Librarian(ID, password)
  var myid= `${req.body.id}`;
  //select from the mystatus table
//  db query- initialize user with person with given credentials= select * from mystatus where id= myid. (find user with the id and then take the full tuple and initialize user with that tuple.)

  if(user == null)   //id doesnt exist.
  {
    //send them back to login.
    req.flash('error', 'No user found. Please register. ');
    res.redirect('/');     //make a get request to login.
  }
  else    //user found
  {
    //serve status oriented html page.
    req.session.user= user;   //user is an object with properties: mystatus, myid, mypassword
    if(mystatus== "Student")
    {
      res.redirect('/student');
    }
    else if(mystatus== "Teacher")
    {
      res.redirect('/teacher');
    }
    else
    {
      res.redirect('/librarian');
    }
  }
});

//user wants to sign up.
app.get('/register', function(req, res, next)
{
  var idExists= req.flash('error');
  var newForm= `Name: <br><input type="text" name="fname"><br>ID:<br><input type="text" name="ID"<br>Role:<br><input type="radio" name="status" value="student" checked> Student <br><input type="radio" name="status" value="teacher"> Teacher <br><input type="radio" name="status" value="librarian"> Librarian <br>Password:<br><input type="password" name="password"><br><br><input type="submit" value="Submit">` //write register form here. (Action= addMe)
  var toServe= head+`<p id="error" style="color: red">`+usernameExists+`</p>`+body+newForm
  res.write(toServe);
  res.end();
});

//user has filled the form and has submitted: form contains: id, password, status
app.post('/addMe', function(req, res, next)
{
  //add id, password to appropriate status table. Ex: if status= "teacher", add id, password, fname to teacher table.
  var fname= `${req.body.fname}`;
  var valueId= `${req.body.id}`;
  var valuePass= `${req.body.password}`;

  //search for valueid in database.
  //db query- var found= search valueid in db (count)
  if(found > 0)
  {
    req.flash('This ID is talen. Please choose a different one. ');
    res.redirect('/register');
  }
  else
  {
    var stat= `${req.body.status}`;
    if(stat== "Student")
    {
      //db query- insert into student table
    }
    else if(stat=="Teacher")
    {
      //db query- insert into teacher table
    }
    else
    {
      //db query- insert into Librarian table.
    }
    req.flash('success', 'Thank you for registering. Please login');
    res.redirect('/');
  }
});

app.get('/student',isLoggedIn, function(req, res, next)
{
  var message= req.flash('success');  //on succesfully checking in/out books.
  //append this message to html page.

});

app.get('/teacher',isLoggedIn, function(req, res, next)
{
  var message= req.flash('success');      //on succesfully checking in/out books.
  //append this message to html page.

});

app.get('/librarian',isLoggedIn, function(req, res, next)
{
  var message= req.flash('error');    //(on no users found for division query)
//append this message to html page.

});

app.post('/search',isLoggedIn, function(req, res, next)
{
  var searchedFor= `${req.body.searchVal}`;
  var dropDownVal= `${req.body.dropDownVal}`;
  var colArray= `${req.body.colNames}`;     //all columns to be displayed
  var searchedResults;      //INITIALIZED IN THE NEXT STEP.

  if(colArray== [])
  {
    //NOTE: In all the cases, just display those books whose count != 0. (that is they have not been checked out)
  //2) db query: Selection query- select * from books where dropDownVal (column ex: Author)= searchedFor (value of that column)
  //take the results and append them to html.
  }
  else
  {
    //1) db query: Projection query- select colNames from books where dropDownVal (column ex: Author)= searchedFor (value of that column)
    ////take the results and append them to html.
  }
  //Now, add one check-out button and a selection box against each search result. Clicking on check-out would send the names of the books to be checked out by users. This is a form with action= '/checkout'
  var toServe= head + body + searchedResults;
  res.write(toServe);
  res.end();
});

app.get('/allCheckedOut',isLoggedIn, function(req, res, next)
{
  var searchedResults;   //take the results and append them to html.
  //3) db query: Join- select * from checkedOutBooks (if such a table exists) (join with students, teachers) (using id as joiining condition (present in all the tables))
  var toServe= head + body + searchedResults;
  res.write(toServe);
  res.end();
});

app.get('/allWorkBooks', isLoggedIn, function(req, res, next)
{
  //db query: select * from workbooks
})

app.post('/checkout',isLoggedIn, function(req, res, next)
{
  //have an array of books that a user has selected
  var arrayBooks= `${req.body.mybooks}`;
  //db query: 6) Update- update the count of books to 0 where books= all the books in the array.
  //if we have a table for checkedoutBooks, then add these books to that table.
  var currStatus= `${req.session.user.mystatus}`;
  if(mystatus == 'Student')
  {
    req.flash('success', "Succesfully checked out");
    res.redirect('/student');
  }
  else
  {
    req.flash('success', "Succesfully checked out");
    res.redirect('/teacher');
  }

});

app.get('/checkin',isLoggedIn, function(req, res, next)
{
  var currId= `${req.session.user.myid}`
//db query: 4) Aggregation query: var allMyBooks= select books from checkedoutbooks group by currId
  var bookHtml= ``;     //append each book from allMyBooks into the html. (like checkout, have a check box against each book and a final checkin button): A form with action= '/checkmein', name= "checkinthese"
  var toServe= head + body + bookHtml;
  res.write(toServe);
  res.end();
});

app.post('/checkmein', isLoggedIn, function(req, res, next)
{
  var toCheckIn= `${req.body.checkinthese}`;      //an array of all books that the user has decided to check-in
  //db query: find these books, and update their count to 1.
  //delete these books from checkedOutBooks.
  var currStatus= `${req.session.user.mystatus}`;
  if(currStatus == "Student")
  {
    req.flash('success', 'Succesfully checked-in the books')
    res.redirect('/student');
  }
  else
  {
    req.flash('success', 'Succesfully checked-in the books')
    res.redirect('/teacher');
  }
});

app.get('/deleteme', isLoggedIn, function(req, res, next)
{
  var toDel= req.session.user;
  var userid= toDel.myid;
  var userstatus= toDel.mystatus;
  //find the id and remove it from the db (from the status table);
  //7) db query: delete on cascade- if status= teacher, then on cascade (workbooks are also deleted related to that teacher.)

  req.flash('success', "Successfully deleted your account");
  res.redirect('/');
});

app.get('/myworkbooks', isLoggedIn, function(req, res, next)
{
  var currid= `${req.session.user.myid}`;
  //db query: find all the books group by currid from workbooks table
//  var allMyWorkBooks= all books from the teacher. (append this to html and serve)
//
  var toServe= head + body + allMyWorkBooks
  res.write(toServe);
  res.end();
});

app.get('/allcheckouters', isLoggedIn, function(req, res, next)
{
  //var allusers= db query: 8) Division: find ids and names from students, teachers who have checked out all the books. (can be max 1)
  if(allUsers > 0)
  {
  //  var htmlpage= append the user to html and serve the page.
    var toServe= head + body + htmlpage;
    res.write(toServe);
    res.end();
  }
  else
  {
    req.flash('error', "No such users found");
    res.redirect('/librarian')
  }
});
