export const menuItemsData = [
	{
		title: "Home",
		url: "/",
	},
	{
		title: "Services",
		url: "/services",
		submenu: [
			{
				title: "Web Design",
				url: "web-design",
			},
			{
				title: "Web Development",
				url: "web-dev",
				submenu: [
					{
						title: "Frontend",
						url: "frontend",
					},
					{
						title: "Backend",
						submenu: [
							{
								title: "NodeJS",
								url: "node",
							},
							{
								title: "PHP",
								url: "php",
							},
						],
					},
				],
			},
			{
				title: "SEO",
				url: "seo",
			},
		],
	},
	{
		title: "About",
		url: "/about",
	},
];

export const bookTypesData = [
	{
		title: "Sach tieng viet",
		url: "/sach/tieng-viet",
		submenu: [
			{
				title: "Sach van hoc",
				url: "/sach/van-hoc",
			},
			{
				title: "Sách kinh tế",
				url: "/sach/van-hoc",
			},
			{
				title: "Sách thiếu nhi",
				url: "/sach/van-hoc",
			},
			{
				title: "Sách kỹ năng sống",
				url: "/sach/van-hoc",
			},
			{
				title: "Sách Bà mẹ - Em bé",
				url: "/sach/van-hoc",
			},
			{
				title: "Sách Giáo Khoa - Giáo Trình",
				url: "/sach/van-hoc",
			},
			{
				title: "Sách Học Ngoại Ngữ",
				url: "/sach/van-hoc",
			},
			{
				title: "Sách Tham Khảo",
				url: "/sach/van-hoc",
			},
			{
				title: "Từ Điển",
				url: "/sach/van-hoc",
			},
			{
				title: "Sách Kiến Thức Tổng Hợp",
				url: "/sach/van-hoc",
			},
			{
				title: "Sách Khoa Học - Kỹ Thuật",
				url: "/sach/van-hoc",
			},
			{
				title: "Sách Lịch sử",
				url: "/sach/van-hoc",
			},
			{
				title: "Điện Ảnh - Nhạc - Họa",
				url: "/sach/van-hoc",
			},
			{
				title: "Truyện Tranh, Manga, Comic",
				url: "/sach/van-hoc",
			},
			{
				title: "Sách Tôn Giáo - Tâm Linh",
				url: "/sach/van-hoc",
			},
			{
				title: "Sách Văn Hóa - Địa Lý - Du Lịch",
				url: "/sach/van-hoc",
			},
			{
				title: "Sách Chính Trị - Pháp Lý",
				url: "/sach/van-hoc",
			},
			{
				title: "Sách Nông - Lâm - Ngư Nghiệp",
				url: "/sach/van-hoc",
			},
			{
				title: "Sách Công Nghệ Thông Tin",
				url: "/sach/van-hoc",
			},
			{
				title: "Sách Y Học",
				url: "/sach/van-hoc",
			},
			{
				title: "Tạp Chí - Catalogue",
				url: "/sach/van-hoc",
			},
			{
				title: "Sách Tâm lý - Giới tính",
				url: "/sach/van-hoc",
			},
			{
				title: "Sách Thường Thức - Gia Đình",
				url: "/sach/van-hoc",
			},
			{
				title: "Thể Dục - Thể Thao",
				url: "/sach/van-hoc",
			},
		],
	},
];

export const userSettingsMenu = [
	{
		title: "Khám phá",
		url: "/book/all",
		separate: false,
	},
	{
		title: "Xem hồ sơ",
		url: "/user",
		icons: "fa fa-user",
	},
];
