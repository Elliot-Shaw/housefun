"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lightbulb = void 0;
class Lightbulb {
    id;
    workMode = "white";
    switch = true;
    brightness = 1000;
    temperature = 0;
    color = [0, 0, 100];
    scene = [];
    constructor(setid) {
        this.id = setid;
    }
    ;
    getId = () => {
        return this.id;
    };
    getCommands = () => {
        return [
            {
                code: "switch_led",
                value: this.switch
            },
            {
                code: "work_mode",
                value: this.workMode
            },
            {
                code: "bright_value_v2",
                value: this.brightness
            },
            {
                code: "temp_value_v2",
                value: this.temperature
            },
            {
                code: "colour_data_v2",
                value: { "h": this.color[0], "s": this.color[1], "v": this.color[2] }
            },
            {
                code: "scene_data_v2",
                value: {
                    "scene_num": this.scene.length + 1,
                    "scene_units": this.scene
                }
            }
        ];
    };
}
exports.Lightbulb = Lightbulb;
;
