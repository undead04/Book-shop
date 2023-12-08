import React, { forwardRef } from "react";

const Input = forwardRef(
	(
		{ title, type = "text", error, onchange, inputStyle, ...props },
		ref,
	) => {
		return (
			<div className="mb-2">
				<label className="block text-sm text-gray-500 dark:text-gray-300">
					{title}
				</label>
				<input
					type={type}
					className="block mt-2 w-full placeholder-gray-400/70 bg-white px-3 py-2 border "
					{...props}
					ref={ref}
					onChange={onchange}
				/>
				<p
					className={`mt-1 text-end text-xs text-red-400  ${
						!error && "hidden"
					}`}
				>
					{error}
				</p>
			</div>
		);
	},
);

export default Input;
