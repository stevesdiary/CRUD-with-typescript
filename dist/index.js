"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const dbConnection_1 = require("./db/dbConnection");
const employee_1 = __importDefault(require("./routes/employee"));
const login_1 = __importDefault(require("./routes/login"));
const register_1 = __importDefault(require("./routes/register"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, dbConnection_1.connectDb)();
app.use('/', employee_1.default);
app.use('/', login_1.default);
app.use('/', register_1.default);
app.listen(4000, () => {
    console.log("App running on port 4000");
});
//# sourceMappingURL=index.js.map