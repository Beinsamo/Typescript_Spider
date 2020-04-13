"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crowller_1 = __importDefault(require("./crowller"));
var Analyzer_1 = __importDefault(require("./Analyzer"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var router = express_1.Router();
router.get('/', function (req, res) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send("\n    <html>\n       <body>\n        <a href='/crowller'>crowller things!</a>\n        <a href='/showdata'>show crowlled things!</a>\n        <a href='/logout'>out</a>\n       </body>\n    </html>");
    }
    else {
        res.send("\n     <html>\n        <body>\n          <form method='post' action='/login' >\n          <input type='password' name='password' />\n          <button>login</button>\n          </form>\n        </body>\n     </html>\n  ");
    }
});
router.get('/logout', function (req, res) {
    if (req.session) {
        req.session.login = undefined;
    }
    res.redirect('/');
});
router.post('/login', function (req, res) {
    var password = req.body.password;
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        res.send('already login');
    }
    else {
        if (password === '123' && req.session) {
            if (req.session) {
                req.session.login = true;
                res.send('login sucess');
            }
        }
        else {
            res.send('password error');
        }
    }
});
router.get('/crowller', function (req, res) {
    var isLogin = req.session ? req.session.login : false;
    if (isLogin) {
        var secret = 'x3b174jsx';
        var url = "http://www.dell-lee.com/typescript/demo.html?secet=" + secret;
        var analyzer = Analyzer_1.default.getInstance();
        new crowller_1.default(analyzer, url);
        res.send('getdata sucess' + "    <a href='/showdata'>show crowlled things!</a");
    }
    else {
        res.send('first login');
    }
});
router.get('/showdata', function (req, res) {
    try {
        var position = path_1.default.resolve(__dirname, '../data/course.json');
        var result = fs_1.default.readFileSync(position, 'utf-8');
        res.json(JSON.parse(result));
    }
    catch (e) {
        res.send('nothing is crowlled');
    }
});
exports.default = router;
