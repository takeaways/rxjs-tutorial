const Rx = require('rxjs');
const { take, tap, filter, map, reduce } = require('rxjs/operators');

const stream = Rx.from(['a', 'b', 'c', 'd']);
// const stream = Rx.interval(1000);

stream.subscribe(console.log);

// tab: 작업을 하나 흐름을 끊지 않는 operator
stream
    .pipe(
        tap((data) => {
            console.log('1--->', data);
        }),
        tap((data) => {
            console.log('2--->', data);
        }),
        tap((data) => {
            console.log('3--->', data);
        })
    )
    .subscribe({
        next: (data) => {
            console.log('this is data', data);
        },
    });
// filter:
stream //
    .pipe(filter((data) => data !== 'a'))
    .subscribe({
        next: (data) => {
            console.log('filtered a data', data);
        },
    });
// map:
stream
    .pipe(
        map((data) => {
            return data + 1;
        })
    )
    .subscribe({
        next: (data) => console.log(data),
    });
// reduce:
stream //
    .pipe(
        reduce((a, c) => {
            return a + c;
        })
    )
    .subscribe({
        next: (data) => {
            console.log('---------> ', data);
        },
    });
