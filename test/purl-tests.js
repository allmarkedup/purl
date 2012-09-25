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
        expect(url.attr('relative')).toBe('/folder/dir/index.html?item=value&item2=foobar#foo');
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
        expect(url.attr('query')).toBe('item=value&item2=foobar');
    });

    it('should have an anchor of foo', function() {
        expect(url.attr('anchor')).toBe('foo');
        expect(url.attr('fragment')).toBe('foo');
    });

    it('should have a param() of item: "value", item2: "foobar"', function() {
        var p = url.param();
        expect(p['item']).toBe('value');
        expect(p['item2']).toBe('foobar');
    });

    it('should have a param("item") of "value"', function() {
        expect(url.param('item')).toBe('value');
    });

    it('should have a segment() of ["folder","dir","index.html"]', function() {
        expect(url.segment()).toEqual(["folder","dir","index.html"]);
    });

    it('should have a segment(1) of "folder"', function() {
        expect(url.segment(1)).toBe("folder");
    });

    it('should have a segment(-1) of "folder"', function() {
        expect(url.segment(-1)).toBe("index.html");
    });

    it('test toString', function() {
        expect(url.toString()).toBe("http://allmarkedup.com/folder/dir/index.html?item=value&item2=foobar#foo");
    });

    it('test toString after "item" param updated', function() {
        url.param('item', 'value2');
        expect(url.toString()).toBe("http://allmarkedup.com/folder/dir/index.html?item=value2&item2=foobar#foo");
    });

    it('test toString after "item2" param remove', function() {
        url.removeParam('item2');
        expect(url.toString()).toBe("http://allmarkedup.com/folder/dir/index.html?item=value2#foo");
    });

    it('test toString after append "item3" param', function() {
        url.param('item3', 87);
        expect(url.toString()).toBe("http://allmarkedup.com/folder/dir/index.html?item=value2&item3=87#foo");
    });

    it('test toString after replace all params', function() {
        url.param({
            'item4': 88,
            'item5': 42
        });
        expect(url.toString()).toBe("http://allmarkedup.com/folder/dir/index.html?item4=88&item5=42#foo");
    });
};

describe("purl in non-strict mode", function () {
    testSuite(purl('http://allmarkedup.com/folder/dir/index.html?item=value&item2=foobar#foo'));
});


describe("purl in strict mode", function () {
    testSuite(purl('http://allmarkedup.com/folder/dir/index.html?item=value&item2=foobar#foo',
                   true));
});

describe("url('/path/subpath')", function() {
    it('param is {}', function() {
        var url = purl('/path/subpath');
        assert.equals(url.param(), {});
    });
    it('test1', function() {
        var url = purl('/path/subpath');
        console.log(url.toString());
        assert.equals(url.toString(), '/path/subpath');
    });
});
