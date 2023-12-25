import React from "react";

const ProductLoader = () => {
	return (
		<div className="animate-pulse bg-slate-50 dark:bg-gray-600 rounded-t-lg overflow-hidden">
			<div>
				<div className="h-[366px] dark:bg-gray-400 bg-gray-300 mx-auto" />
			</div>
			<div className="px-5 pb-5 mt-4">
				<div>
					<div className="h-6 dark:bg-gray-400 bg-gray-300 mb-2" />
				</div>
				<div className="h-6 dark:bg-gray-400 bg-gray-300 mb-2" />
				<div className="flex items-center justify-between">
					<div className="h-6 w-2/3 mr-2 dark:bg-gray-400 bg-gray-300" />
					<div className="h-6 w-1/3 bg-gray-200" />
				</div>
			</div>
		</div>
	);
};

export default ProductLoader;
