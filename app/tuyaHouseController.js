"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tuyaHouseLightController = exports.Lightbulb = void 0;
const tuya_connector_nodejs_1 = require("@tuya/tuya-connector-nodejs");
class Lightbulb {
    id;
    switch = false;
    brightness = 1000;
    temperature = 0;
    color = { h: 0, s: 0, v: 1000 };
    scenes = [];
    constructor(setid) {
        this.id = setid;
    }
    getId = () => {
        return this.id;
    };
    toggleBulb = () => {
        this.switch = !this.switch;
        return {
            code: "switch_led",
            value: this.switch,
        };
    };
    bulbOn = () => {
        return {
            code: "switch_led",
            value: true,
        };
    };
    bulbOff = () => {
        return {
            code: "switch_led",
            value: false,
        };
    };
    setBrightness = (brightness) => {
        this.brightness = brightness % 1001 >= 10 ? brightness % 1001 : 10;
        return {
            code: "bright_value_v2",
            value: this.brightness,
        };
    };
    setTemperature = (temperature) => {
        this.temperature = temperature >= 0 ? temperature % 1001 : 0;
        return {
            code: "temp_value_v2",
            value: this.temperature,
        };
    };
    setColor = (hue, saturation, value) => {
        this.color = {
            h: hue >= 0 ? hue % 360 : 0,
            s: saturation >= 0 ? saturation % 1001 : 0,
            v: value >= 0 ? value % 1001 : 0,
        };
        console.log(this.color);
        return {
            code: "colour_data_v2",
            value: this.color,
        };
    };
    setScene = (scenes) => {
        this.scenes = scenes;
        if (scenes.length === 0) {
            return {
                code: "bright_value_v2",
                value: this.brightness,
            };
        }
        return {
            code: "scene_data_v2",
            value: {
                scene_num: this.scenes.length,
                scene_units: this.scenes,
            },
        };
    };
}
exports.Lightbulb = Lightbulb;
class tuyaHouseLightController {
    context = new tuya_connector_nodejs_1.TuyaContext({
        baseUrl: process.env.TUYA_BASE_URL,
        accessKey: process.env.TUYA_ACCESS_KEY,
        secretKey: process.env.TUYA_SECRET_KEY,
    });
    lightBulbs = {};
    constructor(lights) {
        lights.forEach((light) => {
            this.lightBulbs = Object.assign(this.lightBulbs, {
                [light]: new Lightbulb(light),
            });
        });
    }
    command = async (id, commands) => {
        return this.context.request({
            path: `/v1.0/iot-03/devices/${id}/commands`,
            method: "POST",
            body: {
                commands: commands,
            },
        });
    };
    toggleBulb = async (lightId) => {
        return this.command(lightId, [this.lightBulbs[lightId].toggleBulb()]);
    };
    turnBulbOn = async (lightId) => {
        return this.command(lightId, [this.lightBulbs[lightId].bulbOn()]);
    };
    turnBulbOff = async (lightId) => {
        return this.command(lightId, [this.lightBulbs[lightId].bulbOff()]);
    };
    changeColor = async (lightId, h, s, v) => {
        return this.command(lightId, [
            this.lightBulbs[lightId].bulbOn(),
            this.lightBulbs[lightId].setColor(h, s, v),
        ]);
    };
    changeBrightness = async (lightId, b) => {
        return this.command(lightId, [
            this.lightBulbs[lightId].bulbOn(),
            this.lightBulbs[lightId].setBrightness(b),
        ]);
    };
    changeTemperature = async (lightId, t) => {
        return this.command(lightId, [
            this.lightBulbs[lightId].bulbOn(),
            this.lightBulbs[lightId].setBrightness(t),
        ]);
    };
    changeScene = async (lightId, s) => {
        return this.command(lightId, [
            this.lightBulbs[lightId].bulbOn(),
            this.lightBulbs[lightId].setScene(s),
        ]);
    };
    changeRed = async (lightId) => {
        return this.command(lightId, [
            this.lightBulbs[lightId].bulbOn(),
            this.lightBulbs[lightId].setColor(1, 1000, 1000),
        ]);
    };
}
exports.tuyaHouseLightController = tuyaHouseLightController;
