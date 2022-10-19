"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lightbulb = void 0;
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
    ;
    getId = () => {
        return this.id;
    };
    toggleBulb = () => {
        this.switch = !this.switch;
        return {
            code: "switch_led",
            value: this.switch
        };
    };
    bulbOn = () => {
        return {
            code: "switch_led",
            value: true
        };
    };
    bulbOff = () => {
        return {
            code: "switch_led",
            value: false
        };
    };
    setBrightness = (brightness) => {
        this.brightness = (brightness % 1001 >= 10) ? brightness % 1001 : 10;
        return {
            code: "bright_value_v2",
            value: this.brightness
        };
    };
    setTemperature = (temperature) => {
        this.temperature = (temperature >= 0) ? temperature % 1001 : 0;
        return {
            code: "temp_value_v2",
            value: this.temperature
        };
    };
    setColor = (hue, saturation, value) => {
        this.color = { h: (hue >= 0) ? hue % 360 : 0, s: (saturation >= 0) ? saturation % 1001 : 0, v: (value >= 0) ? value % 1001 : 0 };
        console.log(this.color);
        return {
            code: "colour_data_v2",
            value: this.color
        };
    };
    setScene = (scenes) => {
        this.scenes = scenes;
        if (scenes.length === 0) {
            return {
                code: "bright_value_v2",
                value: this.brightness
            };
        }
        ;
        return {
            code: "scene_data_v2",
            value: {
                "scene_num": this.scenes.length,
                "scene_units": this.scenes
            }
        };
    };
}
exports.Lightbulb = Lightbulb;
;
