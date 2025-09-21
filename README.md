# Javascript HTTP api

[![tests](https://github.com/strannyi-tip/http-api/actions/workflows/npm-test.yml/badge.svg)](https://github.com/strannyi-tip/http-api/actions/workflows/npm-test.yml)

### Simple example

```javascript
//Create the api instance using url
const api = new Api("https://www.google.com");

//The Api using fluent interface
api
    //For example set cacheable
    .setCache(Api.Cache.RELOAD)

    //Say that you want to send GET request
    .get()

    //Use response what u need. @result is a Response object
    .then(result => console.log(result));
```

### Using several instances

```javascript
//Create the api instances by url what u need
const icons_api = new Api('https://foo.bar/icons');
const fonts_api = new Api('https://foo.bar/fonts');

icons_api.post({
    name: 'First icon',
    file: '/icons/icon1.png'
})
    .then(response => console.log('New icon uploaded!'))
    .catch(error => throw new Error('Upload error'));

fonts_api.delete({
    id: 777,
    token: 'nwoeuifnwefnwenfw983293f293fin2093ifmn0qw'
}).then(response => console.log('Font by id 777 removed successful'));
```

### Send a request by using a header

```javascript
//Create the api instances by url what u need
const api = new Api('https://foo.bar');

api
  //Rewrite header
  .setHeader('Content-Type', 'application/json')
  //Append header
  .addHeader('Content-Type', 'application/json')
  .post({some: data})
  .then(response => response.text().then(text => console.log(text)));
```


### Use watching

```javascript
    //Create the api instance point to resource url
    const api = new Api('https://foo.bar/object/1');
    
    api
        .watch({id: 1, name: 'GiveMeFood'}, (diff) => console.log(diff));
```

The watch method tracks whether the remote object has changed and returns a difference only if changes have occurred.






