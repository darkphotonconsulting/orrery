import https from 'https';
// import { startTransition } from 'react';

export class CelestialBodies {
  #apiBaseUrl = 'https://api.le-systeme-solaire.net/rest.php'

  constructor() {
    this.apiBaseUrl = this.#apiBaseUrl
  }

  async list() {
    const url = this.apiBaseUrl + '/bodies'

    return new Promise((resolve, reject) => {
      https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          const { bodies } = JSON.parse(data)
          if (bodies) {

            resolve(
              bodies
                .map((body) => {

                  const celestial = new CelestialBody(body)
                  if (celestial.star()) {
                    return new Star(body)
                  }
                  else if (celestial.planet()) {
                    return new Planet(body)
                  }
                  else if (celestial.dwarf()) {
                    return new Dwarf(body)
                  }
                  else if (celestial.moon()) {
                    return new Moon(body)
                  }
                  else if (celestial.comet()) {
                    return new Comet(body)
                  }
                  else if (celestial.asteroid()) {
                    return new Asteroid(body)
                  }
                  else {
                    return new CelestialBody(body)
                  }
                  // return celestial
                })
            )
          } else {
            reject(new Error('No data'))
          }
          // resolve(bodies);
        });
        res.on('error', (err) => {
          reject(err)
        })
      })
    })
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
    // if (type) {

    //   const filtered = bodies
    //     .filter((body) => {
    //       return body.bodyType === type
    //     })
    // }
  }
  async max(type=null, attribute) {

  }
}

export class CelestialBody {
  constructor(params = {}) {
    Object.assign(this, { ...params })
    this.unknownValues = false
    if (!this.mass) {
      // console.warn(`auto-calculating mass for ${this.name}`)
      this.mass = {
        massValue: 1,
        massExponent: 1
      }
      this.unknownValues = true
    }
    if (!this.vol) {
      // console.warn(`auto-calculating volume for ${this.name}`)
      this.vol = {
        volValue: 1,
        volExponent: 1
      }
      this.unknownValues = true
    }
    // derive the semi-minor axis from semi-major axis & eccentricity if possible
    if (this.semimajorAxis && this.eccentricity.constructor.name === 'Number') {
      this.semiminorAxis = this.semimajorAxis * Math.sqrt(1 - Math.pow(this.eccentricity, 2))
    } else {
      this.unknownValues = true
      this.semiminorAxis = null
    }

    Object.assign(this, {
      objectMass: () => {
        if (this?.mass?.massValue && this?.mass?.massExponent) {
          return this?.mass?.massValue * Math.pow(10, this?.mass?.massExponent)
        } else {
          return 0
        }
      },
      objectVolume: () => {
        if (this?.vol?.volValue && this?.vol?.volValue) {
          return this?.vol?.volValue * Math.pow(10, this?.vol?.volExponent)
        } else {
          return 0
        }
      }
    })
  }

  getMass() {
    if (this.mass.massValue && this.mass.massExponent) {
      return this.mass.massValue * Math.pow(10, this.mass.massExponent)
    } else {
      return 0
    }
  }

  getVolume() {
    if (this.vol.volValue && this.vol.volExponent) {
      return this.vol.volValue * Math.pow(10, this.vol.volExponent)
    } else {
      return 0
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
      // if (typeof value !== 'function') {
      //   return [key, value]
      // }
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