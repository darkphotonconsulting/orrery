import {
  CelestialBodies,
  CelestialBody
} from '../data/CelestialBodies.js'

import {
  scaleLinear,
  scaleLog,
  scaleSqrt
} from 'd3-scale'

export class CelestialBodyScaler {
  #staticProperties = [
    'axialTilt',
    'avgTemp',
    'mainAnomaly',
    'sideralOrbit',
    'sideralRotation',
    'flattening',
    'inclination'
  ]

  #logTransformation({ bodies = [], base = 2}) {
    const scaledBodies = []
    for (const body of bodies) {
      const scaledBody = {}
      for (const [key, value] of Object.entries(body)) {
        if (value && !this.#staticProperties.includes(key) && value.constructor.name === 'Number') {
          // construct a domain for the linear scaler
          const domainMinimum = Math.min(
            ...bodies.map((body) => body[key])

          )
          console.log(key, 'min', domainMinimum)
          const domainMaximum = Math.max(
            ...bodies.map((body) => body[key])
          )
          console.log(key, 'max', domainMaximum)
          const scaler = scaleLog()
            .base(base)
            .domain([domainMinimum, domainMaximum])

          scaledBody[key] = scaler(value)
        } else {
          scaledBody[key] = value
        }
      }
      scaledBodies.push(scaledBody)
    }
    return scaledBodies
      .map((body) => {
        const celestial = new CelestialBody(body)
        return celestial.coerce()
      })
  }

  #linearTransformation({ bodies = [], rangeMinimum = 0, rangeMaximum = 100 }) {
    const scaledBodies = []
    for (const body of bodies) {
      const scaledBody = {}
      for (const [key, value] of Object.entries(body)) {
        if (value && !this.#staticProperties.includes(key) && value.constructor.name === 'Number') {
          // construct a domain for the linear scaler
          const domainMinimum = Math.min(
            ...bodies.map((body) => body[key])

          )
          console.log(key, 'min', domainMinimum)
          const domainMaximum = Math.max(
            ...bodies.map((body) => body[key])
          )
          console.log(key, 'max', domainMaximum)
          const scaler = scaleLinear()
            .domain([domainMinimum, domainMaximum])
            .range([rangeMinimum, rangeMaximum])
          scaledBody[key] = scaler(value)
        } else {
          scaledBody[key] = value
        }
      }
      scaledBodies.push(scaledBody)
    }
    return scaledBodies
      .map((body) => {
        const celestial = new CelestialBody(body)
        return celestial.coerce()
      })
  }

  #sqrtTransformation({ bodies = [], rangeMinimum = 0, rangeMaximum = 100 }) {
    const scaledBodies = []
    for (const body of bodies) {
      const scaledBody = {}
      for (const [key, value] of Object.entries(body)) {
        if (value && !this.#staticProperties.includes(key) && value.constructor.name === 'Number') {
          // construct a domain for the linear scaler
          const domainMinimum = Math.min(
            ...bodies.map((body) => body[key])

          )
          console.log(key, 'min', domainMinimum)
          const domainMaximum = Math.max(
            ...bodies.map((body) => body[key])
          )
          console.log(key, 'max', domainMaximum)
          const scaler = scaleSqrt()
            .domain([domainMinimum, domainMaximum])
            .range([rangeMinimum, rangeMaximum])
          scaledBody[key] = scaler(value)
        } else {
          scaledBody[key] = value
        }
      }
      scaledBodies.push(scaledBody)
    }
    return scaledBodies
      .map((body) => {
        const celestial = new CelestialBody(body)
        return celestial.coerce()
      })
  }

  #naiveTransormation({ bodies = [],  scale = 1.0}) {
    const scaledBodies = []
    for (const body of bodies) {
      const scaledBody = Object.fromEntries(
        Object.entries(body.toJson())
          .map(([key, value]) => {
            console.log(key, value)
            if (value && !this.#staticProperties.includes(key) && value.constructor.name === 'Number') {
              return [key, value * scale]
            }
            return [key, value]
          })
      )
      scaledBodies.push(new CelestialBody(scaledBody).coerce())
    }

    return scaledBodies
  }

  #scriptedTransformation({ bodies = [], script = (value) => { return value}}) {
    const scaledBodies = []
    for (const body of bodies) {
      const scaledBody = Object.fromEntries(
        Object.entries(body.toJson())
          .map(([key, value]) => {
            console.log(key, value)
            if (value && !this.#staticProperties.includes(key) && value.constructor.name === 'Number') {
              return [key, script(value)]
            }
            return [key, value]
          })
      )
      scaledBodies.push(new CelestialBody(scaledBody).coerce())
    }

    return scaledBodies
  }

  constructor() {
    this.scalers = {
      naiveTransormation: this.naiveTransormation.bind(this)
    }
  }

  linearTransformation({ bodies = [], rangeMinimum = 0, rangeMaximum = 100 }) {
    return this.#linearTransformation({ bodies, rangeMinimum, rangeMaximum })
  }

  logTransformation({ bodies = [], base = 2}) {
    return this.#logTransformation({ bodies, base })
  }

  sqrtTransformation({ bodies = [], rangeMinimum = 0, rangeMaximum = 100 }) {
    return this.#sqrtTransformation({ bodies, rangeMinimum, rangeMaximum })
  }

  naiveTransormation({ bodies = [], scale = 1.0 }) {
    return this.#naiveTransormation({ bodies, scale })
  }

  scriptedTransormation({ bodies = [], script = (value) => { return value}}) {
    return this.#scriptedTransformation({ bodies, script })
  }
}