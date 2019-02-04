# Utaha Utilities

Some common util methods. (e.g Array/String/Date handler, Type Judgement and Debounce/Throttle)

## Installation

Using npm
> npm i utaha  
yarn add utaha
## Usage
 
import root Object
```
  const utaha = require('utaha')
  utaha.isArray([]) // true
```

We recommend you import as requirement in Browserify/webpack environment
```
  import { isUndef, isArray, isFunction } from utaha
``` 
## Notice
- We don't provide HTML script reference for now. this will join into CDN deploy schedule.
