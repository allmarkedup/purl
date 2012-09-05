buster.spec.expose();

testSuite = function(wrapper, safe) {
    safe = safe || false;
    before(function() {
	this.url = wrapper('http://allmarkedup.com/folder/dir/index.html?item=value#foo', safe)
    })


    it('should have a protocol of http', function() {
        expect(this.url.attr('protocol')).toBe('http');
    });

    it('should have a path of /folder/dir/index.html', function() {
        expect(this.url.attr('path')).toBe('/folder/dir/index.html');
    });

    /* should it? */
    it('should have an unset port', function() {
        expect(this.url.attr('port')).toBe('');
    });

    it('should have a host of allmarkedup.com', function() {
        expect(this.url.attr('host')).toBe('allmarkedup.com');
    });

    it('should have a relative path of /folder/dir/index.html?item=value#foo', function() {
        expect(this.url.attr('relative')).toBe('/folder/dir/index.html?item=value#foo');
    });

    it('should have a path of /folder/dir/index.html', function() {
        expect(this.url.attr('path')).toBe('/folder/dir/index.html');
    });

    it('should have a directory of /folder/dir/', function() {
        expect(this.url.attr('directory')).toBe('/folder/dir/');
    });

    it('should have a file of index.html', function() {
        expect(this.url.attr('file')).toBe('index.html');
    });

    it('should have a querystring of item=value', function() {
        expect(this.url.attr('query')).toBe('item=value');
    });

    it('should have an anchor of foo', function() {
        expect(this.url.attr('anchor')).toBe('foo');
        expect(this.url.attr('fragment')).toBe('foo');
    });

    it('should have a param() of item: "value"', function() {
        expect(this.url.param()).toBeObject({item: 'value'}) 
    });

    it('should have a param("item") of "value"', function() {
        expect(this.url.param('item')).toBe('value') 
    });

    it('should have a segment() of ["folder","dir","index.html"]', function() {
        expect(this.url.segment()).toEqual(["folder","dir","index.html"]) 
    });

    it('should have a segment(1) of "folder"', function() {
        expect(this.url.segment(1)).toBe("folder");
    });

    it('should have a segment(-1) of "folder"', function() {
        expect(this.url.segment(-1)).toBe("index.html");
    });

    it('should have a source which is the url provided', function() {
	expect(this.url.attr('source')).toBe('http://allmarkedup.com/folder/dir/index.html?item=value#foo');
    });

    it('should let you set the source and that will change everything', function() {
	expect(this.url.attr('source', 'http://www.google.com').attr('host')).toBe('www.google.com');
    })

    it('should let you set relative path and that will show changes in the querystring', function() {
	expect(this.url.attr('relative', '/page.html?herp=derp').attr('query')).toBe('herp=derp');
    })

    it('should let you set the protocol to https', function() {
	expect(this.url.attr('protocol', 'https').attr('protocol')).toBe('https');
    });

    it('should change user and password if userInfo changes', function() {
	expect(this.url.attr('userInfo', 'someone:password').attr('user')).toBe('someone');
	expect(this.url.attr('userInfo', 'someone:password').attr('password')).toBe('password');
    });

    it('should change hostname if authority changes and a username and password are supplied', function() {
	expect(this.url.attr('authority', 'someone:password@www.google.com').attr('host')).toBe('www.google.com');
    });

    it('should change hostname if authority changes and a username and password are not supplied', function() {
	expect(this.url.attr('authority', 'www.google.com').attr('host')).toBe('www.google.com');
    });

    it('should change userInfo if user is changed', function() {
	expect(this.url.attr('user', 'foo').attr('userInfo')).toBe('foo:');
    });

    it('should change userInfo if password is changed', function() {
	expect(this.url.attr('password', 'foo').attr('userInfo')).toBe(':foo');
    });

    it('should change host if host is changed', function() {
	expect(this.url.attr('host', 'www.google.com').attr('host')).toBe('www.google.com');
    });

    it('should change relative if path is changed', function() {
	expect(this.url.attr('path', '/something/else').attr('relative')).toBe('/something/else?item=value#foo');
    });

    it('should change relative if directory is changed', function() {
	expect(this.url.attr('directory', '/something/else/').attr('relative')).toBe('/something/else/index.html?item=value#foo');
    });

    it('should change relative if file is changed', function() {
	expect(this.url.attr('file', 'help.html').attr('relative')).toBe('/folder/dir/help.html?item=value#foo');
    });

    it('should change relative if querystring is changed', function() {
	expect(this.url.attr('query', 'another=query').attr('relative')).toBe('/folder/dir/index.html?another=query#foo');
    });

    it('should change relative if fragment is changed', function() {
	expect(this.url.attr('fragment', 'bar').attr('relative')).toBe('/folder/dir/index.html?item=value#bar');
    });


}

describe("purl in non-strict mode", function () {

    testSuite(purl, false);

});

describe("purl in strict mode", function () {

    testSuite(purl, true);

});
