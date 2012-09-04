buster.spec.expose();

testSuite = function(url) {
    it('should have a protocol of http', function() {
        expect(url.attr('protocol')).toBe('http');
    });

    it('should have a path of /folder/dir/index.html', function() {
        expect(url.attr('path')).toBe('/folder/dir/index.html');
    });

    /* should it? */
    it('should have an unset port', function() {
        expect(url.attr('port')).toBe('');
    });

    it('should have an host of allmarkedup.com', function() {
        expect(url.attr('host')).toBe('allmarkedup.com');
    });

    it('should have a relative path of /folder/dir/index.html?item=value#foo', function() {
        expect(url.attr('relative')).toBe('/folder/dir/index.html?item=value#foo');
    });

    it('should have a path of /folder/dir/index.html', function() {
        expect(url.attr('path')).toBe('/folder/dir/index.html');
    });

    it('should have a directory of /folder/dir/', function() {
        expect(url.attr('directory')).toBe('/folder/dir/');
    });

    it('should have a file of index.html', function() {
        expect(url.attr('file')).toBe('index.html');
    });

    it('should have a querystring of item=value', function() {
        expect(url.attr('query')).toBe('item=value');
    });

    it('should have an anchor of foo', function() {
        expect(url.attr('anchor')).toBe('foo');
        expect(url.attr('fragment')).toBe('foo');
    });

    it('should have a param() of item: "value"', function() {
        expect(url.param()).toBeObject({item: 'value'}) 
    });

    it('should have a param("item") of "value"', function() {
        expect(url.param('item')).toBe('value') 
    });

    it('should have a segment() of ["folder","dir","index.html"]', function() {
        expect(url.segment()).toEqual(["folder","dir","index.html"]) 
    });

    it('should have a segment(1) of "folder"', function() {
        expect(url.segment(1)).toBe("folder");
    });

    it('should have a segment(-1) of "folder"', function() {
        expect(url.segment(-1)).toBe("index.html");
    });
}

describe("purl in non-strict mode", function () {

    testSuite(purl('http://allmarkedup.com/folder/dir/index.html?item=value#foo'));

});


describe("purl in strict mode", function () {

    testSuite(purl('http://allmarkedup.com/folder/dir/index.html?item=value#foo',
                   true));

});
