function boyerMooreSearch(text, pattern) {
    const textLength = text.length;
    const patternLength = pattern.length;
    const matchPositions = [];

    // Функция для создания таблицы плохих символов
    function createBadCharTable(pattern) {
        const badCharTable = {};
        for (let i = 0; i < pattern.length; i++) {
            badCharTable[pattern[i]] = i + 1;
        }
        return badCharTable;
    }

    // Препроцессинг правила хорошего суффикса
    function preprocessGoodSuffix(shiftTable, suffixPositions, pattern, patternLength) {
        let i = patternLength;
        let j = patternLength + 1;
        suffixPositions[i] = j;

        while (i > 0) {
            while (j <= patternLength && pattern[i - 1] !== pattern[j - 1]) {
                if (shiftTable[j] === 0) {
                    shiftTable[j] = j - i;
                }
                j = suffixPositions[j];
            }
            i--;
            j--;
            suffixPositions[i] = j;
        }
    }

    // Препроцессинг для случая, когда нет совпадений с текущим суффиксом
    function preprocessWeakSuffix(shiftTable, suffixPositions, patternLength) {
        let j = suffixPositions[0];
        for (let i = 0; i <= patternLength; i++) {
            if (shiftTable[i] === 0) {
                shiftTable[i] = j;
            }
            if (i === j) {
                j = suffixPositions[j];
            }
        }
    }

    const badCharTable = createBadCharTable(pattern);
    const shiftTable = new Array(patternLength + 1).fill(0);
    const suffixPositions = new Array(patternLength + 1);
    preprocessGoodSuffix(shiftTable, suffixPositions, pattern, patternLength);
    preprocessWeakSuffix(shiftTable, suffixPositions, patternLength);

    console.log("Bad Character Table:", badCharTable);
    console.table(shiftTable.map((value, index) => ({ Index: index, Shift: value })));

    let offset = 0;
    while (offset <= textLength - patternLength) {
        let j = patternLength - 1;

        while (j >= 0 && pattern[j] === text[offset + j]) {
            j--;
        }

        if (j < 0) {
            matchPositions.push(offset);
            offset += shiftTable[0];
        } else {
            const badCharShift = (badCharTable[text[offset + j]] ?? 0);
            const goodSuffixShift = shiftTable[j + 1];
            offset += Math.max(patternLength - badCharShift - 1, goodSuffixShift);
        }
    }

    return matchPositions;
}

// Пример использования
const text = "abcabcaabbccabcdabcdabcabcda";
const pattern = "abcd";
const result = boyerMooreSearch(text, pattern);
console.log("Match positions:", result);
