# myLibrary
Description: 

This project is based on a university library in which there are different classes of users: student, teachers and librarians. Each class of users have different permissions and has access to different tables/functions. The virtual library allows students and teachers to search up different books based on their ISBN, publisher, title, author and genre. The display page will either show a table of just the names of the books or will include any additional information as well. Additionally, teachers when searching will be able to view any available textbooks whereas librarians are able to view a list of all books/workbooks/laptops. 


Domain:

A university library was chosen as our domain because a library database is a robust example of a relational database. It allows for multiple different sets of entities or relationships   which gives us the freedom to implement whichever we want.

Platform:

Front-end: HTML/CSS + Javascript:
HTML/CSS will be used mainly for formatting and styling web pages while Javascript will be used to make the app interactive. 

Back-end: Node.js:

Node.js is a server side scripting language written in Javascript used mainly due to its fast server side solution and flexibility. Since Javascript is used for client-side, using Node will allow us to unify our web application development around a single programming language, rather than different languages for server side and client side scripts. 

Database: MySQL (Relational Database):

MySQL is chosen because it offers a set of advanced features including platform independency which allows us to use it with Node. In addition, MySQL supports SQL which is easy to implement as it is a simple high-level, strongly typed language.

Assumptions: 
All ISBNs are unique 
All student/teacher/librarian IDs are unique
Multiple copies of a single book are allowed 
Students can only have 1 book checked out at a given time
Students cannot check out textbooks, but teachers can check out textbooks

