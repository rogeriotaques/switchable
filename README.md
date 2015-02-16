# Switchable 1.0.x

Replaces checkbox by beautiful iphone style switch buttons.

Check it out its [Live Demo](http://awin.com.br/switchable).

## Getting started

Import required libraries and stylesheets.

Switchable requires Jquery.

```
  <link rel="stylesheet" type="text/css" href="../src/switchable.css" />
  <script type="text/javascript" src="js/jquery.1.7.1.js"></script>
  <script type="text/javascript" src="../src/switchable.min.js"></script>
```

Create the input checkboxes that you wanna to hold the switcher

```
  <input type="checkbox" id="myswitch" checked value="checked" data-label="The label you wanna comes here" >
```

Then, it's necessary to call it.

```	
	<script type="text/javascript" >
	  $(document).ready(function(){
	    $('#myswitch').switchable();
	  });
	</script>

```

That's all.

## Options

You also can pass some options when initializing it.

These options are:

### label_position : string 

Defines the label position.

Possible values are 'before' and 'after'.

Default: before

### checked_color : string

A custom color for the switch when checked
It's possible to provide the following pattern: 

  * #FFF, 
  * rgb(255,255,255), 
  * rgba(255,255,255, 0.5) or 
  * white
	
Default: null

### readonly : boolean

Indicates wheter the widget is readyonly.

Default: false

### click : callback

It allows you to call any custom function on 'click' event.

The callback function will receive the following parameters:

  * event, 
  * boolean (that indicates if it's checked)
  
The referred element (this) is available inside the event object, named as 'switcher'. So, if you need to retrieve the clicked switchable element, you just need to use the following code:

```
	<script type="text/javascript" >
	  $(document).ready(function(){
	    $('#myswitch').switchable({
            click: function( ev, checked )
            {
                console.log( ev.switcher.attr('id') );
            }
        });
	  });
	</script>

```

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/rogeriotaques/switchable/trend.png)](https://bitdeli.com/free "Bitdeli Badge")