const Rx = require('rxjs');
const { take } = require('rxjs/operators');
const stream = Rx.interval(300); // 1초 마다 나오는 데이터 흐름을 만든다.

//stream data flow - 흐름에 파이프 만들기
stream
.pipe(take(10)) // take는 operator입니다. 어떤 동작을 추가 10개만 받는다.
.subscribe({
    next:console.log,
    complete:()=>{console.log('complete')}
})

const timerStream = Rx.timer(3000,1000) // 앞시간 동안 delay걸림

timerStream
.pipe(take(10))
.subscribe({
    next:console.log
})