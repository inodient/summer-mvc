# summer-mvc
Structural, Light, Spring-like web application development framework.

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
It use small dispatcher-engine (like spring's dispatcher-servlet), and it can be controlled by JSON files(like spring's xxx-servlet.xml).  

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

Preparation Completed. Please call URL like <http://localhost:3000/> (http://{user_hostname}:{port}/).  
##### Welcome summer-mvc!  
![Welcome Page](https://github.com/inodient/summer-mvc/blob/master/img/welcome.png)  


### Docs & Community
Unfortunately, this project has no special docs and communities, yet.  
Please wait until releasing v2.0.0. That time you can see a compact package.  

### Usage
The summer-mvc contains two engines for dispatching clients http request.    
(context-dispatcher.js, controller-dispatcher-js)    
These engines are embedded on the package you installed, so you don't need to implement these.    
But you must design a structure of your system using 2 JSON files.    
(context-dispatcher.json, controller-dispatcher.json)   

1. dispatching Info JSON Files

    1. context-dispatcher.json
    context-dispatcher is the engine for dispatching clients http request to controllers.    
    You must to write dispatchingInfo (type : JSON) file and set this file to dispatcher using setContextDispatchingInfo() method.    




    DispatchingInfo File consists of JSON Object arrays "GET" and "POST".    
    > {    
    >   "GET" : [    
    >     {    
    >       "id": "index",    
    >       "path": "/",    
    >       "controllerJS": "controller.js",    
    >       "controlFunction": "control",    
    >       "viewPath": "default",    
    >       "view": "welcome.ejs"    
    >     }    
    >   ]    
    >   "POST" : [    
    >     {    
    >       "id": "welcomePost",    
    >       "path": "/welcomePost",    
    >       "controllerJS": "controller-dispatcher.js",    
    >       "controlFunction": "dispatching",    
    >       "viewPath": "default",    
    >       "view": "welcomePost.ejs"    
    >     }    
    >   ]    
    > }    




    Each method has at least 6 objects id, path, controllerJS, controlFunction, viewPath and view.    
    Objects specifics as follow:    
    > - id : identification for dispatching info. It does not use for summer-mvc, but can a way to design the system sharply.    
    > - path : http request path ( ex : http://{user_hostname}:{port}/**path**)    
    > - controllerJS : handler javascript file when client request **path**    
    > - controlFunction : control function that is implemented in **controllerJS**. It must be wrapped by exports keyword (ex: exports.control = function(){} );    
    > - viewPath : path of rendering view files under view engine's default path. You can set view engine's default path using setDefaultViewPath() method.    
    > - view : name of view file. Currently, `summer-mvc` only support ejs view engine.    




    2. controller-dispatcher.json    
    controller-dispatcher is the engine for dispatching controller's execution request to services.    
    You must to write dispatchingInfo (type : JSON) file and set this file to dispatcher using setControllerDispatchingInfo() method.        

    If you don't want to use this, you can use *context-dispatcher* singly.    
    If you want to use this, you must set *controllerJS* as **controller-dispatcher.js** and *controlFunction* as *dispatching* (Very important).    
    Actually, it desn't need to use these objects but that is very clear use these.    


    For control dispatching, client(view file) must send *action* information to **summer-mvc**.
    ```
    http://localhost:3000/post?action=initial
    ```    
    Or set html form name as 'action'
    ```html
    <input type="textbox" name="action">
    ```



    controller-dispatcher 4 objects as follow:
    > [    
    >   {    
    >     "action": "initial",    
    >     "id": "service1",    
    >     "servicerJS": "service1.js",    
    >     "serviceFunction": "executeService"    
    >   },    
    >   {    
    >     "action": "initial",    
    >     "id": "service2",    
    >     "servicerJS": "service2.js",    
    >     "serviceFunction": "executeService"    
    >   }    
    > ]      

    > - action : indicate service matched with client's request    
    > - id : identification for dispatching info. It does not use for summer-mvc, but can a way to design the system sharply.   
    > - servicerJS : servicer javascript file when controller need to **action**    
    > - serviceFunction : service function that is implemented in **servicerJS**. It must be wrapped by exports keyword (ex: exports.executeService = function(){} );    



2. Folder Design and set Paths    
> *Generally*, context-dispatcher.json located in *dispatcher* folder.    
> *Generally*, controller-dispatcher.json located in *controller* folder.    
> *Generally*, controller.js located in *controller* folder, too.    
> *Generally*, service.js located in *services* folder.       
> *Generally*, ejs view folder named as *views*.    
> (You can see these folder structure in `summer-mvc` module folders. /node-modules/summer-mvc)    

And you must set path and file's location information using `summer-mvc` APIs.    

### __setContextDispatchingInfo( path[, file] )__      
Set context-dispatcher information JSON file.    
Path contains filename. So file is not mandatory.    

### __setControllerDispatchingInfo( path[, file] )__     
Set controller-dispatcher information JSON file.    
Path contains filename. So file is not mandatory.    

### __setServicerPath( path[, file] )__    
Set services folder path.    

### __setDefaultViewPath( path )__   
Set ejs view folder path.     

**Important! It is efficient way that set paths with physical full path (ex:/usr/nodejs/project/summer-mvc)**




3. Implement Controller and services
- For ejs render view file dynamically, controller must be return JSON object named **model**.    
And control function must be wrapped *exports* keyword. You can use *paths* argument that contains paths used by `summer-mvc`.
  ```javascript
  exports.control = function( req, paths ){
    var model = {};
    ....
    return model;
  }
  ```
- For controller send **model** object to ejs, service method receive already-defined-model object and return **model** .
And service function must be wrapped *exports* keyword.
You can use *paths* argument that contains paths used by `summer-mvc`.
  ```javascript
  exports.executeService = function( req, model, paths ){
    .....
    return model;
  }
  ```

4. Start application
    1. Init    
    ```javascript    
    var mvc = require( "summer-mvc" );    
    mvc.init( 3000 );    
    ```
    2. Set paths
    ```javascript    
    mvc.setContextDispatchingInfo( __dirname + "/dispatcher", "dispatcher.json" );    
    mvc.setControllerDispatchingInfo( __dirname + "/controller", "controller-dispatcher.json" );    
    mvc.setServicerPath( __dirname + "/services" );    
    mvc.setDefaultViewPath( __dirname + "/views" );    
    ```

5. Test URLs
- HTTP GET : http://{user_hostname}:{port}/
- HTTP GET : http://{user_hostname}:{port}/index
- HTTP GET : http://{user_hostname}:{port}/welcome

- HTTP POST :
  - HTTP GET : http://{user_hostname}:{port}/post?action=initial
  - Type "initial" and Submit
  - HTTP POST called and send HTTP GET http://{user_hostname}:{port}/welcomePost


##### If you install `summer-mvc`, you can see some example codes in module folders. (/node-modules/summer-mvc.)

<!-- ### Tests -->

### People
The original author of summer-mvc is Changho Kang(inodient@gmail.com)  
If you want to contact or have any question, we can use email as below.    

### License
[MIT Licensed](https://github.com/inodient/summer-mvc/blob/master/LICENSE)
