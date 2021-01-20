const Rx = require('rxjs');

const deliveries = ['d1','d2','d3'];

const stream = Rx.from(deliveries);

//data stream
stream.subscribe({
    next:(data)=>{
        console.log(data)
    },
    complete:()=>{
        console.log('complete')
    },
    error:(error)=>{}
})


function makePromise(){
    return new Promise((res, rej)=>{
        setTimeout(()=>{
            res('delivery')
        },2000)
    })
}

const promiseStream = Rx.from(makePromise())
promiseStream.subscribe({
    next:(data)=>{
        console.log(data)
    },
    complete:()=>{
        console.log('complete')
    },
    error:(console.log)
})



Rx
.of('d11','d22','d33')
.subscribe({next:(console.log)})