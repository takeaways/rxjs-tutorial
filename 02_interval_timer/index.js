/*
    오퍼레이터
    - 데이터 스트림의 방향을 바꿔주는 역할이라고 생각해봅시다.


*/
const Rx = require('rxjs');
const {take} = require('rxjs/operators')

//interval
const stream = Rx.interval(1000); //1s에 한 번씩 옵져버블이 발생한다.

//0,1,2,3,4
stream.pipe(take(10)).subscribe({
    next:(data)=>{
        console.log(data)
    }
})

//timer - 3s를 기다렸다가 1s단위로 시작한다.
const timer =Rx.timer(3000,1000);
timer.subscribe({
    next:(data)=>{
        console.log(data)
    }
})

