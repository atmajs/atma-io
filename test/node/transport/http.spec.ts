import { File } from '../../../src/File'
import { Application, HttpEndpoint, HttpError, HttpResponse } from 'atma-server'


global.fetch = require('node-fetch');


UTest({
    async '$before' () {
        await TestApp.create();
    },
    'should handle text files': {
        async 'has' () {
            let content = await File.existsAsync(TestApp.getUrl(`/files/foo.txt`));
            eq_(content, true);
        },
        async 'get' () {
            let content = await File.readAsync(TestApp.getUrl(`/files/foo.txt`));
            eq_(content, 'ifoo');
        },
        async 'edit' () {
            await File.writeAsync(TestApp.getUrl(`/files/foo.txt`), 'nowbar');

            let raw = TestApp.getFile('foo.txt');
            eq_(raw.content, 'nowbar');
        },
        async 'create' () {
            await File.writeAsync(TestApp.getUrl(`/files/bar.txt`), 'createdbar');

            let raw = TestApp.getFile('bar.txt');
            eq_(raw.content, 'createdbar');
        },
        async 'remove' () {
            await File.removeAsync(TestApp.getUrl(`/files/foo.txt`));
            let file = TestApp.files['foo.txt'];
            eq_(file, null);
        },
        async 'get failed' () {
            let err;
            try {
                await File.readAsync(TestApp.getUrl(`/files/foo-no.txt`));
            } catch (error) {
                err = error;
            }
            eq_(err.code, 404);
        }
    },
    'should handle json files': {
        async 'get json' () {
            let content = await File.readAsync<any>(TestApp.getUrl(`/files/foo.json`));
            eq_(content.foo, 'ifoo');
        },
        async 'edit json' () {
            await File.writeAsync(TestApp.getUrl(`/files/foo.json`), { foo: 'bar' });

            let raw = TestApp.getFile('foo.json');
            deepEq_(raw.content, {
                foo: 'bar'
            });
        },
        async 'create json' () {
            await File.writeAsync(TestApp.getUrl(`/files/bar.json`), { bar: 'foo' });

            let raw = TestApp.getFile('bar.json');
            deepEq_(raw.content, { bar: 'foo' });
        },
    }

});

namespace TestApp {

    let server: Application;
    let port: number;

    export const files = {
        'foo.txt': {
            content: 'ifoo',
            mimeType: 'text/plain'
        },
        'foo.json': {
            content: '{"foo":"ifoo"}',
            mimeType: 'application/json'
        }
    };
    export function getFile (name: string, opts?: { create?: boolean}) {
        let f = files[name];
        if (f == null && opts?.create) {
            f = files[name] = { content: '', mimeType: 'text/plain' };
        }
        if (f == null) {
            throw new HttpError(`${name} not found`, 404);
        }
        return f;
    }
    export function getUrl (path: string) {
        return `http://localhost:${port}${path}`;
    }

    class FilesEndpoint extends HttpEndpoint {

        '$get /:name' (req, res, params) {
            let f = getFile(params.name);
            return new HttpResponse({
                content: f.content,
                mimeType: f.mimeType
            });
        }
        '$put /:name' (req, res, params) {
            let f = getFile(params.name, { create: true });
            f.content = req.body;
            return new HttpResponse({
                content: f.content,
                mimeType: f.mimeType
            });
        }
        '$delete /:name' (req, res, params) {
            delete files[params.name];

            return new HttpResponse({
                content: 'hello',
                mimeType: 'text/plain'
            });
        }
    }


    export async function create () {

        server = await Application.clean().create({
            configs: null,
            config: {
                debug: true,
                services: {
                    '^/files': FilesEndpoint,
                }
            }
        });

        const bodyParser = require('body-parser');
        const fileUpload = require('express-fileupload');
        server
            .processor({
                before: [
                    fileUpload({
                        limits: { fileSize: 50 * 1024 * 1024 }
                    }),
                    bodyParser.json({ limit: '50mb' }),
                    bodyParser.text({ limit: '50mb' }),
                    bodyParser.raw({ limit: '50mb' }),
                ],
            })
            .listen(0);

        port = server.getHttpPort();
    }
}
