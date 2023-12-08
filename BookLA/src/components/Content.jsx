import React from "react";

const Content = ({ children }) => {
	return (
		<div>
			<div className="w-[]">{children}</div>
		</div>
	);
};

export default Content;
