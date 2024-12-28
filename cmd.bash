npm init -y

npm i -D typescript // -D is the same as --save-dev

npx tsc --init --rootdir src --outdir lib --sourceMap --declaration --declarationMap

npx tsc --watch

node lib/index.js

npx create-react-app example --template typescript
npm run start
npm run build
npx serve build
npx tsc // run typescript compiler

// install type definitions examples
npm i --save-dev @types/node
npm i --save-dev @types/express

// package.json

"main": "lib",
"types": "lib"

// then run npm publish


// to run ts code on node directly, use ts-node
// npm i -D ts-node
// npx ts-node src/index.ts

// tsconfig
strict: true
strictNullChecks: true

// use other modules like npm packages
// https://stackoverflow.com/questions/55753163/package-json-is-not-under-rootdir/61467483#61467483
"declaration": true
"declarationMap": true
"outdir": "lib"
"rootDir": "src"
"composite": true // enables multi "module" builds

// then add references field in tsconfig.json

"references": [
{"path": "../example-lib"/}
]

// in package.json instead of building project "tsc --p ." run "tsc --build .", it will build all dependent projects (modules)
// start: "npm run build -- --watch"

##################
jest

npm i -D typescript jest ts-jest @types/jest ts-node

npx ts-jest config:init

# run specific test case with coverage inside dir
npx jest --no-cache --runInBand --clearMocks --restoreMocks --verbose --coverage --collectCoverageFrom="messages/*.ts" -i src/messages/messages.controller.spec.ts -t 'should be defined'

tsconfig.json

compilerOptions.esModuleInterop: true

// jest can also --watch particular tests

// search online for vscode recipes jest - repo with vs code configurations

// code can be ignored from jest coverage:
/* istanbul ignore file */
/* istanbul ignore next */

use vscode extension rest-client

##################

Nest JS, usually to set up the project use nest CLI, 

npm i @nestjs/common@7.6.17 @nestjs/core@7.6.17 @nestjs/platform-express@7.6.17 reflect-metadata@0.1.13 typescript@4.3.2

npx tsc --init --rootdir src --outdir lib --sourceMap --declaration --declarationMap

    "experimentalDecorators": true,              /* Enables experimental support for ES7 decorators. */
    "emitDecoratorMetadata": true,               /* Enables experimental support for emitting type metadata for decorators. */
    "target": "es2017", 
    
npx ts-node-dev src/main.ts


### 
install nest cli

npm install -g @nestjs/cli

nest new msgapp
nest generate module messages
nest generate controller messages/messages --flat // --flat don't create folder called controllers

### ValidationPipe
npm i --save class-validator class-transformer
// then add middleware: app.useGlobalPipes(new ValidationPipe());

### typeorm
npm i @nestjs/typeorm typeorm sqlite3
