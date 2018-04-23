# Task3 according with FronCamp3. Use webpack
After using this package, application will be avaliable at dist folder.

Tasks for this project was (done 100%):
  - Use Babel as a loader. (done)
  - Use style and url loaders. (Sass/less/stylus, autoprefixer optional) (done)
  - Each part of logic should be in a separate file. (ES6 modules) (done)
  - Use plugins (done)
  - Configure the bundler for development and production mode.(done)
  - Configure Webpack-dev-server.(done)

extra task was (done 100%):
  - create button "Show News" on the main page. 
  your app should load necessary code(css, js) 
  for rendering newsList only after clicking on the button above. (done at `amd` folder)
  - create a custom loader. (done in `custom_loader` folder)
       - loader should be chainable
       - applicable for /\.json/
 

## Usage

```json
npm install
```
This case will install all dependencies from package.json.
Than your can run
```json
npm start
``` 
after this case all json file which was imported in your project will preprocess with json-delete-number-attribute loader.

The json-delete-number-attribute deleting all numeric attribute from *.json file

example before:
```json
{
  "0" : "some_numeric_value",
  "value1": "SomeValue",
  "2" : {
    "0" : "some_numeric_value",
    "value1": "SomeValue",
  },
  "value10" : {
    "0" : "some_numeric_value",
    "value1": "SomeValue",
  }
}
```
after:
```json
{
  "value1": "SomeValue",
  "value10" : {
    "value1": "SomeValue",
  }
}
```


This is development mode! After this case all js file from directory 'src' will convert and save to directory 'dist'.
To this case will use dev.config.js. Also This case will start a wepack's dev-server
the demonstrate work of devserver please visit http://localhost:3001

### To include this loader in your project.
Important the source code of plugin situated at `loader` folder.

**webpack.config.js**

```json
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader!json-delete-number-attribute' // Notice json-delete-number-attribute loader is chainable.
      }
    ]
  },
  resolveLoader: {
    alias: {
      'json-delete-number-attribute': path.join(__dirname, 'loader', 'json-delete-number-attribute.js')
    }
  },
```