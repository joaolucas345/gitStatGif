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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.GifCreateBot = void 0;
var ffmpeg_1 = require("@ffmpeg-installer/ffmpeg");
var canvas_1 = require("canvas");
var stream_1 = require("stream");
var fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
var uuid_1 = require("uuid");
var fs_1 = __importDefault(require("fs"));
function GifCreateBot(sampleToUse, name, repos, followers, following, bornDate) {
    return __awaiter(this, void 0, void 0, function () {
        var wait, filename, savePath, sample, videoEditor, canvas, context, variables, imageBuffer, stream, image, info;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    wait = function (ms) {
                        return new Promise(function (resolve, reject) {
                            setTimeout(function () {
                                resolve(true);
                            }, ms);
                        });
                    };
                    filename = (0, uuid_1.v4)();
                    savePath = __dirname + "/storage/out/" + filename + ".gif";
                    sample = __dirname + "/storage/samples/" + sampleToUse;
                    videoEditor = (0, fluent_ffmpeg_1["default"])().setFfmpegPath(ffmpeg_1.path);
                    canvas = new canvas_1.Canvas(680, 680);
                    context = canvas.getContext("2d");
                    variables = { color: "rgb(255,0,0)", stroke: "rgb(0,0,0,0)" };
                    if (sampleToUse == "idk.jpg") {
                        variables.color = "rgb(0,0,0)";
                        variables.stroke = "rgb(255,0,0)";
                    }
                    context.font = "100px sans-serif";
                    context.fillStyle = variables.color;
                    context.strokeStyle = variables.stroke;
                    context.stroke();
                    context.fillText("" + name, 10, 100);
                    context.strokeText("" + name, 10, 100);
                    context.fillText("" + repos, 10, 200);
                    context.strokeText("" + repos, 10, 200);
                    context.fillText("" + followers, 10, 300);
                    context.strokeText("" + followers, 10, 300);
                    context.fillText("" + following, 10, 400);
                    context.strokeText("" + following, 10, 400);
                    context.fillText("" + bornDate, 10, 500);
                    context.strokeText("" + bornDate, 10, 500);
                    imageBuffer = canvas.toBuffer();
                    stream = stream_1.Readable.from([imageBuffer]);
                    videoEditor.input(sample);
                    videoEditor.input(stream);
                    videoEditor.complexFilter("[0:v][1:v]overlay=0:0");
                    videoEditor.outputOptions([
                        "-loop", "-1"
                    ]);
                    videoEditor.saveToFile(savePath);
                    return [4 /*yield*/, wait(1500)];
                case 1:
                    _a.sent();
                    image = fs_1["default"].readFileSync(savePath);
                    info = fs_1["default"].statSync(savePath);
                    setTimeout(function () {
                        fs_1["default"].rmSync(savePath, { force: true, retryDelay: 100, recursive: true });
                    }, 2000);
                    return [2 /*return*/, { data: image, info: info }];
            }
        });
    });
}
exports.GifCreateBot = GifCreateBot;
