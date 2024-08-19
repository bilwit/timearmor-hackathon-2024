"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const stream_1 = require("stream");
const router_1 = __importDefault(require("./router"));
const websocket_1 = __importDefault(require("./websocket"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const CameraEmitter = new stream_1.EventEmitter(); // emitter to communicate to/from the cameras
app.set('trust proxy', true);
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.raw({
    inflate: true,
    type: 'application/x-www-form-urlencoded',
}));
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, '..', 'client/dist')));
app.use((req, _res, next) => {
    req['db'] = prisma;
    req['CameraEmitter'] = CameraEmitter;
    return next();
});
app.use('/api', router_1.default);
const server = app.listen(Number(process.env.PORT), () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('⚡️[server]: Server is running at http://localhost:' + process.env.API_PORT);
    try {
        // websocket server for client connections for camera communication
        (_a = (0, websocket_1.default)(server)) === null || _a === void 0 ? void 0 : _a(CameraEmitter);
    }
    catch (e) {
        console.log(e);
    }
}));
