const exec = require('child_process').exec;

const isRunning = (query, cb) => {
    let platform = process.platform;
    let cmd = '';
    switch (platform) {
        case 'win32': cmd = `tasklist`; break;
        case 'darwin': cmd = `ps -ax | grep ${query}`; break;
        case 'linux': cmd = `ps -A`; break;
        default: break;
    }
    exec(cmd, (err, stdout, stderr) => {
        cb(stdout.toLowerCase().indexOf(query.toLowerCase()) > -1);
    });
}

var intervalCheck = setInterval(function () {
    isRunning('serverplc.exe', (status) => {
        console.log(status)
        if (!status) {
            var child = require('child_process').execFile;
            var executablePath = "serverplc.exe";
            var parameters = ["--incognito"];

            child(executablePath, function (err, data) {
                // child(executablePath, parameters, function (err, data) {
                console.log(err)
                console.log(data.toString());
            });
        }
    })
}, 5000);