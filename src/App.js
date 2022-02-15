// See following documentations:
// -- @react-three/fiber & @react-three/drei ---> https://docs.pmnd.rs/ 
// -- ThreeJS ----------------------------------> https://threejs.org/docs/index.html

import { Suspense, useState } from 'react';
import { TextureLoader } from 'three';
import { Canvas, useLoader } from '@react-three/fiber';
import { MapControls, OrbitControls, Sky, Stars } from '@react-three/drei';

// Import Assets
import MetalMap from './assets/MetalMap.png';
import MetalNormalMap from './assets/MetalNormalMap.png';

// Import CSS
import './App.css';

const Box = () => {
	// --> https://threejs.org/docs/index.html#api/en/geometries/BoxGeometry

	return (
		<mesh position={[0, 0, 5]}>
			<boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
			<meshStandardMaterial attach="material" color="#CF1F55" />
		</mesh>
	)
}

const Sphere = () => {
	// --> https://threejs.org/docs/index.html#api/en/geometries/SphereGeometry

	return (
		<mesh position={[-5, 0, 5]}>
			<sphereBufferGeometry attach="geometry" args={[1, 32, 32]} />
			<meshStandardMaterial attach="material" color="hotpink" />
		</mesh>
	)
}

const Cylinder = () => {
	// --> https://threejs.org/docs/index.html#api/en/geometries/CylinderGeometry

	// Lets add a click event to this object...
	const [isRed, setIsRed] = useState(true)

	const clickHandler = () => {
		if (isRed) {
			setIsRed(false)
		} else {
			setIsRed(true)
		}
	}

	return (
		<mesh position={[5, 0, 5]} onClick={clickHandler}>
			<cylinderBufferGeometry attach="geometry" args={[1, 1, 5, 32]} />
			<meshStandardMaterial attach="material" color={isRed ? "#CF1F55" : "#808080"} />
		</mesh>
	)
}

const Plane = () => {
	// --> https://threejs.org/docs/index.html#api/en/geometries/PlaneGeometry

	// Lets add a cutom texture & material...
	// Generate NormalMaps --> https://cpetry.github.io/NormalMap-Online/
	const [metalNormalMap, metalMap] = useLoader(TextureLoader, [MetalNormalMap, MetalMap])

	return (
		<mesh position={[0, 0, 0]}>
			<planeBufferGeometry attach="geometry" args={[25, 25]} />
			<meshStandardMaterial attach="material" map={metalMap} normalMap={metalNormalMap} metalness={0.5} />
		</mesh>
	)
}

function App() {
	return (
		<Canvas camera={{ position: [0, 0, 30], up: [0, 0, 1], far: 10000 }}>
			<Suspense fallback={null}>

				{
					// === Sky & Stars ===
					// -- Sky ----> https://docs.pmnd.rs/drei/shaders/sky
					// -- Stars --> https://docs.pmnd.rs/drei/shaders/stars
				}

				<Sky
					distance={450000}
					sunPosition={[0, 1, 0]}
					inclination={0}
					azimuth={0.25}
				/>

				<Stars
					radius={100} // Radius of the inner sphere (default=100)
					depth={50} // Depth of area where stars should fit (default=50)
					count={5000} // Amount of stars (default=5000)
					factor={4} // Size factor (default=4)
					saturation={0} // Saturation 0-1 (default=0)
					fade // Faded dots (default=false)
				/>

				<ambientLight intensity={0.75} />

				{/* Add Objects Here */}
				<Box />
				<Sphere />
				<Cylinder />
				<Plane />

			</Suspense>

			{
				// === Camera Controls ===
				// -- MapControls ----> https://docs.pmnd.rs/drei/controls/map-controls
				// -- OrbitControls --> https://docs.pmnd.rs/drei/controls/orbit-controls
			}

			<MapControls />
			{/* <OrbitControls /> */}

		</Canvas>
	);
}

export default App;
