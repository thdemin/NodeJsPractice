
//Завдання 1
// Оголошення функції `runSequent`, яка приймає масив `array` та асинхронний колбек `callback`
async function runSequent<T, R>(
    array: T[],
    callback: (item: T, index: number) => Promise<R>
): Promise<R[]> {
    const results: R[] = []; // Масив для збереження результатів колбеку

    // Цикл, який пройшовся по кожному елементу масиву
    for (let i = 0; i < array.length; i++) {
        const item = array[i]; // Поточний елемент масиву
        const result = await callback(item, i); // Виклик колбеку та отримання результату
        results.push(result); // Додавання результату до масиву `results`
    }

    return results; // Повернення масиву з результатами колбеку
}

// Приклад виклику функції
const array: string[] = ["one", "two", "three"]; // Масив рядків
const results = await runSequent(array, (item, index) =>
    Promise.resolve({
        item,
        index,
    })
);

console.log(results);





//Завдання 2
function arrayChangeDelete<T>(array: T[], rule: (item: T) => boolean): T[] {
    const deletedElements: T[] = []; // Масив для збереження видалених елементів

    for (let i = array.length - 1; i >= 0; i--) { // Проходимо по масиву з кінця до початку
        if (rule(array[i])) { // Перевіряємо, чи елемент відповідає правилу
            deletedElements.push(array[i]); // Додаємо видалений елемент до масиву deletedElements
            array.splice(i, 1); // Видаляємо елемент з масиву array за допомогою методу splice
        }
    }

    return deletedElements; // Повертаємо масив видалених елементів
}

// Приклад виклику
const array = [1, 2, 3, 6, 7, 9];
const deletedElements = arrayChangeDelete(array, (item) => item % 2 === 0);

console.log(array); // [1, 3, 7, 9] - змінений масив після видалення
console.log(deletedElements); // [2, 6] - видалені елементи





//Завдання 3
import * as fs from 'fs';
import * as path from 'path';
import axios from 'axios';

// Отримуємо шлях до JSON-файла з аргументів командного рядка
const jsonFilePath = process.argv[2];

// Перевіряємо, чи був переданий шлях до JSON-файла
if (!jsonFilePath) {
    console.error('Шлях до JSON-файла не вказано');
    process.exit(1);
}

// Зчитуємо вміст JSON-файла
try {
    const jsonData = fs.readFileSync(jsonFilePath, 'utf-8');
    const links = JSON.parse(jsonData);

    // Створюємо назву папки для збереження файлів з вмістом
    const folderName = path.basename(jsonFilePath, path.extname(jsonFilePath)) + '_pages';

    // Створюємо папку для збереження файлів
    fs.mkdirSync(folderName);

    // Проходимо по кожному посиланню та отримуємо HTML-вміст
    links.forEach(async (link: string, index: number) => {
        try {
            const response = await axios.get(link);
            const htmlContent = response.data;

            // Зберігаємо HTML-вміст у файл з унікальною назвою
            const fileName = `file_${index}.html`;
            const filePath = path.join(folderName, fileName);
            fs.writeFileSync(filePath, htmlContent);
            console.log(`Збережено вміст з посилання ${link} у файл ${filePath}`);
        } catch (error) {
            console.error(`Помилка при отриманні вмісту з посилання ${link}:`, error);
        }
    });
} catch (error) {
    console.error('Помилка при читанні JSON-файла:', error);
    process.exit(1);
}




//Завдання 4
import * as os from 'os';
import * as osUtils from 'os-utils';
import * as si from 'systeminformation';
import * as batteryLevel from 'battery-level';
import * as prettyMs from 'pretty-ms';

const frequencyInSeconds: number = parseFloat(process.argv[2]);

if (isNaN(frequencyInSeconds)) {
    console.error('Please provide a valid numeric value for the frequency.');
    process.exit(1);
}

setInterval(() => {
    console.log('Operating System:', os.platform());
    console.log('Architecture:', os.arch());
    console.log('Current User:', os.userInfo().username);

    si.cpu().then(data => {
        console.log('CPU Cores Models:', data.cores.map(core => core.model));
        console.log('CPU Temperature:', data.temperatures.main);
    });

    si.graphics().then(data => {
        console.log('Graphic Controllers:');
        data.controllers.forEach(controller =>
            console.log('Vendor:', controller.vendor, 'Model:', controller.model)
        );
    });

    si.mem().then(data => {
        console.log('Total Memory:', (data.total / (1024 * 1024 * 1024)).toFixed(2), 'GB');
        console.log('Used Memory:', (data.used / (1024 * 1024 * 1024)).toFixed(2), 'GB');
        console.log('Free Memory:', (data.free / (1024 * 1024 * 1024)).toFixed(2), 'GB');
    });

    batteryLevel().then(level => {
        console.log('Battery Charging:', osUtils.platform() === 'win32' ? 'N/A' : si.battery().hasbatter ? 'Yes' : 'No');
        console.log('Battery Level:', level * 100 + '%');
        console.log('Battery Remaining Time:', prettyMs(si.battery().timeRemaining * 1000, { verbose: true }));
    });

    console.log('-----------------------------------------');
}, frequencyInSeconds * 1000);



//Завдання 5
type EventHandler = () => void;

class MyEventEmitter {
    private eventHandlers: { [eventName: string]: EventHandler[] };

    constructor() {
        this.eventHandlers = {};
    }

    registerHandler(eventName: string, handler: EventHandler): void {
        if (!this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }

        this.eventHandlers[eventName].push(handler);
    }

    emitEvent(eventName: string): void {
        const handlers = this.eventHandlers[eventName];

        if (handlers) {
            handlers.forEach(handler => handler());
        }
    }
}

// Приклад використання
const emitter = new MyEventEmitter();
emitter.registerHandler('userUpdated', () => console.log('Обліковий запис користувача оновлено'));
emitter.emitEvent('userUpdated'); // Виведе "Обліковий запис користувача оновлено"
