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

##### read
Read file's content. If `encoding` is set to null raw `Buffer` is returned.
For each `read` middleware pipeline is used, to skip it, set `skipHooks` to true.

```ts
let content = file.read( <?Object> {
    encoding: String | null, //> 'utf8'
    skipHooks: Boolean //> false
});
```

##### readAsync
```ts
file
    .readAsync( <?Object> {
        encoding: String | null, //> 'utf8'
        skipHooks: Boolean //> false
    })
    .done(function(content, file))
    .fail(function(error))
```

##### readRange
Get byte or string range from a file

```ts
let content = file.readRange(position, length);
```

##### readRangeAsync
```ts
let content = await file.readRangeAsync(position, length)
```

##### write
```ts
file.write(String | Buffer, <?Object>{
    skipHooks: Boolean
})
```
##### writeAsync
```ts
file
    .writeAsync(String | Buffer, <?Object>{
        skipHooks: Boolean
    })
    .done(function())
    .fail(function(error))
```

##### exists
```ts
file.exists(): boolean
```

##### copyTo
```ts
interface IFileCopyOpts {
    silent?: boolean
    baseSource?: string
}
/**
 * @param path: Target file path or directory, when ends with slash
 */
file.copyTo(path: string, opts?: IFileCopyOpts): boolean
```
##### copyToAsync
```ts
file.copyToAsync(path: string, opts?: IFileCopyOpts): Promise<boolean>
```

##### rename
```ts
file.rename(filename: string)
```
##### renameAsync
```ts
file.renameAsync(filename: string): Promise<void>
```

##### replace
Reads the content as string, replaces the matches and writes the result.
Expected arguments are the same as for JavaScripts String `replace`.
Returns new content.

```ts
.replace(string | RegExp, string | Function): string
```

##### replaceAsync
```ts
.replaceAsync(string | RegExp, string | Function): Promise<string>
```

##### remove
```ts
file.remove()
```

##### removeAsync
```ts
file.removeAsync(): Promise<void>
```

##### watch
```ts
file.watch(cb: (path) => void)
```

Watch file for changes

##### unwatch
```ts
file.unwatch(cb?: (path) => void): boolean
```

#### Cache
Each `read` will be cached. To control cache behavior use next methods:

##### clearCache
```ts
File.clearCache(<?String> path);
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
    - yml ( -> Stringify object to yml string )
    - json ( -> Stringify object to json )

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
dir.exists()//> Boolean
```
##### existsAsync
```ts
dir.existsAsync()//> Deferred
```
##### readFiles
```ts
dir.readFiles(<?String> pattern).files // Array<io.Files>
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
    .readFilesAsync(<?String> pattern)
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
dir.rename(<String> folderName);
```
##### renameAsync
```ts
dir.renameAsync(<String> folderName) //> Deferred
```
##### remove
Removes all content recursively and the folder itself
```ts
dir.remove() //> Boolean
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
