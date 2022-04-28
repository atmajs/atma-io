import * as fs from 'fs'
import { Shell } from 'shellbee'
import { File } from '../../src/File'
import { FileSafe } from '../../src/FileSafe'
import { Directory } from '../../src/Directory'
import { Env as env } from '../../src/Env'

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
        for (let i = 0; i < 2; i++) {
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
            return Shell.run({
                command: `./node_modules/atma/index.js run --TEST TEST ./test/append.ts ${data}`,
                fork: true
            });
        };
        if (await File.existsAsync(path)) {
            await File.removeAsync(path);
        }

        await Directory.ensureAsync(filename.substring(0, filename.lastIndexOf('/') + 1));

        let data = [];
        for (let i = 0; i < 10; i++) {
            let key = `${i}-${Math.round(Math.random() * (10 ** 10))}`;
            let str = key;
            while (str.length < 100) {
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
    },
    async 'write with middlewares' () {
        let path = './test/tmp/data.json';
        let safeFile = new FileSafe(path, { threadSafe: true });
        let json = { time: Date.now() };
        await safeFile.writeAsync(json);

        let jsonStr = await File.readAsync<string>(path, { skipHooks: true });
        eq_(typeof jsonStr, 'string')
        let jsonBack = JSON.parse(jsonStr);
        eq_(json.time, jsonBack.time);

    }
})
