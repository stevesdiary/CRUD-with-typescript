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
exports.connectDb = void 0;
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!process.env.DB_URL) {
            console.error('MONGODB_URI environment variable is not defined.');
            process.exit(1);
        }
        const mongo_url = process.env.DB_URL;
        yield mongoose_1.default.connect(mongo_url, {
            dbName: 'Cluster0',
        });
        console.log("Database connected!");
    }
    catch (error) {
        console.error("Error connecting to the database:", error);
    }
});
exports.connectDb = connectDb;
//# sourceMappingURL=dbConnection.js.map