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
