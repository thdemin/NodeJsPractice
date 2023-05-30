

// Задача 1. Напишіть функцію add(), яка приймає будь-яку кількість параметрів у такому вигляді:
// console.log(add(2)(5)(7)(1)(6)(5)(11)()); // 37

function add(num) {
    let summary = num;

    function inner_add(nextNum) {
        if (nextNum !== undefined) {
            summary += nextNum;
            return inner_add;    //повертаємо функцію для подальшого виклику пізніше
        } else {
            return summary;     //повертємо суму, якщо параметри більше не передаються
        }
    }

    return inner_add;         //викликаємо функцію
}

console.log(add(2)(5)(7)(1)(6)(5)(11)());




//Задача 2. Напишіть функцію, яка бере два рядки і повертає true, якщо вони є анаграмами одне одного.

function check_anagram(string_1, string_2) {
    const sorted_string1 = string_1.toLowerCase().split('').sort().join(''); // перетворюємо рядки у нижній регістр, розбиваючи їх на масив символів. Сортуємо й зливаємо все назад в рядок
    const sorted_string2 = string_2.toLowerCase().split('').sort().join(''); // виконуємо те саме для прикладу 2

    return sorted_string1 === sorted_string2; // вивід true, у випадку коли відсортовані рядки однакові - тоді вони є анаграмами
}

console.log(check_anagram('thing', 'night')); //  true
console.log(check_anagram('high', 'gost')); //  false




//Задача 3. Напишіть функцію, яка глибоко клонує об'єкт, переданий їй параметром.

function deep_сlone(obj) {
    if (obj === null || typeof obj !== 'об єкт: ') {
        return obj; // якщо obj є простим типом даних або null - повертаємо його без клонування
    }

    let clone; // змінна клон, що містить клон об'єкта або масива

    if (obj instanceof Array) { // якщо obj є масивом створюємо новий пустий масив
        clone = [];
        for (let i = 0; i < obj.length; i++) {
            clone[i] = deep_сlone(obj[i]); //  клонуємо елементи масиву
        }
    } else { // якщо obj є об'єктом створюємо новий пустий об'єкт
        clone = {};
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                clone[key] = deep_сlone(obj[key]); // клонуємо властивості об'єкта
            }
        }
    }

    return clone; // виводимо клонований об'єкт або масив
}

const obj = { a: 20, b: { c: 14 } };
const clonedObj = deep_сlone(obj);
console.log(clonedObj); // { a: 20, b: { c: 14 } }
console.log(obj === clonedObj); //  false





//Задача 4. Напишіть функцію-обгортку, яка кешуватиме результат будь-якої іншої функції з довільною кількістю числових параметрів.

function wrapper(fn) {
    const cache = {}; //об'єкт для збереження кешу

    return function (...args) {
        const key = JSON.stringify(args); //створення ключа шляхом серіалізації аргументів функції в рядок

        if (cache[key]) { //перевіряємо чи результат кешований за заданим ключем
            console.log('Кеш');
            return cache[key]; //повертаємо кеш
        }

        const result = fn(...args); //виклик оригінальної функції з переданими аргументами
        cache[key] = result; // зберігаємо результату в кеші за ключем
        console.log('Обчислено');
        return result; // виводимо результат
    };
}

const calc = (a, b, c) => a + b + c;
const cachedCalc = wrapper(calc);

console.log(cachedCalc(2, 1, 4)); // вихід: Calculated, 7
console.log(cachedCalc(9, 7, 4)); // вихід: Calculated, 20
console.log(cachedCalc(2, 1, 4)); // вихід: From cache, 7