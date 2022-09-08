import fs from 'fs'
import {resolve} from 'path'
import { CelestialBodies, CelestialBody } from '../src/lib/data/CelestialBodies.js'
import { CelestialBodyScaler} from '../src/lib/tools/Scalers.js'
import { Command } from 'commander'

const program = new Command()
// console.log(resolve())

const listOption = (value, _previous) => {
  return value.split(/\s+/)
}

program
  .name('scaleAnalyzer')
  .description('analyze the outputs of an applied scale of the celestial bodies')
  .version('0.0.1')


program
  .command('analyze')
  .description('analyze the outputs of an applied scale of the celestial bodies')
  .option('-m, --minimum <number>', 'the minimum value of the scale', 0)
  .option('-M, --maximum <number>', 'the maximum value of the scale', 1000)
  .option('-t, --transformer <string>', 'the scale transformation to use', 'log')
  .option('-b, --base <number>', 'the base for logarithmic scales', 2)
  .option('-c, --constant <number>', 'the constant applied to bisymmetric scaler', 0.1)
  .option('-T, --targets <items>' , 'bodies to target for scaling', listOption, ['Planet', 'Star'] )
  .action(async (options) => {
    const scaler = new CelestialBodyScaler({})
    const {bodies} = JSON.parse((await fs.promises.readFile('./src/assets/bodies.json', 'utf8')))
    const celestialTool = new CelestialBodies({ bodies })


    const { minimum, maximum, transformer, base, constant, targets } = options
    // only scale the bodies that in the targets list
    const celestials = celestialTool.list()
      .filter((body) => targets.includes(body.bodyType))

    const fn = scaler.getTransormationFunction({
      type: transformer
    })
    console.log(fn)
    const scaledBodies = fn({
      bodies: celestials,
      rangeMinimum: minimum,
      rangeMaximum: maximum,
      base: base,
      constant: constant
    })

    for (const scaledBody of scaledBodies) {
      console.log('objectName', scaledBody.englishName)
      console.log('objectMass', scaledBody.objectMass)
      console.log('objectVolume', scaledBody.objectVolume)
      console.log('eccentricy', scaledBody.eccentricity)
      console.log('majorAxis', scaledBody.semimajorAxis)
      console.log('minorAxis', scaledBody.semiminorAxis)
    }

    // console.log(JSON.stringify(scaled))
    // console.log(scaled.map((body) => body.semiminorAxis))
  })

program.parse()
// console.log(scaled)
