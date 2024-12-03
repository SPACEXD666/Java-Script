const fs = require('fs').promises;

/* Главная функция */
async function processFile() {
    try {
        const [operation, inputFile, outputFile] = process.argv.slice(2);

        if (!operation || !inputFile || !outputFile) {
            throw new Error("Использование: node rle.js <encode|decode> <входной файл> <выходной файл>");
        }

        if (inputFile === outputFile) {
            throw new Error('Ошибка: входной и выходной файл не могут совпадать.');
        }

        const content = await fs.readFile(inputFile, 'utf-8');

        let result;
        if (operation === 'encode') {
            result = encode(content);
            console.log(`Файл закодирован и сохранён в ${outputFile}.`);
        } else if (operation === 'decode') {
            result = decode(content);
            console.log(`Файл декодирован и сохранён в ${outputFile}.`);
        } else {
            throw new Error("Неизвестная операция. Используйте 'encode' или 'decode'.");
        }

        await fs.writeFile(outputFile, result, 'utf-8');
    } catch (err) {
        console.error("Ошибка:", err.message);
    }
}

/* Функция для кодирования */
function encode(str) {
    const result = [];
    let count = 1;

    for (let i = 1; i <= str.length; i++) {
        if (str[i] === str[i - 1] && count < 256) {
            count++;
        } else {
            if (count > 2 || str[i - 1] === '#') {
                result.push(`#${count}${str[i - 1]}`);
            } else {
                result.push(str.slice(i - count, i));
            }
            count = 1;
        }
    }
    return result.join('');
}


/* Функция для декодирования */
function decode(str) {
    const result = [];
    for (let i = 0; i < str.length; i++) {
        if (str[i] === '#') {
            const match = str.slice(i).match(/^#(\d+(?!#))(.)/);
            if (match) {
                const count = parseInt(match[1], 10);
                result.push(match[2].repeat(count));
                i += match[0].length - 1;
            }
        } else {
            result.push(str[i]);
        }
    }
    return result.join('');
}

processFile();
/* для кодирования: node rle.js encode input.txt output.txt
для декодирования: node rle.js decode input.txt output.txt 
*/
