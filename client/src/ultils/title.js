import home from "../assets/home.svg";

const title = (title) => {
  document.title = `${title ? title : 'Trang chủ'} - phongtro.com`;
  var newIcon = document.createElement("link");
  newIcon.rel = "icon";
  newIcon.href = home;
  var currenIcon = document.querySelector('link[rel="icon"]');
  document.head.replaceChild(newIcon, currenIcon);
};

export default title;
