// 定义记分牌类
class ScorePanel {
  // 记录分数和等级
  score = 0;
  level = 1;
  // 分数和等级所在的元素，在构造函数进行初始化
  scoreELe: HTMLElement;
  levelEle: HTMLElement;

  // 设置变量限制等级
  maxLevel: number;
  // 设置变量表示升级分数
  upScore: number;
  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreELe = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  // 设置加分方法
  addScore() {
    this.scoreELe.innerHTML = ++this.score + '';
    // 判断分数是多少
    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }

  // 设置升级方法
  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + '';
    }
  }
}

export default ScorePanel;
