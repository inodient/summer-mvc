# summer-mvc
Structured, Light, spring-like web application framwork for desiging **RESTful API**.      

```javascript
const mvc = require( "summer-mvc" );    
```   

### http://www.summermvc.com


## Information  
`Express` or other Nodejs web service middleware is very simple and well-design to use.
But when using them, there are some needs to design our own application architecture such as controller, db executor or VO / DO.
The `summer-mvc` will help you.

The `summer-mvc` has only one goal to provide very simple way to design web application.
If developer just run application using `summer-mvc`, the `summer-mvc` core module automatically build your application architecture.
It looks simular the `spring-framework`'s one.

And the `summer-mvc` have so many supporting tools such as **connection handler, error handler, exit handler, db handler, file handler and logger**.
These tools can shorten development speed.

Finally, the `summer-mvc` is optimized to implement `RESTful API`. 
Only 5 to 10 minutes of study, developers can implement their own APIs.








## Installation
```      
$ npm install summer-mvc      
```    

[![IMAGE ALT TEXT HERE](https://www.summermvc.com/write_code.png)](https://youtu.be/nbqMR-WhsBQ)  




## Quick Start
#### 1. Auto Building Mechanism
In your js file, require module `summer-mvc`.   
Then `summer-mvc` build architecture, authomatically.     
( dispatcher, controller, views, queries etc )   

```
const mvc = require( "summer-mvc" );    
```    

```
$ node app.js
```    

[![IMAGE ALT TEXT HERE](https://www.summermvc.com/install.png)](https://youtu.be/RJFem_aWxIY)  




#### 2. Accessing Initial Web Page
After building, call `basic http request` in your browser.  
Default port is 3000. ex) http://localhost:3000    
```
http://{your-host-name}:{port}    
```    



#### 3. Create Application
The last job is that implement application.
Since the `summer-mvc` automatically create `controller` folders in project,
implement control function and assign that at `context-dispatcher`. 

> exports.control = function( req, res, connection ){ ...  } 
    
[![IMAGE ALT TEXT HERE](https://www.summermvc.com/execution.png)](https://youtu.be/xZz1hEwbBus)  
    




## Features       
- Adopt and Release `Auto-Building-Machenism`
- Using `express` as core web servicing middleware
- Support 1 view engine (`ejs`)
- Support 2 database engine (`mssql`, `mysql`) (v2.1.4)
- Support 6 tools : log, db, connection, error, exit, file





## Techincal Site
Please check your summer-mvc version and APIs.  
There are some need to discuss and get guides, please send email to inodient@gmail.com
Korean written site will be opened at July 2018.

**More information can be found at https://www.summermvc.com**.
( This site is being updating continuosly. )




## Youtube Channel
[summer-mvc youtube channel](https://www.youtube.com/channel/UCmpfNkTMaMR2lw25JFrwC6g?view_as=subscriber)

#### Initialising
[![IMAGE ALT TEXT HERE](https://www.summermvc.com/install.png)](https://youtu.be/WRuBzKUgipg)





  



## Version 2.1.5
1. Support `Nodejs` production / development mode
2. Support `Javascript` Syntax Validator
3. Support both `http` / `https`
4. Support inline `dispatcher` assigning
5. Add supported dbms - mssql







## People
The original author of summer-mvc is Changho Kang.  

If you want to participate to improve **summer-mvc**,
please contact **inodient@gmail.com**.

We wait passionate contributor.





## License
[MIT Licensed](https://github.com/inodient/summer-mvc/blob/master/LICENSE)  
