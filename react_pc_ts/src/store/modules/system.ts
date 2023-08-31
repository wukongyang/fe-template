import { useState } from "react";

import { useMemoizedFn } from "@/hooks";
import type { WatermarkProps } from "antd";

export default () => {
  const [theme, _setTheme] = useState("light");
  const [watermark, _setWatermark] = useState<WatermarkProps&{close?:boolean}>({
    content: "Wukong",
  });
  const setTheme: React.Dispatch<React.SetStateAction<string>> = useMemoizedFn(
    (value) => {
      if (typeof value === "function") {
        _setTheme(value(theme));
      } else {
        _setTheme(value);
      }
    }
  );
  const setWatermark: React.Dispatch<React.SetStateAction<WatermarkProps&{close?:boolean}>> =
    useMemoizedFn((value) => {
      if (typeof value === "function") {
        _setWatermark(value(watermark));
      } else {
        _setWatermark(value);
      }
    });
  return { theme, setTheme, watermark, setWatermark };
};
