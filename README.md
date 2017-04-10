# summer-mvc
Structural, Convenient, Spring-like web application development framework.

### Installation
```
$ npm install summer-mvc
```

### Features
- Focus on fast design & development speed
- Control with / using JSON file
- View system supporting 1+ template engines
- Looks like spring framework

### Philosophy
The summer-mvc has only one goal to provide very simple way to design web application.  
As most developer feel comfortable for using the spring framework, the summer-mvc looks like the spring framework.  
It use small dispatcher-engine (like spring's dispatcher-servlet), and it can be controlled json files(like spring's xxx-servlet.xml).  

### Quick Start
The quickest way to get started with summer-mvc is to utilize the executable `summer-mvc` to generate an application as shown below:  

Install the executable module:  
```
$ npm install summer-mvc
```

Create the js file and require summer-mvc module:  
```javascript
var mvc = require( "summer-mvc" );
```

Init the app. You can assign any network ports you want. The default is 3000.  
```javascript
mvc.init( 3000 );
```

Start the app. And you can see the log as follow:  
```
$ node app.js
```
```
setDefaultViewPath
setContextDispatchingInfo
setControllerDispatchingInfo
setServicerPath
listen port : 3000
```

Preparation Completed. Please call URL like <http://localhost:3000/>.  
Welcome summer-mvc!  
![Welcome Page](https://github.com/inodient/summer-mvc/blob/master/img/welcome.png)  

### Docs & Community
Unfortunately, we don't have special docs and community, yet.  
We are sorry about that.  
Please wait until releasing v2.0.0. That time we release compact package.  

<!-- ### Examples -->

<!-- ### Tests -->

### People
The original author of summer-mvc is inodient(inodient@gmail.com)  

### License
[MIT Licensed](LICENSE)
