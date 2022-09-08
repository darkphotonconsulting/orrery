import fs from 'fs'
import {resolve} from 'path'
import { CelestialBodies, CelestialBody } from '../src/lib/data/CelestialBodies.js'
import { CelestialBodyScaler} from '../src/lib/tools/Scalers.js'
import { Command } from 'commander'

const program = new Command()
// console.log(resolve())
const scaler = new CelestialBodyScaler({})
const {bodies} = JSON.parse((await fs.promises.readFile('./src/assets/bodies.json', 'utf8')))
const celestialTool = new CelestialBodies({ bodies })
const celestials = celestialTool.list()
const scaled = scaler.linearTransformation({
  bodies: celestials,
  rangeMinimum: 0,
  rangeMaximum: 1000,
  foo: 'bar'
})
// console.log(scaled)
