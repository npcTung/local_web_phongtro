import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions";
import title from "../../ultils/title";
import { Link } from "react-router-dom";
import { path } from "../../ultils/constant";
import { Button } from "../../components";
import { apiDeletePost } from "../../services";
import Swal from "sweetalert2";
import UpdatePost from "../../components/updatePost";

const ManagePost = () => {
  const { currentData } = useSelector((state) => state.user);
  title(
    `#${currentData?.id?.match(/\d/g).join("").slice(0, 10)} - Quản lý tin đăng`
  );
  const dispach = useDispatch();
  const { postsOfCurrent } = useSelector((state) => state.post);
  const [updateData, setUpdateData] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const handleDeletePost = async (postId) => {
    const response = await apiDeletePost(postId);
    if (response?.data.err === 0) {
      Swal.fire("Thành công", "Xóa tin đăng thành công", "success").then(
        setUpdateData(setUpdateData((prev) => !prev))
      );
    } else {
      Swal.fire("Oops!", "Xóa tin đăng thất bại", "error");
    }
  };

  useEffect(() => {
    dispach(actions.getPostsLimitAdmin());
  }, [updateData]);

  return (
    <div className="flex flex-col gap-6">
      <div className="py-4 border-b border-gray-200 flex items-center justify-between">
        <h1 className="text-3xl font-medium">Quản lý bài đăng</h1>
      </div>
      <table className="table-fixed">
        <thead>
          <tr className="flex w-full">
            <th className="border flex-1 text-center p-2">Mã tin</th>
            <th className="border-r border-y flex-1 text-center p-2">
              Ảnh đại diện
            </th>
            <th className="border-r border-y flex-1 text-center p-2">
              Tiêu đề
            </th>
            <th className="border-r border-y flex-1 text-center p-2">Giá</th>
            <th className="border-r border-y flex-1 text-center p-2">
              Ngày bắt đầu
            </th>
            <th className="border-r border-y flex-1 text-center p-2">
              Ngày hết hạn
            </th>
            <th className="border-r border-y flex-1 text-center p-2">
              Tùy chọn
            </th>
          </tr>
        </thead>
        <tbody>
          {postsOfCurrent.length === 0 ? (
            <tr className="border-b border-x flex">
              <td className="flex-1 h-full flex items-center p-2">
                Bạn chưa có tin đăng nào. Bấm
                <Link
                  className="text-#1266DD hover:underline hover:text-#f60"
                  to={`/he-thong/${path.CREATE_POST}`}
                >
                  vào đây
                </Link>
                để bắt đầu đăng tin
              </td>
            </tr>
          ) : (
            postsOfCurrent?.map((item) => {
              return (
                <tr className="flex h-16 border-b" key={item.id}>
                  <td className="border-x flex-1 h-full flex items-center justify-center px-2">
                    {item?.overviews?.code}
                  </td>
                  <td className="border-r flex-1 h-full flex items-center justify-center px-2">
                    <img
                      src={JSON.parse(item?.images?.images)[0] || ""}
                      alt="avartar"
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </td>
                  <td className="border-r flex-1 h-full flex items-center justify-center px-2">
                    {item?.title.length > 40
                      ? `${item?.title.slice(0, 40)}...`
                      : item?.title}
                  </td>
                  <td className="border-r flex-1 h-full flex items-center justify-center px-2">
                    {item?.attributes?.price}
                  </td>
                  <td className="border-r flex-1 h-full flex items-center justify-center px-2">
                    {item?.overviews?.created}
                  </td>
                  <td className="border-r flex-1 h-full flex items-center justify-center px-2">
                    {item?.overviews?.expired}
                  </td>
                  <td className="border-r flex-1 h-full flex items-center justify-center gap-2 px-2">
                    <Button
                      text="Sửa"
                      bgColor="bg-green-500"
                      textColor="text-white"
                      onClick={() => {
                        dispach(actions.editData(item), setIsEdit(true));
                      }}
                    />
                    <Button
                      text="Xóa"
                      bgColor="bg-red-500"
                      textColor="text-white"
                      onClick={() => handleDeletePost(item.id)}
                    />
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
    </div>
  );
};

export default ManagePost;
