;(function($) {
    
    var tag2attr = {
        a       : 'href',
        img     : 'src',
        form    : 'action',
        base    : 'href',
        script  : 'src',
        iframe  : 'src',
        link    : 'href'
    },
    
	key = ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"], // keys available to query 

	parser = {
		strict  : /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,  //less intuitive, more accurate to the specs
		loose   :  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // more intuitive, fails on relative paths and deviates from specs
	},
	
	qs_parser = /(?:^|&|;)([^&=;]*)=?([^&;]*)/g; // supports both ampersand and semicolon-delimted query string key/value pairs
		
	function parseUri( url, strictMode )
	{
		str = decodeURI( url );
		
		strictMode = strictMode || false;
		
		var m = parser[ strictMode ? "strict" : "loose" ].exec( str );
		var uri = {};
		var i = 14;

		while ( i-- )
		{
			uri[ key[i] ] = m[i] || "";
		}

		uri['params'] = {};
		
		uri['query'].replace( qs_parser, function ( $0, $1, $2 ){
			if ($1)
			{
				uri['params'][$1] = $2;
			}
		});

		return uri;
	};
	
	function getAttrName( elm )
	{
		var tg = elm.tagName;
		if ( tg !== undefined ) return tag2attr[tg.toLowerCase()];
		return tg;
	}
	
	$.fn.url = function( strictMode )
	{
	    var url = '';
	    
	    if ( this.length )
	    {
	        url = $(this).attr( getAttrName(this[0]) ) || '';
	    }
	    
        return $.url({ url : url, strict : strictMode });
	};
	
	$.url = function( opts )
	{
	    var url     = '',
	        strict  = false;
	        
	    if ( typeof opts === 'string' )
	    {
	        url = opts;
	    }
	    else
	    {
	        strict = opts.strict || strict;
	        url = opts.url === undefined ? window.location.toString() : opts.url;
	    }
        
        console.log(url)
        
        // TBC...
	};
	
})(jQuery);