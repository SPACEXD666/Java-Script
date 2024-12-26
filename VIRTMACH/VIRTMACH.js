const fs = require('fs');
const readlineSync = require('readline-sync');

// Чтение и подготовка программы
let inputFile = process.argv[2];
let prog = fs.readFileSync(inputFile, { encoding: 'utf8', flag: 'r' });
let mem = prog.split(/\s+/);
let ip = 0;

// Функция для получения значения из памяти
const getMemValue = (index) => parseInt(mem[index]);

// Функция для записи в память
const setMemValue = (index, value) => mem[index] = value;

// Основной цикл интерпретатора
while (mem[ip] !== 'exit') {
    switch (mem[ip]) {
        case 'jin': {
            // Ввод числа
            let input_number = readlineSync.question('input a number: ');
            setMemValue(getMemValue(ip + 1), parseInt(input_number));
            ip += 2;
            break;
        }

        case 'set': {
            // Установка значения в память
            setMemValue(getMemValue(ip + 1), getMemValue(ip + 2));
            ip += 3;
            break;
        }

        case 'add': {
            // Сложение
            setMemValue(getMemValue(ip + 1), getMemValue(mem[ip + 2]) + getMemValue(mem[ip + 3]));
            ip += 4;
            break;
        }

        case 'mul': {
            // Умножение
            setMemValue(getMemValue(ip + 1), getMemValue(mem[ip + 2]) * getMemValue(mem[ip + 3]));
            ip += 4;
            break;
        }

        case 'mov': {
            // Копирование значения
            setMemValue(getMemValue(ip + 1), getMemValue(mem[ip + 2]));
            ip += 3;
            break;
        }

        case 'cmpj': {
            // Сравнение и переход
            if (getMemValue(mem[ip + 1]) < getMemValue(mem[ip + 2])) {
                ip = getMemValue(ip + 3);
            } else {
                ip = getMemValue(ip + 4);
            }
            break;
        }

        case 'mod': {
            // Остаток от деления
            setMemValue(getMemValue(ip + 1), getMemValue(mem[ip + 2]) % getMemValue(mem[ip + 3]));
            ip += 4;
            break;
        }

        case 'jout': {
            // Вывод значения из памяти
            console.log(mem[getMemValue(ip + 1)]);
            ip += 2;
            break;
        }

        default:
            console.error(`Unknown command: ${mem[ip]}`);
            ip++;
            break;
    }
}
