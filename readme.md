## NodeJS FileSystem Module

----

<p align='center'>
    <img src='assets/background.jpg'/>
</p>

----

[![Build Status](https://travis-ci.com/atmajs/atma-io.svg?branch=master)](https://travis-ci.com/atmajs/atma-io)
[![NPM version](https://badge.fury.io/js/atma-io.svg)](http://badge.fury.io/js/atma-io)

Features:

- File Class.
- Directory Class.
- File IO Middlewares to preprocess reads and writes actions.
- File Transport middleware for custom file protocols, e.g. `s3://uploads/avatar.png`
- Sync and Async
- Safe Files to ensure thread-safe and process-safe file writes.
- File-locks to make custom process-safe actions easy to implement.
- File watcher: cross-platform file watchers.


----
[📚 API Documentation](https://docs.atma.dev/atma-io)
----

> In comparison to NodeJS sync-async contract: all functions with generic name are synchronous, and the `**Async` are asynchronous with the same interface. Sync versions never throw exceptions and are designed to be used in not performance critical applications, like bash scripts, etc. _Go `Async`._

- [File](#file)
    - [API](#file-methods)
    - [Cache](#cache)
    - [Middleware](#file-middleware)
    - [Virtual File](#virtual-files)
- [Directory](#directory)
    - [API](#directory-methods)

### File

#### File methods

##### File constructor
```ts
import { File } from 'atma-io'

const file = new File('./test.txt');
```

Path is relative to the `cwd` (_except windows os, when drive letter is used_). To specify system absolute path, use `file://` protocol.

##### `read` `readAsync`
Read file's content. If `encoding` is set to null raw `Buffer` is returned.
For each `read` middleware pipeline is used, to skip it, set `skipHooks` to true.

> Hooks will be per default executed. For example, when reading from `*.json` file the string will be deserialized to json object

```ts
let content = file.read<TOut = string>( options?: {
    encoding?: 'buffer' | 'utf8' //> default 'utf8'
    skipHooks?: boolean //> false
});

let content = await file.readAsync <TOut = string> (options?: {
    encoding?: 'buffer' | 'utf8', //> 'utf8'
    skipHooks?: boolean //> false
});
```

##### `readRange` `readRangeAsync`
Get bytes or string for a range from the file

```ts
let content = file.readRange(position, length);

let content = await file.readRangeAsync(position, length)
```

##### `write` `writeAsync`

> Hooks will be per default executed. For example, when writing to `*.json` file and providing an object, this object will be serialized to json string

```ts
file.write(string | Buffer | any, options?: {
    skipHooks?: boolean
})

file
    .writeAsync(content: string | Buffer | any, options?: {
        skipHooks?: boolean
    })
    .then(() => {}, (err) => {})
```


##### `append` `appendAsync`
```ts
file.append(content: string)

await file.appendAsync(string);
```

##### `exists` `existsAsync`
```ts
let b: boolean = file.exists()

let b: boolean = await file.existsAsync();
```

##### `copyTo` `copyToAsync`
```ts
interface IFileCopyOpts {
    silent?: boolean
    baseSource?: string
}
/**
 * @param path: Target file path or directory, when ends with slash
 */
file.copyTo(path: string, opts?: IFileCopyOpts): boolean

file.copyToAsync(path: string, opts?: IFileCopyOpts): Promise<boolean>
```

##### `rename` `renameAsync`
```ts
file.rename(filename: string)

file.renameAsync(filename: string): Promise<void>
```

##### `replace` `replaceAsync`
Reads the content as string, replaces the matches and writes the result.
Expected arguments are the same as for JavaScripts string `replace`.
Returns new content.

```ts
file.replace(search: string | RegExp, replacer: string | Function): string

file.replaceAsync(search: string | RegExp, replacer: string | Function): Promise<string>
```

##### `remove` `removeAsync`
```ts
file.remove(): boolean

file.removeAsync(): Promise<boolean>
```

##### `watch`

Watch file for changes

```ts
file.watch(cb: (path) => void)
```

##### unwatch
```ts
file.unwatch(cb?: (path) => void): boolean
```

#### Cache
Each `read` will be cached. To control cache behavior use next methods:

##### clearCache
```ts
File.clearCache(<?string> path);
```
When `path` is `null`, then all cache is dropped.
##### disableCache
```ts
File.disableCache();
```
##### enableCache
```ts
File.disableCache();
```

#### short forms
There are some static methods, so that there is no need to initialize the File instance.
```ts
File[method] //> Function(filepath, [..args])
// methods:
        'exists'
        'existsAsync'
        'read'
        'readAsync'
        'readRange'
        'readRangeAsync'
        'write'
        'writeAsync'
        'append'
        'appendAsync'
        'remove'
        'removeAsync'
        'replace'
        'replaceAsync'
        'rename'
        'renameAsync'
        'copyTo'
        'copyToAsync'

// sample
File
    .readAsync('/baz.txt')
    .done(function(content){
        console.log(content);
    })
    .fail(function(error){
        console.error(error);
    })
    ;
```

### File Middleware
Middleware pattern is used for all reads and writes. It can be used, for example, to compile coffee script to javascript on the fly. Or when reading `*.yml` file, the resulted content is not a YAML string, but already parsed object.

#### Extensions

To get the idea, look at the hook definition sample:
```ts
import { File } from 'atma-io'
File.registerExtensions({
    'coffee':[
        'conditions:read',
        'coffee-compiler:read',
        'uglify:write'
    ]
});
```
Each middleware has unique name and is registered in this way:
```ts
import { File } from 'atma-io'
File.middleware['coffee'] = {
    read: function(<io.File> file, <Object> config){
        let coffee = require('coffee-script');
        file.content = coffee.compile(file.content);
    },
    write: function(<io.File> file, <Object> config){
        // ... do smth with `content` before disk write
    }
};
```

#### Advanced middleware
```ts
import { File } from 'atma-io'
File
    .getHookHandler()
    .register({
        regexp: <RegExp>,
        method: <'read'|'write'>,
        handler: <Function | Object> handler,
        zIndex: <?Number> // default: 0
    });
```

Path is matched by the regexp. The greater `zIndex` is, the later it is called in the pipeline, otherwise the handlers are called in the order they were registered.

#### Embedded middlewares
_Lately will be converted into plugins, @see [Plugins](#middleware-plugins)_
- read
    - coffee ( -> javascript )
    - markdown ( -> html )
    - jshint ( -> run jshint )
    - json ( -> JSON.parse is used )
    - yml ( -> YAML parser is used )

- write
    - uglify ( -> Minify source before write)
    - cssmin ( -> Minify source before write)
    - yml ( -> stringify object to yml string )
    - json ( -> stringify object to json )

#### Middleware Plugins
There additional `read`/`write` middlewares as atma plugins:

###### `atma plugin install NAME`

- [`atma-loader-ts`](https://github.com/tenbits/atma-loader-ts) - Compiles [Typescript]
- [`atma-loader-less`](https://github.com/atmajs/atma-loader-less) - Compiles Less
- [`atma-loader-sass`](https://github.com/atmajs/atma-loader-sass) - Compiles SASS
- [`atma-io-middleware-yml`](https://github.com/tenbits/atma-io-middleware-yml) - Parse YML and returns the Object
- [`atma-io-transport-s3`](https://github.com/atmajs/atma-io-transport-s3) - Read/Save `s3://` files paths from/to S3 storage


###### Combined middlewares
For example, you want to use Traceur middelware and jshint for reading `js` files:
_via javascript_
```ts
File.registerExtensions({
    js: ['hint:read', 'atma-loader-ts:read' /* ... */],
})
```
_via `package.json`_
```json
...
"atma": {
    "settings" : {
        "io": {
            "extensions": {
                "js": [ "hint:read", "atma-loader-ts:read" ]
            }
        }
    }
}
```

### **Virtual** Files

Define with RegExp a File Handler to completely override  the read/write/exists/remove behavior.

```ts
import { File } from 'atma-io'
File
    .getFactory()
    .registerHandler(/defaults\.json$/i, class {
        exists (){
            return true;
        },
        read (){
            return { foo: 'bar' };
        }
    });

```


### Directory

#### Directory methods

##### Constructor
```ts
import { Directory } from 'atma-io'
let dir = new Directory('src/');
```
Path is always relative to the `cwd` (_except windows os, when drive letter is used_). To specify system absolute path, use `file://` protocol.

##### exists
```ts
dir.exists()//> boolean
```
##### existsAsync
```ts
dir.existsAsync()//> Deferred
```
##### readFiles
```ts
dir.readFiles(<?string> pattern).files // Array<io.Files>
```
Get list of all files in the directory. `pattern` is a glob pattern.
```ts
// all javascript files, also from sub-directories
pattern = '*.js';
// only from base directory
pattern = '/*.js'
// only from sub-directories
pattern = '**/*.js'

dir.readFiles(pattern).files
```
##### readFilesAsync
```ts
dir
    .readFilesAsync(<?string> pattern)
    .done(function(files))
    .fail(function(error))
```

##### copyTo
Copy `files` to destination directory. Before copying `dir.readFiles` can be called to copy only specific files.
```ts
dir.copyTo(destination: string)
```
##### copyToAsync
```ts
dir.copyToAsync(destination: string) //> Deferred
```

##### rename
```ts
dir.rename(<string> folderName);
```
##### renameAsync
```ts
dir.renameAsync(<string> folderName) //> Deferred
```
##### remove
Removes all content recursively and the folder itself
```ts
dir.remove() //> boolean
```

##### removeAsync
```ts
dir.removeAsync()
```

##### ensure
```ts
dir.ensure()
```
Creates directory structure, if not already exists.
##### ensureAsync
```ts
dir.ensureAsync()
```

##### watch
```ts
dir.watch(callback)
```
Watch directory for changes
##### unwatch
```ts
dir.unwatch(callback)
```

##### short forms
There are some static methods, so that there is no need to initialize the Directory instance.
```ts
Directory[method] //> Function(dirpath, [..args])
// methods:
    'exists'
    'existsAsync'
    'readFiles'
    'readFilesAsync'
    'ensure'
    'ensureAsync'
    'remove'
    'removeAsync'
    'copyTo'
    'copyToAsync'

// sample
io
    .Directory
    .readFilesAsync('sub/', '**.js')
    .done(function(files))
    .fail(function(error))
```


----
(c) MIT - Atma.js Project
