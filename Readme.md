# Stockage.js

Stockage is a micro API wrapper for browser data storage. 
Choose your storage method: localStorage, sessionStorage, or cookies.

## Install

Copy the library in your web project and include it  

```
<script src="path/to/library/stockage.js"></script>
```

## Usage

You can access a Storage object calling Stockage.Local, Stockage.Session or Stockage.Cookie 

### Methods

Each storage object has 6 methods: `set()`, `get()`, `list()`, `has()`, `remove()`, `clear()`

### set

Store a value in storage

Arguments:
 - `key` (string)
 - `value` (string|Object)

```
Stockage.Local.set('count', 7);
Stockage.Local.set('username', 'my_user');

Stockage.Session.set('user', { name: 'Anton', age: 31 });

Stockage.Cookie.set('cook', 86100);
```

### has

Check if a key was stored

Arguments:
 - `key` (string)

Returns:
bool: `true` if the key was stored. If no value `false` is returned.

```
Stockage.Local.has('count'); 
// -> true

Stockage.Local.has('foo'); 
// -> false

```

### get

Retrieves specified value

Arguments:
 - `key` (string)

Returns:
string|Object: The stored value. If no value `null` is returned.

```
Stockage.Local.get('count'); 
// -> 7 

Stockage.Session.get('user'); 
// -> { name: 'Anton', age: 31 }
```

### list

Retrieves all values from storage

```
Stockage.Local.list();
// -> Array[7, 'my_user']
```

### remove

Removes a value from storage

Arguments:
 - `key` (string)

```
Stockage.Local.remove('count');
```

### clear

Removes all values from storage

```
Stockage.Session.clear();
```

