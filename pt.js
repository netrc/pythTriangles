const proc = require('process')
const MAX = proc.argv[2]

const range = (start, end) => { // make a range of integers
  const a = []
  const z = start-1 
  while (end-->z) { // note: 'end' moves backwards through array
    a[end-z] = end+1
  }
  return a
}

const odd = x => (x&1)==1

const makePythagoreanTriangle = a => {
  const b = odd(a) ?  (a*a-1)/2 : (a*a-4)/4    // odd a : even a
  const c = odd(a) ?  (a*a+1)/2 : (a*a+4)/4 
  const theta = Math.asin(a/c) * 180 / Math.PI
  return { theta, a, b, c } 
}

// a = { accum:, lastVal: } - our accumulator holds running total and last value read
const dupReducer = ( a, curr ) => {
  if (curr == a.lastVal) {
    a.accum += 1
  } else {
    a.lastVal = curr
  }
  return a
}

const countDups = a => a.reduce( dupReducer, {accum:0, lastVal:0} ).accum

const triangleShow = tr => console.log(`${tr.theta}   ${tr.a} ${tr.b} ${tr.c}`)

const thetaSort = (tr1,tr2) => (tr1.theta-tr2.theta)


// make the range and map to triangels
const t = range(3,MAX).map( makePythagoreanTriangle )


//t.forEach( triangleShow )
//t.sort(thetaSort).forEach( triangleShow )
console.log( countDups( t.sort(thetaSort).map(x=>x.theta) ) )

// 100  24
// 1000  249
// 10000  2499
// 100000  24999
// 1000000  249999
// 10000000  2499999
