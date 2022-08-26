const httpStatus = require("http-status");
const moment = require("moment");
const constants = require("./constants");

module.exports = {
    logDatetime: function(){
        return moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
    },
    logger: function(TAG, message){
        console.log(`[${this.logDatetime()}][${TAG}] ${message}`);
    },
    generateResponse: function(res, statusCode, message, fields){
        let response = {
            statusCode:httpStatus.INTERNAL_SERVER_ERROR,
            message: constants.messages.SMTHNG_WRNG,
        }
        if(statusCode) response.statusCode = statusCode
        if(message) response.message = message
        if(fields)
        {
            response['data'] = fields
        }
        
        return res.status(statusCode).send(response)
    }
    
}