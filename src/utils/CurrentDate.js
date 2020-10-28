export function CurrentDate(separator='-'){

    let newDate = new Date()
    let seconds = newDate.getSeconds();
    let minutes = newDate.getMinutes();
    let hours = newDate.getHours();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}${separator}${hours}${separator}${minutes<10?`0${minutes}`:`${minutes}`}${separator}${seconds<10?`0${seconds}`:`${seconds}`}`
    }