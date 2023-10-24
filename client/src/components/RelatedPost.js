import React, { memo, useEffect } from "react";
import { Sitem } from "./index";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";

const RelatedPost = () => {
  const { newPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getNewPosts());
  }, []);

  return (
    <div className="p-4 rounded-md bg-white shadow-sm w-full">
      <h3 className="font-semibold text-lg">Tin mới đăng</h3>
      <div className="w-full flex flex-col gap-2">
        {newPosts?.map((item) => {
          return (
            <Sitem
              key={item?.id}
              title={item?.title}
              price={item?.attributes?.price}
              createAt={item?.createdAt}
              image={JSON.parse(item?.images?.images)}
              id={item?.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(RelatedPost);
