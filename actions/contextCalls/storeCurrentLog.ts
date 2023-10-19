"use server";

import {
  NavBarContext,
  NavBarContextTypes,
} from "@/app/components/ContextNavBar/ContextNavBar";
import { useContext } from "react";
import { Log } from "../../typings";

type StoreCurrentTypes = {
  currentLog: Log;
};

export default async function storeCurrent({ currentLog }: StoreCurrentTypes) {
  const { setCurrentLog } = useContext<NavBarContextTypes | any>(NavBarContext);
  setCurrentLog(currentLog);
}
