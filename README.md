jQuery URL Parser
=================

A jQuery plugin to parse urls and provides easy access to information within them, such as the protocol, host, port, the segments that make up the path and the various query string values.

The parser is based on the Regex URI parser by Steven Levithan - http://blog.stevenlevithan.com/archives/parseuri.

License
-------

http://unlicense.org/ - i.e. do what you want with it :-)

Usage
-----

By default, the parser will use the url of the current page. This can be changed to use a url passed in manually if required (see code example below).

There are two modes of url parser - strict and loose. Loose is the default parsing mode, it deviates from the specs slightly but splits the url up in a more intuitive manner. It is the recommended parsing mode. For more information on the two different parsing modes, see Steven Levithan's blog post (linked above) on the url parser used in the parser.

The parser can return the following information about the url:

*    **source** - the url itself
*    **protocol** - eg. http, https, file, etc
*    **host** - eg. www.mydomain.com, localhost etc
*    **port** - eg. 80
*    **query** - the entire query string if it exists, eg. item=value&item2=value2
*    **individual query string parameter values**
*    **file** - the basename of the file eg. index.html
*    **anchor** - the hash (anchor) value
*    **path** - the path to the file (eg. /folder/dir/index.html)
*    **relative** - the relative path to the file including the query string (eg. /folder/dir/index.html?item=value)
*    **directory** - the directory part of the path (eg. /folder/dir/)
*    **individual segments of the path**

The source, protocol, host, port, relative, path, directory, file, query and anchor strings are available through the `.attr()` method.

The query string parameters are available through the `.param()` method

The individual path segements are available through the `.segment()` method

Examples of use
---------------

Using the current page's url (for these examples  https://mysite.com/information/about/index.html?itemID=2&user=dave):

    // get the protocol
    jQuery.url.attr("protocol") // returns 'http'

    // get the path
    jQuery.url.attr("path") // returns '/information/about/index.html'

    // get the host
    jQuery.url.attr("host") // returns 'mysite.com'

    // get the value for the itemID query parameter
    jQuery.url.param("itemID") // returns 2

    // get the second segment from the url path
    jQuery.url.segment(2) // returns 'about'
    
Using a different url to the current page:

    // set a different URL and return the anchor string
    jQuery.url.setUrl("http://allmarkedup.com/category/javascript/#footer").attr("anchor") // returns 'footer'

