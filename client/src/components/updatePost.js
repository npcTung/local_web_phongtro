import React, { memo } from "react";
import { CreatePost } from "../containers/system";
import icons from "../ultils/icons";

const { MdClear } = icons;

const UpdatePost = ({ setIsEdit }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-overlay-70 flex justify-center z-10">
      <span
      className="absolute top-0 right-0 p-2 cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          setIsEdit(false);
        }}
      ><MdClear color="white" size={30} /></span>
      <div
        className="bg-white max-w-1100px w-full overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <CreatePost isEdit />
      </div>
    </div>
  );
};

export default memo(UpdatePost);
