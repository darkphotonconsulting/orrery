import fs from 'fs'
import { exec } from 'child_process'
import {resolve, join as pathJoin } from 'path'
import { Command } from 'commander'

const program = new Command()

const resolutions = {
    '8k': {
      alias: '8k',
      height: 8192,
      width: 4096
    },
    '4k': {
      alias: '4k',
      height: 4096,
      width: 2048
    },
    '2k': {
      alias: '2k',
      height: 2048,
      width: 1024
    },
}


const identifyImage = async ({ imagePath, uniqueColors = false }) => {
  const dataFormatString = `
    {
      "name": "%t",
      "suffix": "%e",
      "file": "%f",
      "path": "%d",
      "format": "%m",
      "size": "%b",
      "class": "%r",
      "height": "%h",
      "width": "%w",
      "geom": "%g",
      "compression": "%C",
      ${uniqueColors ? '"uniqueColors": "%k"' : '"uniqueColors": "n/a"'}
    }
  `
  return new Promise((resolve, reject) => {
    exec(`
      identify -format '${dataFormatString}' ${imagePath}
    `, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      }
      resolve(JSON.parse(stdout))
    })
  })
}

const resizeImage = async ({ imagePath, resolution, preserveAspect = true, resizeMode = 'sample' }) => {
  const { height, width } = resolutions[resolution]
  const size = `${width}x${height}${preserveAspect ? '^' : '!'}`
  const imageIdentity = await identifyImage({ imagePath })

  const fileName = pathJoin(
    imageIdentity.path,
    `${imageIdentity.name}-${resolution}.${imageIdentity.suffix}`
  )


  return new Promise((resolve, reject) => {
    console.log(`resizing ${imagePath} to ${size} (mode: ${resizeMode}, preserveAspect: ${preserveAspect})...`)
    exec(`
      convert ${imagePath} -sample '${size}' ${fileName}
    `, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      }
    })

    return resolve(imageIdentity)
  })

  // return new Promise((resolve, reject) => {
  //   exec(`
  //     convert ${imagePath} -resize ${width}x${height} -${resizeMode} ${imagePath}
  //   `, (error, stdout, stderr) => {
  //     if (error) {
  //       reject(error)
  //     }
  //     resolve(imageIdentity)
  //   })
  // })
}

program
  .name('resizeImages')
  .description('resize images to a specific size')
  .version('0.0.1')

program
  .command('identify')
  .description('dump metadata about an image(s)')
  .option('-d, --directory <string>', 'the directory to resize images in', './public/textures/base')
  .option('-f, --filter <string>', 'regex filter', '.*[^k].jpg')
  .option('-c, --colors, <boolean>', 'gather unique colors', false)
  .action(async (options) => {
    const identities = []
    const { directory, filter, colors } = options
    const rgx = new RegExp(filter)
    const files = (await fs.promises.readdir(directory))
      // .filter((file) => rgx.test(file))
    for (const file of files) {
      const fullPath = pathJoin(directory, file)
      // const imageData = await identifyImage({ imagePath: fullPath})
      identities.push(await identifyImage({
        imagePath: fullPath,
        uniqueColors: colors
      }))
    }
    const results = identities
      .filter((identity) => rgx.test(identity.file))
    console.log(JSON.stringify(results, null, 2))
  })

program
  .command('resize')
  .description('resize images to a specific size')
  .option('-r, --resolution <number>', 'the resolution of the image', 2000)
  .option('-f, --filter <string>', 'regex filter', '.*[^k].jpg')
  .option('-d, --directory <string>', 'the directory to resize images in', './public/textures/base')
  .action(async (options) => {
    const { resolution, directory, filter } = options
    const rgx = new RegExp(filter)
    const supportedResolutions = Object.keys(resolutions)

    if (!supportedResolutions.includes(resolution.toString())) {
      throw new Error(`the size ${resolution} is not supported. Supported resolutions are ${supportedResolutions.join(', ')}`)
    }
    const files = (await fs.promises.readdir(directory))
      .filter((file) => rgx.test(file))

    for (const file of files) {
      const fullPath = pathJoin(directory, file)
      await resizeImage({ imagePath: fullPath, resolution })

    }
  })


program.parse()