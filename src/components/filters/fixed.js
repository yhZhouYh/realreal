const fixed = function (value, num) {
    if(!value){
        return
    }else{
        return parseFloat(value).toFixed(num)
    }
}

export default fixed