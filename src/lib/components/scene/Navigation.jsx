import React from 'react';

import {
  OrbitControls,
} from '@react-three/drei';

export function Navigation({pan = true, zoom = true, rotate = true, ...props}) {
  const ref = React.useRef()
  return (
    <OrbitControls
      ref={ref}
      enablePan={pan}
      enableZoom={zoom}
      enableRotate={rotate}
    />
  )
}
