import Snake from './Snake';
import Food from './Food';
import ScorePanel from './ScorePanel';

// 游戏控制器类
class GameControl {
  // 三个属性
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;

  // 创建一个属性来存储蛇的移动方向,即按键方向
  direction: string = '';

  // 创建属性记录游戏是否结束
  isLive = true;

  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel(10, 2);
    this.init();
  }

  // 游戏初始化方法,调用后开始游戏
  init() {
    // 绑定键盘按键事件
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    // 执行修改值,调用run方法使蛇移动
    this.run();
  }
  // 创建键盘响应函数
  keydownHandler(event: KeyboardEvent) {
    // 检查event.key是否合法,用户是否按的方向键

    // 修改direction属性
    this.direction = event.key;
    // console.log(event.key);
  }

  // 创建控制蛇移动的方法
  run() {
    /* 
    *根据方向来改变蛇的位置
    向上 top -
    向下 top +
    向左 left -
    向右 left +
    */
    //  蛇现在的坐标
    let X = this.snake.X;
    let Y = this.snake.Y;

    // 根据按键方向修改X值和Y值
    switch (this.direction) {
      case 'ArrowUp':
      case 'up':
        // 向上移动
        Y -= 10;
        break;
      case 'ArrowDown':
      case 'Down':
        // 向下移动
        Y += 10;
        break;
      case 'ArrowLeft':
      case 'Left':
        X -= 10;
        break;
      case 'ArrowRight':
      case 'Right':
        X += 10;
        break;
    }
    // 检查蛇是否吃到食物
    if (this.checkEat(X, Y)) {
      // console.log('吃到了');
      this.food.change();
      this.scorePanel.addScore();
      // 蛇身体增长
      this.snake.addBody();
    }

    // 修改蛇的值(+异常处理)
    try {
      this.snake.X = X;
      this.snake.Y = Y;
    } catch (e: any) {
      alert(e.message + ',GAME OVER!');
      this.isLive = false;
    }

    // 开启定时调用
    this.isLive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
  }

  // 定义检查吃食物方法
  checkEat(X: number, Y: number) {
    return X === this.food.X && Y === this.food.Y;
  }
}

export default GameControl;
