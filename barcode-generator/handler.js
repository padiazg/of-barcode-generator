"use strict";

const querystring = require("querystring");
const bwipjs = require("bwip-js");

module.exports = (context, callback) => {
    const { Http_Method, Http_Query, Http_Content_Type } = process.env;

    // check method
    if (Http_Method != "GET" && Http_Method != "POST") {
        callback("Method not allowed", null);
        return;
    } // (Http_Method != "GET" && Http_Method != "POST")  ...

    // check if parameters are present
    if ((Http_Method =="GET" && !Http_Query) || (Http_Method =="POST" && !Http_Query && !context)) {
        callback("Missing parameters", null);
        return;
    }

    // validate parameters passed in body
    if (Http_Method =="POST" && !Http_Query && context && Http_Content_Type != "application/x-www-form-urlencoded") {
        callback("Content_Type not especified/allowed", null);
        return;
    }

    const payload = Http_Query ? Http_Query : context;
    let parameters = querystring.parse(payload);

    if (!parameters.bcid || !parameters.text) {
        callback('bdid & text are required', undefined);
        return;
    } // if (!parameters.bcid || !parameters.text) ...

    // encode to base64
    const base64 = parameters.base64 ? parameters.base64 : false;
    delete parameters.base64;

    // set some defaults
    parameters.bcid = parameters.bcid.toLowerCase();
    parameters.backgroundcolor = parameters.backgroundcolor ? parameters.backgroundcolor : 'FFFFFF';
    parameters.padding = parameters.padding ? parameters.padding : 1;
    parameters.guardwhitespace = true;
    parameters.paddingwidth = parameters.paddingwidth != undefined ? parameters.paddingwidth : 1;
    parameters.paddingheight = parameters.paddingheight != undefined ? parameters.paddingheight : 1;

    bwipjs.toBuffer(parameters, (error, png) => {
        if (error) {
            callback(error, undefined);
        } else {
            callback(undefined, base64 ? png.toString("base64") : png);
        }
    })
};
