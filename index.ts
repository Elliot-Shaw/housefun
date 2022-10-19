import 'dotenv/config';
import { tuyaHouseLightController } from './tuyaHouseController';
import { sceneLibrary } from './sceneLibrary';

const asyncTimout = async (mili: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{resolve("done after: " + mili.toString)}, mili);
  });
}

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
    // process.env.UP_HALL_1,
    // process.env.UP_HALL_2,
    process.env.BITCHIN_LAMP
    // process.env.TV_DEN,
    // process.env.ELLIOT_ROOM,
    // process.env.ELLIOT_LAMP
  ]
  let controller = new tuyaHouseLightController(bulbs);
  
  for (const bulb of bulbs){
    // await controller.changeScene(bulb, sceneLibrary.getSexyPurpleScene());
    // await controller.changeScene(bulb, sceneLibrary.getGYBScene());
    // await controller.changeScene(bulb, sceneLibrary.getDimmerScene());
    // await controller.changeScene(bulb, sceneLibrary.getDimmerSceneWithTempChange());
    // await controller.changeScene(bulb, sceneLibrary.getFullRandomHSVScene());
    controller.changeRed(bulb);
    // controller.changeBrightness(bulb, 50);
    // await controller.changeScene(bulb, sceneLibrary.getRandomRanbowScene());
    // await controller.changeScene(bulb, sceneLibrary.getRandomOnOffScene());
    // controller.turnBulbOff(bulb);
    // controller.changeScene(bulb, sceneLibrary.getOnOffScene(100));
  };
  
}

main().catch(err => {
  console.log(err);
});
