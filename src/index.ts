// 导入样式文件
import './style/index.less';
import GameControl from './modules/GameControl';
// import Food from './modules/Food';
// import ScorePanel from './modules/ScorePanel';
// const scorePanel = new ScorePanel(100, 2);
// for (let i = 0; i < 200; i++) {
//   scorePanel.addScore();
// }

/* const gc = new GameControl();
setInterval(() => {
  console.log(gc.direction);
}, 1000); */
new GameControl();
