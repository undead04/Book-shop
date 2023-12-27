import React from "react";

const Footer = () => {
	return (
		<div className="flex items-end w-full dark:bg-black bg-white">
			<footer className="w-full text-gray-700 dark:bg-gray-900 border dark:border-gray-400 bg-gray-100 body-font ">
				<div className="container flex flex-col flex-wrap px-5 py-8 w-full justify-around items-center mx-auto md:items-center lg:items-start md:flex-row md:flex-no-wrap">
					<div className="my-auto mx-auto text-center md:mx-0 md:text-left">
						<div className="text">
							Đồ án kết thúc môn Lập trình Back-end
						</div>
						<div className="text">
							<div className="text-xl">Giảng viên: Cao Thiên Tài</div>
						</div>
					</div>
					<div className="flex-shrink-0 mx-auto text-center md:mx-0 md:text-left">
						<div className="text text-center text-xl mb-4">
							Thành viên
						</div>
						<div className="flex items-center justify-center text gap-8">
							<div className="border-l px-4">
								<p className="text-xl">Nguyễn Lê Thành Lợi</p>
								<div>MSSV: 22-0-21073</div>
							</div>
							<div className="border-l px-4">
								<p className="text-xl">Trần Văn An</p>
								<div>MSSV: 22-0-21111</div>
							</div>
						</div>
					</div>
				</div>
				<div className="bg-gray-300">
					<div className="container px-5 py-4 mx-auto">
						<p className="text-sm text-gray-700 capitalize xl:text-center">
							© 2023 All rights reserved{" "}
						</p>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Footer;
