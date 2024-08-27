"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const streams_1 = __importDefault(require("./utils/streams"));
const CAMERA_ADDRESS = 'http://192.168.3.254:8081';
const router = express_1.default.Router();
router.get('/stream/:id', (req, res) => {
    try {
        // TODO: Cache the first encoded stream and clone it, piped to each new request
        // rather than consuming camera feed and then spawning new encoded processes each time 
        const camStream = (0, streams_1.default)(CAMERA_ADDRESS);
        if (camStream) {
            res.writeHead(206, {
                'Date': (new Date()).toUTCString(),
                'Connection': 'Upgrade, Keep-Alive',
                'Cache-Control': 'private',
                'Content-Type': 'video/webm',
                'Server': 'CustomStreamer/0.0.1',
            });
            camStream.pipe(res);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send(true);
    }
});
exports.default = router;
