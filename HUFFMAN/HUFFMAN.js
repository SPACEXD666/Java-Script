const fs = require('fs');
const inputString = fs.readFileSync('input_string.txt', 'utf8');

// Класс для представления узла дерева Хаффмана
class Node {
  constructor(name, freq) {
    this.name = name;
    this.freq = freq;
    this.left = null;
    this.right = null;
    this.code = '';
  }
}

// Функция декодирования с использованием словаря Хаффмана
function decodeHuffman(binaryString, huffmanAlphabet) {
  let decodedString = "";
  let currentCode = "";

  for (let bit of binaryString) {
    currentCode += bit;
    if (huffmanAlphabet[currentCode]) {
      decodedString += huffmanAlphabet[currentCode];
      currentCode = "";
    }
  }

  return decodedString;
}

// Создание таблицы частот
function buildFrequencyTable(str) {
  const freqTable = {};
  for (let char of str) {
    freqTable[char] = (freqTable[char] || 0) + 1;
  }
  return freqTable;
}

// Построение дерева Хаффмана
function buildHuffmanTree(freqTable) {
  const nodes = Object.keys(freqTable).map(char => new Node(char, freqTable[char]));

  while (nodes.length > 1) {
    // Сортируем узлы по частоте
    nodes.sort((a, b) => a.freq - b.freq);

    // Извлекаем два узла с наименьшей частотой
    const left = nodes.shift();
    const right = nodes.shift();

    // Создаем новый узел, который соединяет два предыдущих
    const newNode = new Node(left.name + right.name, left.freq + right.freq);
    newNode.left = left;
    newNode.right = right;

    // Добавляем новый узел обратно в список
    nodes.push(newNode);
  }

  return nodes[0];
}

// Генерация кодов Хаффмана для каждого символа
function generateCodes(node, code = '', huffmanAlphabet = {}) {
  if (node.left === null && node.right === null) {
    huffmanAlphabet[code] = node.name;
  } else {
    if (node.left) generateCodes(node.left, code + '0', huffmanAlphabet);
    if (node.right) generateCodes(node.right, code + '1', huffmanAlphabet);
  }
  return huffmanAlphabet;
}

// Основная логика
const freqTable = buildFrequencyTable(inputString);
const huffmanTree = buildHuffmanTree(freqTable);
const huffmanAlphabet = generateCodes(huffmanTree);

console.log("Коды Хаффмана для символов:");
for (let char in huffmanAlphabet) {
  console.log(`${char}: ${huffmanAlphabet[char]}`);
}

const encoded = '01011';
console.log("Декодированная строка:", decodeHuffman(encoded, huffmanAlphabet));
