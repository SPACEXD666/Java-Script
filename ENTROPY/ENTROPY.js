const fs = require("fs");

function Shanon_ent(text) {
    let freq = {};
    let H_x = 0;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];
        freq[char] = (freq[char] || 0) + 1;
    }

    for (let char in freq) {
        const Pi_value = freq[char] / text.length;
        H_x -= Pi_value * Math.log2(Pi_value);
    }

    return H_x;
}

const filePath = process.argv[2];

if (!filePath) {
    console.log("Ошибка: укажите путь к файлу.");
    process.exit(1);
}

try {
    let text = fs.readFileSync(filePath, 'utf-8');
    console.log("Энтропия Шеннона: " + Shanon_ent(text));
} catch (err) {
    console.error("Ошибка при чтении файла:", err.message);
}