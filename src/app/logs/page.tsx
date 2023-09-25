"use client";

import InputForm from "@/app/components/InputForm";
import { Log, Subcategory, User } from "../../../typings";
import "../global.scss";

type PropTypes = {
  user: User;
  currentLogInProgress: Log;
  setCurrentLogInProgress: any;
  subCategories: Subcategory[];
  setAllSubCategories: any;
};

export default function Logs({
  user,
  currentLogInProgress,
  setCurrentLogInProgress,
  subCategories,
  setAllSubCategories,
}: PropTypes) {
  return (
    <main>
      <InputForm
        user={user}
        currentLogInProgress={currentLogInProgress}
        setCurrentLogInProgress={setCurrentLogInProgress}
        subCategories={subCategories}
        setAllSubCategories={setAllSubCategories}
      />
    </main>
  );
}
