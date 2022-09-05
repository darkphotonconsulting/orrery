// import https from 'https';


export class CelestialBodies {
  #apiBaseUrl = 'https://api.le-systeme-solaire.net/rest.php'

  constructor({ bodies = []}) {
    Object.assign(this, {bodies: [...bodies]})
    this.apiBaseUrl = this.#apiBaseUrl
  }

  async list() {
    // const url = this.apiBaseUrl + '/bodies'

    // return new Promise((resolve, reject) => {
    //   https.get(url, (res) => {
    //     let data = '';
    //     res.on('data', (chunk) => {
    //       data += chunk;
    //     });
    //     res.on('end', () => {
    //       const { bodies } = JSON.parse(data)
    //       if (bodies) {

    //         resolve(
    //           bodies
    //             .map((body) => {

    //               const celestial = new CelestialBody(body)
    //               if (celestial.star()) {
    //                 return new Star(body)
    //               }
    //               else if (celestial.planet()) {
    //                 return new Planet(body)
    //               }
    //               else if (celestial.dwarf()) {
    //                 return new Dwarf(body)
    //               }
    //               else if (celestial.moon()) {
    //                 return new Moon(body)
    //               }
    //               else if (celestial.comet()) {
    //                 return new Comet(body)
    //               }
    //               else if (celestial.asteroid()) {
    //                 return new Asteroid(body)
    //               }
    //               else {
    //                 return new CelestialBody(body)
    //               }
    //               // return celestial
    //             })
    //         )
    //       } else {
    //         reject(new Error('No data'))
    //       }
    //       // resolve(bodies);
    //     });
    //     res.on('error', (err) => {
    //       reject(err)
    //     })
    //   })
    // })
    const bodies = []

    for (const body of this.bodies) {
      const celestial = new CelestialBody(body)
      bodies.push(await celestial.coerce())
    }
    return bodies

  }

  async stars() {
    const bodies = await this.list()
    return bodies
      .filter((body) => {
        return body.star()
      })
  }

  async planets() {
    const bodies = await this.list()
    return bodies
      .filter((body) => {
        return body.planet()
      })
      .sort((a, b) => {
        return a.perihelion - b.perihelion
      })
  }

  async dwarfs() {
    const bodies = await this.list()
    return bodies
      .filter((body) => {
        return body.dwarf()
      })
  }

  async moons() {
    const bodies = await this.list()
    return bodies
      .filter((body) => {
        return body.moon()
      })
  }

  async comets() {
    const bodies = await this.list()
    return bodies
      .filter((body) => {
        return body.comet()
      })
  }

  async asteroids() {
    const bodies = await this.list()
    return bodies
      .filter((body) => {
        return body.asteroid()
      })
  }

  async min(type=null, attribute) {
    const bodies = type ?
      (await this.list())
        .filter((body) => body.bodyType === type)
      : await this.list()
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
    console.log('params', params)
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
    // const filteredParams = Object.fromEntries(
    //   Object.entries(params).filter(([key, value]) => key !== 'mass' && key !== 'vol')
    // )
    // // console.log('filteredParams:', filteredParams)

    // Object.assign(this, filteredParams)

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

    // the radius of some celestial bodies is not known

    // the mass of some celestial bodies is not known

    console.log(Object.keys(params))
    // this.massValue = (!params?.mass === null && !params?.mass === undefined) ? params.mass.massValue : 1
    // this.massExponent = (!params?.mass === null && !params?.mass === undefined) ? params.mass.massExponent : 0
    // if (this.massValue === 1 && this.massExponent === 0) {
    //   this.unknowns.push('mass')
    // }


    // // the volume of some celestial bodies is not known
    // this.volValue = (!params.vol === null && !params.vol === undefined) ? params.vol.volValue : 1
    // this.volExponent = (!params.vol === null && !params.vol === undefined) ? params.vol.volExponent : 0
    // if (this.volValue === 1 && this.volExponent === 0) {
    //   this.unknowns.push('volume')
    // }

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
    return this.massValue || 10 * Math.pow(10, this.massExponent || 0)
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

  get volume() {
    // eslint-disable-next-line no-undef
    return this.volValue * Math.pow(10, this.volExponent)
  }

  set volume(value) {
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