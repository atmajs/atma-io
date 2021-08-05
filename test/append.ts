import { File } from '../src/File'

(async function () {
    let content = process.argv.pop();

    await File.appendAsync('./test/tmp/multiprocess.txt', content);
}());


