Atma Node.js FileSystem Module
----
[![Build Status](https://travis-ci.org/atmajs/atma-io.svg?branch=master)](https://travis-ci.org/atmajs/atma-io)
[![NPM version](https://badge.fury.io/js/atma-io.svg)](http://badge.fury.io/js/atma-io)

Features:

- File Class
- Directory Class
- File `read/write` Middleware
- Sync + Async


> In comparison to NodeJS sync-async contract: all functions with generic name are synchronous, and the `**Async` are asynchronous with the same interface and return deferred object. Sync versions never throw exceptions and are designed to be used in not performance critical applications, like bash scripts, etc.

> This library is included into Atma.Toolkit, so creating custom scripts, you can use this API.

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
let file = new io.File('test.txt');
```
Path is always relative to the cwd (_except windows os, when drive letter is used_). To specify system absolute path, use `file://` protocol.

##### `read` `readAsync`
Read file's content. If `encoding` is set to null raw `Buffer` is returned.
For each `read` middleware pipeline is used, to skip it, set `skipHooks` to true.

> Hooks will be per default executed. For example, when reading from `*.json` file the string will be deserialized to json object

```ts
let content = file.read<TOut = string>( options?: {
    encoding?: string | null, //> 'utf8'
    skipHooks?: boolean //> false
});

file
    .readAsync <TOut = string> (options?: {
        encoding?: string | null, //> 'utf8'
        skipHooks?: boolean //> false
    })
    .then((content) => {}, (error) => {})
```

##### `readRange` `readRangeAsync`
Get byte or string range from a file

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

file
    .appendAsync(string)
    .then(() => {}, (err) => {})
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
Each middleware has unique name and is registerd in this way:
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

Path is matched by the regexp. The greater `zIndex` ist the later it is called in a pipeline, otherwise the handlers are called in the order they were registerd.

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

- `atma-loader-traceur` - [Traceur](https://github.com/atmajs/atma-loader-traceur)
- `atma-loader-less` - [Less](https://github.com/atmajs/atma-loader-less)


###### Combined middlewares
For example, you want to use Traceur middelware and jshint for reading `js` files:
_via javascript_
```ts
File.registerExtensions({
    js: ['hint:read', 'atma-loader-traceur:read' /* ... */],
})
```
_via `package.json`_
```json
...
"atma": {
    "settings" : {
        "io": {
            "extensions": {
                "js": [ "hint:read", "atma-loader-traceur:read" ]
            }
        }
    }
}
```

### **Virtual** Files

Define with RegExp a File Handler to completely override  the read/write/exists/remove behaviour.

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
Path is always relative to the cwd (_except windows os, when drive letter is used_). To specify system absolute path, use `file://` protocol.

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
