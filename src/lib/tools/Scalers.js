import {
  // CelestialBodies,
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
    // scripted: this.scriptedTransformation.bind(this)
  }

  #identityTransformation({ bodies = []}) {
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
          const scaler = scaleIdentity()
            .domain([domainMinimum , domainMaximum])
            .range([domainMinimum, domainMaximum])

          const scaledValue = scaler(value)
          scaledBody[key] = scaledValue
          // console.log({
          //   targetId: body.id,
          //   targetType: body.bodyType,
          //   eventName: 'scaling',
          //   scaleLogic: 'identity',
          //   scaleKey: key,
          //   domainMinimum,
          //   domainMaximum,
          //   oldValue: value,
          //   newValue: scaledValue
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
          // console.log(key, 'min', domainMinimum)
          const domainMaximum = Math.max(
            ...bodies.map((body) => body[key])
          )
          // console.log(key, 'max', domainMaximum)
          const scaler = scaleLog()
            .base(base)
            .domain([domainMinimum + 0.1, domainMaximum])
          const scaledValue = scaler(value)
          // only return negative scaled values if the original value was negative
          scaledBody[key] = value > 0 ? Math.abs(scaledValue) : scaledValue
          console.log({
            targetId: body.id,
            targetType: body.bodyType,
            eventName: 'scaling',
            scaleLogic: 'log',
            scaleKey: key,
            domainMinimum,
            domainMaximum,
            oldValue: value,
            newValue: scaledValue
          })
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

  #bisymmetricTransformation({ bodies = [], rangeMinimum = 1, rangeMaximum = 100, constant = 0.1 }) {
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
          // console.log({
          //   targetId: body.id,
          //   targetType: body.bodyType,
          //   eventName: 'scaling',
          //   scaleLogic: 'bisymmetric',
          //   scaleKey: key,
          //   domainMinimum,
          //   domainMaximum,
          //   oldValue: value,
          //   newValue: scaledValue
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
