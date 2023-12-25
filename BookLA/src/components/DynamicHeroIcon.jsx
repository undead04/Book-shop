import * as HIcons from "@heroicons/react/24/outline";

const DynamicHeroIcon = (props) => {
	const { ...icons } = HIcons;
	const TheIcon = icons[props.icon];
	const color = props.color ? props.color : "white";
	const size = props.size ? props.size : 6;
	return (
		<>
			<TheIcon
				className={`w-${size} h-${size} text-${color}`}
				aria-hidden="true"
			/>
		</>
	);
};

export default DynamicHeroIcon;
