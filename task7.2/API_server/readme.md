# Task 6.2 to frontcamp #
According to task this project is implementation of REST API service and storage is db mongo. And Also this project provide possibility to registration and login to this app.

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

link to documentation from postman [https://documenter.getpostman.com/view/3617597/frontcamp/7TQ8Vgg](https://documenter.getpostman.com/view/3617597/frontcamp/7TQ8Vgg)

##Notice: ##
According to task there implemented registration and login functionality. And REST api command to get posts and post avalable only to authenticated users. According to this to check functionality you should register and login by web interface.
