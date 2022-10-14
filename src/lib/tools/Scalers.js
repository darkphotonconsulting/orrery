import {
  CelestialBody
} from '../data/CelestialBodies.js'

import {
  scaleLinear,
  scaleLog,
  scaleSqrt,
  scaleSymlog,
  scaleIdentity
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

  #transformers = {
    identity: this.identityTransformation.bind(this),
    linear: this.linearTransformation.bind(this),
    log: this.logTransformation.bind(this),
    naive: this.naiveTransormation.bind(this),
    bisymmetric: this.bisymmetricTransformation.bind(this),
  }

  #identityTransformation({ bodies = [], debug = false}) {
    const scaledBodies = []
    for (const body of bodies) {
      const scaledBody = {}
      for (const [key, value] of Object.entries(body)) {
        if (value && !this.#staticProperties.includes(key) && value.constructor.name === 'Number') {
          /*
            construct the domain(min,max) for the scaler
          */
          const domainMinimum = Math.min(
            ...bodies.map((body) => body[key])
          )

          const domainMaximum = Math.max(
            ...bodies.map((body) => body[key])
          )

          const scaler = scaleIdentity()
            .domain([domainMinimum , domainMaximum])
            .range([domainMinimum, domainMaximum])

          const scaledValue = scaler(value)
          scaledBody[key] = scaledValue
          if (debug) {
            console.log({
              event: 'set-scale',
              type: 'identity',
              bodyId: body.id,
              targetType: body.bodyType,
              target: key,
              min: domainMinimum,
              max: domainMaximum,
              opts: {},
              previous: value,
              current: scaledValue
            })
          }

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

  #logTransformation({ bodies = [], base = 2, debug = false }) {
    const scaledBodies = []
    for (const body of bodies) {
      const scaledBody = {}
      for (const [key, value] of Object.entries(body)) {
        if (value && !this.#staticProperties.includes(key) && value.constructor.name === 'Number') {
          /*
            construct the domain(min,max) for the scaler
          */
          const domainMinimum = Math.min(
            ...bodies.map((body) => body[key])
          )

          const domainMaximum = Math.max(
            ...bodies.map((body) => body[key])
          )

          const scaler = scaleLog()
            .base(base)
            .domain([domainMinimum + 0.1, domainMaximum])
          const scaledValue = scaler(value)
          /*

          */
          scaledBody[key] = value > 0 ? Math.abs(scaledValue) : scaledValue
          if (debug) {
            console.log({
              event: 'set-scale',
              type: 'log',
              bodyId: body.id,
              targetType: body.bodyType,
              target: key,
              min: domainMinimum,
              max: domainMaximum,
              opts: { base },
              previous: value,
              current: scaledValue
            })
          }

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

  #bisymmetricTransformation({ bodies = [], rangeMinimum = 1, rangeMaximum = 100, constant = 0.1, debug = false }) {
    const scaledBodies = []
    for (const body of bodies) {
      const scaledBody = {}
      for (const [key, value] of Object.entries(body)) {
        if (value && !this.#staticProperties.includes(key) && value.constructor.name === 'Number') {
          // construct a domain for the linear scaler
          const domainMinimum = Math.min(
            ...bodies.map((body) => body[key])

          )
          // console.log(key, 'min', domainMinimum)
          const domainMaximum = Math.max(
            ...bodies.map((body) => body[key])
          )
          // console.log(key, 'max', domainMaximum)
          const scaler = scaleSymlog()
            .domain([domainMinimum + 0.1, domainMaximum])
            .range([rangeMinimum, rangeMaximum])
            .constant(constant)
          const scaledValue = scaler(value)
          scaledBody[key] = scaledValue
          if (debug) {
            console.log({
              event: 'set-scale',
              type: 'bisymmetric',
              bodyId: body.id,
              bodyType: body.bodyType,
              target: key,
              min: domainMinimum,
              max: domainMaximum,
              opts: { rangeMinimum, rangeMaximum, constant },
              previous: value,
              current: scaledValue
            })
          }

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

  #linearTransformation({ bodies = [], rangeMinimum = 0, rangeMaximum = 100, debug = false }) {
    const scaledBodies = []
    for (const body of bodies) {
      const scaledBody = {}
      for (const [key, value] of Object.entries(body)) {
        if (value && !this.#staticProperties.includes(key) && value.constructor.name === 'Number') {
          // construct a domain for the linear scaler
          const domainMinimum = Math.min(
            ...bodies.map((body) => body[key])

          )
          // console.log(key, 'min', domainMinimum)
          const domainMaximum = Math.max(
            ...bodies.map((body) => body[key])
          )
          // console.log(key, 'max', domainMaximum)
          const scaler = scaleLinear()
            .domain([domainMinimum, domainMaximum])
            .range([rangeMinimum, rangeMaximum])
          const scaledValue = scaler(value)
          scaledBody[key] = scaledValue
          if (debug) {
            console.log({
              event: 'set-scale',
              type: 'linear',
              bodyId: body.id,
              bodyType: body.bodyType,
              target: key,
              min: domainMinimum,
              max: domainMaximum,
              opts: { rangeMinimum, rangeMaximum,  },
              previous: value,
              current: scaledValue
            })
          }

          // console.log({
          //   target: body.id,
          //   event: 'scaling',
          //   type: 'linear',
          //   key,
          //   old: value,
          //   new: scaledValue
          // })
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

  #sqrtTransformation({ bodies = [], rangeMinimum = 0, rangeMaximum = 100, debug = false }) {
    const scaledBodies = []
    for (const body of bodies) {
      const scaledBody = {}
      for (const [key, value] of Object.entries(body)) {
        if (value && !this.#staticProperties.includes(key) && value.constructor.name === 'Number') {
          // construct a domain for the linear scaler
          const domainMinimum = Math.min(
            ...bodies.map((body) => body[key])

          )
          // console.log(key, 'min', domainMinimum)
          const domainMaximum = Math.max(
            ...bodies.map((body) => body[key])
          )
          // console.log(key, 'max', domainMaximum)
          const scaler = scaleSqrt()
            .domain([domainMinimum, domainMaximum])
            .range([rangeMinimum, rangeMaximum])
          const scaledValue = scaler(value)

          scaledBody[key] = scaledValue
          if (debug) {
            console.log({
              event: 'set-scale',
              type: 'sqrt',
              bodyId: body.id,
              bodyType: body.bodyType,
              target: key,
              min: domainMinimum,
              max: domainMaximum,
              opts: { rangeMinimum, rangeMaximum,  },
              previous: value,
              current: scaledValue
            })
          }

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
            // console.log(key, value)
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
            // console.log(key, value)
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

  constructor({
    bodies = [],
    scale = 1.0,
    rangeMinimum = 1,
    rangeMaximum = 100,
    constant = 0.1,
    base = 2,
    staticProperties = []
  }) {
    this.staticProperties = staticProperties.length > 0 ? staticProperties : this.#staticProperties
    this.bodies = bodies || []
    this.scale = scale || 1.0
    this.rangeMinimum = rangeMinimum || 1
    this.rangeMaximum = rangeMaximum || 100
    this.constant = constant || 0.1
    this.base = base || 2
  }

  identityTransformation({ bodies = []}) {
    return this.#identityTransformation({ bodies })
  }

  linearTransformation({ bodies = [], rangeMinimum = 0, rangeMaximum = 100 }) {
    return this.#linearTransformation({ bodies, rangeMinimum, rangeMaximum })
  }

  logTransformation({ bodies = [], base = 2}) {
    return this.#logTransformation({ bodies, base })
  }

  bisymmetricTransformation({ bodies = [], rangeMinimum = 1, rangeMaximum = 100, constant = 0.1 }) {
    return this.#bisymmetricTransformation({ bodies, rangeMinimum, rangeMaximum, constant })
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

  getTransormationFunction({ type }) {
    return this.#transformers[type]
  }

  listTransformations() {
    return Object.keys(this.#transformers)
  }
}
