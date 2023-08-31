import { Button } from "antd";
import {useNavigate} from "react-router-dom"

const About = () => {
    const Navigate=useNavigate()
  return (
    <>
      about
      <Button onClick={()=>{
        Navigate('/about/detail')
      }}>详情</Button>
    </>
  );
};

export default About;
