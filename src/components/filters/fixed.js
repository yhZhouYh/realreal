const fixed = function (value, num) {
    if(!value){
        return 0
    }else{
        return parseFloat(value).toFixed(num)
    }
}

export default fixed