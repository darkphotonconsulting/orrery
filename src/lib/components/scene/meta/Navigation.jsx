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
  ...props
}) {
  const ref = React.useRef()
  const { camera, gl: { domElement } } = useThree();
  // useFrame((state) => {
  //   // console.log(state)
  // })
  // React.useEffect(() => {

  //   setSceneReferenceCatalog({
  //     navigation: ref,
  //     ...sceneReferenceCatalog
  //   })
  // }, [sceneReferenceCatalog, ref, setSceneReferenceCatalog])
  console.log(
    {
      event: 'debug-navigation',
      navigation: ref
    }
  )
  return (
    <OrbitControls
      ref={ref}
      enablePan={pan}
      enableZoom={zoom}
      enableRotate={rotate}
      dampingFactor={0.1}

      args={[camera, domElement]}

    />
  )
}
