function createEmployeeRecord(employeeData){
    const employee = {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(employeeData){
    const employeeRecords = []

    for (let i = 0; i < employeeData.length; i++) {
    const employeeRecord = createEmployeeRecord(employeeData[i])
    employeeRecords.push(employeeRecord)
    }

    return employeeRecords;
}                       

function createTimeInEvent(employeeRecord, dataStamp){
    const timeInObject = {
        type: "TimeIn", 
        hour: parseInt(dataStamp.substring(11, 15)),
        date: dataStamp.substring(0, 10)
    }
    employeeRecord.timeInEvents.push(timeInObject)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dataStamp){
    const timeOutObject = {
        type: "TimeOut", 
        hour: parseInt(dataStamp.substring(11, 15)),
        date: dataStamp.substring(0, 10)
    }
    employeeRecord.timeOutEvents.push(timeOutObject)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date)
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date)

    let timeIn = parseInt(timeInEvent.hour)
    let timeOut = parseInt(timeOutEvent.hour)
    
    let hoursWorked = (timeOut - timeIn) / 100

    return hoursWorked
}

function wagesEarnedOnDate(employeeRecord, date){
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date)

    let wagesEarned = hoursWorked * employeeRecord.payPerHour

    return wagesEarned
}

function allWagesFor(employeeRecord){
    let totalWages = 0

    for (let i = 0; i < employeeRecord.timeInEvents.length; i++) {
    let date = employeeRecord.timeInEvents[i].date
    let wagesEarned = wagesEarnedOnDate(employeeRecord, date)
    totalWages += wagesEarned
    }

    return totalWages;
}

function calculatePayroll(employeeRecords){
    let totalPayroll = 0;

  for (let i = 0; i < employeeRecords.length; i++) {
    let employeeRecord = employeeRecords[i]
    let employeePayroll = allWagesFor(employeeRecord)
    totalPayroll += employeePayroll
  }

  return totalPayroll
}

