import { useContext } from "react";
import { NavBarContext } from "../ContextNavBar/ContextNavBar";

export default function ComponentTest() {
  const { show } = useContext<any>(NavBarContext);

  console.log(show);
  return <div>{show}</div>;
}
