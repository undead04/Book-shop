import React, { forwardRef, useState } from "react";

const AvatarUpload = forwardRef(({}, ref) => {
	const [selectedImage, setSelectedImage] = useState({});
	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setSelectedImage({ file, url: imageUrl });
		}
	};

	const handleDeleteImage = () => {
		setSelectedImage(null);
	};

	return (
		<div>
			<input ref={ref} type="file" onChange={handleImageChange} />

			<div className="mt-4 w-full">
				{selectedImage && (
					<div className="flex w-full">
						<div className="relative mx-4">
							<div className=" w-[100px] h-[100px]">
								{selectedImage.url && (
									<img
										src={selectedImage.url}
										alt="Selected Image"
										style={{ width: "100px", height: "100px" }}
									/>
								)}
								<div className="absolute inset-0">
									<button
										className="cursor-pointer"
										onClick={handleDeleteImage}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={1.5}
											stroke="currentColor"
											className="w-6 h-6 text-white"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M6 18L18 6M6 6l12 12"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
});

export default AvatarUpload;
