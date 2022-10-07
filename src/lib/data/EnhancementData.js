export const enhancementData = {
  stars: {
    sun: {
      phase: 'plasma',
      type: 'plasma',
      rings: null,
      structure: {
        core: {},
        radiativeZone: {},
        convectiveZone: {},
        photosphere: {},
        chromosphere: {},
        corona: {},
      },
      features: [
        {
          name: 'sunspots',
          description: `
            Sunspots are temporary phenomena on the Sun's photosphere that appear as spots darker than the surrounding areas.
            They are regions of reduced surface temperature caused by concentrations of magnetic field flux that inhibit convection.
            The number of sunspots varies according to the approximately 11-year solar cycle.
          `,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
        },
        {
          name: 'prominences',
          description: `
            Prominences are large, cool, gaseous structures suspended above the Sun's surface.
            They are thought to be the result of magnetic fields that connect the Sun's surface to its atmosphere.
            Prominences are often associated with solar flares and coronal mass ejections.
          `,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
        },
        {
          name: 'granulation',
          description: `
            Granulation is the pattern of dark and light spots on the Sun's photosphere.
          `,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
        },
        {
          name: 'spicules',
          description: `
            Spicules are small, hot, gaseous structures that extend from the Sun's surface into the solar atmosphere.
          `,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
        },
        {
          name: 'filaments',
          description: `
            Filaments are long, cool, gaseous structures suspended above the Sun's surface.
          `,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
        },
        {
          name: 'coronal mass ejections',
          description: `
            Coronal mass ejections (CMEs) are large-scale eruptions of plasma and magnetic fields from the Sun's corona,
          `,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
        },
        {
          name: 'solar flares',
          description: `
            Solar flares are sudden, intense bursts of radiation from the Sun's surface.
          `,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
        }
      ],
      missions: [
        {
          name: 'Pioneer 5',
          description: `
            Pioneer 5 was the first spacecraft to reach the vicinity of the Sun.
            It was launched on 5 August 1958, and reached the Sun on 5 September 1958.
            Lack of a camera prevented it from taking any pictures of the Sun.
          `,
          year: 1960,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
          groups: ['NASA'],
          success: true,
        },
        {
          name: 'Pioneer 6',
          description: `
            Pioneer 6 was the second spacecraft to reach the vicinity of the Sun.
          `,
          year: 1965,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
          groups: ['NASA'],
          success: true,
        },
        {
          name: 'Pioneer 7',
          description: `
            Pioneer 7 was the third spacecraft to reach the vicinity of the Sun.
          `,
          year: 1966,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
          groups: ['NASA'],
          success: true,
        },
        {
          name: 'Pioneer 8',
          description: `
            Pioneer 8 was the fourth spacecraft to reach the vicinity of the Sun.
          `,
          year: 1967,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
          groups: ['NASA'],
          success: true,
        },
        {
          name: 'Pioneer 9',
          description: `
            Pioneer 9 was the fifth spacecraft to reach the vicinity of the Sun.
          `,
          year: 1968,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
          groups: ['NASA'],
          success: true,
        },
        {
          name: 'Skylab Apollo Solar Observatory',
          description: `
            Skylab Apollo Solar Observatory was a solar observatory that was launched on 14 May 1973.
          `,
          year: 1973,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
          groups: ['NASA'],
          success: true,
        },
        {
          name: 'Helios A',
          description: `
            Helios A was the first of two spacecraft that were launched to study the Sun.
          `,
          year: 1974,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
          groups: ['NASA', 'German Aerospace Center'],
          success: true,
        },
        {
          name: 'Helios B',
          description: `
            Helios B was the second of two spacecraft that were launched to study the Sun.
          `,
          year: 1976,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
          groups: ['NASA', 'German Aerospace Center'],
          success: true,
        },
        {
          name: 'Solar Maximum Mission',
          description: `
            Solar Maximum Mission was a NASA mission that was launched on 8 November 1980.
          `,
          year: 1980,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
          groups: ['NASA'],
          success: true,
        },
        {
          name: 'Ulysses',
          description: `
            Ulysses was a NASA mission that was launched on 18 October 1990.
          `,
          year: 1990,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
          groups: ['NASA', 'European Space Agency'],
          success: true,
        },
        {
          name: 'Yohkoh',
          description: `
            Yohkoh was a Japanese mission that was launched on 14 February 1991.
          `,
          year: 1991,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
          groups: ['Japanese Aerospace Exploration Agency'],
          success: true,
        },
        {
          name: 'Solar and Heliospheric Observatory (SOHO)',
          description: `
            Solar and Heliospheric Observatory (SOHO) was a NASA mission that was launched on 2 December 1995.
          `,
          year: 1995,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
          groups: ['NASA', 'European Space Agency'],
          success: true,
        },
        {
          name: 'Genesis',
          description: `
            Genesis was a NASA mission that was launched on 8 September 2001.
          `,
          year: 2001,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
          groups: ['NASA'],
          success: true,
        },
        {
          name: 'STEREO A',
          description: `
            STEREO A was a NASA mission that was launched on 25 October 2006.
          `,
          year: 2006,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
          groups: ['NASA'],
          success: true,
        },
        {
          name: 'STEREO B',
          description: `
            STEREO B was a NASA mission that was launched on 25 October 2006.
          `,
          year: 2006,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
          groups: ['NASA'],
          success: true,
        },
        {
          name: 'Hinode',
          description: `
            Hinode was a Japanese mission that was launched on 22 September 2006.
          `,
          year: 2006,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
          groups: ['Japanese Aerospace Exploration Agency'],
          success: true,
        },
        {
          name: 'Solar Dynamics Observatory',
          description: `
            Solar Dynamics Observatory was a NASA mission that was launched on 11 February 2010.
          `,
          year: 2010,
          image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sunspots_2001-2009.jpg/800px-Sunspots_2001-2009.jpg',
          groups: ['NASA'],
          success: true,
        }

      ],
    },
    default: {
      phase: 'plasma',
      type: 'plasma',
      rings: null,
      structure: {
        core: {},
        radiativeZone: {},
        convectiveZone: {},
        photosphere: {},
        chromosphere: {},
        corona: {},
      },
      features: [

      ],
      missions: [


      ],
    }
  },
  planets: {
    mercury: {
      phase: 'solid',
      type: 'terrestrial',
      rings: null,
      structure: {
        innerCore: {},
        outerCore: {},
        mantle: {},
        crust: {},
      },
      features: [],
      missions: [],
    },
    venus: {
      phase: 'solid',
      type: 'terrestrial',
      rings: null,
      structure: {
        innerCore: {},
        outerCore: {},
        mantle: {},
        crust: {},

      },
      features: [],
      missions: [],
    },
    earth: {
      phase: 'solid',
      type: 'terrestrial',
      rings: null,
      structure: {
        innerCore: {},
        outerCore: {},
        mantle: {},
        crust: {},
        ocean: {},
        troposphere: {},
        stratosphere: {},
        mesosphere: {},
        thermosphere: {},
        exosphere: {},
      },
      features: [],
      missions: [],
    },
    mars: {
      phase: 'solid',
      type: 'terrestrial',
      rings: null,
      structure: {
        core: {},
        mantle: {},
        crust: {},
        lowerAtmosphere: {},
        middleAtmosphere: {},
        upperAtmosphere: {},
        exosphere: {},
      },
      features: [],
      missions: [],
    },
    jupiter: {
      phase: 'gas',
      type: 'jovian',
      rings: {},
      structure: {},
      features: [],
      missions: [],
    },
    saturn: {
      phase: 'gas',
      type: 'jovian',
      rings: {},
      structure: {},
      features: [],
      missions: [],
    },
    uranus: {
      phase: 'gas',
      type: 'jovian',
      rings: {},
      structure: {},
      features: [],
      missions: [],
    },
    neptune: {
      phase: 'gas',
      type: 'jovian',
      rings: {},
      structure: {},
      features: [],
      missions: [],
    },
    default: {
      phase: 'solid',
      type: 'terrestrial',
      rings: {},
      structure: {},
      features: [],
      missions: [],
    }
  },
  dwarfs: {
    pluto: {
      phase: 'solid',
      type: 'ice',
      rings: null,
      features: [],
      structure: {},
      missions: [],
    },
    default: {
      phase: 'solid',
      type: 'ice',
      rings: null,
      features: [],
      structure: {},
      missions: [],
    }
  },
  moons: {
    default: {
      phase: 'solid',
      type: 'terrestrial',
      rings: null,
      features: [],
      structure: {},
      missions: [],
    }
  }
}