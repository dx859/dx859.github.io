let fs = require('fs')
let path = require('path')
let crypto = require('crypto')

function md5(str) {
    const hash = crypto.createHash('md5')
    return hash.update(str).digest('hex')
}


function getFiles(dir) {
    let files = fs.readdirSync(dir)
    let data = []
    files.forEach((file, index) => {
        if (file === '.git') {
            return;
        }
        let pathname = dir + '/' + file
        if (fs.statSync(pathname).isDirectory()) {
            let children = getFiles(pathname)
            data.push({ path: pathname.substring(1), file, children })
        } else {
            if (path.extname(pathname) === '.md') {
                let hash = md5(fs.readFileSync(pathname))
                data.push({ path: pathname.substring(1)+'?hash='+hash, file: file.substring(0, file.lastIndexOf('.')) })
            }
        }
    })
    return data
}

fs.writeFileSync(path.join(__dirname, 'dir.json'), JSON.stringify(getFiles('.')))