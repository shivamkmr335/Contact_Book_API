# Contact_Book_API

AIM: 
  Develop a suite of CRUD APIs for a contact book app
  Each contact should have a unique email address
  APIs should support adding/editing/deleting contacts
  Allow searching by name and email address
  Search should support pagination and should return 10 items by default per invocation
  Add unit tests and Integration tests for each functionality.
  Add basic authentication for the app. Use environment variables or basic auth(for rest APIs)
  The code should scale-out for millions of contacts per contact book

Technologies Used:
  1.Node JS
  2.MongoDB
  3.Express
  4.Postman

About API:
  I have used POSTMAN API for handling all the POST , GET , PUT and DELETE request.
  And I have used MongoDB for storing data.
  
Features:
  1.Any Two Contacts cannot have same mail ID in the database.
  2.To DELETE or UPDATE any contact user must know his email ID and password.
  3.You can search any Contact by using his First name or email ID.
  4.The password are first hashed using bcrypt and then stored into the database.
  
  
Packages Used:   	
      1. Mongoose(5.0.2)
			2. bcrypt(1.0.3)
			3. express(4.16.2)
			4. joi(13.1.0)
