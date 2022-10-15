import React from 'react';
import { extend, useThree, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
} from '@react-three/drei';


extend({OrbitControls})

export function Navigation({
  pan = true,
  zoom = true,
  rotate = true,
  setSceneReferenceCatalog = () => {},
  sceneReferenceCatalog = {},
  activeBodies=[],
  ...props
}) {
  const navigationRef = React.useRef()
  const { camera, gl: { domElement } } = useThree();
  useFrame((state) => {
    // console.log('navigationBodies: ', activeBodies)
  })
  // React.useEffect(() => {

  //   setSceneReferenceCatalog({
  //     navigation: ref,
  //     ...sceneReferenceCatalog
  //   })
  // }, [sceneReferenceCatalog, ref, setSceneReferenceCatalog])
  console.log(
    {
      event: 'debug-navigation',
      navigation: navigationRef
    }
  )
  return (
    <OrbitControls
      ref={navigationRef}
      enablePan={pan}
      enableZoom={zoom}
      enableRotate={rotate}
      dampingFactor={0.1}
      target={[0, 0, 0]}

      args={[camera, domElement]}

    />
  )
}
