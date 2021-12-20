"use strict";
function main() {
    console.log("Your plug-in has started!");
}
registerPlugin({
    name: 'Your Plugin',
    version: '1.0',
    authors: ['Smitty'],
    type: 'remote',
    licence: 'MIT',
    targetApiVersion: 34,
    main: main
});
