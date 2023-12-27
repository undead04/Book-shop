import React, { forwardRef, useState } from "react";

const AvatarUpload = forwardRef(({ initialImage }, ref) => {
	const [selectedImage, setSelectedImage] = useState({
		url: "",
		file: "",
	});
	const handleImageChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			const imageUrl = URL.createObjectURL(file);
			setSelectedImage({ file, url: imageUrl });
		}
	};

	return (
		<div>
			<input ref={ref} type="file" onChange={handleImageChange} />

			<div className="mt-4 w-full">
				<div className="flex w-full">
					{selectedImage.url ? (
						<div className="relative mx-4">
							<div className=" w-[100px] h-[100px]">
								{selectedImage.url && (
									<img
										src={selectedImage.url}
										alt="Selected Image"
										className="w-[100px] h-[100px] object-cover"
									/>
								)}
								<div className="absolute inset-0"></div>
							</div>
						</div>
					) : (
						<>
							<div className="relative mx-4">
								<div className=" w-[100px] h-[100px]">
									<img
										src={`${
											import.meta.env.VITE_API_BASE_URL
										}/api/image/${initialImage}`}
										alt="Selected Image"
										className="w-[100px] h-[100px] object-cover"
									/>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
});

export default AvatarUpload;
