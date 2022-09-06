import { CelestialBodies } from '../src/lib/data/CelestialBodies.js'
import { CelestialBodyScaler } from '../src/lib/tools/Scalers.js'

const celestials = new CelestialBodies()
const planets = await celestials.planets()
const scaler = new CelestialBodyScaler({})
console.log(
  scaler.linearTransformation({
    bodies: planets,
    rangeMinimum: 0,
    rangeMaximum: 1000,
  })
)