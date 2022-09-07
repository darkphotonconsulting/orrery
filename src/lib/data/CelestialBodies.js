// import https from 'https';


export class CelestialBodies {
  #apiBaseUrl = 'https://api.le-systeme-solaire.net/rest.php'

  constructor({ bodies = []}) {
    Object.assign(this, {bodies: [...bodies]})
    this.apiBaseUrl = this.#apiBaseUrl
  }

  list() {

    const bodies = []

    for (const body of this.bodies) {
      const celestial = new CelestialBody(body)
      bodies.push(celestial.coerce())
    }
    return bodies

  }

  stars() {
    const bodies = this.list()
    return bodies
      .filter((body) => {
        return body.star()
      })
  }

  planets() {
    const bodies = this.list()
    return bodies
      .filter((body) => {
        return body.planet()
      })
      .sort((a, b) => {
        return a.perihelion - b.perihelion
      })
  }

  dwarfs() {
    const bodies = this.list()
    return bodies
      .filter((body) => {
        return body.dwarf()
      })
  }

  moons() {
    const bodies = this.list()
    return bodies
      .filter((body) => {
        return body.moon()
      })
  }

  comets() {
    const bodies = this.list()
    return bodies
      .filter((body) => {
        return body.comet()
      })
  }

  asteroids() {
    const bodies = this.list()
    return bodies
      .filter((body) => {
        return body.asteroid()
      })
  }

  min(type=null, attribute) {
    const bodies = type ?
      (this.list())
        .filter((body) => body.bodyType === type)
      : this.list()
    return Math.min(
      ...bodies.map((body) => body[attribute])
    )
  }
  async max(type=null, attribute) {

  }
}

export class CelestialBody {
  constructor(params = {}) {
    // we filter nested objects out, to be added later more efficiently
    this.massValue = 100
    this.massExponent = 0
    this.volValue = 100
    this.volExponent = 0
    for (const [key, value] of Object.entries(params)) {
      if (key === 'mass') {
        if (value === null || value === undefined) {
          this.massValue = 100
          this.massExponent = 0
        } else {
          this.massValue = value.massValue
          this.massExponent = value.massExponent
        }
      }
      if (key === 'vol') {
        if (value === null || value === undefined) {
          this.volValue = 100
          this.volExponent = 0
        } else {
          this.volValue = value.volValue
          this.volExponent = value.volExponent
        }
      }
      this[key] = value
    }

    this.unknowns = []

    // configure defaults for possible missing attributes
    if (this.moons === null) {
      this.moons = []
    }

    if (this.meanRadius === 0) {
      this.unknowns.push('meanRadius')
    }
    if (this.equaRadius === 0) {
      this.unknowns.push('equaRadius')
    }
    if (this.polarRadius === 0) {
      this.unknowns.push('polarRadius')
    }
    if (this.sideralOrbit === 0) {
      this.unknowns.push('sideralOrbit')
    }
    if (this.sideralRotation === 0) {
      this.unknowns.push('sideralRotation')
    }

  }

  get semiminorAxis() {
    if (this.semimajorAxis && this.eccentricity.constructor.name === 'Number') {
      return this.semimajorAxis * Math.sqrt(1 - Math.pow(this.eccentricity, 2))
    } else {
      return null
    }
  }

  set semiminorAxis(value) {
    this.semiminorAxis = value
  }

  get objectMass() {
    // eslint-disable-next-line no-undef
    return this.massValue * Math.pow(10, this.massExponent )
  }

  set objectMass(value) {

    if (value && Object.keys(value).length === 2) {
      this.massValue = value.massValue
      this.massExponent = value.massExponent
    }
    if (value && String(value).split('e').length === 2) { // scientific notation
      const [mantissa, exponent] = String(value).split('e')
      this.massValue = Number(mantissa)
      this.massExponent = Number(exponent)
    } else { // normal notation
      const [mantissa, exponent] = String((Number(value)).toExponential()).split('e')
      this.massValue = Number(mantissa)
      this.massExponent = Number(exponent)
    }
  }

  get objectVolume() {
    // eslint-disable-next-line no-undef
    return this.volValue * Math.pow(10, this.volExponent)
  }

  set objectVolume(value) {
    if (value && String(value).split('e').length === 2) { // scientific notation
      const [mantissa, exponent] = String(value).split('e')
      this.volValue = Number(mantissa)
      this.volExponent = Number(exponent)
    } else { // normal notation
      const [mantissa, exponent] = String((Number(value)).toExponential()).split('e')
      this.volValue = Number(mantissa)
      this.volExponent = Number(exponent)
    }
  }

  moon() {
    return this.bodyType === 'Moon'
  }

  planet() {
    return this.bodyType === 'Planet'
  }

  dwarf() {
    return this.bodyType === 'Dwarf planet'
  }

  comet() {
    return this.bodyType === 'Comet'
  }

  star() {
    return this.bodyType === 'Star'
  }

  asteroid() {
    return this.bodyType === 'Asteroid'
  }

  coerce() {
    if (this.star()) {
      return new Star(this.toJson())
    }
    else if (this.planet()) {
      return new Planet(this.toJson())
    }
    else if (this.dwarf()) {
      return new Dwarf(this.toJson())
    }
    else if (this.moon()) {
      return new Moon(this.toJson())
    }
    else if (this.comet()) {
      return new Comet(this.toJson())
    }
    else if (this.asteroid()) {
      return new Asteroid(this.toJson())
    }
    else {
      return this
    }
  }

  toJson() {
    // eslint-disable-next-line array-callback-return
    return Object.fromEntries(Object.entries(this).map(([key, value]) => {
      return [key, value]
    }))
  }


}

export class Star extends CelestialBody {
  constructor(params = {}) {
    super(params)
  }
}

export class Planet extends CelestialBody {
  constructor(params = {}) {
    super(params)
  }

  async getMoons() {
    const celestials = new CelestialBodies()
    const moons =  await celestials.moons()
    const satellites = this.moons.map((satellite) => {
      return moons.find((moon) => moon.name === satellite.moon)
    })
    return satellites
  }
}

export class Moon extends CelestialBody {
  constructor(params = {}) {
    super(params)
  }
}

export class Dwarf extends CelestialBody {
  constructor(params = {}) {
    super(params)
  }

  async getMoons() {
    const celestials = new CelestialBodies()
    const moons =  await celestials.moons()
    const satellites = this.moons.map((satellite) => {
      return moons.find((moon) => moon.name === satellite.moon)
    })
    return satellites
  }
}

export class Comet extends CelestialBody{
  constructor(params = {}) {
    super(params)
  }
}

export class Asteroid extends CelestialBody {
  constructor(params = {}) {
    super(params)
  }

  async getMoons() {
    const celestials = new CelestialBodies()
    const moons =  await celestials.moons()
    const satellites = this.moons.map((satellite) => {
      return moons.find((moon) => moon.name === satellite.moon)
    })
    return satellites
  }
}