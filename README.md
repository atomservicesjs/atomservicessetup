# AtomServicesSetup [![Build Status](https://travis-ci.org/atomservicesjs/atomservicessetup.svg?branch=master)](https://travis-ci.org/atomservicesjs/atomservicessetup) [![Coverage Status](https://coveralls.io/repos/github/atomservicesjs/atomservicessetup/badge.svg?branch=master&bust=1)](https://coveralls.io/github/atomservicesjs/atomservicessetup?branch=master)

**Architecode AtomServices Setup** or **"atomservicessetup"** _(package name)_ provides _a library to load a **multiple-files setup**_ to create an application in [**AtomServices**](https://github.com/atomservicesjs/atomservices).

```javascript
"use strict";

const ApplicationSetupLoader = require("atomservicessetup").ApplicationSetupLoader;
const setup = ApplicationSetupLoader.load();
```

## Overview

### Essentials

**Application's Contructor** + **_<u>Setup</u>_** => **Application**

In order to create an **AtomServices** application, the application's constructor _needs_ the **setup**. The **AtomServices** opens a way for you to acquire the **setup**.

_"**AtomServicesSetup** provides a way to acquire the **setup** from multiple files to create an application."_

It means that **AtomServicesSetup** is _<u>optional</u>_. You can **<u>implement your own way</u>** that acquire the **setup**.

### Installation

**AtomServicesSetup** is available as a _**JavaScript**_ library on [**npm**](https://www.npmjs.com/).

```javascript
npm install atomservicessetup
```

### Usage

To acquire **setup**, **AtomServicesSetup** provides **ApplicationSetupLoader** to load from files via _load()_ method.

#### Automatically Load File
```javascript
const setup = ApplicationSetupLoader.load();
```

When **ApplicationSetupLoader.load()** is called, it finds the **'atom.app.js'** file under the _executing_ library's root directory and uses it as the _application setup_ file. However, it'll _**throw an error**_ when it found **no files** or **multiple files**. In **Automatically Load File** approach, it expects **<u>only one application setup file (atom.app.js)</u>**.

#### Specifically Load File _(recomeneded)_

```javascript
const absolute_path = "root/to/application/directory/to/atom.app.js";
const relative_path = "./to/atom.app.js";

const abs_setup = ApplicationSetupLoader.load(absolute_path);
const rel_setup = ApplicationSetupLoader.load(relative_path);
```

The **Specifically Load File** approach is **recommended**. When specifying the _**absolute**_ or _**relative**_ file path, it loads the file directly. It's effective when there are multiple files.

## Structure

There are **_four_ primary components** in **Structure**: **Application**, **Modular**, **Services**, and **Toolsets**.

### Files Structure

Here is how we structure the files:

```
root
├── node_modules
├── package.json
├── .gitignore
└── app
    ├── atom.app.js
    └── modulars
        ├── modular_01 
        │   ├── atom.modular.js
        │   ├── services
        │   │   ├── index.js
        │   │   ├── defines
        │   │   │   └── index.js
        │   │   │   └── service_01.js
        │   │   │   └── service_02.js
        │   │   │   └── service_03.js
        │   │   │   └── ...
        │   │   ├── setups
        │   │   │   └── index.js
        │   │   │   └── setup_01.js
        │   │   │   └── setup_02.js
        │   │   │   └── setup_03.js
        │   │   │   └── ...
        │   │   └── initializers
        │   │       └── index.js
        │   │       └── initializer_01.js
        │   │       └── initializer_02.js
        │   │       └── initializer_03.js
        │   │       └── ...
        │   └── toolsets
        │       ├── index.js
        │       ├── defines
        │       │   └── index.js
        │       │   └── toolsets_01.js
        │       │   └── toolsets_02.js
        │       │   └── toolsets_03.js
        │       │   └── ...
        │       ├── setups
        │       │   └── index.js
        │       │   └── setup_01.js
        │       │   └── setup_02.js
        │       │   └── setup_03.js
        │       │   └── ...
        │       └── initializers
        │           └── index.js
        │           └── initializer_01.js
        │           └── initializer_02.js
        │           └── initializer_03.js
        │           └── ...
        ├── modular_02
        │   └── ...
        └── modular_03
            └── ...
```

```
:: 1. APPLICATION STRUCTURE ::

root/app
  - atom.app.js

:: 2. MODULAR STRUCTURE ::

root/app/modulars/modular_01
  - atom.modular.js

root/app/modulars/modular_02
  - atom.modular.js

root/app/modulars/modular_03
  - atom.modular.js

:: 3. SERVICES STRUCTURE ::

root/app/modulars/modular_01/services
  - index.js (optionally)

root/app/modulars/modular_01/services/defines
  - index.js
  - service_01.js
  - service_02.js
  - service_03.js
  - ...

root/app/modulars/modular_01/services/setups
  - index.js
  - setup_01.js
  - setup_02.js
  - setup_03.js
  - ...

root/app/modulars/modular_01/services/initializers
  - index.js
  - initializer_01.js
  - initializer_02.js
  - initializer_03.js
  - ...

:: 4. TOOLSETS STRUCTURE ::

root/app/modulars/modular_01/toolsets
  - index.js (optionally)

root/app/modulars/modular_01/toolsets/defines
  - index.js
  - toolsets_01.js
  - toolsets_02.js
  - toolsets_03.js
  - ...

root/app/modulars/modular_01/toolsets/setups
  - index.js
  - setup_01.js
  - setup_02.js
  - setup_03.js
  - ...

root/app/modulars/modular_01/toolsets/initializers
  - index.js
  - initializer_01.js
  - initializer_02.js
  - initializer_03.js
  - ...
```

#### 1. APPLICATION STRUCTURE

```
:: STRUCTURE ::

root/app
  - atom.app.js
```

In the **atom.app.js** file:

```
:: atom.app.js file ::

module.exports = {
  name: string
};
```
