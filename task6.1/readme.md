# Task 6.1 to frontcamp #
According to task this project is implementation of REST API service.

To run this project you need already installed mongodb and Node.js with npm in your local machine, or have web servers with installed mongo db and node.js

1. Copy project to your server or local machine.
2. use ```npm install``` to install all necessary dependencies.
3. in file ```app.js``` change mongodb's settings ```var mongoDB = 'mongodb://127.0.0.1/blog';```
4. to start project use ```npm start```
5. enjoy.

description of restapi:
REST API service is located in path ```/blogs``` for example ```http://localhost/blogs/```
1. GET
>```http://localhost/blogs/``` = get all records.
2. GET
>```http://localhost/blogs/#id``` = get record with identificator = #id.
3. POST
>```http://localhost/blogs/``` = insert new record (in body of request should be present next keys: title,text,author).

4.PUT 
> ```http://localhost/blogs/#id``` = update record with identificator = #id. (in body of request should be present next keys: title,text,author)

5. DELETE
>```http://localhost/blogs/#id``` = delete record with identificator = #id.

