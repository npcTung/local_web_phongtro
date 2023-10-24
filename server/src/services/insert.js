import db from "../models";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import chothuecanho from "../../data/chothuecanho.json";
import chothuematbang from "../../data/chothuematbang.json";
import chothuephongtro from "../../data/chothuephongtro.json";
import nhachothue from "../../data/nhachothue.json";
import generateCode from "../ultis/gererateCode";
require("dotenv").config();
import { dataPrice, dataArea } from "../ultis/data";
import {
  getNumberedFromString,
  getNumberedFromStringV2,
} from "../ultis/common";

const dataBody = [
  {
    body: chothuecanho.body,
    code: "CTCH",
  },
  {
    body: chothuematbang.body,
    code: "CTMB",
  },
  {
    body: chothuephongtro.body,
    code: "CTPT",
  },
  {
    body: nhachothue.body,
    code: "NCT",
  },
];

const hasPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const insertService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const provinceCodes = [];
      const labelCodes = [];
      dataBody.forEach((cate) => {
        cate.body.forEach(async (item) => {
          let postId = v4();
          let labelCode = generateCode(item?.header?.class?.classType).trim();
          labelCodes?.every((item) => item?.code !== labelCodes) &&
            labelCodes.push({
              code: labelCode,
              value: item?.header?.class?.classType.trim(),
            });
          let attributesId = v4();
          let userId = v4();
          let overviewId = v4();
          let imagesId = v4();
          let provinceCode = generateCode(
            item?.header?.address?.split(",").slice(-1)[0]
          ).trim();
          provinceCodes?.every((item) => item?.code !== provinceCode) &&
            provinceCodes.push({
              code: provinceCode,
              value: item?.header?.address?.split(",").slice(-1)[0].trim(),
            });
          let currentArea = getNumberedFromString(
            item?.header?.attributes?.acreage
          );
          let currentPrice = getNumberedFromString(
            item?.header?.attributes?.price
          );

          await db.Post.create({
            id: postId,
            title: item?.header?.title,
            star: item?.header?.star,
            labelCode,
            address: item?.header?.address,
            attributesId,
            categoryCode: cate.code,
            description: JSON.stringify(item?.mainContent?.content),
            userId,
            overviewId,
            imagesId,
            areaCode: dataArea.find(
              (area) => area.max > currentArea && area.min <= currentArea
            )?.code,
            priceCode: dataPrice.find(
              (area) => area.max > currentPrice && area.min <= currentPrice
            )?.code,
            provinceCode,
            priceNumber: getNumberedFromStringV2(
              item?.header?.attributes?.price
            ),
            areaNumber: getNumberedFromStringV2(
              item?.header?.attributes?.acreage
            ),
          });
          await db.Attribute.create({
            id: attributesId,
            price: item?.header?.attributes?.price,
            acreage: item?.header?.attributes?.acreage,
            published: item?.header?.attributes?.published,
            hashtag: item?.header?.attributes?.hashtag,
          });
          await db.Image.create({
            id: imagesId,
            images: JSON.stringify(item?.images),
          });
          await db.Overview.create({
            id: overviewId,
            code: item?.overView?.content.find((i) => i.name === "Mã tin:")
              ?.content,
            area: item?.overView?.content.find((i) => i.name === "Khu vực")
              ?.content,
            type: item?.overView?.content.find(
              (i) => i.name === "Loại tin rao:"
            )?.content,
            target: item?.overView?.content.find(
              (i) => i.name === "Đối tượng thuê:"
            )?.content,
            bonus: item?.overView?.content.find((i) => i.name === "Gói tin:")
              ?.content,
            created: item?.overView?.content.find(
              (i) => i.name === "Ngày đăng:"
            )?.content,
            expired: item?.overView?.content.find(
              (i) => i.name === "Ngày hết hạn:"
            )?.content,
          });
          await db.User.create({
            id: userId,
            name: item?.contact?.content.find((i) => i.name === "Liên hệ:")
              ?.content,
            password: hasPassword("123456"),
            phone: item?.contact?.content.find((i) => i.name === "Điện thoại:")
              ?.content,
            zalo: item?.contact?.content.find((i) => i.name === "Zalo")
              ?.content,
          });
        });
      });
      provinceCodes?.forEach(async (item) => {
        await db.Province.create(item);
      });
      labelCodes?.forEach(async (item) => {
        await db.Lable.create(item);
      });

      resolve("Done.");
    } catch (err) {
      reject(err);
    }
  });

export const createPricesAndAreas = () =>
  new Promise((resolve, reject) => {
    try {
      dataPrice.forEach(async (item, index) => {
        await db.Price.create({
          code: item?.code,
          value: item?.value,
          order: index + 1,
        });
      });
      dataArea.forEach(async (item, index) => {
        await db.Area.create({
          code: item?.code,
          value: item?.value,
          order: index + 1,
        });
      });

      resolve("Ok");
    } catch (err) {
      reject(err);
    }
  });
