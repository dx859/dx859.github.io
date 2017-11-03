let fs = require('fs')
let path = require('path')
let crypto = require('crypto')

function md5(str) {
    const hash = crypto.createHash('md5')
    return hash.update(str).digest('hex')
}

let tagsmap = new Map()
let articles = new Map()

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
                let article = fs.readFileSync(pathname).toString()
                let tagmatch = article.substring(0, article.indexOf('\n')).match(/<\!\-\-(.+)\-\-\>/)
                let tags = tagmatch ? tagmatch[1].trim().split(' ') : []
                articles.set(pathname.substring(1), tags)
                tags.forEach(tag => tagsmap.set(tag, tagsmap.get(tag) ? tagsmap.get(tag).push(pathname.substring(1)) : [pathname.substring(1)]))
                let hash = md5(article)
                data.push({ hash: hash, path: pathname.substring(1), file: file.substring(0, file.lastIndexOf('.')) })
            }
        }
    })
    return data
}

function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k, v] of strMap) {
        obj[k] = v;
    }
    return obj;
}

let tree = getFiles('.')

fs.writeFileSync(path.join(__dirname, 'dir.json'), JSON.stringify({ articles: strMapToObj(articles), tags: strMapToObj(tagsmap), tree }))