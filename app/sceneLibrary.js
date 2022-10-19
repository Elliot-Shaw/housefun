"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sceneLibrary = void 0;
class sceneLibrary {
    static baseScene = [];
    static makeSceneLength(length) {
        length = length - 1;
        for (let i = 0; i <= length % 8; i++) {
            this.baseScene.push({
                bright: 0,
                temperature: 0,
                h: 0,
                s: 0,
                v: 0,
                unit_change_mode: "static",
                unit_gradient_duration: 0,
                unit_switch_duration: 0
            });
        }
    }
    ;
    static resetBaseScene = () => {
        this.baseScene = [];
    };
    static getSexyPurpleScene = () => {
        this.resetBaseScene();
        this.makeSceneLength(8);
        for (let element of this.baseScene) {
            element.h = Math.floor(Math.random() * (333 - 234) + 233);
            element.v = element.s = 1000;
            element.unit_change_mode = "gradient";
            element.unit_gradient_duration = Math.floor(Math.random() * 101);
            element.unit_switch_duration = Math.floor(Math.random() * 101);
        }
        ;
        return this.baseScene;
    };
    static getGYBScene = () => {
        this.resetBaseScene();
        this.makeSceneLength(8);
        for (let element of this.baseScene) {
            element.h = Math.floor(Math.random() * (181 - 61) + 60);
            element.v = element.s = 1000;
            element.unit_change_mode = "gradient";
            element.unit_gradient_duration = Math.floor(Math.random() * 101);
            element.unit_switch_duration = Math.floor(Math.random() * 101);
        }
        ;
        return this.baseScene;
    };
    static getOnOffScene = (switchDur) => {
        this.resetBaseScene();
        this.makeSceneLength(2);
        this.baseScene[0] = {
            bright: 1000,
            temperature: 0,
            h: 0,
            s: 0,
            v: 0,
            unit_change_mode: "jump",
            unit_gradient_duration: 0,
            unit_switch_duration: switchDur
        };
        this.baseScene[1] = {
            bright: 0,
            temperature: 0,
            h: 0,
            s: 0,
            v: 0,
            unit_change_mode: "jump",
            unit_gradient_duration: 0,
            unit_switch_duration: switchDur
        };
        return this.baseScene;
    };
    static getRandomOnOffScene = () => {
        this.resetBaseScene();
        this.makeSceneLength(8);
        for (let element of this.baseScene) {
            element.bright = Math.floor(Math.random() * 2) ? 1000 : 0;
            element.unit_change_mode = "jump";
            element.unit_switch_duration = Math.floor((Math.random() * 51) + 50);
        }
        ;
        return this.baseScene;
    };
    static getRandomRanbowScene = () => {
        this.resetBaseScene();
        this.makeSceneLength(8);
        for (let element of this.baseScene) {
            element.h = Math.floor(Math.random() * 361);
            element.s = element.v = 1000;
            element.unit_change_mode = "gradient";
            element.unit_switch_duration = Math.floor(Math.random() * 101);
        }
        ;
        return this.baseScene;
    };
    static getDimmerScene = () => {
        this.resetBaseScene();
        this.makeSceneLength(8);
        for (let element of this.baseScene) {
            element.bright = Math.floor(Math.random() * 1001);
            element.unit_change_mode = "gradient";
            element.unit_switch_duration = Math.floor(Math.random() * 41 + 60);
        }
        ;
        return this.baseScene;
    };
    static getDimmerSceneWithTempChange = () => {
        this.resetBaseScene();
        this.makeSceneLength(8);
        for (let element of this.baseScene) {
            element.bright = Math.floor(Math.random() * 1001);
            element.temperature = Math.floor(Math.random() * 1001);
            element.unit_change_mode = "gradient";
            element.unit_gradient_duration = 100;
            element.unit_switch_duration = Math.floor(Math.random() * 41 + 60);
        }
        ;
        return this.baseScene;
    };
    static getFullRandomHSVScene = () => {
        this.resetBaseScene();
        this.makeSceneLength(8);
        for (let element of this.baseScene) {
            element.h = Math.floor(Math.random() * 361);
            element.s = Math.floor(Math.random() * 1001);
            element.v = Math.floor(Math.random() * 1001);
            element.unit_change_mode = "gradient";
            element.unit_gradient_duration = 100;
            element.unit_switch_duration = 85;
        }
        ;
        return this.baseScene;
    };
}
exports.sceneLibrary = sceneLibrary;
