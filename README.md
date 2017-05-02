# summer-mvc
Structured, light, spring-like web application development framework.      

## Installation      
```      
$ npm install summer-mvc      
```      

## Quick Start
In your js file, require module `summer-mvc`. Then `summer-mvc` build architecture, authomatically.     
( dispatcher, controller, views, queries etc )     
```javascript     
const mvc = require( "summer-mvc" );    
```    

After building, call `basic http request` in your browser.
Default port is 3000. ex) http://localhost:3000    
```
http://{your-host-name}:{port}    
```    

## Features       
- Focus on fast design & development speed
- Use `express` for serving http request, response
- Provide automatic *application-building-machanism*
- Provide structural designing method using **JSON** file format
- Simular architecture with spring framework
- Support 1 view engine (`ejs`), 1 database engine (`mysql`) (v1.1.0)
- Provide easy way to manage cookie, session and database(mysql) 

## Philosophy    
The `summer-mvc` has only one goal to provide very simple way to design web application. As most developer feel comfortable for using the **spring framework**, the `summer-mvc` provides spring framework - like environment. `summer-mvc` uses small **dispatcher-engine** (like spring's dispatcher-servlet), and it can be controlled by **JSON files**(like spring's xxx-servlet.xml).      

## DOCs    
`summer-mvc`'s [DOC.pdf](https://github.com/inodient/summer-mvc/blob/master/DOC.pdf)    
    
## Manual    
### Design & Implement
1. Set initial information : **properties/initalizer.json**    
   * port : service port ( default : 3000 )    
   * context_architecture : architecture of web application    
   * views / options : defaults view engine and options. (**Please don't change**)    
   * statis_folders : defaults express static folders ( *__app.use( express.static( *** ) );__* )    


2. Set initial dispatcher : **dispatcher/context-dispatcher.json**    
   * "GET", "POST" : method of http request
   * Array of dispatching info
      * id : identifier ( doesn't use for system but fill in )
      * path : URI's resource paths
      * controllerJS : indicate controller js file (../controller)
      * controlFunction : name of control function in controllerJS file
      * view : indicate ejs view file (../views)


3. Implement Controller : **controller/controller_xxx.js**    
   * The only one rule is that controller must return object named **model** using callback function.    
   * `summer-mvc` call controller function automatically, but contol function has 3 mandatory parameters.    
      * req : request object comes from client    
      * res : response object send to client (managed by `your application`)
      * callback : **1st param - err, 2nd param - model object**
   * Sample
      ```javascript
      exports.control = function( req, res, callback ){
        var model = {};
        callback( null, model );
      }
      ```    



4. Design view : **views/xxx.ejs**    
   * `summer-mvc`'s default view engine is [*`ejs`*](https://www.npmjs.com/package/ejs)
   * If controller return model object using callback, `summer-mvc` send it to *ejs*.
      So ejs viewing file can use model object's elements.
   * Sample
     ```html
     <tr>
        <td>Method</td>
        <td><%= method %></td>
     </tr>
     ```

### Architecture    
Consists of 5 parts : **dispatcher, properties, controller, views, queries**    

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



After initializing, **controller**, **views** and **queries** folder has sample files.    

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


### APIs
`summer-mvc` provides some APIs for web application especailly **cookie, session** and **db**.
( samples : controller_cookie_session.js / controller_db.js )    
#### setCookie( cookieKey, cookieValue )    
```javascript    
let connection = new connectionHandler( req, res );    
connection.setCookie( "cookie_Key", "cookie_Value" );    
```
#### getCookie( cookieKey )    
```javascript    
let connection = new connectionHandler( req, res );    
connection.getCookie( "cookie_Key" );    
```
#### clearCookie( cookieKey )    
```javascript    
let connection = new connectionHandler( req, res );    
connection.clearCookie( "cookie_Key" );    
```
#### setSession( sessionKey, sessionValue )    
```javascript    
let connection = new connectionHandler( req, res );    
connection.setSession( "session_Key", "session_Value" );    
```
#### getSession( sessionKey )
```javascript    
let connection = new connectionHandler( req, res );    
connection.getSession( "session_Key" );    
```
#### destroySession()
```javascript    
let connection = new connectionHandler( req, res );    
connection.destroySession();    
```
#### executeQuery( queryId[, params, ...], callback ) : **mysql only**
> queryId : identifier of query ( queries/query.json's id )    
> params : prepared statement's empty values
> callback : contains 3 parameters - err, results(rs), fields(columns)
```javascript
let db = new dbHandler();
db.executeQuery( "getMySqlVersion", function( err, results, fields ){
    console.log( results );
}
```    
#### getQueryString( queryId[, params] ) : **mysql only**
> queryId : identifier of query ( queries/query.json's id )     
> params : prepared statement's empty values    
```javascript
let db = new dbHandler();
db.executeQuery( "getMySqlVersion" )
```    

## History
v 1.0.0 Initial version    
v 1.0.1 Bug fixed    
v 1.0.2 Bug fixed    
**v 1.1.0 Current Version**    

## People
The original author of summer-mvc is Changho Kang.(inodient@gmail.com)  

## License
[MIT Licensed](https://github.com/inodient/summer-mvc/blob/master/LICENSE)  
