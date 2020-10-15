/*
    [         Stream         ]
    --p3(1s)--------p2(1s)-------p1(1s)--> 시간
                         = 포장 개봉 ( 5 초 ) 작업1
                         = 상품 검사 ( 5 초 ) 작업2
                         = 상품 사용 ( 5 초 ) 작업3
    1. 초당 하나의 택배를 받겠다.
*/
const Rx = require('rxjs');
const { mergeMap, take, map, tap, mergeAll } = require('rxjs/operators');

function openBox(data) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log(data, '상품개봉');
            res(data);
        }, 5000);
    });
}

function checkBox(data) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log(data, '상품확인');
            res(data);
        }, 5000);
    });
}

function useProduct(data) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log(data, '상품사용');
            res(data);
        }, 5000);
    });
}

async function useTask(data) {
    await openBox(data);
    await checkBox(data);
    await useProduct(data);
}

const stream = Rx.interval(1000).pipe(
    take(3),
    map((data) => `택배${data + 1}`)
);
stream // 다른 옵져버블을 리턴 받아야 한다. 옵져버블을 리턴 받아야 한다.
    .pipe(mergeMap((data) => Rx.from(useTask(data))))
    .subscribe();

// merge (all)
const stream1 = Rx.interval(1000).pipe(take(3), tap(console.log));
const stream2 = Rx.interval(1000).pipe(take(3), tap(console.log));
const stream3 = Rx.interval(1000).pipe(take(3), tap(console.log));
const stream4 = Rx.interval(1000).pipe(take(3), tap(console.log));
const stream5 = Rx.interval(1000).pipe(take(3), tap(console.log));
const stream10 = Rx.of(stream1, stream2, stream3, stream4, stream5);

stream10 //
    .pipe(mergeAll(2)) //묶음 단위
    .subscribe();
