Purl (A JavaScript URL parser) v2.3.1
===================================

An AMD compatible utility to parse urls and provide easy access to their attributes (such as the protocol, host, port etc), path segments, querystring parameters, fragment parameters and more.

The core parser functionality is based on the [Regex URI parser by Steven Levithan](http://blog.stevenlevithan.com/archives/parseuri), and the query string parsing is handled by a modified version of [node-querystring](https://github.com/visionmedia/node-querystring).

**Note this used to have a jQuery dependency - this is now optional. See below for details**

**License:** Available for use under a MIT-style license. If you need a different license for any reason please just let me know.

To jQuery or *not* to jQuery, that is the question...
----------------------------------------------------

This utility can be used in two ways - with jQuery or without. There is just one file (purl.js) for both versions - if jQuery is included on the page before it then it will provide the 'jQuery-style' interface (see examples below), otherwise it will be accessible via the global `purl` variable.

The jQuery version has an additional feature that lets it extract the URL from a jQuery element object, where appropriate.

Specifying the URL to parse
---------------------------

There are a few different ways to choose what URL to parse:

``` javascript
/*---- jQuery version -----*/
var url = $.url(); // parse the current page URL
var url = $.url('http://allmarkedup.com'); // pass in a URI as a string and parse that 
var url = $('#myElement').url(); // extract the URL from the selected element and parse that - will work on any element with a `src`, `href` or `action` attribute.

/*---- plain JS version -----*/
var url = purl(); // parse the current page URL
var url = purl('http://allmarkedup.com'); // pass in a URI as a string and parse that 
```

URL attributes
--------------

The `.attr()` method is used to return information on various parts of the URL. For example:

``` javascript
var url = $.url('http://allmarkedup.com/folder/dir/index.html?item=value'); // jQuery version
var url = purl('http://allmarkedup.com/folder/dir/index.html?item=value'); // plain JS version
url.attr('protocol'); // returns 'http'
url.attr('path'); // returns '/folder/dir/index.html'
```

The attributes available for querying are:
<table>
  <tr><td>source</td><td>The whole url being parsed</td></tr>
	<tr><td>protocol</td><td>eg. http, https, file, etc</td></tr>
	<tr><td>host</td><td>eg. www.mydomain.com, localhost etc</td></tr>
	<tr><td>port</td><td>eg. 80</td></tr>
	<tr><td>relative</td><td>The relative path to the file including the querystring (eg. /folder/dir/index.html?item=value)</td></tr>
	<tr><td>path</td><td>The path to the file (eg. /folder/dir/index.html)</td></tr>
	<tr><td>directory</td><td>The directory part of the path (eg. /folder/dir/)</td></tr>
	<tr><td>file</td><td>The basename of the file eg. index.html</td></tr>
	<tr><td>query</td><td>The entire query string if it exists, eg. item=value&item2=value2</td></tr>
	<tr><td>fragment or anchor</td><td>The entire string after the # symbol </td></tr>
</table>

``` javascript
> url = $.url("http://markdown.com/awesome/language/markdown.html?show=all#top");
> url.attr('source');
"http://markdown.com/awesome/language/markdown.html?show=all#top"

> url.attr('protocol');
"http"

> url.attr('host');
"markdown.com"

> url.attr('relative');
"/awesome/language/markdown.html?show=all#top"

> url.attr('path');
"/awesome/language/markdown.html"

> url.attr('directory');
"/awesome/language/"

> url.attr('file');
"markdown.html"

> url.attr('query');
"show=all"

> url.attr('fragment');
"top"
```


There are also a few more obscure ones available too if you want to dig about a bit ;-)

If you don't specify an attribute then this method will return an object literal with all the available attribute key:value pairs in it.

Query string parameters
-----------------------

The `.param()` method is used to return the values of querystring parameters.

Pass in a string to access that parameter's value:

``` javascript
/*---- jQuery version -----*/
$.url('http://allmarkedup.com?sky=blue&grass=green').param('sky'); // returns 'blue'

/*---- plain JS version -----*/
purl('http://allmarkedup.com?sky=blue&grass=green').param('sky'); // returns 'blue'
```

If no argument is passed in it will return an object literal containing a key:value map of all the querystring parameters.

``` javascript
/*---- jQuery version -----*/
$.url('http://allmarkedup.com?sky=blue&grass=green').param(); // returns { 'sky':'blue', 'grass':'green' }

/*---- plain JS version -----*/
purl('http://allmarkedup.com?sky=blue&grass=green').param(); // returns { 'sky':'blue', 'grass':'green' }
```

Note that the `.param()` method will work on both ampersand-split and semicolon-split querystrings.

*As of version 2.2 the param method now handles array-style query string params.*

URL segments
-----------------------

The `.segment()` method is used to return values of individual segments from the URL's path.

Pass in an integer value to get the value of that segment - note however that the count is *not* zero-indexed like an array - i.e. `.segment(1)` returns the *first* segment, not the second one.

You can also pass in negative values, in which case it will count back from the end of the path rather than forwards from the start.

``` javascript
var url = $.url('http://allmarkedup.com/folder/dir/example/index.html'); // jQuery version
var url = purl('http://allmarkedup.com/folder/dir/example/index.html'); // plain JS version
url.segment(1); // returns 'folder'
url.segment(-2); // returns 'example'
```
If no argument is passed in it will return an array of all the segments (which will be zero-indexed!).

``` javascript
$.url('http://allmarkedup.com/folder/dir/example/index.html').segment(); // jQuery version - returns ['folder','dir','example','index.html']
purl('http://allmarkedup.com/folder/dir/example/index.html').segment(); // plain JS version - returns ['folder','dir','example','index.html']
```

Fragment parameters and/or segments
-------------------------------

Some sites and apps also use the hash fragment to store querystring-style key value pairs (eg. `http://test.com/#sky=blue&grass=green`), or slash-delimited paths (eg. `http://test.com/#/about/us/`).

There are two methods available for extracting information from fragments of these types - `.fparam()` and `.fsegment()`, both of which behave indentically to their `.param()` and `.segment()` counterparts but act on the fragment rather than the main URL.

``` javascript
/*---- jQuery version -----*/
$.url('http://test.com/#sky=blue&grass=green').fparam('grass'); // returns 'green'
$.url('http://test.com/#/about/us/').fsegment(1); // returns 'about'

/*---- plain JS version -----*/
purl('http://test.com/#sky=blue&grass=green').fparam('grass'); // returns 'green'
purl('http://test.com/#/about/us/').fsegment(1); // returns 'about'
```

Strict mode and relative URLs
--------------------

Internally this plugin uses Steven Levithan's excellent Regex URI parser, which has two modes - loose and strict. This plugin uses the loose mode by default (i.e. strict mode set to `false`), which deviates slightly from the specs but can produce more intuitive results in some situations. However, loose mode will not correctly parse relative URLs, so you can optionally enable strict mode when calling the plugin as follows:

``` javascript
/*---- jQuery version -----*/
var url = $.url(true); // parse the current page URL in strict mode
var url = $.url('http://allmarkedup.com',true); // pass in a URI as a string and parse that in strict mode
var url = $('#myElement').url(true); // extract the URL from the selected element and parse that in strict mode

/*---- plain JS version -----*/
var url = purl(true); // parse the current page URL in strict mode
var url = purl('http://allmarkedup.com',true); // pass in a URI as a string and parse that in strict mode
```


A note on improperly encoded URLs
---------------------------------

If you attempt to use this plugin to parse a URL that has an invalid character encoding in it, it will throw a `URIError` Exception. This will happen if the URL has a percentage sign followed by either a non-numeric character or a numeric value of greater than 80 (i.e. 128 in decimal).

If there is a chance you may end up parsing a badly encoded URL you should probably wrap your calls to this plugin in a try/catch block to prevent this causing unforseen problems.

Thanks to [steve78b](https://github.com/steve78b) for pointing this out.

Older versions and compatability
---------------------------------

Please note that v2.x is **not** backwards compatible with v1.x of this plugin. v1.1 is still [available for download](https://github.com/allmarkedup/jQuery-URL-Parser/zipball/v1.1) should you need it for some reason.

Testing
-------

@omarqureshi has kindly contributed some unit tests, which can be run using [http://busterjs.org](buster.js). The tests only currently cover the non-jQuery version.

To run you'll need to have Buster installed (requires node and npm);

```
$ npm install -g buster
```

Once it's installed, just do:

```
$ cd /path/to/jQuery-URL-Parser
$ buster static
```

Buster will then start up a server and give you a url (like `http://localhost:8956`) which you can navigate to with your browser of choice to see the test results.




