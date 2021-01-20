const Rx = require('rxjs');
const { take } = require('rxjs/operators');

const stream1 = Rx.from([10, 20, 30, 40, 50]);
const stream2 = Rx.from([1, 2, 3, 4, 5]);

const stream3 = Rx.interval(1000).pipe(take(20));
const stream4 = Rx.interval(1000).pipe(take(10));

// concat 이어 붙이다.
// 1초 간격으로 0--------1----------2 0--------1----------2
Rx.concat(stream1, stream2).subscribe({
    next: console.log,
});

Rx.concat(stream3, stream4).subscribe(console.log);

// merge 병합하다
// 1초 간격으로 0-0-------1-1---------2-2
Rx.merge(stream3, stream4).subscribe(console.log);
