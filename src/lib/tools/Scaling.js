export function constantScaler(bodies = [], factor = 1) {
  return bodies.map((body) => {
    return {
      ...body,
      mass: {
        massValue: body.mass.massValue * factor
      }
    }
  })
}

export function linearScaler(bodies = []) {
  return []
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