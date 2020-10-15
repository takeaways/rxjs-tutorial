/*
    [         Stream         ]
    --p3(1s)--------p2(1s)-------p1(1s)--> 시간
                         = 포장 개봉 ( 5 초 ) 작업1
                         = 상품 검사 ( 5 초 ) 작업2
                         = 상품 사용 ( 5 초 ) 작업3
    1. 다음 상품이 오기 전에 이 일을 다 처리하고 다음 택배를 받겠다.
*/
const Rx = require('rxjs');
const { concatMap, take, concatAll, tap } = require('rxjs/operators');

function openBox(data) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log(data, '상품개봉');
            res(data);
        }, 2000);
    });
}

function checkBox(data) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log(data, '상품확인');
            res(data);
        }, 2000);
    });
}

function useProduct(data) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log(data, '상품사용');
            res(data);
        }, 2000);
    });
}

async function useTask(data) {
    await openBox(data);
    await checkBox(data);
    await useProduct(data);
}

// const stream = Rx.from(['택1', '택2', '택3']);
// stream // 다른 옵져버블을 리턴 받아야 한다. 옵져버블을 리턴 받아야 한다.
//     .pipe(concatMap((data) => Rx.from(useTask(data))))
//     .subscribe();

// cacat (all)
const stream1 = Rx.interval(1000).pipe(take(3), tap(console.log));
const stream2 = Rx.interval(1000).pipe(take(3), tap(console.log));
//압쳐진 옵져버블을 순차적으로 실행 시키기 위해서 사용
const stream3 = Rx.of(stream1, stream2);
stream3.pipe(concatAll()).subscribe();
