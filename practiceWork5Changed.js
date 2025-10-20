const randomInteger = require('random-int');

function generateArrayWithNumbers(length){
    return new Array(length)
        .fill(0)
        .map(() => randomInteger.default(-100, 100))
}

function quickSort(arr, order = 'asc') {
    if (arr.length <= 1) return arr;

    let compare = {}

    if(order === "asc") {
        compare = (a, b) => a < b
    }
    else {
        compare = (a, b) => a > b
    }

    function partition(low, high) {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
            if (compare(arr[j], pivot)) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        return i + 1;
    }

    function sort(low, high) {
        if (low < high) {
            const pi = partition(low, high);
            sort(low, pi - 1);
            sort(pi + 1, high);
        }
    }

    sort(0, arr.length - 1);
    return arr;
}

function test_sort(arr, order = true) {
    for (i = 0; i < arr.length - 1; i++) {
        if (order && arr[i] > arr[i+1] || !order && arr[i] < arr[i+1]) {
            return false;
        }
    }
    return true;
}

console.time('myTime');
const arrayToSort = generateArrayWithNumbers(10000);
console.log(test_sort(arrayToSort));
const sortedArray = quickSort(arrayToSort, 'desc');
console.log(test_sort(sortedArray, false));
console.timeEnd('myTime');