"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./routes/router"));
// require("/dotenv/config");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use("/", router_1.default);
const dbOptions = {
    dbName: "terrain",
    useNewUrlParser: true,
};
mongoose_1.default
    .connect("mongodb+srv://dpdanepreston:terraininventory@terraininventory.ublvcfh.mongodb.net/terrain?retryWrites=true&w=majority", dbOptions)
    .then(() => {
    console.log("db connected");
})
    .catch((err) => console.log(err));
const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
    console.log(`server is running on ${port}`);
});
