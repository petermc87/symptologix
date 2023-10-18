import { useContext } from "react";
import { NavBarContext } from "../ContextNavBar/ContextNavBar";

export default function ComponentTest() {
  const { show, subCategories } = useContext<any>(NavBarContext);

  console.log(show, subCategories);
  return <div>{show}</div>;
}
