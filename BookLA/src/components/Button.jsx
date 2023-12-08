import React from "react";
import { Link } from "react-router-dom";

const Button = ({
	text,
	onClick,
	primary = false,
	secondary = false,
	href,
	to,
	classNames,
	...props
}) => {
	let Comp = "button";
	const passProps = {
		onClick,
		...props,
	};

	if (href) {
		Comp = "a";
		passProps.href = href;
	}

	if (to) {
		Comp = Link;
		passProps.to = to;
	}

	return (
		<Comp className={classNames} {...passProps}>
			{text}
		</Comp>
	);
};

export default Button;
