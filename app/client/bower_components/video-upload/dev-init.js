#!/usr/bin/env node

//TODO to make this a module of its own, get the package name from package.json somehow

var exec = require('child_process').exec;
var cmd = `
    mkdir -p bower_components/video-upload &&
    mkdir -p bower_components/video-upload/dist &&
    ln -s ../../video-upload.component.html bower_components/video-upload/video-upload.component.html &&
    ln -s ../../../dist/video-upload.component.js bower_components/video-upload/dist/video-upload.component.js
`;

var newProcess = exec(cmd);

newProcess.stdout.on('data', function(data) {
    console.log(data);
});

newProcess.stderr.on('data', function(data) {
    console.log(data);
});
