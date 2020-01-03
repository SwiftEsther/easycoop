export const formatAmount = (num) => {
    if(+num){
        return parseFloat(num).toFixed(2).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    }else{
        return '0'
    }

};

export const chunkArray = (array, size) => {
    const chunked = [];
    let index = 0;

    while(index < array.length){
        chunked.push(array.slice(index, index + size))
        index += size
    }

    return chunked
}

export const formatBalance = (balance = 0) => balance.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');

export const validateEmail = (email) => {
    let emailRegex = /^[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
    // const expression = /^[a-zA-Z0-9!#$%&'+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'+/=?^_`{|}~-]+)@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-][a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
    return emailRegex.test(String(email).toLowerCase());
}

export const validatePhone = (phone) => {
    const expression = /^[0]\d{10}$/;
    return expression.test(phone);
}
