import { useContext } from "react";
import { NavBarContext } from "../ContextNavBar/ContextNavBar";

export default function ComponentTest() {
  const { state } = useContext<any>(NavBarContext);

  return <div>{state}</div>;
}
