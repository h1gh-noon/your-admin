/**
 *  svg颜色转换脚本
 * 解决:
 *  svg是可以通过css的color属性来指定颜色的，但是有些svg中含有`fill`属性导致颜色不生效
 *
 * 使用:
 *  1.首次使用须在根目录下创建temp_icons文件夹并添加svg文件(未加入git管理)
 *  2.执行 node svg_script.js
 *  3.生成的svg文件在temp_icons/res_icons中,复制到src/assets/icons/目录中,即可自动加载
 */

import * as fs from 'fs'

// temp_icons目录不加入git管理 须手动在根目录下创建并把svg添加进去
const inputFileDir = 'temp_icons'
const outputFileDir = 'temp_icons/res_icons' // 输出目录
readdir(inputFileDir)

// 读取指定目录下的所有文件
function readdir(path) {
  fs.readdir(path, async function (err, files) {
    if (err) {
      console.log('Error', err)
      return
    }
    fs.mkdirSync(outputFileDir, { recursive: true })
    console.log('buildding...')
    const results = files.reduce((acc, file) => {
      const stat = fs.statSync(inputFileDir + '/' + file)
      // 判断是否为文件
      if (stat.isFile()) {
        acc.push(
          new Promise(async (resolve, reject) => {
            try {
              const content = await readfile(`${path}/${file}`)
              const result = writefile(
                `${outputFileDir}/${file}`,
                content.data,
                file
              )
              resolve(result)
            } catch (error) {
              reject(error)
            }
          })
        )
      }
      return acc
    }, [])

    Promise.all(results)
      .then(() => {
        // 完成
        console.log('success')
      })
      .catch(errs => {
        console.log('err----------------', errs)
      })
  })
}

function writefile(path, data, file) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, function (errs) {
      if (errs) reject(errs)
      resolve(`"${file}"`)
    })
  })
}
function readfile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      // 替换所有fill="" 除了fill="white"
      data = (data + '').replace(/fill="(?!white).*"/g, '')
      if (err) reject(err)
      resolve({ path, data })
    })
  })
}
