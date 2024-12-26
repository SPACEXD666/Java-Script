const fs = require('fs');

function buildAutomata(substring) {
    const len = substring.length;
    const alph = new Map();
    
    // Определяем алфавит
    for (const char of substring) {
        alph.set(char, 0);
    }

    // Построение таблицы переходов
    const delta = Array.from({ length: len + 1 }, () => new Map());
    for (const char of alph.keys()) {
        delta[0].set(char, 0);
    }

    for (let j = 0; j < len; j++) {
        const prev = delta[j].get(substring[j]) || 0;
        delta[j].set(substring[j], j + 1);
        for (const char of alph.keys()) {
            delta[j + 1].set(char, delta[prev].get(char) || 0);
        }
    }

    return { delta, alph };
}

function automataSearch(string, substring) {
    const startTime = performance.now();
    const { delta, alph } = buildAutomata(substring);

    const indices = [];
    const len = substring.length;
    let state = 0;

    for (let i = 0; i < string.length; i++) {
        const char = string[i];
        if (alph.has(char)) {
            state = delta[state].get(char) || 0;
        } else {
            state = 0;
        }
        if (state === len) {
            indices.push(i - len + 1);
        }
    }

    return {
        Time: performance.now() - startTime,
        Indices: indices,
    };
}

// Основная программа
try {
    const [inputFile, codeWord] = process.argv.slice(2);

    if (!fs.existsSync(inputFile) || !fs.existsSync(codeWord)) {
        throw new Error("Файл не найден.");
    }

    const string = fs.readFileSync(inputFile, 'utf8');
    const substring = fs.readFileSync(codeWord, 'utf8').trim();

    if (!string || !substring) {
        throw new Error("Один из файлов пуст.");
    }

    const result = automataSearch(string, substring);
    console.log(result);
    console.log("Выполнение закончилось.");
} catch (error) {
    console.error("ERROR:", error.message);
}
