// Функция для вычисления хэша строки
function computeHash(text) {
    return [...text].reduce((sum, char) => sum + char.charCodeAt(0), 0);
}

// Поиск подстроки методом полного перебора
function bruteForce(text, textToFind) {
    const substringLength = textToFind.length;
    const textLength = text.length;
    const indices = [];

    for (let i = 0; i <= textLength - substringLength; i++) {
        if (text.slice(i, i + substringLength) === textToFind) {
            indices.push(i);
        }
    }

    return indices;
}

// Поиск подстроки методом хэширования
function ascii_hashes(text, textToFind) {
    const substringLength = textToFind.length;
    const textLength = text.length;
    const indices = [];

    const targetHash = computeHash(textToFind); // Хэш искомой подстроки
    let currentHash = computeHash(text.slice(0, substringLength)); // Хэш первого окна
    let collisions = 0;

    for (let i = 0; i <= textLength - substringLength; i++) {
        if (currentHash === targetHash) {
            if (text.slice(i, i + substringLength) === textToFind) {
                indices.push(i);
            } else {
                collisions++;
            }
        }

        // Обновляем хэш для следующего окна
        if (i + substringLength < textLength) {
            currentHash += 
                text[i + substringLength].charCodeAt(0) - text[i].charCodeAt(0);
        }
    }

    console.log(`Количество коллизий: ${collisions}`);
    return indices;
}


console.log("Метод полного перебора:", bruteForce('abcabcabcabcabcabcabcabcabcabc', 'abc')); 

console.log("Метод хэширования:", ascii_hashes('abcabcabcabcabcabcabcabcabcabc', 'abc')); 
