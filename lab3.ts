
//Задача 1
function add(num: number): unknown {
    let sum = num;

    function innerAdd(nextNum: number): unknown {
        if (nextNum === undefined) {
            return sum; // Повертаємо суму, коли виклик функції без аргументів
        }

        sum += nextNum;  // Додаємо наступне число до суми
        return innerAdd;  // Повертаємо саму функцію, щоб можна було здійснити наступний виклик
    }

    return innerAdd;  // Повертаємо внутрішню функцію
}

console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37



//Задача 2

function areAnagrams(str1: string, str2: string): boolean {
    const sortedStr1 = str1.toLowerCase().split('').sort().join('');  // Сортуємо літери в першому рядку
    const sortedStr2 = str2.toLowerCase().split('').sort().join('');  // Сортуємо літери в другому рядку

    return sortedStr1 === sortedStr2; // Порівнюємо відсортовані рядки
}

console.log(areAnagrams('listen', 'silent')); // true
console.log(areAnagrams('hello', 'world')); // false


//Задча 3

function deepClone(obj: unknown): unknown {
    if (typeof obj !== 'object' || obj === null) {
        return obj;  // Повертаємо примітивне значення або null без клонування
    }

    let clone: any;

    if (Array.isArray(obj)) {
        clone = obj.map((item: unknown) => deepClone(item));  // Клонуємо масив, рекурсивно клонуючи кожен його елемент
    } else {
        clone = {};

        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                clone[key] = deepClone(obj[key]);  // Клонуємо кожну властивість об'єкта рекурсивно
            }
        }
    }

    return clone;  // Повертаємо клонований об'єкт
}

const obj = { a: 1, b: { c: 2 }, d: [3, 4, 5] };
const clonedObj = deepClone(obj);
console.log(clonedObj); // { a: 1, b: { c: 2 }, d: [3, 4, 5] }
console.log(obj === clonedObj); // false


//Задача 4

function wrapper(func: (...args: number[]) => number): (...args: number[]) => number {
    const cache: Record<string, number> = {};  // Об'єкт для зберігання кешованих результатів

    return (...args: number[]) => {
        const key = args.join(',');  // Створюємо ключ на основі аргументів

        if (cache.hasOwnProperty(key)) {  // Перевіряємо, чи є результат у кеші
            console.log(`Using cached result for (${args.join(', ')})`);
            return cache[key]; // Повертаємо кешований результат
        }

        const result = func(...args);  // Викликаємо оригінальну функцію
        cache[key] = result;  // Зберігаємо результат у кеші
        console.log(`Calculating result for (${args.join(', ')})`);
        return result; // Повертаємо результат
    }
}

const add = (a: number, b: number, c: number) => a + b + c;
const cachedAdd = wrapper(add);

console.log(cachedAdd(2, 2, 3)); // Calculating result for (2, 2, 3) -> 7
console.log(cachedAdd(5, 8, 1)); // Calculating result for (5, 8, 1) -> 14
console.log(cachedAdd(2, 2, 3)); // Using cached result for (2, 2, 3) -> 7
