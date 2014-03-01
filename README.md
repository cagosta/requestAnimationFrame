# requestAnimationFrame  
[![Build Status](https://secure.travis-ci.org/cagosta/requestAnimationFrame.png?branch=master)](https://travis-ci.org/cagosta/requestAnimationFrame)


## Introduction ##

requestAnimationFrame polyfill by Paul Irish & Erik Möller.  
This is just a AMD-modularized bower-ready fork.  



## Demo ##
See [cagosta.github.io/requestAnimationFrame](http://cagosta.github.io/requestAnimationFrame) 

## Install ##

requestAnimationFrame is developped as [AMD module](http://requirejs.org/docs/whyamd.html) but can be installed with npm, bower or src=".min.js".



#### With bower: ####

``` 
bower install requestAnimationFrame
```

Point `requestAnimationFrame` to `[bower_components_path]/requestAnimationFrame/app/requestAnimationFrame.js` into your requirejs path config 
and load it with requirejs:  

```javascript
require(['requestAnimationFrame/requestAnimationFrame'], function( requestAnimationFrame ){

})
```


#### With src=" .min.js" ####


Inside the `dist` folder, [download latest standalone minified version](https://raw.github.com/cagosta/requestAnimationFrame/master/dist/requestAnimationFrame-latest-standalone-min.js) or [development version](https://raw.github.com/cagosta/requestAnimationFrame/master/dist/requestAnimationFrame-latest-standalone.js) and include it in your html page:

```html
<script src="[path_to_source]/requestAnimationFrame-latest-standalone-min.js%>"></script>
```

The module is available via the scope 

```javascript
window.requestAnimationFrame
```


## Authors ##
* [Erik Möller]  
* [Paul Irish]  
* [Cyril Agosta](https://github.com/cagosta)


## License ##

[MIT License](http://www.opensource.org/licenses/mit-license.php)

