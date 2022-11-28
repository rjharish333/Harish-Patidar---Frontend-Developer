export const convertISOtoDate = (_date) => {
    let date = new Date(_date);
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let dt = date.getDate();

        if (dt < 10) {
        dt = '0' + dt;
        }
        if (month < 10) {
        month = '0' + month;
        }

        return year+'-' + month + '-'+dt;
 };
 
 export const convertDateToISO = (_date) => {
    var dateobj =
    new Date(_date);
 
    // converted into a string using toISOString() method.
    return dateobj.toISOString();
 };