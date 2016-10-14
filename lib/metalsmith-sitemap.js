import path from 'path'
import util from 'util'

const metalsmithSitemap = function() {
  return (files, metalsmith, done) => {
    let root = {
      title: '',
      filename: '',
      children: [],
    }
    let metadata = metalsmith.metadata()

    for (let file in files) {
      const normalizedFilename = file.replace('\\', '/') 
      const directories = normalizedFilename.split('/')
      let parentNode = root

      for (let i = 0; i < directories.length; i++) {
        //Take the directory name or the filename without extension if it's at the file level
        let name = (i+1 == directories.length ? path.parse(file).name
          : directories[i])

        let node = (parentNode.children ? parentNode.children.find(x => x.name === name) : null) 

        if (!node) {
          node = { name: name, render: false }
          parentNode.children.push(node)
        }

        if (i+1 == directories.length && files[file].title) {
          const p = path.parse(file)
          node.filename = p.dir.replace('\\', '/') + (p.dir ? '/' : '') + p.name
          node.title = files[file].title
          node.render = true
          node.order = files[file].order
        }
        else if (!node.children) {
          node.children = []
        }

        parentNode = node
      }
    }

    const orderSitemap = (node) => {
      if (node.children) {
        node.children.sort((a, b) => {
          if (a.order && b.order) {
            return a.order - b.order
          } else if (!a.order && !b.order) {
            return 0
          } else if (!a.order) {
            return 1
          } else {
            return -1
          }
        })
        for (let c of node.children) {
          orderSitemap(c)
        }
      }
    }
    orderSitemap(root)

    // if (!sitemap.sassdoc) {
    //   sitemap.sassdoc = {
    //     metadata: {
    //       isPage: false,
    //       path: `/${(process.env.BASE_URL ? process.env.BASE_URL + '/': '')}sassdoc/`,
    //       level: 1,
    //     }
    //   }
    // }
    // for (const id in metadata.sassdoc.comments) {
    //   const sassdoc = metadata.sassdoc.comments[id]
      
    //   sitemap.sassdoc[sassdoc.urlFriendlyName] = {
    //     metadata: {
    //       isPage: true,
    //       path: path.join(`/${(process.env.BASE_URL ? process.env.BASE_URL + '/': '')}sassdoc/`, sassdoc.urlFriendlyName),
    //       level: 2,
    //     }
    //   }
    // }
    metadata.sitemap = root
    // files['sitemap.json'] = {
    //   contents: new Buffer(JSON.stringify(sitemap)),
    // }

    // console.log(JSON.stringify(root))

    done()
  }
}

export default metalsmithSitemap
