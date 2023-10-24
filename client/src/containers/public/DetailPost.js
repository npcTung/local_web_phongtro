import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPostsLimit } from "../../store/actions";
import { Slider, Boxinfo, RelatedPost } from "../../components";
import icons from "../../ultils/icons";
import { blobToBase64 } from "../../ultils/Common/toBase64";
import title from "../../ultils/title";

const {
  HiLocationMarker,
  RiCrop2Line,
  TbReportMoney,
  HiOutlineHashtag,
  BiTime,
  GrStar,
} = icons;

const DetailPost = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);

  const handleStar = (star) => {
    let stars = [];
    for (let i = 1; i <= +star; i++) {
      stars.push(<GrStar className="star-item" size={25} />);
    }
    return stars;
  };

  useEffect(() => {
    postId && dispatch(getPostsLimit({ id: postId }));
  }, [postId]);
  title(posts && posts.length > 0 ? posts[0].title : null);

  return (
    <div className="my-5 w-full flex gap-4">
      <div className="w-[70%] bg-white shadow-md rounded-md">
        <Slider
          images={
            posts && posts.length > 0 && JSON.parse(posts[0]?.images?.images)
          }
        />
        <div className="flex flex-col gap-2 px-4 py-2">
          <div className="font-bold text-red-500">
            {handleStar(posts && posts.length > 0 && +posts[0]?.star).length >
              0 &&
              handleStar(posts && posts.length > 0 && +posts[0]?.star).map(
                (star, number) => {
                  return <span key={number}>{star}</span>;
                }
              )}
            <h2 className="text-2xl pt-3">{posts[0]?.title}</h2>
            <div className="flex items-center gap-2">
              <span className="text-black text-base">Chuyên mục: </span>
              <span className="text-blue-600 underline font-medium hover:text-#f60 cursor-pointer">
                {posts[0]?.overviews?.area}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <HiLocationMarker />
              <span className="text-black text-base">{posts[0]?.address}</span>
            </div>
          </div>
          <div className="flex items-center gap-16 px-2">
            <span className=" flex items-center gap-1">
              <TbReportMoney />
              <span className="font-semibold text-lg text-green-600">
                {posts[0]?.attributes?.price}
              </span>
            </span>
            <span className=" flex items-center gap-1">
              <RiCrop2Line />
              <span>{posts[0]?.attributes?.acreage}</span>
            </span>
            <span className=" flex items-center gap-1">
              <BiTime />
              <span>{posts[0]?.attributes?.published}</span>
            </span>
            <span className=" flex items-center gap-1">
              <HiOutlineHashtag />
              <span>{posts[0]?.attributes?.hashtag}</span>
            </span>
          </div>
        </div>
        <div className="divider"></div>
        <div className="mt-5 py-2 px-4">
          <h3 className="font-semibold text-xl my-4">Thông tin mô tả</h3>
          <div className="flex flex-col gap-3 ">
            {posts[0]?.description &&
              JSON.parse(posts[0]?.description)?.map((item, index) => {
                return <span key={index}>{item}</span>;
              })}
          </div>
        </div>
        <div className="divider"></div>
        <div className="mt-5 py-2 px-4">
          <h3 className="font-semibold text-xl my-4">Đặc điểm tin đăng</h3>
          <table className="w-full">
            <tbody className="w-full">
              <tr className="w-full">
                <td className="p-2">Mã tin</td>
                <td className="p-2">{posts[0]?.overviews?.code}</td>
              </tr>
              <tr className="w-full bg-gray-200">
                <td className="p-2">Khu vực</td>
                <td className="p-2">{posts[0]?.overviews?.area}</td>
              </tr>
              <tr className="w-full">
                <td className="p-2">Loại tin rao</td>
                <td className="p-2">{posts[0]?.overviews?.type}</td>
              </tr>
              <tr className="w-full bg-gray-200">
                <td className="p-2">Đối tượng</td>
                <td className="p-2">{posts[0]?.overviews?.target}</td>
              </tr>
              <tr className="w-full">
                <td className="p-2">Gói tin</td>
                <td className="p-2">{posts[0]?.overviews?.bonus}</td>
              </tr>
              <tr className="w-full bg-gray-200">
                <td className="p-2">Ngày đăng</td>
                <td className="p-2">{posts[0]?.overviews?.created}</td>
              </tr>
              <tr className="w-full">
                <td className="p-2">Ngày hết hạn</td>
                <td className="p-2">{posts[0]?.overviews?.expired}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="divider"></div>
        <div className="mt-5 py-2 px-4">
          <h3 className="font-semibold text-xl my-4">Thông tin liên hệ</h3>
          <table className="w-full">
            <tbody className="w-full">
              <tr className="w-full">
                <td className="p-2">Liên hệ</td>
                <td className="p-2">{posts[0]?.user?.name}</td>
              </tr>
              <tr className="w-full bg-gray-200">
                <td className="p-2">Điện thoại</td>
                <td className="p-2">{posts[0]?.user?.phone}</td>
              </tr>
              <tr className="w-full ">
                <td className="p-2">Zalo</td>
                <td className="p-2">{posts[0]?.user?.zalo}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-[30%] flex flex-col gap-4">
        <div className="bg-white shadow-md rounded-md">
          <Boxinfo
            userData={posts[0]?.user}
            avatar={blobToBase64(posts[0]?.user?.avatar)}
          />
        </div>
        <div className="bg-white shadow-md rounded-md">
          <RelatedPost />
        </div>
      </div>
    </div>
  );
};

export default DetailPost;
