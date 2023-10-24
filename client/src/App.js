import { Routes, Route } from "react-router-dom";
import {
  Home,
  Homepage,
  Login,
  Rental,
  Instruct,
  DetailPost,
  Contact,
  SearchDetail,
} from "./containers/public";
import {
  System,
  CreatePost,
  ManagePost,
  EditAccount,
} from "./containers/system";
import { path } from "./ultils/constant";
import * as actions from "./store/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent());
    }, 1000);
  }, [isLoggedIn]);

  useEffect(() => {
    dispatch(actions.getPrices());
    dispatch(actions.getAreas());
    dispatch(actions.getProvinces());
  }, []);

  return (
    <div className="bg-#F5F5F5">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path="/" element={<Homepage />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.HUONG_DAN} element={<Instruct />} />
          <Route path={path.CONTACT} element={<Contact />} />
          <Route
            path={path.DETAL_POST__TTILE__POSTID}
            element={<DetailPost />}
          />
          <Route path={path.DETAIL_ALL} element={<DetailPost />} />
          <Route path={path.SEARCH} element={<SearchDetail />} />
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route path={path.CREATE_POST} element={<CreatePost />} />
          <Route path={path.MANAGE_POST} element={<ManagePost />} />
          <Route path={path.EDIT_ACCOUNT} element={<EditAccount />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
