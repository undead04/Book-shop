import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../Contexts/ContextProvider";

const PalaDinBook = () => {
	const paladinsBook = useGLTF("./paladins_book/scene.gltf");

	return (
		<mesh>
			<hemisphereLight
				intensity={1}
				groundColor={"white"}
				position={[0.9, 0.6, 0]}
			/>
			<spotLight
				position={[-20, 50, 10]}
				angle={0.12}
				penumbra={1}
				intensity={1}
				castShadow
				shadow-mapSize={1024}
			/>

			<pointLight intensity={1} />
			<primitive
				object={paladinsBook.scene}
				scale={25}
				position={[0, 0, -1.5]}
				rotation={[-0.02, -0.4, -0.1]}
			/>
		</mesh>
	);
};

const GuestLayout = () => {
	const { token } = useStateContext();
	if (token) {
		return <Navigate to={"/"} />;
	}
	return (
		<div className="flex flex-wrap min-h-screen items-center justify-center w-full content-center py-10 bg-gray-200">
			<div className="flex shadow-sm gap-2 w-full items-center justify-center">
				<div className="flex w-full flex-wrap content-center justify-center rounded-r-md">
					{/* <img
						className="w-[50%] h-auto bg-center bg-no-repeat bg-cover rounded-r-md"
						src="https://i.imgur.com/9l1A4OS.jpeg"
					/> */}
					<div className="h-[700px] flex-1">
						<Canvas
							frameloop="demand"
							shadows
							dpr={[1, 2]}
							camera={{
								fov: 30,
								near: 0.1,
								far: 200,
								position: [-4, 3, 6],
							}}
							gl={{ preserveDrawingBuffer: true }}
						>
							<OrbitControls
								autoRotate
								enableZoom={false}
								maxPolarAngle={Math.PI / 2}
								minPolarAngle={Math.PI / 2}
							/>
							<PalaDinBook />

							<Preload all />
						</Canvas>
					</div>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default GuestLayout;
