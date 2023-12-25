import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";

const MDialog = ({
	title,
	description,
	message,
	onAccept,
	onDeny,
	onControl,
}) => {
	let { dialogOpen, setDialogOpen } = onControl;
	const onClick = () => {
		onAccept();
		setDialogOpen(false);
	};

	const handleDeny = () => {
		onDeny();
		setDialogOpen(false);
	};
	return (
		<Dialog
			className={"relative"}
			open={dialogOpen}
			onClose={() => setDialogOpen(false)}
		>
			<div className="fixed inset-0 flex w-screen items-center justify-center">
				<Dialog.Panel className="w-full max-w-sm rounded-2xl shadow-2xl bg-white text-black dark:bg-gray-950 dark:text-white border dark:border-white p-4">
					<Dialog.Title className={"mb-4 text-3xl font-extrabold "}>
						{title}
					</Dialog.Title>
					<Dialog.Description
						className={"mb-8 text-black dark:text-slate-50"}
					>
						{description}
					</Dialog.Description>

					<p>{message}</p>

					<button
						className="p-3 mb-2 bg-black rounded-full text-white w-full font-semibold border"
						onClick={onClick}
					>
						Có, tôi đồng ý
					</button>
					<button
						className="p-3 bg-white dark:text-black border rounded-full w-full font-semibold"
						onClick={handleDeny}
					>
						Hủy
					</button>
				</Dialog.Panel>
			</div>
		</Dialog>
	);
};

export default MDialog;
