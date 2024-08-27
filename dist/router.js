"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const readable_stream_clone_1 = __importDefault(require("readable-stream-clone"));
const initStream_1 = __importDefault(require("./utils/initStream"));
const router = express_1.default.Router();
const streamProxies = new Map();
router.get('/stream/:id', (req, res) => {
    try {
        if (!streamProxies.has(req.params.id)) {
            (0, initStream_1.default)(req.params.id, (process) => {
                streamProxies.set(req.params.id, {
                    process: process,
                    observers: [],
                });
            });
        }
        const camStream = streamProxies.get(req.params.id);
        if (camStream) {
            res.writeHead(206, {
                'Date': (new Date()).toUTCString(),
                'Connection': 'Upgrade, Keep-Alive',
                'Cache-Control': 'private',
                'Content-Type': 'video/webm',
                'Server': 'CustomStreamer/0.0.1',
            });
            const readStream = new readable_stream_clone_1.default(camStream.process.stdout);
            camStream.observers.push(readStream);
            console.log('new stream');
            const stream = streamProxies.get(req.params.id);
            stream.observers[stream.observers.length - 1].pipe(res);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).send(true);
    }
});
exports.default = router;
