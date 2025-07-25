# 注音符号打字练习应用 - 项目文档

## 项目概述

注音符号打字练习应用是一个基于React构建的Web应用程序，旨在帮助用户学习和练习中文注音符号（ㄅㄆㄇㄈ）的输入。该应用提供了多种练习模式、实时反馈和视觉指导，使学习过程更加高效和直观。

## 功能特点

### 练习模式
- **注音符号练习**：单独练习声母、介音、韵母和声调的输入
- **汉字练习**：通过汉字提示输入对应的注音符号
- **词语练习**：练习词语的完整注音输入

### 游戏化元素
- 可配置的练习时长（1分钟、2分钟、3分钟或5分钟）
- 实时得分跟踪
- 准确率计算
- 倒计时功能

### 视觉辅助
- 虚拟键盘布局，显示按键与注音符号的对应关系
- 手指位置引导（不同手指负责的按键使用不同颜色标识）
- 当前需要输入的按键高亮显示
- 响应式设计，适配不同屏幕尺寸

## 技术架构

### 技术栈
- **前端框架**：React 19.1.0
- **构建工具**：Create React App
- **样式**：CSS
- **性能监控**：web-vitals

### 项目结构
```
/Users/lihuimin/project/bopomofo/
├── .gitignore
├── package.json
├── public/
│   ├── index.html
│   └── 其他静态资源
└── src/
    ├── App.css          # 应用样式
    ├── App.js           # 主应用组件
    ├── index.css        # 全局样式
    ├── index.js         # 应用入口
    ├── logo.svg         # 应用图标
    └── reportWebVitals.js # 性能监控
```

### 核心组件
- **App**：主组件，包含整个应用的状态和逻辑
- **KeyboardLayout**：注音符号键盘布局组件
- **虚拟键盘**：显示标准键盘与注音符号的对应关系
- **打字区域**：显示当前需要输入的内容和用户输入框
- **游戏信息面板**：显示得分、准确率和剩余时间

## 安装与设置

### 前提条件
- Node.js (v14.0.0或更高版本)
- npm (v6.0.0或更高版本)

### 安装步骤
1. 克隆或下载项目到本地
2. 打开终端，导航到项目目录
3. 运行以下命令安装依赖：
   ```
   npm install
   ```

### 启动开发服务器
```
npm start
```
应用将在 http://localhost:3000 启动

### 构建生产版本
```
npm run build
```
构建产物将生成在 `build` 目录中

## 使用指南

### 开始使用
1. 启动应用后，您将看到主界面，包含模式选择和时间设置
2. 选择练习模式（注音符号、汉字或词语）
3. 选择练习时长
4. 点击开始按钮进入练习界面

### 练习界面
- 顶部显示当前得分和准确率
- 中间区域显示需要输入的内容（注音符号、汉字或词语）
- 下方提供虚拟键盘参考，当前需要按下的按键会高亮显示
- 底部显示标准键盘布局，按键按手指分工着色

### 输入方法
- **注音符号模式**：直接输入对应的按键
- **汉字/词语模式**：输入完整注音后按Enter键确认

## 代码结构详解

### 数据结构
应用使用了多种数据结构存储练习内容：

```javascript
// 注音符号数据结构示例
bopomofoData = {
  consonants: [ { symbol: 'ㄅ', key: 'b', name: 'b' }, ... ],
  vowels: [ { symbol: 'ㄚ', key: 'a', name: 'a' }, ... ],
  medials: [ { symbol: 'ㄧ', key: 'i', name: 'i' }, ... ],
  tones: [ { symbol: 'ˉ', key: ' ', name: '第一声' }, ... ]
}

// 汉字数据结构示例
chineseCharacters = [
  { character: '的', pinyin: 'de', bopomofo: 'ㄉㄜ' },
  ...
]

// 词语数据结构示例
words = [
  { word: '你好', pinyin: 'nǐ hǎo', bopomofo: 'ㄋㄧˇ ㄏㄠˇ' },
  ...
]
```

### 主要状态管理
应用使用React的useState钩子管理以下状态：

```javascript
// 主要状态示例
const [currentSymbol, setCurrentSymbol] = useState(null);
const [currentCharacter, setCurrentCharacter] = useState(null);
const [currentWord, setCurrentWord] = useState(null);
const [userInput, setUserInput] = useState('');
const [score, setScore] = useState(0);
const [totalAttempts, setTotalAttempts] = useState(0);
const [accuracy, setAccuracy] = useState(100);
const [gameStarted, setGameStarted] = useState(false);
const [timeLeft, setTimeLeft] = useState(180);
const [gameDuration, setGameDuration] = useState(180);
const [practiceType, setPracticeType] = useState('bopomofo');
```

### 核心功能实现

#### 随机生成练习内容
```javascript
const generateRandomItem = (type) => {
  if (type === 'bopomofo') {
    const randomIndex = Math.floor(Math.random() * allSymbols.length);
    return allSymbols[randomIndex];
  } else if (type === 'chinese') {
    const randomIndex = Math.floor(Math.random() * chineseCharacters.length);
    return chineseCharacters[randomIndex];
  } else if (type === 'word') {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }
};
```

#### 键盘按键与注音符号映射
应用实现了标准键盘到注音符号的映射，使普通键盘能够输入注音符号：

```javascript
const findBopomofoSymbol = (key) => {
  // 键盘布局映射实现
  const keyboardMapping = {
    '1': bopomofoData.consonants.find(item => item.symbol === 'ㄅ'),
    'q': bopomofoData.consonants.find(item => item.symbol === 'ㄆ'),
    // ... 其他按键映射
  };
  return keyboardMapping[key.toLowerCase()] || null;
};
```

#### 计时功能
```javascript
useEffect(() => {
  let timer;
  if (gameStarted && timeLeft > 0) {
    timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
  } else if (timeLeft === 0 && gameStarted) {
    // 游戏结束处理
    setGameStarted(false);
  }
  return () => clearTimeout(timer);
}, [gameStarted, timeLeft]);
```

## 自定义与扩展

### 添加新的练习内容
可以通过修改App.js中的`chineseCharacters`或`words`数组添加新的练习内容：

```javascript
// 添加新汉字\chineseCharacters.push({
  character: '新',
  pinyin: 'xīn',
  bopomofo: 'ㄒㄧㄣ'
});

// 添加新词语
words.push({
  word: '你好世界',
  pinyin: 'nǐ hǎo shì jiè',
  bopomofo: 'ㄋㄧˇ ㄏㄠˇ ㄕˋ ㄐㄧㄝˋ'
});
```

### 修改样式
可以通过编辑App.css文件自定义应用的外观，主要可定制部分：
- 颜色方案
- 字体大小
- 布局间距
- 键盘样式

## 故障排除

### 常见问题

#### 无法启动应用
- 确保已安装所有依赖：`npm install`
- 检查Node.js版本是否符合要求

#### 练习过程中没有反应
- 检查是否选择了正确的练习模式
- 确认键盘输入是否被其他应用拦截

#### 样式显示异常
- 清除浏览器缓存
- 检查CSS文件是否被正确加载

## 许可证信息

本项目采用MIT许可证。详情请参见LICENSE文件。

## 致谢

- 参考了标准注音符号键盘布局
- 使用Create React App构建基础框架
- 采用web-vitals进行性能监控

---

文档版本: 1.0
最后更新: " + new Date().toLocaleDateString() + "
作者: 自动生成