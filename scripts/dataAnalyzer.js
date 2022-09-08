import fs from 'fs'
import { CelestialBody } from '../src/lib/data/CelestialBodies.js'
const {bodies} = JSON.parse((await fs.promises.readFile('./src/assets/bodies.json', 'utf8')))
const planets = bodies.filter((body) => body.bodyType === 'Planet')
if (!Array.isArray(bodies)) {
  console.warn('bodies is not an array')
  process.exit(1)
}

for (const body of planets) {
  if (typeof body !== 'object') {
    console.warn(`the celestial body ${body.id} is not an object`)
    process.exit(1)
  }

  if (Object.keys(body).length === 0) {
    console.warn(`the celestial body ${body.id} is empty`)
    process.exit(1)
  }

  if (!body.mass) {
    console.warn(`the celestial body ${body.id} does not have a mass ${JSON.stringify(body.vol)}`)
    //process.exit(1)
  } else {
    console.log(`the celestial body ${body.id} has a mass of ${JSON.stringify(body.mass)}`)
  }

  if (!body.vol) {
    console.warn(`the celestial body ${body.id} does not have a volume ${JSON.stringify(body.vol)}`)
    //process.exit(1)
  } else {
    console.log(`the celestial body ${body.id} has a volume of ${JSON.stringify(body.vol)}`)
  }

  const celestial = new CelestialBody(body)
  console.log(celestial.toJson())
}
// console.log(JSON.stringify(bodies, null, 2))