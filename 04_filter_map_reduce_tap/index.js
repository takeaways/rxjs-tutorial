const Rx = require('rxjs');
const { take, tap, filter, map, reduce } = require('rxjs/operators');
const stream = Rx.from(['a', 'b', 'c', 'd']);

/**
 * take 갯 수 제한.
 * tap 값의 변화만 준다.
 * 
 * 
 */
stream
.pipe(
    tap((data)=>{
        if(data==='b'){
            console.log('bbbb')
        }
    }),
    filter((data)=>{
        if(data==='b'){
            return false
        }
        return true;
    }),
    map((data)=>{
        if(data === 'a'){
            return 'aaaaa'
        }
        return data
    }),
    reduce((a,b)=>a+b)
)
.subscribe(console.log)