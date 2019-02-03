# Utaha Utilities

Some common util methods. (e.g Array/String/Date handler, Type Judgement and Debounce/Throttle)

## Installation
Script Tag Reference
```
  <script src="path/to/utaha.js""></script>
```
```
  utaha.isBrowser() // true
```

Using npm
> npm i utaha  
yarn add utaha
## Usage
 
import root Object
```
  const utaha = require('utaha')
  utaha.isArray([]) // true
```

we recommend you import as requirement in Browserify/webpack environment
```
  import { isUndef, isArray, isFunction } from utaha
``` 
## Notice
- DOM hanlder functions will not be imported when using pure Node.js environment.
```
  <script src="path/to/utaha.js""></script>
```
```
  utaha.isBrowser() // true
```
