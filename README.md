# Javascript HTTP api

### Simple example

```javascript
//Create the api instance using url
const api = new Api("https://www.google.com");

//The Api using fluent interface
api
    //For example set cacheable
    .setCache(Api.Cache.RELOAD)

    //Say that you want to send GET request using empty data
    .get('')

    //Use response what u need
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
}).then(response => console.log('New icon uploaded!'));

fonts_api.delete({
    id: 777,
    token: 'nwoeuifnwefnwenfw983293f293fin2093ifmn0qw'
}).then(response => console.log('Font by id 777 removed successful'));
```

### Send request by use header

```javascript
//Create the api instances by url what u need
const api = new Api('https://foo.bar');

api
  //Rewrite header
  .setHeader('Content-Type', 'application/json')
  //Append header
  .addHeader('Content-Type', 'application/json')
  .post({some: data})
  .then(response => console.log(response);
```




