<br>
# summer-mvc
**Structured, light, spring framework-like web application development framework.**
- github : https://github.com/inodient/summer-mvc
- npmjs : https://www.npmjs.com/package/summer-mvc

<br>
<br>

### Introduction
##### Philosophy
The `summer-mvc` has only one goal to provide very simple way to design web application. As most developer feel comfortable for using the spring framework, the summer-mvc provides spring framework - like environment. `summer-mvc` uses small dispatcher-engine (like spring's dispatcher-servlet), and it can be controlled by JSON files(like spring's xxx-servlet.xml). And you can determine your own controller and views.
<br>
<br>

##### Features
- Focus on fast design & development speed
- Use `express` for serving http request, response
- Provide automatic *application-building-machanism*
- Provide structural designing method using **JSON** file format
- Simular architecture with spring framework
- Support 1 view engine (`ejs`), 1 database engine (`mysql`) (v1.1.0)
- Provide easy way to manage cookie, session and database(mysql)
<br>
<br>

<!-- pagebreak -->
<br>

### Architecture
![architecture](/assets/architecture_ltn05pla9.png)
The `summer-mvc` consists of 2 parts - ***Initializing part*** and ***execution part***.
As image shown, users can control their web app using **initilizer.json, dispatcher.json, controller and business logic etc**. And use **views** to render results.
<br>
<br>

##### initializing part
When administrator starts their web-app, the `summer-mvc` attempt to build simple web application architecture. That time some folders and files will be made automatically. Developer can design whose own web application, correcting ***`initializer.json`*** file.
<br>

##### execution part
When web app receive http request from their clients, the `summer-mvc` send requests to `dispatcher-engine` automatically. And then, `dispatcher-engine` find a controller to resolve request using ***`context_dispatcher.json`***. Developer can design whose own dispatcher, correcting ***`context_dispatcher.json`***. Controller and Business logic is just a part of web app, so these files can contain any logic. But the only rule of controller is that must make `model` object and return this using their callback function.
<br>

<!-- pagebreak -->
<br>

### Getting started
##### Installing
```      
$ npm install summer-mvc      
```      
<br>
<br>
##### Quick Start
In your js file, require module `summer-mvc`. Then `summer-mvc` build architecture, authomatically. ( dispatcher, controller, views, queries etc )     
```javascript     
const mvc = require( "summer-mvc" );    
```    
<br>
And run application. ex) node app.js
```
node {your-app-js-name}.js
```
<br>
Call `basic http request` in your browser. ex) http://localhost:3000
*Default port is 3000.*
```
http://{your-host-name}:{port}    
```
<br>   
Browser will render *index.ejs*.
<!-- pagebreak -->
<br>
<br>
<br>
#### index.ejs
![welcome_page](/assets/welcome_page_oeo51aomf.png)
<br>
<!-- pagebreak -->
<br>
<br>
###### Post Message
Send Post message to `summer-mvc` web app and receive message. Fill in that message in Info.'s Post Message column. Implemented in ***/controller/controller_post.js***
<br>
###### Ajax request
Send Ajax message to `summer-mvc` web app and receive message. Fill in that message in Info.'s Ajax Result column. Implemented in ***/controller/controller_ajax.js***
<br>
###### Cookie
Send Cookie Key / Value to `summer-mvc` web app and receive message. `summer-mvc` set cookie and return message. Fill in that message in Info.'s Query String column. Implemented in ***/controller/controller_cookie_session.js***
<br>
###### session
Send Session Key / Value to `summer-mvc` web app and receive message. `summer-mvc` set session and return message. Fill in that message in Info.'s Query String column. Implemented in ***/controller/controller_cookie_session.js***
<br>
###### DB
Send db query request to `summer-mvc` web app and receive message. `summer-mvc` execute query and return results. Fill in that results in Info.'s DB res column. Implemented in ***/controller/controller_db.js***.
**( ✓ Install mysql first. )**
<br>
###### Others
Method, Path, Controller Name, Control Function, Params are basic informations of `summer-mvc` web app.
<br>
<!-- pagebreak -->
<br>
### Guide
The `summer-mvc` provides some methodologies to design web application quickly. Developers only design and implement **initializer.json, dispatcher.json, some controllers, business logics and views**. This concepts are exactly matched with ***MVC (Model-View-Controller)*** pattern. Developers only design and implement MVC and its connections. (like spring framework)
<br>
##### Execution Process
![architecture_process](/assets/architecture_process_wxsy9xsi6.png)
<br>
(1, 2) When administrator starts app, (3, 4, 5) **summer-mvc-core** calls initializer and build web application architecture, automatically. **[dispatcher, properties, controller, views, queries]**. <u>Developers can control this process using and correcting ***initializer.json*** file.</u>

(1, 2) When clients send http request, (3, 4) **summer-mvc-core** calls dispatcher and send request to controller. Controllers are implemented as simple Nodejs codes and can use business logics. (5, 6, 7, 8) After execution controllers return **model** object. (9, 10, 11, 12) Finally **summer-mvc** returns **model-and-view (mav)** to **express** and **ejs** modules. (13, 14) Then clients are able to receive http response. <u>Developers can control this process using and correcting ***dispatcher.json*** file.</u>

<!-- pagebreak -->
<br>
##### Automatic Building Mechanism : initializer.json
*initializer.json* contains basic web application information. When initializing, `summer-mvc` authomatically create and copy folders and files using ***context_architecture*** properties. Developers rewrite this file freely, but please don't delete ***dispatcher / views informations***. Developer can also assign ***static_folders*** for servicing express routers.
>* port : service port ( default : 3000 )    
>* context_architecture : architecture of web application    
>* views / options : defaults view engine and options. (**Please don't change**)    
>* statis_folders : defaults express static folders ( *__app.use( express.static( XX ) );__* )    
```javascript
{
  "port" : 3000,
  "context_architecture" : [
    {
      "folder" : "dispatcher",
      "files" : [ "context_dispatcher.json" ]
    },
    {
      "folder" : "controller",
      "files" : [ "controller_basic.js" ]
    },
    {
      "folder" : "views",
      "files" : [ "index.ejs", "error.html" ]
    },
    {
      "folder" : "properties",
      "files" : [ "initializer.json", "db.json" ]
    },
    {
      "folder" : "queries",
      "files" : [ "query.json" ]
    }
  ],
  "views" : {
    "engine" : "ejs"
  },
  "static_folders" : [ "img", "lib", "css" ]
}
```
/properties/initializer.json
<!-- pagebreak -->
<br>
##### Design Dispatcher : dispatcher.json
*dispatcher.json* is the most important part of `summer-mvc` as it has information of http servicing. Developers rewrite this file freely.
> "GET", "POST" : method of http request
>   * id : identifier ( doesn't use for system but fill it )
>   * path : URI's resource paths
>   * controllerJS : indicate controller js file (../controller)
>   * controlFunction : name of control function in controllerJS file
>   * view : indicate ejs view file (../views)
```javascript
{
  "GET" : [
    {
      "id": "index",
      "path": "/",
      "controllerJS": "controller_basic.js",
      "controlFunction": "control",
      "viewPath": "",
      "view": "index.ejs"
    },
    {
      "id": "setCookie",
      "path": "/setCookie",
      "controllerJS": "controller_cookie_session.js",
      "controlFunction": "control",
      "viewPath": "",
      "view": "index.ejs"
    }
  ],
  "POST" : [
    {
      "id": "indexPost",
      "path": "/",
      "controllerJS": "controller_post.js",
      "controlFunction": "control",
      "viewPath": "",
      "view": "index.ejs"
    }
  ]
}
```
/dispatcher/context_dispatcher.json
<!-- pagebreak -->
<br>
##### Implements Controller
Developers can implements their own controllers. These must be assigned in *context_dispatcher.json*. As Nodejs allow so many types of implementation style, developer can implement their code freely. The only one rule is that must return ***model*** object using callback function. `summer-mvc` call controller function automatically, but contol function has 3 mandatory parameters.    
>  * req : request object comes from client    
>  * res : response object send to client (managed by `your application`)
>  * callback : **1st param - err, 2nd param - model object**

```javascript
exports.control = function( req, res, callback ){
  var model = {};
  var err = null;

  model.result = "This is sample code";
  callback( err, model );
}
```   
***A. dispatched***
  As `summer-mvc`'s dispatcher automatically assign controller, developers can only assign path and controller in ***context_dispatcher.json***.
<br>
```javascript
{
  "GET" : [
    {
      "id": "index",
      "path": "/index/welcome",
      "controllerJS": "controller1.js",
      "controlFunction": "control1",
      "viewPath": "",
      "view": "index.ejs"
    },
    {
      "id": "index",
      "path": "/index/welcome2",
      "controllerJS": "controller2.js",
      "controlFunction": "control2",
      "viewPath": "",
      "view": "index.ejs"
    }
  ]
}
```
<!-- pagebreak -->
<br>
***B. Use Controller***
  As controller has ***req*** object, developer can catch request ***path*** directly. Developer make branch codes to control parsed paths.
<br>
In *context_dispatcher.json*,
```javascript
{
  "GET" : [
    {
      "id": "index",
      "path": "/index",
      "controllerJS": "controller.js",
      "controlFunction": "control",
      "viewPath": "",
      "view": "index.ejs"
    }
  ]
}
```
<br>
In *controller.js*,
```javascript
exports.control = function( req, res, callback ){
  var model = {};
  var err = null;

  var path = req._parsedUrl.pathname;
  path.replace( "/index", "" );

  if( req._parsedUrl.pathname === "/welcome1" ){
    //execute business logic 01
  } else if( req._parsedUrl.pathname === "/welcome2" ){
    //execute business logic 02
  }

  callback( err, model );
}
```

<!-- pagebreak -->
<br>
##### Implements Views
`summer-mvc`'s default view engine is [ejs](https://www.npmjs.com/package/ejs). And `summer-mvc` has **views** folder. Developers create *.ejs files in that folder. As controller return **model** object, *.ejs file must use **model** object to render results.

In *controller.js*,
```javascript
exports.control = function( req, res, callback ){
  var model = {};
  var err = null;

  model.result = "This is sample page";

  callback( err, model );
}
```
In *index.ejs*,
```html
<tr>
   <td>Result Message</td>
   <td><%= result %></td>
</tr>
```
<br>
### APIs
`summer-mvc` provides some APIs for web application especailly **cookie, session** and **db**.
###### setCookie( cookieKey, cookieValue )    
```javascript    
let connection = new connectionHandler( req, res );    
connection.setCookie( "cookie_Key", "cookie_Value" );    
```
###### getCookie( cookieKey )    
```javascript    
let connection = new connectionHandler( req, res );    
connection.getCookie( "cookie_Key" );    
```
<!-- pagebreak -->
<br>
###### clearCookie( cookieKey )    
```javascript    
let connection = new connectionHandler( req, res );    
connection.clearCookie( "cookie_Key" );    
```
###### setSession( sessionKey, sessionValue )    
```javascript    
let connection = new connectionHandler( req, res );    
connection.setSession( "session_Key", "session_Value" );    
```
###### getSession( sessionKey )
```javascript    
let connection = new connectionHandler( req, res );    
connection.getSession( "session_Key" );    
```
###### destroySession()
```javascript    
let connection = new connectionHandler( req, res );    
connection.destroySession();    
```
###### executeQuery( queryId[, params, ...], callback ) : **mysql only**
> queryId : identifier of query ( queries/query.json's id )    
> params : prepared statement's empty values
> callback : contains 3 parameters - err, results(rs), fields(columns)

```javascript
let db = new dbHandler();
db.executeQuery( "getMySqlVersion", function( err, results, fields ){
    console.log( results );
} );
```

###### getQueryString( queryId[, params] ) : **mysql only**
> queryId : identifier of query ( queries/query.json's id )     
> params : prepared statement's empty values    

```javascript
let db = new dbHandler();
db.executeQuery( "getMySqlVersion" )
```    

<!-- pagebreak -->
<br>
### Sample Architecture
When initializing completed, developer can find some sample codes as follow. Please use this samples code and exercise.
| Name | Type | Usage |
|:----|:----:|:----|
|  ✚ dispatcher | folder | containing dispatcher json files |    
|  context_dispatcher.json | file | containing http req/res paths and assign controller & views |    
|  ✚ properties | folder | containing defaults setting json files (initializer.json, db.json) |    
|  initializer.json | file | containing default web application configuration (port, static_folder etc) |    
|  db.json | file | containing db connection informations (host, user, password etc) |    
|  ✚ controller | folder | containing controller js files |    
| ✚ views | folder | containing ejs view files |    
|  ✚ queries | folder | containing query json files |       

| Parent | Name | Type | Usage |
|:----|:----|:----:|:----|
| controller | controller_basic.js | file |  sample basic controller |    
| controller | controller_ajax.js | file |  sample ajax controller |    
| controller | controller_cookie_session.js | file |  sample cookie, session controller |    
| controller | controller_db.js | file |  sample db controller |    
| controller | controller_post.js | file |  sample post controller |    
| views | index.ejs |file| sample index ejs page |    
| views | error.html |file| sample error html page |    
| queries | query.json  | file | sample query information file |

<!-- pagebreak -->
<br>
### People
The original author of `summer-mvc` is ***[Changho Kang (Inno)](inodient@gmail.com)***.  
`summer-mvc` is the first open source project of **Inno**, some other projects will be released continuously. If have any questions or opinions, please contact **Inno** using email (inodient@gmail.com).

### Version Information
v 1.0.0 Initial version    
v 1.0.1 Bug fixed    
v 1.0.2 Bug fixed    
v 1.1.0 But fixed, Document Updated
**v 1.1.1 Current Version**   

<!-- pagebreak -->
<br>
### License
(The MIT License)

Copyright (c) 2017 Changho Kang <inodient@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
