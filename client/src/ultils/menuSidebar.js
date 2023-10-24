import icons from "./icons";

const { BsFillPencilFill, FaClipboardList, FaUserCircle, TbPhoneCalling } =
  icons;

const menuSidebar = [
  {
    id: 1,
    text: "Đăng tin cho thuê",
    path: "/he-thong/tao-moi-bai-dang",
    icon: <BsFillPencilFill />,
  },
  {
    id: 2,
    text: "Quản lý tin đăng",
    path: "/he-thong/quan-ly-bai-dang",
    icon: <FaClipboardList />,
  },
  {
    id: 3,
    text: "Sửa thông tin cá nhân",
    path: "/he-thong/sua-thong-tin-ca-nhan",
    icon: <FaUserCircle />,
  },
  {
    id: 4,
    text: "Liên hệ",
    path: "/lien-he",
    icon: <TbPhoneCalling />,
  },
];

export default menuSidebar;
