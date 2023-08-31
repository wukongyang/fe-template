import fs from 'fs'
import path from 'path'

import glob from 'glob'

export default function prebuildMultiplePlugin(template, root = ROOT) {
  return {
    name: 'vite-plugin-prebuild-multiple',
    config(config, { command }) {
      if (command === 'build' || command === 'serve') {
        fs.rmSync(`${root}`, {
          recursive: true,
          force: true,
        })
        /** 准备多页面的入口文件 */
        preparePageInput(template, root)
        const pagesInput = getInputs(root)
        config.build.rollupOptions.input = pagesInput
        return config
      }
    },
  }
}

const htmlTemplate = getFileContent('assets/index.html')

const ROOT = 'drpanda'

/** 所有页面的编译入口 */
function getInputs(root) {
  const pagesInput = {}
  const pages = glob.sync(`${root}/**/index.html`)
  pages.forEach(page => {
    const pagePath = page.replace(`${root}/`, '').replace('/index.html', '')
    pagesInput[pagePath] = path.resolve(page)
  })
  return pagesInput
}

function getFileContent(path) {
  return fs.readFileSync(path).toString()
}

function createDir(pathLink) {
  // 这个文件已经存在就跳过
  if (fs.existsSync(pathLink)) {
    return
  }
  const dirArr = pathLink.split('/')
  let dir = path.join(dirArr[0])
  for (let i = 1; i < dirArr.length; i++) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    dir = path.join(dir, dirArr[i])
  }
}

/** 如果目录不存在就先创建目录 */
function writeFile(target, content) {
  createDir(target)
  fs.writeFileSync(target, content)
}

/** 准备各个路由页面的打包配置入口文件 */
function preparePageInput(template, root) {
  /** 1. 遍历src/pages里的index.tsx 以此作为页面打包的凭证 */
  const files = glob.sync('src/pages/**/index.tsx')

  files.forEach(file => {
    /** 当前入口为页面入口 */
    if (!file.includes('components')) {
      createHtmlInput(file, root)
    }
  })
}

/** 生成入口模块对应的html文件到指定目录 */
function createHtmlInput(path, root) {
  const pagePath = path.replace('src/pages/', '').replace('/index.tsx', '')
  /** 替换模板的引入模块路径 写进指定目录 */
  const target = `${root}/${pagePath}/index.html`
  const modulePath = new Array(Number(pagePath.split('/')?.length) + 1).fill('../').join('') + path
  const scrptsImport = `<script type="module" src="${modulePath}"></script></body>`
  const fileContent = htmlTemplate.replace('</body>', scrptsImport)
  writeFile(target, fileContent)
}
