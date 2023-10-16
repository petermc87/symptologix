// Import use context hook from React
import { useContext } from "react";
import { NavBarContext } from "../ContextNavBar/ContextNavBar";

export default function ButtonTest() {
  const { show, setShow } = useContext<any>(NavBarContext);
  console.log(show);
  return (
    <div>
      <button onClick={() => setShow(true)}>open</button>
      <button onClick={() => setShow(false)}>close</button>
    </div>
  );
}
