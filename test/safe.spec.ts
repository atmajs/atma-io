import * as fs from 'fs'
import { Shell } from 'shellbee'
import { File } from '../src/File'
import { FileSafe } from '../src/FileSafe'
import { Directory } from '../src/Directory'
import { Env as env } from '../src/Env'

UTest({
    $config: {
        timeout: 60 * 60 * 1000,
        breakOnError: true,
    },
    async 'write parallel in single process' () {
        let path = './test/tmp/parallel.txt';
        let filename = env.currentDir.combine(path).toLocalFile();
        let safeFile = new FileSafe(filename, { threadSafe: true });

        function append (data) {
            return safeFile.writeAsync(data);
        };
        if (await File.existsAsync(path)) {
            await File.removeAsync(path);
        }

        await Directory.ensureAsync(filename.substring(0, filename.lastIndexOf('/') + 1));

        let data = [];
        for (let i = 0; i < 200; i++) {
            let key = `${i}-${Math.round(Math.random() * (10 ** 10))}`;
            let str = key;
            while (str.length < 1000) {
                str += key;
            }
            data.push(`_${str}_`);
        }

        console.time('write');
        await Promise.all(data.map((str, i) => append(data.slice(0, i + 1).join(','))));
        console.timeEnd('write');

        let content = await fs.readFileSync(path, { encoding: 'utf8' });
        for (let str of data) {
            let has = content.includes(str);
            eq_(has, true, `Should include ${str}`);
            if (has === false) {
                break;
            }
        }
    },
    async 'write parallel in multi process' () {
        let path = './test/tmp/multiprocess.txt';
        let filename = env.currentDir.combine(path).toLocalFile();

        function append (data) {
            //return new Promise((resolve, reject) => {
                
            return Shell.run({
                    command: `test/append ${data}`,
                    fork: true
                });
                
            //});
        };
        if (await File.existsAsync(path)) {
            await File.removeAsync(path);
        }

        await Directory.ensureAsync(filename.substring(0, filename.lastIndexOf('/') + 1));

        let data = [];
        for (let i = 0; i < 100; i++) {
            let key = `${i}-${Math.round(Math.random() * (10 ** 10))}`;
            let str = key;
            while (str.length < 2000) {
                str += key;
            }
            data.push(`_${str}_`);
        }
        await Promise.all(data.map(append));

        let content = await File.readAsync(path);
        data.forEach(str => {
            let has = content.includes(str);
            eq_(has, true, `Should include ${str}`);
        })
    }
})