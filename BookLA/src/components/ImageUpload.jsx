import React, { forwardRef, useState } from "react";

const ImageUpload = forwardRef(({ onImagesChange, title }, ref) => {
	const [subImages, setSubImages] = onImagesChange;

	const handleImageChange = (e) => {
		const files = e.target.files;
		const newImagesArray = [];

		for (let i = 0; i < files.length; i++) {
			const imageUrl = URL.createObjectURL(files[i]);
			newImagesArray.push({ file: files[i], url: imageUrl });
		}

		setSubImages((prevImages) => {
			return [...prevImages, ...newImagesArray];
		});
	};
	const handleDeleteImage = (i) => {
		setSubImages((prevImages) =>
			prevImages.filter((image, index) => index !== i),
		);
	};
	return (
		<div>
			<label className="text-[#4e3b32] text-sm font-semibold mb-4 max-w-full block">
				{title}
			</label>
			<input
				ref={ref}
				type="file"
				multiple
				onChange={handleImageChange}
			/>

			<div className="mt-4 w-full">
				<div className="flex w-full overflow-x-scroll">
					{subImages.map((image, index) => (
						<div key={index} className="relative mx-4">
							<div className=" w-[100px] h-[100px]">
								<img
									src={image.url}
									alt={`Image ${index}`}
									style={{ width: "100px", height: "100px" }}
								/>
								<div className="absolute inset-0">
									<button
										className="cursor-pointer"
										onClick={() => handleDeleteImage(index)}
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
												d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
});

export default ImageUpload;
