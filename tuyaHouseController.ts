import { TuyaContext } from "@tuya/tuya-connector-nodejs";
import { Scene } from "./sceneLibrary";

type Command = { code: string; value: any };

export class Lightbulb {
  readonly id: string;
  private switch = false;
  private brightness = 1000;
  private temperature = 0;
  private color: { h: number; s: number; v: number } = { h: 0, s: 0, v: 1000 };
  private scenes: Scene[] = [];

  constructor(setid: string) {
    this.id = setid;
  }

  getId = () => {
    return this.id;
  };

  toggleBulb = (): Command => {
    this.switch = !this.switch;
    return {
      code: "switch_led",
      value: this.switch,
    };
  };
  bulbOn = (): Command => {
    return {
      code: "switch_led",
      value: true,
    };
  };
  bulbOff = (): Command => {
    return {
      code: "switch_led",
      value: false,
    };
  };

  setBrightness = (brightness: number): Command => {
    this.brightness = brightness % 1001 >= 10 ? brightness % 1001 : 10;
    return {
      code: "bright_value_v2",
      value: this.brightness,
    };
  };
  setTemperature = (temperature: number): Command => {
    this.temperature = temperature >= 0 ? temperature % 1001 : 0;
    return {
      code: "temp_value_v2",
      value: this.temperature,
    };
  };

  setColor = (hue: number, saturation: number, value: number): Command => {
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

  setScene = (scenes: Scene[]): Command => {
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

//at the moment just uses the environment to set the context, should allow for dynamic change in constructor but who fuckin cares
export class tuyaHouseLightController {
  private context = new TuyaContext({
    baseUrl: process.env.TUYA_BASE_URL,
    accessKey: process.env.TUYA_ACCESS_KEY,
    secretKey: process.env.TUYA_SECRET_KEY,
  });

  private lightBulbs: { [lightId: string]: Lightbulb } = {};

  constructor(lights: string[]) {
    lights.forEach((light) => {
      this.lightBulbs = Object.assign(this.lightBulbs, {
        [light]: new Lightbulb(light),
      });
    });
  }
  private command = async (
    id: string,
    commands: { code: string; value: any }[]
  ) => {
    return this.context.request({
      path: `/v1.0/iot-03/devices/${id}/commands`,
      method: "POST",
      body: {
        commands: commands,
      },
    });
  };

  toggleBulb = async (lightId: string) => {
    return this.command(lightId, [this.lightBulbs[lightId].toggleBulb()]);
  };
  turnBulbOn = async (lightId: string) => {
    return this.command(lightId, [this.lightBulbs[lightId].bulbOn()]);
  };
  turnBulbOff = async (lightId: string) => {
    return this.command(lightId, [this.lightBulbs[lightId].bulbOff()]);
  };

  changeColor = async (lightId: string, h: number, s: number, v: number) => {
    return this.command(lightId, [
      this.lightBulbs[lightId].bulbOn(),
      this.lightBulbs[lightId].setColor(h, s, v),
    ]);
  };
  changeBrightness = async (lightId: string, b: number) => {
    return this.command(lightId, [
      this.lightBulbs[lightId].bulbOn(),
      this.lightBulbs[lightId].setBrightness(b),
    ]);
  };
  changeTemperature = async (lightId: string, t: number) => {
    return this.command(lightId, [
      this.lightBulbs[lightId].bulbOn(),
      this.lightBulbs[lightId].setBrightness(t),
    ]);
  };
  changeScene = async (lightId: string, s: Scene[]) => {
    return this.command(lightId, [
      this.lightBulbs[lightId].bulbOn(),
      this.lightBulbs[lightId].setScene(s),
    ]);
  };

  changeRed = async (lightId: string) => {
    return this.command(lightId, [
      this.lightBulbs[lightId].bulbOn(),
      this.lightBulbs[lightId].setColor(1, 1000, 1000),
    ]);
  };
}
