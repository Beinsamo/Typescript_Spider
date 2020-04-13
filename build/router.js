"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var crowller_1 = __importDefault(require("./crowller"));
var Analyzer_1 = __importDefault(require("./Analyzer"));
var router = express_1.Router();
router.get('/', function (req, res) {
    res.send("\n     <html>\n        <body>\n          <form method='post' action='/getdata' >\n          <input type='password' name='password' />\n          <button>submit</button>\n          </form>\n        </body>\n     </html>\n  ");
});
router.post('/getdata', function (req, res) {
    if (req.body.password === '123') {
        var secret = 'x3b174jsx';
        var url = "http://www.dell-lee.com/typescript/demo.html?secet=" + secret;
        var analyzer = Analyzer_1.default.getInstance();
        new crowller_1.default(analyzer, url);
        res.send('getdata sucess');
    }
    else {
        res.send('password error');
    }
});
exports.default = router;
