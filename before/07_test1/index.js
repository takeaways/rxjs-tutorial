/**
 *
 *  복잡한 택배 시스템
 *  1000개의 택배가 1초에 한 번씩 배송이된다.
 *  택배를 받으면 그 즉시 어래의 작업을 실행한다.
 *
 *  1. 상품 개봉 (3 초)
 *  2. 상품 검사 (3 초)
 *  3. 상품 사용 (3 초)
 *
 *  이때 택배 회사는 종업원이 3명 밖에 없기 때문에 위 작업은 최대 3명에 의해서 동시에 실행 될 수 있다.
 *  즉, 동시에 4개 이상의 작업은 실행 될 수 없다.
 *
 *  각 택배들에 대해서 사품 사용까지 종료된 택배들을 10개씩 묶어서 공항으로 보낸다.
 *
 */

const {
    delay,
    tap,
    take,
    concatAll,
    concatMap,
    map,
    mergeAll,
    reduce,
    bufferCount,
} = require('rxjs/operators');
const { of, from, interval } = require('rxjs');

function openBox(data) {
    return of(data) //
        .pipe(
            delay(3000),
            tap((data) => console.log(`${data}를 열었습니다.`))
        );
}
function checkBox(data) {
    return of(data) //
        .pipe(
            delay(3000),
            tap((data) => console.log(`${data}를 확인했습니다..`))
        );
}
function useProduct(data) {
    return of(data) //
        .pipe(
            delay(3000),
            tap((data) => console.log(`${data}를 사용했습니다.`))
        );
}

const deliveries = interval(1000).pipe(take(1000));

function doTask(delivery) {
    const tasks = from([
        openBox(delivery),
        checkBox(delivery),
        useProduct(delivery),
    ]);
    return tasks.pipe(
        concatAll(),
        reduce((a, c) => {
            return delivery;
        })
    );
}

function sendToAirport(data) {
    console.log('----->', data);
}

deliveries
    .pipe(
        map((delivery) => doTask(delivery)),
        mergeAll(3),
        bufferCount(10), //앞 단계에서 방출된 값을 누적
        tap((ten) => sendToAirport(ten))
    )
    .subscribe();
