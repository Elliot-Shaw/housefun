"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const tuyaHouseController_1 = require("./tuyaHouseController");
const asyncTimout = async (mili) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve("done after: " + mili.toString); }, mili);
    });
};
const main = async () => {
    let bulbs = [
        process.env.MAIN_1,
        process.env.MAIN_2,
        process.env.MAIN_3,
        process.env.MAIN_4,
        process.env.DINNING_1,
        process.env.DINNING_2,
        process.env.DINNING_3,
        process.env.DINNING_4,
        process.env.DINNING_5,
        process.env.DOWN_HALL,
        process.env.BITCHIN_LAMP
    ];
    let controller = new tuyaHouseController_1.tuyaHouseLightController(bulbs);
    for (const bulb of bulbs) {
        controller.changeRed(bulb);
    }
    ;
};
main().catch(err => {
    console.log(err);
});
