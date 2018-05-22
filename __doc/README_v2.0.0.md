# summer-mvc
Structured, light, spring-like web application development framework.      





### http://www.summermvc.com





## Information
The lastest version of summer-mvc is v2.0.0.
<b>Technical site is opend at http://www.summermvc.com.</b>
If you have any question, please send email to inodient@gmail.com

> Please check your summer-mvc version and APIs.





## Convert Version
If your project uses summer-mvc under v2.0.0, it must be converted as current version. Please convert project using below steps.





#### Step 01 : Remove legacy summer-mvc
When you convert summer-mvc version, deleting legacy summer-mvc is the best stable way. As summer-mvc or developer creates their own folders and files, <b>back-up</b> your project is mandatory step. After doing back-up, please execute below command.
Command line tool's folder location is a <b>project root</b> (ex: ../git/Nodejs/summer-mvc-test).
```
$ npm uninstall summer-mvc
```





#### Step 02 : Install lastest summer-mvc and initialize project
After deleting, please install lastest summer-mvc.
It can be done same way when you install summer-mvc currently.
Please execute below command.
```
$ npm install summer-mvc
```
After installing, please run application for intializing project.
```
$ node {file__name}.js
```
```
ex ) $ node app.js
```
During initial running, summer-mvc will create your project's folder hierarchy. More information can be found in http://www.summermvc.com/getting-started





#### Step 03 : Copy and Move context_dispatcher.json
You can use <b>context_dispatcher.json</b> over v2.0.0 without changing contents. Please legacy dispatcher file to latest project folder.
Legacy <b>context_dispatcher.json</b> can be found at <b>{user-project}/dispatcher</b>.
And latest location is <b>{user-project}/core-properties/context_dispatcher.json</b>.

```
Legacy Location : {user-project}/dispatcher
Latest Location : {user-project}/core-properties
```





#### Step 04 : Copy and Move Controller Files
Controlling business logic is not changed in version 2.0.0.
So you can use your legacy controller without changing.
The only thing you must do is that to move controller files to other folders.
```
Legacy Location : {user-project}/controller
Latest Location : {user-project}/application/controllers
```





#### Step 05 : Copy and Move View Files
Viewing html page is not changed in version 2.0.0.
So you can use your legacy view files without changing.
The only thing you must do is that to move view files to other folders.
```
Legacy Location : {user-project}/views
Latest Location : {user-project}/application/views
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





## History
v 1.0.0 Initial version    
v 1.0.1 Bug fixed    
v 1.0.2 Bug fixed    
v 1.1.0 Bug fixed    
v 1.1.3 Bug fixed    
**v 2.0.0 Major Change | Current Version**





## People
The original author of summer-mvc is Changho Kang.  
If you want to participate to improve <b>summer-mvc</b>,
please contact <b>inodient@gmail.com</b>.
We wait passionate contributor.





## License
[MIT Licensed](https://github.com/inodient/summer-mvc/blob/master/LICENSE)  
