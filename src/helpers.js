const formatDate = (date)=>{
    let formattedDate = ''
    let dateObj = new Date(date)
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    if(!dateObj || dateObj === 'undefined'){
        return formattedDate;
    }

    formattedDate = dateObj.getDate() + ' ' + months[parseInt(dateObj.getMonth())] + ' ' + dateObj.getFullYear()

    return formattedDate
}

export const BASE_URL = 'https://www.breakingbadapi.com/api/'

export { formatDate }