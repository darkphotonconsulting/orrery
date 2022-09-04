import {
  CelestialBody
} from '../data/CelestialBodies.js'
export function constantScaler(bodies = [], factor = 1) {
  return bodies.map((body) => {
    const scaledBody = {
      ...body.toJson(),
      mass: {
        massExponent: body.mass && body.mass.massExponent ? body.mass.massExponent * factor : 1,
        massValue: body.mass && body.mass.massValue ? body.mass.massValue : 1
      },
      vol: {
        volExponent: body.vol && body.vol.volExponent ? body.vol.volExponent * factor : 1,
        volValue: body.vol && body.vol.volValue ? body.vol.volValue : 1
      },
    }
    const celestial = new CelestialBody(scaledBody)
    return celestial.coerce()
  })
}

export function normalizingScaler(bodies = [], minScale = 0, maxScale = 1) {
  // const minMass = Math.min(...bodies.map((body) => { return body.getMass()}))
  // const minVol = Math.min(...bodies.map((body) => { return body.getVolume()}))
  // const maxMass = Math.max(...bodies.map((body) => { return body.getMass()}))
  // const maxVol = Math.max(...bodies.map((body) => { return body.getVolume()}))
  // const massRange = maxMass - minMass
  // const volRange = maxVol - minVol
  // const normalize = (value, min, max) => {
  // }

  return bodies.map((body) => {
    const scaledBody = {
      ...body.toJson()
    }
    return scaledBody
  })
}

export function massScaler(bodies = []) {
  return []
}

export function volumeScaler(bodies = []) {
  return []
}

export function radiusScaler(bodies = []) {
  return []
}

export function orbitScaler(bodies = []) {
  return []
}

export function planetScaler(bodies = []) {
  return []
}

export function moonScaler(bodies = []) {
  return []
}

export function dwarfScaler(bodies = []) {
  return []
}

export function asteroidScaler(bodies = []) {
  return []
}

export function cometScaler(bodies = []) {
  return []
}

export function starScaler(bodies = []) {
  return []
}