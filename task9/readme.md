# Task 7.2 to frontcamp #
According to task this project is implementation of blogs application which consist of api application + client application.
To run this project you need already installed Node.js with npm in your local machine, or have web servers with installed node.js/ Also you need instaled mongodb.

To setup connection between application and mongo db, please write config to `task7.2\API_server\config\config.js` 

to run project step by step
1. Copy project to your server or local machine.
2. Tuning connection between mongo and api server see   `task7.2\API_server\config\config.js`  file
2. use ```npm install``` to install all necessary dependencies. In two directories : 
`task7.2` and `task7.2/API_server`
3. to start project use ```npm start``` also in two directories `task7.2` and `task7.2/API_server`
4. the application should be available to ```http://localhost:8080``` and api server should be availavle on ```localhost:3000```
5. If it necessary, you can build a prod version. To this write next command in your shell ```npm run build-prod``` 
6. enjoy :)