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
      { symbol: '·', key: '7', name: '轻声' },
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

  // 词语练习数据
  const words = [
    { word: '你好', pinyin: 'nǐ hǎo', bopomofo: 'ㄋㄧˇ ㄏㄠˇ' },
    { word: '谢谢', pinyin: 'xiè xie', bopomofo: 'ㄒㄧㄝˋ ㄒㄧㄝ˙' },
    { word: '再见', pinyin: 'zài jiàn', bopomofo: 'ㄗㄞˋ ㄐㄧㄢˋ' },
    { word: '对不起', pinyin: 'duì bu qǐ', bopomofo: 'ㄉㄨㄟˋ ㄅㄨ˙ ㄑㄧˇ' },
    { word: '没关系', pinyin: 'méi guān xi', bopomofo: 'ㄇㄟˊ ㄍㄨㄢ ㄒㄧ˙' },
    { word: '早上好', pinyin: 'zǎo shàng hǎo', bopomofo: 'ㄗㄠˇ ㄕㄤˋ ㄏㄠˇ' },
    { word: '晚上好', pinyin: 'wǎn shàng hǎo', bopomofo: 'ㄨㄢˇ ㄕㄤˋ ㄏㄠˇ' },
    { word: '谢谢', pinyin: 'xiè xie', bopomofo: 'ㄒㄧㄝˋ ㄒㄧㄝ˙' },
    { word: '请', pinyin: 'qǐng', bopomofo: 'ㄑㄧㄥˇ' },
    { word: '不客气', pinyin: 'bú kè qì', bopomofo: 'ㄅㄨˊ ㄎㄜˋ ㄑㄧˋ' },
  ];

  // 汉字练习数据
  const chineseCharacters = [
    { character: '的', pinyin: 'de', bopomofo: 'ㄉㄜ' },
    { character: '一', pinyin: 'yi', bopomofo: 'ㄧ' },
    { character: '是', pinyin: 'shi', bopomofo: 'ㄕˋ' },
    { character: '在', pinyin: 'zai', bopomofo: 'ㄗㄞˋ' },
    { character: '不', pinyin: 'bu', bopomofo: 'ㄅㄨˋ' },
    { character: '了', pinyin: 'le', bopomofo: 'ㄌㄜˋ' },
    { character: '有', pinyin: 'you', bopomofo: 'ㄧㄡˇ' },
    { character: '人', pinyin: 'ren', bopomofo: 'ㄖㄣˊ' },
    { character: '这', pinyin: 'zhe', bopomofo: 'ㄓㄜˋ' },
    { character: '他', pinyin: 'ta', bopomofo: 'ㄊㄚ' },
    { character: '来', pinyin: 'lai', bopomofo: 'ㄌㄞˊ' },
    { character: '上', pinyin: 'shang', bopomofo: 'ㄕㄜˊ' },
    { character: '个', pinyin: 'ge', bopomofo: 'ㄍㄜˋ' },
    { character: '们', pinyin: 'men', bopomofo: 'ㄇㄣˊ' },
    { character: '中', pinyin: 'zhong', bopomofo: 'ㄓㄨㄥˊ' },
    { character: '为', pinyin: 'wei', bopomofo: 'ㄨㄟˊ' },
    { character: '和', pinyin: 'he', bopomofo: 'ㄏㄜˊ' },
    { character: '国', pinyin: 'guo', bopomofo: 'ㄍㄨㄛˊ' },
    { character: '我', pinyin: 'wo', bopomofo: 'ㄨㄛˇ' },
    { character: '你', pinyin: 'ni', bopomofo: 'ㄋㄧˇ' },
    { character: '他', pinyin: 'ta', bopomofo: 'ㄊㄚ' },
    { character: '很', pinyin: 'hen', bopomofo: 'ㄏㄣˇ' },
    { character: '好', pinyin: 'hao', bopomofo: 'ㄏㄠˇ' },
    { character: '吗', pinyin: 'ma', bopomofo: 'ㄇㄚ˙' },
    { character: '呢', pinyin: 'ne', bopomofo: 'ㄋㄜ˙' },
    { character: '啊', pinyin: 'a', bopomofo: 'ㄚ' },
    { character: '呀', pinyin: 'ya', bopomofo: 'ㄧㄚ' },
    { character: '哦', pinyin: 'o', bopomofo: 'ㄛ' },
    { character: '嗯', pinyin: 'en', bopomofo: 'ㄣ' },
  ];

  // 文章练习数据
  const articles = [
    { 
      title: '春晓', 
      content: '春眠不觉晓，处处闻啼鸟。夜来风雨声，花落知多少。', 
      pinyin: 'chūn mián bù jué xiǎo, chù chù wén tí niǎo. yè lái fēng yǔ shēng, huā luò zhī duō shǎo.', 
      bopomofo: 'ㄔㄨㄣˊ ㄇㄧㄢˊ ㄅㄨˋ ㄐㄩㄝˊ ㄒㄧㄠˇ, ㄔㄨˋ ㄔㄨˋ ㄨㄣˊ ㄊㄧˊ ㄋㄧㄠˇ. ㄧㄝˋ ㄌㄞˊ ㄈㄥ ㄧㄩˇ ㄕㄥ, ㄏㄨㄚ ㄌㄨㄛˋ ㄓ ㄉㄨㄛ ㄕㄠˇ.' 
    },
    { 
      title: '静夜思', 
      content: '床前明月光，疑是地上霜。举头望明月，低头思故乡。', 
      pinyin: 'chuáng qián míng yuè guāng, yí shì dì shàng shuāng. jǔ tóu wàng míng yuè, dī tóu sī gù xiāng.', 
      bopomofo: 'ㄔㄨㄤˊ ㄑㄧㄢˊ ㄇㄧㄥˊ ㄧㄩㄝˋ ㄍㄨㄤ, ㄧˊ ㄕˋ ㄉㄧˋ ㄕㄤˋ ㄕㄨㄤ. ㄐㄧˇ ㄊㄡˊ ㄨㄤˋ ㄇㄧㄥˊ ㄧㄩㄝˋ, ㄉㄧ ㄊㄡˊ ㄙㄧ ㄍㄨˋ ㄒㄧㄤ.' 
    }
  ];

  // 状态
  const [currentSymbol, setCurrentSymbol] = useState(null);
  const [currentCharacter, setCurrentCharacter] = useState(null);
  const [currentWord, setCurrentWord] = useState(null);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 180秒倒计时

  const [gameDuration, setGameDuration] = useState(180); // 游戏时长设置，默认180秒
  const [practiceType, setPracticeType] = useState('bopomofo'); // 'bopomofo' 或 'chinese'



  // 生成随机符号或汉字
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
    } else if (type === 'article') {
      const randomIndex = Math.floor(Math.random() * articles.length);
      return articles[randomIndex];
    }
  }

  // 开始游戏
  const startGame = (type = 'bopomofo') => {
    setPracticeType(type);
    setGameStarted(true);
    setScore(0);
    setTotalAttempts(0);
    setAccuracy(100);
    setTimeLeft(gameDuration);
    const randomItem = generateRandomItem(type);
    if (type === 'bopomofo') {
      setCurrentSymbol(randomItem);
      setCurrentCharacter(null);
      setCurrentWord(null);
    } else if (type === 'chinese') {
      setCurrentCharacter(randomItem);
      setCurrentSymbol(null);
      setCurrentWord(null);
    } else if (type === 'word') {
      setCurrentWord(randomItem);
      setCurrentSymbol(null);
      setCurrentCharacter(null);
    } else if (type === 'article') {
      setCurrentWord(randomItem); // 使用setCurrentWord来存储文章
      setCurrentSymbol(null);
      setCurrentCharacter(null);
    }
    setUserInput('');
    if (type === 'word') {
      setCurrentWord(randomItem);
      setCurrentSymbol(null);
      setCurrentCharacter(null);
    }
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
      '·': '7' // 轻声映射到7键
    };

    return symbolToKeyMap[symbol] || currentSymbol.key;
  };

  // 处理用户输入 - 修改为自动识别
  const handleKeyPress = (e) => {
    e.preventDefault();
    
    // 汉字模式下仅在Enter键按下时处理
    if (['chinese', 'word', 'article'].includes(practiceType)) {
        if (e.type !== 'keypress' || e.key !== 'Enter') {
          return;
        }
      }
    
    const input = e.target.value;
    // 注音模式下实时更新输入
    if (practiceType === 'bopomofo') {
      setUserInput(input);
    }

      // 获取当前练习类型对应的正确答案
      let correctAnswer = '';
      let convertedInput = '';
      if (practiceType === 'bopomofo') {
        // 将用户输入的按键转换为对应的注音符号
        convertedInput = input.split('').map(key => {
          const symbolObj = findBopomofoSymbol(key);
          return symbolObj ? symbolObj.symbol : '';
        }).join('');
        correctAnswer = currentSymbol.symbol;
      } else if (practiceType === 'chinese') {
        correctAnswer = currentCharacter.character;
      } else if (practiceType === 'word') {
        correctAnswer = currentWord.word;
      } else if (practiceType === 'article') {
        correctAnswer = currentWord.content;
      }

      // 检查输入是否匹配正确答案
      // 实时检查是否完全匹配
    if (correctAnswer && input !== '' && ((practiceType === 'bopomofo' && convertedInput === correctAnswer) || (['chinese', 'word', 'article'].includes(practiceType) && input === correctAnswer))) {
        // 正确匹配
        setScore(score + 1);
        setTotalAttempts(totalAttempts + 1);
        // 生成新的随机项
        const randomItem = generateRandomItem(practiceType);
        if (practiceType === 'bopomofo') {
          setCurrentSymbol(randomItem);
          setCurrentCharacter(null);
          setCurrentWord(null);
        } else if (practiceType === 'chinese') {
          setCurrentCharacter(randomItem);
          setCurrentSymbol(null);
          setCurrentWord(null);
        } else if (practiceType === 'word') {
          setCurrentWord(randomItem);
          setCurrentSymbol(null);
          setCurrentCharacter(null);
        } else if (practiceType === 'article') {
          setCurrentWord(randomItem);
          setCurrentSymbol(null);
          setCurrentCharacter(null);
        }
        setUserInput('');
      } else if ((practiceType === 'bopomofo' && correctAnswer.startsWith(convertedInput)) || (practiceType === 'chinese' && correctAnswer.startsWith(input))) {

        // 部分匹配，继续输入
      } else {
        // 错误匹配
        setTotalAttempts(totalAttempts + 1);
        // 仅在注音模式下清空输入，中文模式保留输入让用户继续尝试
        setUserInput('');
        // 保留当前题目，让用户重试

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
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'],
    // 第二行 - QWERTY
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    // 第三行 - ASDFGHJKL
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
    // 第四行 - ZXCVBNM
    ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/']
  ];

  // 标点符号映射
  const punctuationMap = {
    '-': 'ㄦ',
    ';': 'ㄤ',
    ',': 'ㄝ',
    '.': 'ㄡ',
    '/': 'ㄥ'
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
                key={item.symbol} className={`key-item ${(currentSymbol && currentSymbol.symbol === item.symbol) || (practiceType === 'chinese' && currentCharacter && currentCharacter.bopomofo && currentCharacter.bopomofo.includes(item.symbol)) || (practiceType === 'word' && currentWord && currentWord.bopomofo && currentWord.bopomofo.includes(item.symbol)) ? 'active' : ''}`}
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
                className={`key-item ${(currentSymbol && currentSymbol.symbol === item.symbol) || (practiceType === 'chinese' && currentCharacter && currentCharacter.bopomofo && currentCharacter.bopomofo.includes(item.symbol)) || (practiceType === 'word' && currentWord && currentWord.bopomofo && currentWord.bopomofo.includes(item.symbol)) ? 'active' : ''}`}
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
                className={`key-item ${(currentSymbol && currentSymbol.symbol === item.symbol) || (practiceType === 'chinese' && currentCharacter && currentCharacter.bopomofo && currentCharacter.bopomofo.includes(item.symbol)) || (practiceType === 'word' && currentWord && currentWord.bopomofo && currentWord.bopomofo.includes(item.symbol)) ? 'active' : ''}`}
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
                className={`key-item ${(currentSymbol && currentSymbol.symbol === item.symbol) || (practiceType === 'chinese' && currentCharacter && currentCharacter.bopomofo && currentCharacter.bopomofo.includes(item.symbol)) || (practiceType === 'word' && currentWord && currentWord.bopomofo && currentWord.bopomofo.includes(item.symbol)) ? 'active' : ''}`}
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
              <button onClick={() => startGame('bopomofo')}>注音符号练习</button>
              <button onClick={() => startGame('chinese')}>汉字练习</button>
              <button onClick={() => startGame('word')}>词语练习</button>
              <button onClick={() => startGame('article')}>文章练习</button>
            </div>
            <div className="time-settings">
              <h3>选择游戏时长</h3>
              <div className="time-buttons">
                <button onClick={() => setGameDuration(60)} className={gameDuration === 60 ? 'active' : ''}>1分钟</button>
                <button onClick={() => setGameDuration(120)} className={gameDuration === 120 ? 'active' : ''}>2分钟</button>
                <button onClick={() => setGameDuration(180)} className={gameDuration === 180 ? 'active' : ''}>3分钟</button>
                <button onClick={() => setGameDuration(300)} className={gameDuration === 300 ? 'active' : ''}>5分钟</button>
              </div>
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
                <button className="time-adjust-btn" onClick={() => {
                  // 暂停游戏并显示时间调整对话框
                  setGameStarted(false);
                }}>返回</button>
              </div>
            </div>

            <div className="typing-area">
              <div className="current-symbol">
                {practiceType === 'bopomofo' && currentSymbol && (
                  <> 
                    <div className="symbol-display">{currentSymbol.symbol}</div>
                    <div className="symbol-info">
                      <p>输入: {getKeyForSymbol(currentSymbol.symbol)}</p>
                      <p>发音: {currentSymbol.key}</p>
                    </div>
                  </>
                )}
                {practiceType === 'chinese' && currentCharacter && (
                  <> 
                    <div className="character-display">{currentCharacter.character}</div>
                    <div className="character-info">
                      <p>拼音: {currentCharacter.pinyin}</p>
                      <p>注音: {currentCharacter.bopomofo}</p>
                    </div>
                  </>
                )}
                {practiceType === 'word' && currentWord && (
                  <> 
                    <div className="word-display">{currentWord.word}</div>
                    <div className="word-info">
                      <p>拼音: {currentWord.pinyin}</p>
                      <p>注音: {currentWord.bopomofo}</p>
                    </div>
                  </>
                )}
                {practiceType === 'article' && currentWord && (
                  <> 
                    <div className="article-title">{currentWord.title}</div>
                    <div className="article-content">{currentWord.content}</div>
                    <div className="article-info">
                      <p>拼音: {currentWord.pinyin}</p>
                      <p>注音: {currentWord.bopomofo}</p>
                    </div>
                  </>
                )}
              </div>
              <input
                type="text"
                value={userInput}
                onChange={practiceType === 'bopomofo' ? handleKeyPress : (e) => setUserInput(e.target.value)}
                onKeyPress={['chinese', 'word', 'article'].includes(practiceType) ? handleKeyPress : undefined}
                placeholder={practiceType === 'bopomofo' ? "输入对应的注音符号" : practiceType === 'chinese' ? "输入对应的汉字" : practiceType === 'word' ? "输入对应的词语" : "输入对应的文章内容"}
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
                      const isActive = bopomofoSymbol && (
  (practiceType === 'bopomofo' && currentSymbol?.symbol === bopomofoSymbol.symbol) ||
  (practiceType === 'chinese' && currentCharacter?.bopomofo?.includes(bopomofoSymbol.symbol)) ||
  (practiceType === 'word' && currentWord?.bopomofo?.includes(bopomofoSymbol.symbol)) ||
  (practiceType === 'article' && currentWord?.bopomofo?.includes(bopomofoSymbol.symbol))
);

                      // 根据键位确定手指类别
                      let fingerClass = '';
                      if (rowIndex === 0) { // 第一行 - 数字键
                        if (keyIndex === 0) fingerClass = 'left-pinky';
                        else if (keyIndex === 1) fingerClass = 'left-ring';
                        else if (keyIndex === 2) fingerClass = 'left-middle';
                        else if (keyIndex === 3 || keyIndex === 4) fingerClass = 'left-index';
                        else if (keyIndex === 5 || keyIndex === 6) fingerClass = 'right-index';
                        else if (keyIndex === 7) fingerClass = 'right-middle';
                        else if (keyIndex === 8) fingerClass = 'right-ring';
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
        <p>© 2025 bopomofo注音(ㄅㄆㄇㄈ)打字练习</p>
      </footer>
    </div>
  );
}

export default App;
