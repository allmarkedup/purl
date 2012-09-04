buster.spec.expose();

describe("purl in non-strict mode", function () {

    before(function () {
        this.url = purl('http://allmarkedup.com/folder/dir/index.html?item=value#foo');
    });

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

    it('should have an host of allmarkedup.com', function() {
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

});
