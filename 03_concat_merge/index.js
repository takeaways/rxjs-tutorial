const Rx = require('rxjs');
const { take } = require('rxjs/operators');

const stream1 = Rx.from([1,2,3,4,5,6])
const stream2 = Rx.from([10,20,30,40,50,60])

// Rx.concat(stream1, stream2).subscribe({
//     next:console.log
// })

// const stream3 = Rx.interval(1000).pipe(take(3));
// const stream4 = Rx.interval(2000).pipe(take(2));

// Rx
// .concat(stream3, stream4)
// .subscribe(console.log)

// Rx
// .merge(stream1, stream2)
// .subscribe(console.log)

const numberStream = Rx.interval(1000).pipe(take(10));
const numberStream2 = Rx.interval(800).pipe(take(3));
Rx.merge(numberStream, numberStream2)
.subscribe(console.log)