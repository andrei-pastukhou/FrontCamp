# babel-plugin-remove-console-log
This plugin will remove all  consol.log statment in your code.  
## Usage
At this case your need installed node.js. To prepare envirment in your shell  

```json
npm install
```
This case will install all dependencies from package.json.
Than your can run
```json
npm start
``` 
after this case all js file from directory 'src' will convert and save to directory 'dist'.
Convertation tuning at .babelrc file. see below how it works.

### To include this plugin in your project.
Important the source code of plugin situated at 'plugin_src' folder.

**.babelrc**

```json
{
  "plugins": ["./plugin_src/removeConsoleLog.js"]
}
```
