const Rx = require('rxjs');

// 어레이로부터 만들기 (from)
const deliveris = ['d1','d2','d3'];
const stream = Rx.from(deliveris);

stream.subscribe({
    next:data=>{
        console.log(data)
    },
    complete:()=>{
        console.log('completed')
    },
    error:(err)=>{console.error(err)}
})

// 프로미스로 부터 만들기 (from)
function makePromise(){
    return new Promise((res, rej)=>{
        setTimeout(()=>{
            res("Delivery")
        },3000)
    })
}

Rx.from(makePromise()).subscribe({
    next:(data)=>{console.log(data)}
})

// 싱글 여러 데이터로부터 만들기 (of)
Rx.of('d1','2번째','세번쨰').subscribe({
    next:(data)=>{
        console.log(data)
    }
})