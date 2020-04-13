"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResponseData = function (data, errMsg) {
    if (errMsg) {
        return {
            sucess: false,
            errMsg: errMsg,
            data: data
        };
    }
    else {
        return {
            sucess: true,
            data: data
        };
    }
};
