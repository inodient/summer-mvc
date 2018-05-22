// http, https initializing
const http = require("http");
const https = require("https");




// express initializing
const express = require("express");
var app = express();

const setter = require("./express_was_setter.js");




// Setting Tools
var setterPromises = [];

setterPromises.push(setter.parseAnnotation());
setterPromises.push(setter.setViewInfo(express, app));
setterPromises.push(setter.setBodyParser(app));
setterPromises.push(setter.setConnectionHandler(app));
setterPromises.push(setter.setFileHandler());
setterPromises.push(setter.setMysqlHandler());
setterPromises.push(setter.setMssqlHandler());
setterPromises.push(setter.setExitHandler());

Promise.all(setterPromises)
.then(function() {
    var argv = arguments[0];

    for (var i = 0; i < argv.length; i++) {
        if (argv[i].message) {
            logger.info("Initializing : " + argv[i].message);
        }
    }
})
.then(function() {
    // Start WAS - http
    var httpServer = http.createServer(app);
    app.set('port', (process.env.PORT || __defaultPort)); // 3000 was my original port

    httpServer.listen(app.get('port'), () => {
        logger.info("Listen Port for HTTP  : " + app.get('port'));
    });

    // app.listen( app.get('port'), () => {
    //   logger.info( "Listen Port : " + app.get('port') );
    // } );




    // Start WAS - https
    var httpsServer = null;
    var httpsInitializer = require(__httpsInitializer);
    var credentials = httpsInitializer.getHttpsCertifications();

    if (__httpsUsage && !credentials.status && credentials.status != "error") {
        httpsServer = https.createServer(httpsInitializer.getHttpsCertifications(), app);

        httpsServer.listen(__defaultHttpsPort, () => {
            logger.info("Listen Port For HTTPS : " + __defaultHttpsPort);
        });
    }




    // set context Dispatcher
    const contextDispatcher = require(__contextDispatcher);




    // inline get routers
    for (let i = 0; i < simpleGetRouters.length; i++) {
        app.get(simpleGetRouters[i].path, simpleGetRouters[i].callback);
    }

    // inline post routers
    for (let i = 0; i < simplePostRouters.length; i++) {
        app.get(simplePostRouters[i].path, simplePostRouters[i].callback);
    }




    // method = get
    let dispatchingInfo = __inlineContextDispatchingInfo != null ? __inlineContextDispatchingInfo : require(__contextDispatchingInfo);
    let getSpecifications = dispatchingInfo["GET"];

    for (let i = 0; i < getSpecifications.length; i++) {
        app.get((getSpecifications[i]).path, (req, res, next) => {
            req._parsedUrl.pathname = (getSpecifications[i]).path;

            logger.info("ACCEPTED-LANGUAGE :", req.headers["accept-language"]);
            logger.info("REQUEST PATH :", req.path);
            logger.info("REQUEST URL :", req.originalUrl);

            // 2. Dispatcher
            contextDispatcher.dispatching(req, res, getSpecifications[i])
                .then(function(mav) {

                    var manualHttpCode = res.statusCode;

                    try {
                        // 2-1. Ajax
                        if (req.xhr || (req.headers["accept"] && req.headers.accept.indexOf("json") > -1)) {
                            if (!res.statusCode || res.statusCode == undefined || typeof res.statusCode == "undefined") {
                                res.status(200);
                            }
                            res.send(mav.model);
                        }
                        // 2-2. With View
                        else {
                            let contentDisposition = res._headers["content-disposition"];

                            // 2-2-1. Render View
                            if (!contentDisposition) {

                                if (!res.statusCode || res.statusCode == undefined || typeof res.statusCode == "undefined") {
                                    res.status(200);
                                }

                                // path.join returns "." when parameters are empty string
                                if (mav.view != ".") {
                                    res.render(mav.view, mav.model);
                                } else {
                                    res.send(mav.model);
                                }
                            }
                            // 2-2-2. File Download
                            else {
                                if (!res.statusCode || res.statusCode == undefined || typeof res.statusCode == "undefined") {
                                    res.status(200);
                                }
                                res.download(require("path").join(mav.model.savedPath, mav.model.savedFileName), mav.model.originalFileName);
                            }

                        }
                    } catch (err) {
                        logger.error("Error occured while res rendering : app.get");
                        if (!res.statusCode || res.statusCode == undefined || typeof res.statusCode == "undefined") {
                            res.status(500);
                        }
                        logger.error(err);
                        next(err);
                    }
                })
                .catch(function(err) {
                    logger.error("Error occured while Execution Internal Server Process.");
                    if (!res.statusCode || res.statusCode == undefined || typeof res.statusCode == "undefined") {
                        res.status(500);
                    }
                    logger.error(err);
                    next(err);
                });
        });
    }

    // method = post
    let postSpecifications = dispatchingInfo["POST"];

    for (let i = 0; i < postSpecifications.length; i++) {
        app.post((postSpecifications[i]).path, (req, res, next) => {
            req._parsedUrl.pathname = (postSpecifications[i]).path;

            logger.info("ACCEPTED-LANGUAGE :", req.headers["accept-language"]);
            logger.info("REQUEST PATH :", req.path);
            logger.info("REQUEST URL :", req.originalUrl);

            // 2. Dispatcher
            contextDispatcher.dispatching(req, res, postSpecifications[i])
                .then(function(mav) {
                    // 2-1. Ajax
                    try {
                        if (req.xhr || req.headers.accept.indexOf("json") > -1) {
                            if (!res.statusCode || res.statusCode == undefined || typeof res.statusCode == "undefined") {
                                res.status(200);
                            }
                            res.send(mav.model);
                        }
                        // 2-2. With View
                        else {
                            let contentDisposition = res._headers["content-disposition"];

                            if (!res.statusCode || res.statusCode == undefined || typeof res.statusCode == "undefined") {
                                res.status(200);
                            }

                            // 2-2-1. Render View
                            if (!contentDisposition) {
                                // path.join returns "." when parameters are empty string
                                if (mav.view != ".") {
                                    res.render(mav.view, mav.model);
                                } else {
                                    res.send(mav.model);
                                }
                            }
                            // 2-2-2. File Download
                            else {
                                if (!res.statusCode || res.statusCode == undefined || typeof res.statusCode == "undefined") {
                                    res.status(200);
                                }
                                res.download(require("path").join(mav.model.savedPath, mav.model.savedFileName), mav.model.originalFileName);
                            }
                        }
                    } catch (err) {
                        logger.error("Error occured while res rendering : app.post");
                        logger.error(err);
                        if (!res.statusCode || res.statusCode == undefined || typeof res.statusCode == "undefined") {
                            res.status(500);
                        }
                        next(err);
                    }
                })
                .catch(function(err) {
                    logger.error("Error catched in app.post method...");
                    if (!res.statusCode || res.statusCode == undefined || typeof res.statusCode == "undefined") {
                        res.status(500);
                    }
                    logger.error(err);
                    next(err);
                });
        });
    }




    // set error handler
    setter.setErrorHandler(app);
})
.catch(function(err) {
    logger.error(err);
    process.exit();
});