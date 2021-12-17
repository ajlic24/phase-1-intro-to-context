function createEmployeeRecord([firstName, familyName, title, payRate]) {
    return {
        'firstName': firstName,
        'familyName': familyName,
        'title': title,
        'payPerHour': payRate,
        timeInEvents: [],
        timeOutEvents: []
    }
}
// console.log(createEmployeeRecord(['moe','sizlak','barkeep', 2]))
let dataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300],
    ["Byron", "Poodle", "Mascot", 3],
    ["Julius", "Caesar", "General", 27],
    ["Rafiki", "", "Aide", 10],
    ["Simba", "", "King", 100]
  ]
function createEmployeeRecords(array) {
    return array.map(ele => createEmployeeRecord(ele))
}
// console.log(createEmployeeRecords(dataEmployees))

function createTimeInEvent(obj, dateStamp) {
    obj.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return obj
}
// let bpRecord = createEmployeeRecord(["Byron", "Poodle", "Mascot", 3])
// let updatedBpRecord = createTimeInEvent(bpRecord, "2014-02-28 1400")
// let newEvent = updatedBpRecord.timeInEvents[0]
// console.log(newEvent.hour)

function createTimeOutEvent(obj, dateStamp) {
    obj.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(dateStamp.split(' ')[1]),
        date: dateStamp.split(' ')[0]
    })
    return obj
}

function hoursWorkedOnDate(obj, date) {
    let timeOut;
    let timeIn;
    obj.timeOutEvents.forEach(element => {
        if (element.date === date) {
            timeOut = element.hour
        }
    });
    obj.timeInEvents.forEach(element => {
        if (element.date === date) {
            timeIn = element.hour
        }
    })
    return (timeOut - timeIn) / 100
}

function wagesEarnedOnDate(obj, date) {
    let payRate = obj.payPerHour
    let multiplier = hoursWorkedOnDate(obj, date)
    return payRate * multiplier

}

function allWagesFor(obj) {
    let datesArr = []
    let arr = []
    obj.timeInEvents.forEach(ele => {
        datesArr.push(ele.date)
    })
    datesArr.forEach(ele => {
        arr.push(wagesEarnedOnDate(obj, ele))
    })
    return arr.reduce((a, b) => a + b, 0)
}

function calculatePayroll(employees) {
    let arr = []
    employees.forEach(ele => {
       arr.push(allWagesFor(ele))
    })
    return arr.reduce((a, b) => a + b, 0)
}


// let rRecord = createEmployeeRecord(["Rafiki", "", "Aide", 10])
// let sRecord = createEmployeeRecord(["Simba", "", "King", 100])

// let sTimeData = [
//     ["2019-01-01 0900", "2019-01-01 1300"], // 4 * 100 = 400
//     ["2019-01-02 1000", "2019-01-02 1300"]  // 3 * 100 = 300 ===> 700 total
// ]

// let rTimeData = [
//     ["2019-01-11 0900", "2019-01-11 1300"], // 4 * 10 = 40
//     ["2019-01-12 1000", "2019-01-12 1300"]  // 3 * 10 = 40 ===> 70 total ||=> 770
// ]

// sTimeData.forEach(function (d) {
//     let [dIn, dOut] = d
//     sRecord = createTimeInEvent(sRecord, dIn)
//     sRecord = createTimeOutEvent(sRecord, dOut)
// })

// rTimeData.forEach(function (d, i) {
//     let [dIn, dOut] = d
//     rRecord = createTimeInEvent(rRecord, dIn)
//     rRecord = createTimeOutEvent(rRecord, dOut)
// })

// let employees = [sRecord, rRecord]

// console.log(calculatePayroll(employees))