// import * as fs from 'fs'

// UTest({
//     $config: {
//         timeout: 60 * 1000
//     },
//     'lock' (done) {
//         let path = './test/assets/file.txt';

//         let mode = fs.constants.O_WRONLY | fs.constants.O_CREAT | fs.constants.O_EXCL;
//         fs.open(path, 'w+', mode, (err, fd) => {
//             console.log('fd', err, fd);

//             //setTimeout(check, 400);

//             setTimeout (() => {
//                 fs.closeSync(fd);

//                 check(done);
//             }, 10000);
//         });

//         let i = 0;
//         function check (cb) {
//             fs.open(path, 'w+', fs.constants.O_WRONLY, (err, fd) => {
//                 console.log('CHECK', err == null ? 'ready' : 'locked');

//                 cb?.();
//             });
//         }
//     }
// })