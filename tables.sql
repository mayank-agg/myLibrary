CREATE TABLE Users(
	UserID INTEGER,
	Name CHAR(100),
	Pass CHAR(50),
	Status CHAR(10),
	PRIMARY KEY (UserID)
);

INSERT INTO Users VALUES
(0001, 'Donald Duy', 'mrpancake7', 'Student'),
(0002, 'Rico', '123', 'Teacher'),
(0003, 'Chris', '123', 'Librarian');

INSERT INTO Users VALUES
(0004, 'Mayank', '123', 'Librarian');

CREATE TABLE Librarians(
	LibrarianID INTEGER,
	DateOfBirth DATE,
	LibrarianName CHAR(50),
PRIMARY KEY (LibrarianID),
FOREIGN KEY (LibrarianID) REFERENCES Users(UserID)
);

INSERT INTO Librarians VALUES
(0003, '1995-05-20', 'Chris');

INSERT INTO Librarians VALUES
(0004, '1995-05-20', 'Mayank');

CREATE TABLE Students(
	UserID INTEGER,
	DateOfBirth DATE,
	Major Char(50),
	Name CHAR(50),
PRIMARY KEY (UserID),
FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

INSERT INTO Students VALUES
(0001, '1995-05-20','Molecular Biology and Biochemistry', 'Donald Duy');

CREATE TABLE Teachers(
	UserID INTEGER,
	DateOfBirth DATE,
	Faculty Char(50),
	Name CHAR(50),
PRIMARY KEY (UserID),
FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

INSERT INTO Teachers VALUES
(0002, '1995-05-20','Molecular Biology and Biochemistry', 'Rico');

CREATE TABLE Supervises(
	SupervisesLibrarianID INTEGER,
	SupervisedLibrarianID INTEGER,
PRIMARY KEY (SupervisesLibrarianID, SupervisedLibrarianID),
FOREIGN KEY (SupervisesLibrarianID) REFERENCES Librarians (LibrarianID)
	ON DELETE No Action
	ON UPDATE No Action,
FOREIGN KEY (SupervisedLibrarianID) REFERENCES Librarians (LibrarianID)
	ON DELETE No Action
	ON UPDATE No Action
);

INSERT INTO Supervises VALUES
(0003, 0004);

CREATE TABLE Write_Workbooks(
	Name CHAR(50),
	UserID INTEGER,
	PRIMARY KEY (Name, UserID),
	FOREIGN KEY (UserID) REFERENCES Teachers (UserID)
		ON DELETE CASCADE
		ON UPDATE CASCADE);

INSERT INTO Write_Workbooks VALUES
('Workbook for CMPT354', 0002);

CREATE TABLE Administrates(
	UserID INTEGER,
	LibrarianID INTEGER,
PRIMARY KEY (UserID, LibrarianID),
FOREIGN KEY (UserID) REFERENCES Users(UserID)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION,
FOREIGN KEY (LibrarianID) REFERENCES Librarians(LibrarianID)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION);

INSERT INTO Administrates VALUES
(0001, 0003), (0002, 0003), (0001, 0004), (0002, 0004);

CREATE TABLE Checkout_Books(
	BookISBN BIGINT,
	Publisher CHAR(50),
	Title CHAR(100),
	Author CHAR(50),
	Genre Char(50),
	Date DATE,
	UserID INTEGER, 
	Quantity INTEGER,
PRIMARY KEY(BookISBN),
FOREIGN KEY (UserID) REFERENCES Users(UserID)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION);

INSERT INTO Checkout_Books VALUES
(9192039404, 'Penguin Books', 'Heart of Darkness', 'Joseph Conrad', 'Classic', '2018-07-23', 0001, 0), 
(9192939403, 'Random House', 'Things Fall Apart', 'Chinua Achebe', 'Classic', '2018-07-25', 0002, 0), 
(9129393943, 'Pearson', 'Mrs Dalloway', 'Virginia Woolf', 'Classic', '2018-07-27', 0002, 0);
insert into Checkout_Books values (9129443943, 'Pearsn', 'abc', 'VirgiWoolf', 'Classic', '2018-07-27', 0002, 1);

CREATE TABLE Checkout_Textbooks(
	BookISBN BIGINT,
	Title CHAR(100),
	Author CHAR(50),
	Subject CHAR(50),
	Date DATE,
	UserID INTEGER, 
	Quantity INTEGER,
PRIMARY KEY(BookISBN),
FOREIGN KEY (UserID) REFERENCES Teachers(UserID)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION);

INSERT INTO Checkout_Textbooks VALUES
(9780201485677, 'Refactoring: Improving the Design of Existing Code', 'Martin Fowler', 'Computer Science', '2018-07-23', 0002, 0), 
(9780201616224, 'The Pragmatic Programmer: From Journeyman to Master', 'Andrew Hunt', 'Computer Science', '2018-07-23', 0002, 0), 
(9780321573513, 'Algorithms (4th Ed)', 'Robert Sedgewick', 'Computer Science', '2018-07-23', 0002, 0);

CREATE TABLE Checkedout_Laptops(
	LaptopID INTEGER,
	Brand CHAR(50),
	Date DATE,
	UserID INTEGER,
	Quantity INTEGER,
PRIMARY KEY(LaptopID),
FOREIGN KEY (UserID) REFERENCES Users (UserID)
	ON DELETE NO ACTION
	ON UPDATE NO ACTION);

Insert INTO Checkedout_Laptops VALUES
(1000, 'Lenovo', '2018-07-23', 0001, 0),
(1001, 'Dell', '2018-07-24', 0001, 0);

Create Table Laptops (
	LaptopID int Primary Key,
    Brand char(100),
    Foreign Key(LaptopID) references Checkedout_Laptops (laptopID)
);

Create Table Checkedout (
	LaptopID INTEGER,
    UserID INTEGER,
    quantity INTEGER,
    primary key (LaptopID, UserID),
    foreign key (LaptopID) References Laptops(LaptopID),
    foreign key (UserID) References Users(UserID)
);

Insert Into Laptops Values (1000, 'Lenovo');
Insert Into Laptops Values (1001, 'Dell');
Insert Into Checkedout Values (1001, 1, 0);
Insert Into Checkedout Values (1000, 1, 0);

Select userID
From Users
Where userID = (select max(userID) from Users);