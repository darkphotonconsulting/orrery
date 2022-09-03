import https from 'https';

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
                  return new CelestialBody(body)
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
}

export class CelestialBody {
  constructor(params = {}) {
    Object.assign(this, { ...params })
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

  toJson() {
    // eslint-disable-next-line array-callback-return
    return Object.fromEntries(Object.entries(this).map(([key, value]) => {
      if (typeof value !== 'function') {
        return [key, value]
      }
    }))
  }


}

export class Star extends CelestialBody {}

export class Planet extends CelestialBody {}

export class Moon extends CelestialBody {}

export class Dwarf extends CelestialBody {}

export class Comet extends CelestialBody{}

export class Asteroid extends CelestialBody {}