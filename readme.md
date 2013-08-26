Atma Node.js IO Module
----

Features:
- File Class
- Directory Class
- File Read/Write Middleware
- Sync

Mostly all operations are synchronous, and this is really useful in case of _bash_ scripts or applications, where asynchronous performance is not critical.

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
    .files // -> all javascript Files from src directory and sub- in process.cwd()
    
'/*.js'   // only from 'src' directory
'**/*.js' // only from sub-directories

```

#### Middleware

Support:
- read
    - less
    - coffee
    - markdown
    - jshint
    - json
    - yml
    
- write
    - uglify
    - uglify


```javascript

// we can activate uglify *.js to minify scripts before they are flushed to harddrive

new io
    .File('myscript.js')
    .write(javascriptCode);

// or we can enable markdown reader, so that we receive parsed md into html

var html = new io.File('readme.md').read();

```