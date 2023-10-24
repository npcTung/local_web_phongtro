import React, { useEffect, useState } from "react";
import { Item } from "../../components";
import { getPostsLimit } from "../../store/actions/post";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

const List = ({ categoryCode }) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { posts } = useSelector((state) => state.post);
  const [sort, setSort] = useState(0);

  useEffect(() => {
    let params = [];
    for (let entry of searchParams.entries()) {
      params.push(entry);
    }

    let searchParamObject = {};
    params?.forEach((i) => {
      if (Object.keys(searchParamObject)?.some((item) => item === i[0])) {
        searchParamObject[i[0]] = [...searchParamObject[i[0]], i[1]];
      } else {
        searchParamObject = { ...searchParamObject, [i[0]]: [i[1]] };
      }
    });
    if (categoryCode) {
      searchParamObject.categoryCode = categoryCode;
    }
    if (sort === 1) {
      searchParamObject.order = ["createdAt", "DESC"];
    }
    dispatch(getPostsLimit(searchParamObject));
  }, [searchParams, categoryCode, sort]);
  return (
    <div className="w-full border p-2 bg-white shadow-md rounded-md">
      <div className="items-center my-2">
        <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
      </div>
      <div className="flex items-center gap-2 pb-4">
        <span>Sắp xếp:</span>
        <span
          onClick={() => setSort(0)}
          className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${
            sort === 0 && "underline font-medium"
          }`}
        >
          Mặc định
        </span>
        <span
          onClick={() => setSort(1)}
          className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${
            sort === 1 && "underline font-medium"
          }`}
        >
          Mới nhất
        </span>
      </div>
      <div className="items">
        {posts?.length > 0 &&
          posts.map((item) => {
            return (
              <Item
                key={item?.id}
                address={item?.address}
                attributes={item?.attributes}
                description={JSON.parse(item?.description)}
                images={JSON.parse(item?.images?.images)}
                star={+item?.star}
                title={item?.title}
                user={item?.user}
                id={item?.id}
                createdAt={item?.createdAt}
              />
            );
          })}
      </div>
    </div>
  );
};

export default List;
