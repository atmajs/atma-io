Atma Node.js IO Module
----

Features:

- File Class
- Directory Class
- File Read/Write Middleware
- Sync

Mostly all operations are synchronous, and this is really useful in case of _bash_ scripts or applications, 
where asynchronous performance is not critical.

This library is included into Atma.Toolkit, so creating custom scripts you can already use this API.

#### File
```javascript
var file = new io.File('test.txt');
// path is relative to process.cwd()


// read
var content = file.read();


// write
file.write('Lorem Ipsum');
```


#### Directory

```javascript
// glob

new io
    .Directory('src')
    .readFiles('*.js')
    .files 
    // -> (<Array>.File) all javascript Files from src directory and sub- in process.cwd()
    
'/*.js'   // only from 'src' directory
'**/*.js' // only from sub-directories

```

#### Middleware

There is a read/write middleware pattern. For example, when reading a '.coffee' file, and such middlewares are registered: 'coffee', 'jshint'. 
Then the content will be parsed to javascript source by 'coffee' middleware, and then 'jshint' will be run on that source.

Support:

- read
    - less ( -> css)
    - coffee ( -> javascript )
    - markdown ( -> html )
    - jshint ( -> run jshint )
    - json ( -> JSON.parse is used )
    - yml ( -> YAML parser is used )
    
- write
    - uglify ( -> Minify source before flushing )
    - yml ( -> Stringify object to yml string )
    - json ( -> Stringify object to json )


```javascript

// we can activate uglify *.js to minify scripts before they are flushed to harddrive

new io
    .File('myscript.js')
    .write(javascriptCode);

// or we can enable markdown reader, so that we receive parsed md into html

var html = new io.File('readme.md').read();

```


### File Handler

Define via RegExp a File Handler to process read/writes etc. In this way virtual files could be defined. 

```javascript
io
    .File
    .getFactory()
    .registerHandler(/defaults\.json$/i, Class({
        exists: function(){
            return true;
        },
        read: function(){
            return { foo: 'bar' };
        }
    }));

```

_This is very useful in 'importer' action of Atma.Toolkit. So also some virtual files could be embedded into built file._


