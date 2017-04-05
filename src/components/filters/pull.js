import _throttle from 'vux/src/tools/throttle'
const pull = {
    bind (el, binding) {
        console.log(_throttle)
        el.addEventListener('scroll', (el) =>{
            console.log(555)
            loadFunc(el)
        })
        console.log(this)
        //loadFunc(el)
    },
    update () {
        console.log(333)
        el.addEventListener('scroll', () =>{loadFunc(el)})
       
    }

   
}

function loadFunc(el){
     _throttle(()=>{
        console.log(222)
        if(getScroll(el) >= getScrollHeight(el)) {
            console.log('到底了')
        }
    },300)
}

//获取滚动条高度
function getScrollHeight(el){
    return el.scrollHeight()
}

function getScroll(el){
    return el.clientHeight + el.scrollTop
}

export default pull