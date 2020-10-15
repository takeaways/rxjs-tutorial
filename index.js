/**
 *
 *  10초에 한 번씩 주시 거래를 시작한다.
 *
 *  한 번의 주식 거래에서는 1000번의 API 콜을 수행한다.
 *  1000번의 API call을 함에 있어서 동시 요청은 10회 이하로 제한한다.
 *  10회의 요청이 끝날때마다 5ms 동안 휴식을 한다.
 *  1000번의 요청 중에 에러가 발생하면 요청을 다시 시작하되 최대 2번까지 반복한다.
 *  ( 동시 요청 10회 이하의 조건은 만족해야 한다. )
 *
 *  주식 거래를 성공한 뒤에는 10개씩 나누어 결과를 저장하되 주식 거래 행위에 영향을 주지 않도록 비돌기로 저장한다.
 *
 */

const {
    delay,
    map,
    mergeAll,
    retry,
    mergeMap,
    bufferCount,
} = require('rxjs/operators');
const { of, from, interval, range } = require('rxjs');
const { default: Axios } = require('axios');

function startTrade$(trade) {
    range(0, 1000).pipe(
        map(() => apiCall$().pipe(delay(5))),
        mergeAll(10),
        retry(2),
        reducer((a, c) => {
            return trade;
        })
    );
}

function apiCall$(r) {
    console.log(r);
    return from(Axios.get('https://naver.com'));
}

function saveResult$(r) {
    console.log('-');
    //fs, db
    console.log(r);
}

interval(1000 * 10).pipe(
    mergeMap((t) => startTrade$(t)),
    bufferCount(10),
    mergeMap((r) => saveResult$(r))
);
