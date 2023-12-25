import React from "react";
import Table from "../components/Admin/Table";

const GridLayout = ({ fieldList, dataList }) => {
	const field = [];
	return (
		<div className="grid lg:grid-cols-4 grid-cols-1 gap-4">
			<div className="col-span-3 bg-white shadow-lg rounded-lg my-4 p-4 h-[720px]">
				<div className="shadow-md round bg-black h-full">
					<Table fieldList={fieldList} dataList={dataList} />
				</div>
			</div>

			<div className="col-span-1 bg-white shadow-lg  rounded-lg my-4 p-4 h-[720px]"></div>
		</div>
	);
};

export default GridLayout;
