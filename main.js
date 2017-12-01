;
(function(global, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(global, true)
    } else {
        factory(global)
    }
})(typeof window !== 'undefined' ? window : this, function(window, noGlobal) {
    var document = window.document

    function Element(tagName, props, children) {
        this.tagName = tagName
        this.props = props
        if (children != null) {
            if (Array.isArray(children)) {
                this.children = children
            } else {
                this.children = [children]
            }
        }
    }

    Element.prototype.render = function() {

        var el = document.createElement(this.tagName)
        var props = this.props

        for (var propName in props) {
            var propValue = props[propName]
            if (propValue !== false) {
                el.setAttribute(propName, propValue)
            }

        }
        var children = this.children || []
        children.forEach(function(child) {
            var childEl = (child instanceof Element) ? child.render() : document.createTextNode(child)
            el.appendChild(childEl)
        })

        this.node = el
        return el
    }

    function createElement(tagName, props, children) {
        return new Element(tagName, props, children)
    }


    function TreeNode(data, node, parent) {
        this.node = node
        this.text = data.text
        this.parent = parent
        this.id = data.id
        this.selected = data.selected ? true : false;
        this.children = []

        this.setSelected = function() {
            this.node.style.color = 'red';
            this.selected = !this.selected
        }
    }

    function DxTree(wrap, data, id) {
        this.wrap = wrap
        this.data = data
        this.treeNodes = {}
        this.elements = this.createElements(data)
        this.eventHandle = this.eventHandle.bind(this)
        this.openSelected(id)
        wrap.appendChild(this.elements)
    }

    DxTree.prototype.selected = function() {
        var selected = [];
        for (var key in this.treeNodes) {
            var node = this.treeNodes[key];
            if (node.state && node.state.selected) {
                selected.push({
                    id: node.id,
                    text: node.text
                })
            }
        }
        return selected
    }

    DxTree.prototype.createElements = function(data, parent) {
        var nodeList = []
        var ul = createElement('ul', null).render()
        for (var i = 0; i < data.length; i++) {
            var item = data[i]
            var p = createElement('p', {
                'data-id': item.path,
                'data-hash': item.hash ? item.hash : false
            }, [
                createElement('i', {
                    'class': 'dxtree-icon'
                }),

                createElement('span', null, item.file)
            ]).render()


            var li;
            if (data.length - 1 === i) {
                li = createElement('li', {
                    'class': 'dxtree-node dxtree-node-last',
                    close: '',
                    haschild: item.children ? '' : false
                }).render()
            } else {
                li = createElement('li', {
                    'class': 'dxtree-node',
                    close: '',
                    haschild: item.children ? '' : false
                }).render()
            }
            var treeNode = new TreeNode(item, p, parent ? parent : null)
            if (parent) {
                parent.children.push(treeNode)
            }
            this.treeNodes[item.path] = treeNode
            li.appendChild(p)
            if (item.children) {
                var childUl = this.createElements(item.children, treeNode)
                li.appendChild(childUl)
            }
            li.addEventListener('click', this.eventHandle.bind(this, item))
            ul.appendChild(li)
        }

        return ul
    }


    DxTree.prototype.eventHandle = function(item, e) {
        e.stopPropagation()
        if (item.children) {
            this.toggleShow(item.path)
        } else {
            this.showPage(item.path, item.hash)
        }
    }

    DxTree.prototype.toggleShow = function(id) {
        var treeNode = this.treeNodes[id]
        var parentNode = treeNode.node.parentNode
        if (parentNode.hasAttribute('close')) {
            parentNode.removeAttribute('close')
        } else {
            parentNode.setAttribute('close', '')
        }
    }

    DxTree.prototype.showPage = function(id, hash) {
        var treeNode = this.treeNodes[id]
        treeNode.node.setAttribute('data-selected', '')

        window.location.hash = '#' + id + '?hash=' + hash
    }

    DxTree.prototype.openSelected = function(id) {
        var treeNode = this.treeNodes[id]
        if (treeNode) {
            var arr = []
            this._getParents(treeNode, arr)

            arr.forEach(function(parent) {
                parent.node.parentNode.removeAttribute('close')
            })
        }

    }

    DxTree.prototype._getParents = function(treeNode, arr) {
        if (treeNode.parent !== null) {
            this._getParents(treeNode.parent, arr);
            arr.push(treeNode.parent)
        }
    }

    DxTree.prototype._getChildren = function(treeNode, arr) {
        if (treeNode.children.length !== 0) {
            for (var i = 0; i < treeNode.children.length; i++) {
                var child = treeNode.children[i];
                arr.push(child);
                this._getChildren(child, arr);
            }
        }
    }

    if (!noGlobal) {
        window.DxTree = DxTree
    }
    return DxTree;
})

function getData(url) {
    if (!url) {
        url = '/README.md'
    }
    fetch(url)
        .then(function(response) {
            if (response.status >= 200 && response.status < 300) {
                return response.text()
            } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
            }

        }).then(function(body) {
            document.getElementsByTagName('title')[0].innerHTML = decodeURI(url.substring(url.lastIndexOf('/') + 1, url.lastIndexOf('.md')))
            content.innerHTML = marked(body)
        }).catch(function(e) {
            content.innerHTML = '<h1>404</h1>'
        })
}
window.onload = function() {
    var dxtree = null;
    var tagsmap = {};
    var articles = {}
    fetch('/dir.json')
        .then(function(response) {
            return response.json()
        }).then(function(json) {

            var hash = location.hash
            var id = hash.substring(1, hash.indexOf('?') === -1 ? hash.length : hash.indexOf('?'))
            dxtree = new DxTree(sidebar, json.tree, id)
            tagsmap = json.tags
            articles = json.articles
            hashchange()

            content.innerHTML = '<h1>404</h1>'
        })
    window.onhashchange = hashchange

    function hashchange() {
        var treeNodes = dxtree.treeNodes
        var hash = location.hash
        var id = hash.substring(1, hash.indexOf('?') === -1 ? hash.length : hash.indexOf('?'))
        for (var key in treeNodes) {
            treeNodes[key].node.removeAttribute('data-selected')
        }
        if (treeNodes[id]) {
            treeNodes[id].node.setAttribute('data-selected', '')
            tags.innerHTML = articles[id].map(tag => `<li>${tag}</li>`).join('')
        }

        getData(hash.substring(1))
        return id
    }
}