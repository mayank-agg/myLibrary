# myLibrary
Description: 

This project is based on a university library in which there are different classes of users: students, teachers, and librarians. Each class of users has different sets of permissions and views. The idea is to build a web application called myLibrary which will allow users to use features of a virtual library by accessing the database allowing students and teachers to check out books from the database and librarians to check in books when they are returned. Users will be able to search for books and be able to filter through the library using the attributes pertaining to the books such as genre, author, publisher, and year. Textbooks will have the same attributes as books, but will include a course ID as an attribute. Librarians will be able to add new books or delete books off the database if they have gone missing or been damaged, and update the count if new copies have been added. Additional information about the application is provided below. 

Domain:

A university library was chosen as our domain because a library database is a robust example of a relational database. It allows for multiple different sets of entities or relationships   which gives us the freedom to implement whichever we want.

Platform:

Front-end: HTML/CSS + Javascript
HTML/CSS will be used mainly for formatting and styling web pages while Javascript will be used to make the app interactive. 

Back-end: Node.js 

Node.js is a server side scripting language written in Javascript used mainly due to its fast server side solution and flexibility. Since Javascript is used for client-side, using Node will allow us to unify our web application development around a single programming language, rather than different languages for server side and client side scripts. 

Database: MySQL (Relational Database)

MySQL is chosen because it offers a set of advanced features including platform independency which allows us to use it with Node. In addition, MySQL supports SQL which is easy to implement as it is a simple high-level, strongly typed language.

Assumptions: 
All ISBNs are unique 
All student/teacher/librarian IDs are unique
Multiple copies of a single book are allowed 
Students can only have 1 book checked out at a given time
Students cannot check out textbooks, but teachers can check out textbooks

