import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // 注音符号数据
  const bopomofoData = {
    consonants: [
      { symbol: 'ㄅ', key: 'b', name: 'b' },
      { symbol: 'ㄆ', key: 'p', name: 'p' },
      { symbol: 'ㄇ', key: 'm', name: 'm' },
      { symbol: 'ㄈ', key: 'f', name: 'f' },
      { symbol: 'ㄉ', key: 'd', name: 'd' },
      { symbol: 'ㄊ', key: 't', name: 't' },
      { symbol: 'ㄋ', key: 'n', name: 'n' },
      { symbol: 'ㄌ', key: 'l', name: 'l' },
      { symbol: 'ㄍ', key: 'g', name: 'g' },
      { symbol: 'ㄎ', key: 'k', name: 'k' },
      { symbol: 'ㄏ', key: 'h', name: 'h' },
      { symbol: 'ㄐ', key: 'j', name: 'j' },
      { symbol: 'ㄑ', key: 'q', name: 'q' },
      { symbol: 'ㄒ', key: 'x', name: 'x' },
      { symbol: 'ㄓ', key: 'zh', name: 'zh' },
      { symbol: 'ㄔ', key: 'ch', name: 'ch' },
      { symbol: 'ㄕ', key: 'sh', name: 'sh' },
      { symbol: 'ㄖ', key: 'r', name: 'r' },
      { symbol: 'ㄗ', key: 'z', name: 'z' },
      { symbol: 'ㄘ', key: 'c', name: 'c' },
      { symbol: 'ㄙ', key: 's', name: 's' },
    ],
    vowels: [
      { symbol: 'ㄚ', key: 'a', name: 'a' },
      { symbol: 'ㄛ', key: 'o', name: 'o' },
      { symbol: 'ㄜ', key: 'e', name: 'e' },
      { symbol: 'ㄝ', key: 'ê', name: 'ê' },
      { symbol: 'ㄞ', key: 'ai', name: 'ai' },
      { symbol: 'ㄟ', key: 'ei', name: 'ei' },
      { symbol: 'ㄠ', key: 'ao', name: 'ao' },
      { symbol: 'ㄡ', key: 'ou', name: 'ou' },
      { symbol: 'ㄢ', key: 'an', name: 'an' },
      { symbol: 'ㄣ', key: 'en', name: 'en' },
      { symbol: 'ㄤ', key: 'ang', name: 'ang' },
      { symbol: 'ㄥ', key: 'eng', name: 'eng' },
      { symbol: 'ㄦ', key: 'er', name: 'er' },
    ],
    medials: [
      { symbol: 'ㄧ', key: 'i', name: 'i' },
      { symbol: 'ㄨ', key: 'u', name: 'u' },
      { symbol: 'ㄩ', key: 'ü', name: 'ü' },
    ],
    tones: [
      { symbol: '', key: '7', name: '轻声' },
      { symbol: 'ˉ', key: ' ', name: '第一声' },
      { symbol: 'ˊ', key: '6', name: '第二声' },
      { symbol: 'ˇ', key: '3', name: '第三声' },
      { symbol: 'ˋ', key: '4', name: '第四声' },
    ]
  };

  // 所有注音符号的平面数组
  const allSymbols = [
    ...bopomofoData.consonants,
    ...bopomofoData.medials,
    ...bopomofoData.vowels,
    ...bopomofoData.tones.filter(tone => tone.symbol !== '')
  ];

  // 状态
  const [currentSymbol, setCurrentSymbol] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60); // 60秒倒计时
  const [gameMode, setGameMode] = useState('practice'); // 'practice' 或 'test'

  // 使用gameMode变量
  useEffect(() => {
    if (gameStarted) {
      console.log(`当前模式: ${gameMode}`);
    }
  }, [gameStarted, gameMode]);

  // 生成随机符号
  const generateRandomSymbol = () => {
    const randomIndex = Math.floor(Math.random() * allSymbols.length);
    return allSymbols[randomIndex];
  };

  // 开始游戏
  const startGame = (mode) => {
    setGameMode(mode);
    setGameStarted(true);
    setScore(0);
    setTotalAttempts(0);
    setAccuracy(100);
    setTimeLeft(60);
    setCurrentSymbol(generateRandomSymbol());
    setUserInput('');
  };

  // 获取符号对应的键盘按键
  const getKeyForSymbol = (symbol) => {
    // 标准注音键盘布局的反向映射
    const symbolToKeyMap = {
      // 声母
      'ㄅ': '1',
      'ㄆ': 'q',
      'ㄇ': 'a',
      'ㄈ': 'z',
      'ㄉ': '2',
      'ㄊ': 'w',
      'ㄋ': 's',
      'ㄌ': 'x',
      'ㄍ': 'e',
      'ㄎ': 'd',
      'ㄏ': 'c',
      'ㄐ': 'r',
      'ㄑ': 'f',
      'ㄒ': 'v',
      'ㄓ': '5',
      'ㄔ': 't',
      'ㄕ': 'g',
      'ㄖ': 'b',
      'ㄗ': 'y',
      'ㄘ': 'h',
      'ㄙ': 'n',
      // 介音
      'ㄧ': 'u',
      'ㄨ': 'j',
      'ㄩ': 'm',
      // 韵母
      'ㄚ': '8',
      'ㄛ': 'i',
      'ㄜ': 'k',
      'ㄝ': ',',
      'ㄞ': '9',
      'ㄟ': 'o',
      'ㄠ': 'l',
      'ㄡ': '.',
      'ㄢ': '0',
      'ㄣ': 'p',
      'ㄤ': ';',
      'ㄥ': '/',
      'ㄦ': '-',
      // 声调
      'ˉ': ' ', // 第一声映射到空格键
      'ˊ': '6', // 第二声映射到6键
      'ˇ': '3',
      'ˋ': '4',
      '': '7' // 轻声映射到7键
    };

    return symbolToKeyMap[symbol] || currentSymbol.key;
  };

  // 处理用户输入
  const handleInputChange = (e) => {
    const input = e.target.value;
    setUserInput(input);

    // 获取当前符号对应的键盘按键
    const expectedKey = getKeyForSymbol(currentSymbol.symbol);

    // 检查输入是否匹配当前符号的键
    if (input.toLowerCase() === expectedKey.toLowerCase()) {
      // 正确匹配
      setScore(score + 1);
      setTotalAttempts(totalAttempts + 1);
      setCurrentSymbol(generateRandomSymbol());
      setUserInput('');
    } else if (expectedKey.toLowerCase().startsWith(input.toLowerCase())) {
      // 部分匹配，继续输入
    } else {
      // 错误匹配
      setTotalAttempts(totalAttempts + 1);
      setUserInput('');
      setCurrentSymbol(generateRandomSymbol());
    }

    // 更新准确率
    if (totalAttempts > 0) {
      setAccuracy(Math.round((score / totalAttempts) * 100));
    }
  };

  // 倒计时效果
  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && gameStarted) {
      // 游戏结束
      setGameStarted(false);
    }

    return () => clearTimeout(timer);
  }, [gameStarted, timeLeft]);

  // 键盘布局定义
  const keyboardLayout = [
    // 第一行 - 数字键
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
    // 第二行 - QWERTY
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
    // 第三行 - ASDFGHJKL
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\''],
    // 第四行 - ZXCVBNM
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
  ];
  
  // 标点符号映射
  const punctuationMap = {
    '-': '—',
    '=': '＝',
    '[': '「',
    ']': '」',
    "'": "'",
    ';': '；',
    ',': '，',
    '.': '。',
    '/': '、'
  };

  // 查找键对应的注音符号 - 使用标准注音键盘布局
  const findBopomofoSymbol = (key) => {
    // 检查是否是标点符号
    if (punctuationMap[key]) {
      return { symbol: punctuationMap[key], key: key, name: `标点符号 ${punctuationMap[key]}` };
    }
    
    // 标准注音键盘布局映射 - 根据图片中的标准注音键盘布局
    const keyboardMapping = {
      // 第一行 - 数字键
      '1': bopomofoData.consonants.find(item => item.symbol === 'ㄅ'), // ㄅ
      '2': bopomofoData.consonants.find(item => item.symbol === 'ㄉ'), // ㄉ
      '3': bopomofoData.tones.find(item => item.key === '3'),
      '4': bopomofoData.tones.find(item => item.key === '4'),
      '5': bopomofoData.consonants.find(item => item.symbol === 'ㄓ'), // ㄓ
      '6': bopomofoData.tones.find(item => item.key === '6'), // 第二声
      '7': bopomofoData.tones.find(item => item.key === '7'), // 轻声
      '8': bopomofoData.vowels.find(item => item.symbol === 'ㄚ'), // ㄚ
      '9': bopomofoData.vowels.find(item => item.symbol === 'ㄞ'), // ㄞ
      ' ': bopomofoData.tones.find(item => item.key === ' '), // 第一声映射到空格键
      // 第二行 - QWERTY
      'q': bopomofoData.consonants.find(item => item.symbol === 'ㄆ'), // ㄆ
      'w': bopomofoData.consonants.find(item => item.symbol === 'ㄊ'), // ㄊ
      'e': bopomofoData.consonants.find(item => item.symbol === 'ㄍ'), // ㄍ
      'r': bopomofoData.consonants.find(item => item.symbol === 'ㄐ'), // ㄐ
      't': bopomofoData.consonants.find(item => item.symbol === 'ㄔ'), // ㄔ
      'y': bopomofoData.consonants.find(item => item.symbol === 'ㄗ'), // ㄗ
      'u': bopomofoData.medials.find(item => item.symbol === 'ㄧ'), // ㄧ
      'i': bopomofoData.vowels.find(item => item.symbol === 'ㄛ'), // ㄛ
      'o': bopomofoData.vowels.find(item => item.symbol === 'ㄟ'), // ㄟ
      'p': bopomofoData.vowels.find(item => item.symbol === 'ㄣ'), // ㄣ
      'm': bopomofoData.medials.find(item => item.symbol === 'ㄩ'), // ㄩ
      // 第三行 - ASDFGHJKL
      'a': bopomofoData.consonants.find(item => item.symbol === 'ㄇ'), // ㄇ
      's': bopomofoData.consonants.find(item => item.symbol === 'ㄋ'), // ㄋ
      'd': bopomofoData.consonants.find(item => item.symbol === 'ㄎ'), // ㄎ
      'f': bopomofoData.consonants.find(item => item.symbol === 'ㄑ'), // ㄑ
      'g': bopomofoData.consonants.find(item => item.symbol === 'ㄕ'), // ㄕ
      'h': bopomofoData.consonants.find(item => item.symbol === 'ㄘ'), // ㄘ
      'j': bopomofoData.medials.find(item => item.symbol === 'ㄨ'), // ㄨ
      'k': bopomofoData.vowels.find(item => item.symbol === 'ㄜ'), // ㄜ
      'l': bopomofoData.vowels.find(item => item.symbol === 'ㄠ'), // ㄠ
      ';': bopomofoData.vowels.find(item => item.symbol === 'ㄤ'), // ㄤ
      // 第四行 - ZXCVBNM
      'z': bopomofoData.consonants.find(item => item.symbol === 'ㄈ'), // ㄈ
      'x': bopomofoData.consonants.find(item => item.symbol === 'ㄌ'), // ㄌ
      'c': bopomofoData.consonants.find(item => item.symbol === 'ㄏ'), // ㄏ
      'v': bopomofoData.consonants.find(item => item.symbol === 'ㄒ'), // ㄒ
      'b': bopomofoData.consonants.find(item => item.symbol === 'ㄖ'), // ㄖ
      'n': bopomofoData.consonants.find(item => item.symbol === 'ㄙ'), // ㄙ
      '0': bopomofoData.vowels.find(item => item.symbol === 'ㄢ'), // ㄢ
      ',': bopomofoData.vowels.find(item => item.symbol === 'ㄝ'), // ㄝ
      '.': bopomofoData.vowels.find(item => item.symbol === 'ㄡ'), // ㄡ
      '/': bopomofoData.vowels.find(item => item.symbol === 'ㄥ'), // ㄥ
      '-': bopomofoData.vowels.find(item => item.symbol === 'ㄦ')  // ㄦ
    };

    return keyboardMapping[key.toLowerCase()] || null;
  };

  // 键盘布局组件
  const KeyboardLayout = () => {
    return (
      <div className="keyboard-layout">
        <div className="keyboard-section">
          <h3>声母</h3>
          <div className="key-grid">
            {bopomofoData.consonants.map((item) => (
              <div 
                key={item.symbol} 
                className={`key-item ${currentSymbol && currentSymbol.symbol === item.symbol ? 'active' : ''}`}
              >
                <div className="symbol">{item.symbol}</div>
                <div className="key-name">{item.key}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="keyboard-section">
          <h3>介音</h3>
          <div className="key-grid">
            {bopomofoData.medials.map((item) => (
              <div 
                key={item.symbol} 
                className={`key-item ${currentSymbol && currentSymbol.symbol === item.symbol ? 'active' : ''}`}
              >
                <div className="symbol">{item.symbol}</div>
                <div className="key-name">{item.key}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="keyboard-section">
          <h3>韵母</h3>
          <div className="key-grid">
            {bopomofoData.vowels.map((item) => (
              <div 
                key={item.symbol} 
                className={`key-item ${currentSymbol && currentSymbol.symbol === item.symbol ? 'active' : ''}`}
              >
                <div className="symbol">{item.symbol}</div>
                <div className="key-name">{item.key}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="keyboard-section">
          <h3>声调</h3>
          <div className="key-grid">
            {bopomofoData.tones.filter(tone => tone.symbol !== '').map((item) => (
              <div 
                key={item.symbol} 
                className={`key-item ${currentSymbol && currentSymbol.symbol === item.symbol ? 'active' : ''}`}
              >
                <div className="symbol">{item.symbol}</div>
                <div className="key-name">{item.key}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>注音符号（ㄅㄆㄇㄈ）打字练习</h1>
      </header>

      <main className="App-main">
        {!gameStarted ? (
          <div className="start-screen">
            <h2>选择模式</h2>
            <div className="mode-buttons">
              <button onClick={() => startGame('practice')}>练习模式</button>
              <button onClick={() => startGame('test')}>测试模式</button>
            </div>
            {totalAttempts > 0 && (
              <div className="last-score">
                <h3>上次成绩</h3>
                <p>得分: {score}</p>
                <p>准确率: {accuracy}%</p>
              </div>
            )}
          </div>
        ) : (
          <div className="game-screen">
            <div className="game-info">
              <div className="score-info">
                <p>得分: {score}</p>
                <p>准确率: {accuracy}%</p>
              </div>
              <div className="timer">
                <p>剩余时间: {timeLeft}秒</p>
              </div>
            </div>

            <div className="typing-area">
              <div className="current-symbol">
                {currentSymbol && (
                  <>
                    <div className="symbol-display">{currentSymbol.symbol}</div>
                    <div className="symbol-info">
                      <p>输入: {getKeyForSymbol(currentSymbol.symbol)}</p>
                    </div>
                  </>
                )}
              </div>
              <input
                type="text"
                value={userInput}
                onChange={handleInputChange}
                placeholder="输入对应的拼音"
                autoFocus
              />
            </div>

            <div className="virtual-keyboard">
               <h3>虚拟键盘布局</h3>
               <div className="keyboard-container">
                 {keyboardLayout.map((row, rowIndex) => (
                   <div key={`row-${rowIndex}`} className="keyboard-row">
                     {rowIndex === 3 && <div className="key-spacer"></div>}
                     {row.map((key, keyIndex) => {
                       const bopomofoSymbol = findBopomofoSymbol(key);
                       const isActive = currentSymbol && bopomofoSymbol && 
                                        currentSymbol.symbol === bopomofoSymbol.symbol;
                       
                       // 根据键位确定手指类别
                       let fingerClass = '';
                       if (rowIndex === 0) { // 第一行 - 数字键
                         if (keyIndex <= 1) fingerClass = 'left-pinky';
                         else if (keyIndex === 2) fingerClass = 'left-ring';
                         else if (keyIndex === 3) fingerClass = 'left-middle';
                         else if (keyIndex === 4 || keyIndex === 5) fingerClass = 'left-index';
                         else if (keyIndex === 6 || keyIndex === 7) fingerClass = 'right-index';
                         else if (keyIndex === 8) fingerClass = 'right-middle';
                         else if (keyIndex === 9) fingerClass = 'right-ring';
                         else fingerClass = 'right-pinky';
                       } else if (rowIndex === 1) { // 第二行 - QWERTY
                         if (keyIndex === 0) fingerClass = 'left-pinky';
                         else if (keyIndex === 1) fingerClass = 'left-ring';
                         else if (keyIndex === 2) fingerClass = 'left-middle';
                         else if (keyIndex === 3 || keyIndex === 4) fingerClass = 'left-index';
                         else if (keyIndex === 5 || keyIndex === 6) fingerClass = 'right-index';
                         else if (keyIndex === 7) fingerClass = 'right-middle';
                         else if (keyIndex === 8) fingerClass = 'right-ring';
                         else fingerClass = 'right-pinky';
                       } else if (rowIndex === 2) { // 第三行 - ASDFGHJKL
                         if (keyIndex === 0) fingerClass = 'left-pinky';
                         else if (keyIndex === 1) fingerClass = 'left-ring';
                         else if (keyIndex === 2) fingerClass = 'left-middle';
                         else if (keyIndex === 3 || keyIndex === 4) fingerClass = 'left-index';
                         else if (keyIndex === 5 || keyIndex === 6) fingerClass = 'right-index';
                         else if (keyIndex === 7) fingerClass = 'right-middle';
                         else if (keyIndex === 8) fingerClass = 'right-ring';
                         else fingerClass = 'right-pinky';
                       } else if (rowIndex === 3) { // 第四行 - ZXCVBNM
                         if (keyIndex === 0) fingerClass = 'left-pinky';
                         else if (keyIndex === 1) fingerClass = 'left-ring';
                         else if (keyIndex === 2) fingerClass = 'left-middle';
                         else if (keyIndex === 3 || keyIndex === 4) fingerClass = 'left-index';
                         else if (keyIndex === 5 || keyIndex === 6) fingerClass = 'right-index';
                         else if (keyIndex === 7) fingerClass = 'right-middle';
                         else if (keyIndex === 8) fingerClass = 'right-ring';
                         else fingerClass = 'right-pinky';
                       }
                       
                       return (
                         <div 
                           key={key} 
                           className={`keyboard-key ${fingerClass} ${isActive ? 'active' : ''} ${bopomofoSymbol ? 'has-symbol' : ''}`}
                         >
                           <div className="key-label">{key.toUpperCase()}</div>
                           {bopomofoSymbol && (
                             <div className="key-symbol">{bopomofoSymbol.symbol}</div>
                           )}
                         </div>
                       );
                     })}
                     {rowIndex === 3 && <div className="key-spacer"></div>}
                   </div>
                 ))}
                 <div className="keyboard-row">
                   <div className="keyboard-key space-key right-thumb">
                     <div className="key-label">空格</div>
                     {findBopomofoSymbol(' ') && (
                       <div className="key-symbol">{findBopomofoSymbol(' ').symbol}</div>
                     )}
                   </div>
                 </div>
               </div>
               <div className="keyboard-note">
                 <p>注: 多字符输入（如 "zh", "ang" 等）需要按顺序输入对应的按键</p>
               </div>
             </div>
            <KeyboardLayout />
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>© 2023 注音符号打字练习 | 参考 worldofkeyboards.com/bopomofo</p>
      </footer>
    </div>
  );
}

export default App;
