/**
 * @param {number} length
 * @param {number} min
 * @param {number} max
 */
let randomArray = (length, min=1, max=2) => {
    let arr = []
    for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * (max - min + 1) + min))
    }
    return arr
}

/**
 * @param {Array} a
 * @param {Array} b
 */
let array_diff = (a, b) => {
    return a.filter(x => !b.includes(x))
}

/**
 * @param {Array} numberArrays
 */
let storeIndexes = (numberArrays) => {
    let data = {}
    let index = 0

    for (const array of numberArrays) {
        data[index] = []
        // loop through numbers input array and store the indexes for each number of the array
        for (const [i, value] of array.entries()) {
            let numIndex = data[index].findIndex(el => el.number === value);
            if (numIndex > -1) {
                data[index][numIndex].indexes.push(i)
                continue
            }

            data[index].push({number: value, indexes: [i]})
        }
        index++
    }

    return data
}

/**
 * @param {Array} arr1
 * @param {Array} arr2
 */
let solveChallenge = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        throw new Error('Input arrays must have identical length.')
    }

    let arrays = [arr1, arr2]
    let data = storeIndexes(arrays)

    // reorder data by the number of indexes (DESC) to start with most most occurring numbers
    for (const [i, values] of Object.entries(data)) {
        data[i].sort(function (a, b) {
            return b.indexes.length - a.indexes.length
        })
    }

    let row1 = data[0]
    let row2 = data[1]
    let indexesArray = [...Array(arr1.length).keys()]

    for (let row1Data of row1) {
        if (row1Data.indexes.length === indexesArray.length) {
            console.log(`ARRAY_1 is the answer with 0 swaps`)
            console.log(arr1)
            return 0
        }
        let row2Data = row2.find(obj => {
            return obj.number === row1Data.number
        })
        if (!row2Data) {
            continue
        }

        // sort rows data properly based on their length for the arr diff checks
        let inputs = row1Data.indexes.length >= row2Data.indexes.length ? [row1Data, row2Data] : [row2Data, row1Data]
        let rowResult = row1Data.indexes.length >= row2Data.indexes.length ? 1 : 2
        let mainInput = inputs[0]
        let secInput = inputs[1]
        let diff = array_diff(indexesArray, mainInput.indexes)
        let diff2 = array_diff(diff, secInput.indexes)

        if (diff2.length === 0) {
            console.log(`ARRAY_${rowResult} can be solved by ${diff.length} swap(s)${diff.length > 0 ? ' at indexes [' + diff.join(', ') + ']' : ''}`)
            console.log(arrays[rowResult-1])
            return diff.length
        }
    }
    console.log('Desired output not found')
    return -1
}

module.exports = {
    randomArray,
    solveChallenge
}
