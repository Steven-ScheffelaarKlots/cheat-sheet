// console.log('a')
// setTimeout(() => {
//     console.log('b')
// }, 1000)
// setTimeout(() => {
//     console.log('c')
// }, 0)
// console.log('d')

// //prints a, d, c, b
//The reason for this is that the setTimeout with 0 delay is still put on the event loop queue and will only
//execute after the current call stack is empty. So, 'a' and 'd' are logged first, then 'c' is logged from the setTimeout with 0 delay, and finally 'b' is logged after 1 second.



console.log('a')
setTimeout(() => {
    console.log('b')
}, 1000)
Promise.resolve().then(() => {
  console.log("C");
});
console.log('d')

