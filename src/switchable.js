/**
 * Switchable - jQuery plugin to create a simple iOS style switcher for checkboxes.  
 * Copyright (c) 2014, Rogério Taques. 
 *
 * Licensed under MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this 
 * software and associated documentation files (the "Software"), to deal in the Software 
 * without restriction, including without limitation the rights to use, copy, modify, merge, 
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons 
 * to whom the Software is furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all copies or 
 * substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING 
 * BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, 
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @requires jQuery v1.9 or above
 * @version 1.1
 * @cat Plugins/Form Validation
 * @author Rogério Taques (rogerio.taques@gmail.com)
 * @see https://github.com/rogeriotaques/switchable
 */

/**
 * CHANGELOG
 * 
 * 1.0 First release.
 * 	   Supports label position (after/before), custom checked color and readonly property.
 * 
 */
(function($){
	
	var version = '1.0.1',
	
	// default options
	defaults = {
		// define the label position
		// possible values are 'before' (default) and 'after'
		label_position: 'before',
		
		// a custom color for the switch when checked
		// default is null, but you can provide following pattern: 
		//    #FFF, rgb(255,255,255), rgba(255,255,255, 0.5) or white
		checked_color: null,
		
		// indicates wheter the widget is readonly
		// possible values: true/false. default is false.
		readonly: false,
			
		// on click callback
		// function parameters are: event, boolean (that indicates if it's checked)
		click: null
	},
	
	methods = {
		
		version: function() 
		{
			return this.each(function() 
			{
				$(this).html(version);
			});
		}, // version
		
		init: function(options) 
		{
			var o = $.extend(defaults, options);
			
			return this.each( function() 
			{
				
				var me = $(this),
					wrapper  = $('<div />', {'class': 'switchable-wrapper'}),
					switcher = $('<div />', {'class': 'switchable-holder', 'style': 'display: inline-block'}),
					button   = $('<div />', {'class': 'switchable-switcher'}),
					label	 = $('<div />', {'class': 'switchable-label', 'html': (me.data('label') ? me.data('label'): '')});
				
				
				button.appendTo(switcher.appendTo(wrapper));
				me.after(wrapper);

				if (me.data('label'))
				{
					if (o.label_position == 'before')
					{
						switcher.before(label);					
					}
					else
					{
						wrapper.append(label);
					}
					
				}

				me.hide();
				switcher.toggleClass('switchable-checked', me.is(':checked'));
				
				// when a custom checked_color is given
				// force to use this color instead of the default one
				if (o.checked_color)
				{
					_setCustomColor( switcher, me.is(':checked'), o );
				}
				
				if (! o.readonly)
				{
				
					button.on('click', function(e){
						
						me.prop('checked', !me.is(':checked') );
						switcher.toggleClass('switchable-checked', me.is(':checked'));
						
						// when a custom checked_color is given
						// force to use this color instead of the default one
						if (o.checked_color)
						{
							_setCustomColor( switcher, me.is(':checked'), o );
						}
						
						if (o.click && $.isFunction(o.click))
						{
							e.switcher = me;
							return o.click(e, me.is(':checked'));
						}
					});
				}
				else
				{
                    switcher.addClass('switchable-readonly');
					button.css({'cursor': 'not-allowed'});
				}
				
			}); // this.each
			
		} // init
		
	}; // methods
	
	function _setCustomColor( switcher, is_checked, options ) 
	{
		
		switcher.css({
			'border-color': (is_checked ? options.checked_color : ''),
			'background-color': (is_checked ? options.checked_color : '')
		});
				
	} // _setCustomColor
	
	
	$.fn.switchable = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error( 'Method ' +  method + ' does not exist on jQuery.Switchable()' );
		}
	};
	
})(jQuery);