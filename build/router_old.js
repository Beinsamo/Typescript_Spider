"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crowller_1 = __importDefault(require("./utils/crowller"));
var Analyzer_1 = __importDefault(require("./utils/Analyzer"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var util_1 = require("./utils/util");
var router = express_1.Router();
var checkLogin = function (req, res, next) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        next();
    }
    else {
        res.json(util_1.getResponseData(null, 'Login First'));
    }
};
router.post('/login', function (req, res) {
    var password = req.body.password;
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.json(util_1.getResponseData(false, 'already login'));
    }
    else {
        if (password === '123' && req.session) {
            if (req.session) {
                req.session.login = true;
                res.json(util_1.getResponseData(true));
            }
        }
        else {
            res.json(util_1.getResponseData(false, 'Login failed'));
        }
    }
});
router.get('/crowller', checkLogin, function (req, res) {
    var secret = 'x3b174jsx';
    var url = "http://www.dell-lee.com/typescript/demo.html?secet=" + secret;
    var analyzer = Analyzer_1.default.getInstance();
    new crowller_1.default(analyzer, url);
    res.json(util_1.getResponseData(true));
});
router.get('/showdata', checkLogin, function (req, res) {
    try {
        var position = path_1.default.resolve(__dirname, '../data/course.json');
        var result = fs_1.default.readFileSync(position, 'utf-8');
        res.json(util_1.getResponseData(JSON.parse(result)));
    }
    catch (e) {
        res.json(util_1.getResponseData(false, 'data not exists'));
    }
});
exports.default = router;
