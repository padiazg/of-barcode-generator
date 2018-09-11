"use strict";
const bwipjs = require("bwip-js");

module.exports = (context, callback) => {
    // always receive params as a json object
    let options;
    try {
        options = JSON.parse(context);
    } catch (e) {
        callback(e, undefined);
        return;
    }

    if (!options.bcid || !options.text) {
        callback('bdid & text are required', undefined);
        return;
    } // if (!options.bcid || !options.text) ...

    // encode to base64
    const base64 = options.base64 ? options.base64 : false;
    delete options.base64;

    // set some defaults
    options.bcid = options.bcid.toLowerCase();
    options.backgroundcolor = options.backgroundcolor ? options.backgroundcolor : 'FFFFFF';
    options.padding = options.padding ? options.padding : 1;
    options.guardwhitespace = true;
    options.paddingwidth = options.paddingwidth != undefined ? options.paddingwidth : 1;
    options.paddingheight = options.paddingheight != undefined ? options.paddingheight : 1;

    bwipjs.toBuffer(options, (error, png) => {
        if (error) {
            callback(error, undefined);
        } else {
            callback(undefined, base64 ? png.toString("base64") : png);
        }
    })
};
