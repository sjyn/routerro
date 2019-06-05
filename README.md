# Routerro
A super simple router for small websites.

# How it works
Routerro is really simple under the hood. It works by making and `XMLHttpRequest` to the path specified in the registered router.
If the route doesn't exist, then the router throws an error.
If the route does exist, the router replaces the content of the element with the provided id with the content of the page associated with the route ID.

# Examples
I use this on my [personal website](https://www.sjyn.org). 
You can also see the examples in the examples folder, which are included below. 


### index.html
```html
<!DOCTYPE html>
<html>
<head>
  <title>Hello, Routerro</title>
</head>
<body>
<button id="nav01">Page 01</button>
<button id="nav02">Page 02</button>
<div id="content"></div>
<script src="../src/routerro.js"></script>
<script>
  (function () {
    const router = new Router('content');
    router.addRoute(new Route('page01', './pages/page01.html'));
    router.addRoute(new Route('page02', './pages/page02.html'));

    document.getElementById('nav01').onclick = function goToPage01() {
      router.navigateToRoute('page01');
    };

    document.getElementById('nav02').onclick = function goToPage02() {
      router.navigateToRoute('page02');
    };
  })();
</script>
</body>
</html>
```

### page01.html
```html
<p>Page 01 works!</p>
```

### page02.html
```html
<p>Page 02 works!</p>
```
