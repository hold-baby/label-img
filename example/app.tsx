import { useEffect, useRef } from "react";
import { render } from "react-dom";
import LabelImg from "src/index";

const App = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lb = new LabelImg(ref.current as HTMLDivElement, {});

    // 注册图形
    lb.register({
      id: "po",
      type: "Rect",
    });

    const testImgUrl = "https://hold-baby.github.io/label-img/dog.jpg";
    lb.loadSource(testImgUrl, () => {
      console.log("图片加载成功");

      lb.createShape({
        registerID: "po",
        points: [
          [20, 20],
          [40, 40],
        ],
      });
    });
  }, []);

  return <div ref={ref}></div>;
};

render(<App />, document.getElementById("app"));
