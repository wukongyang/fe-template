import { useState } from "react";

import { useMemoizedFn } from "@/hooks";

export interface IUserInfo {
  name: string;
  userId: number;
}

export default () => {
  const [userInfo, _setUserInfo] = useState<IUserInfo>({} as IUserInfo);

  const setUserInfo: React.Dispatch<React.SetStateAction<IUserInfo>> =
    useMemoizedFn((value) => {
      if (typeof value === "function") {
        _setUserInfo(value(userInfo));
      } else {
        _setUserInfo(value);
      }
    });
  return { userInfo, setUserInfo };
};
