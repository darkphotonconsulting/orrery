import React from 'react';

export function Overview({stars, planets, ...props}) {
  return (
    <div
      id={'overview'}
      className={'overview'}
    >
      <h1>Orrery Stats</h1>
      <p>Stars: {stars.length}</p>
      <p>Planets: {planets.length}</p>
    </div>
  )
}