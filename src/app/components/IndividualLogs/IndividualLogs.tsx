import { useContext, useState } from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import { Subcategory } from "../../../../typings";
import {
  NavBarContext,
  NavBarContextTypes,
} from "../ContextNavBar/ContextNavBar";

export default function IndividualLogs() {
  // Add in the subcategory data through context so that
  // it can be consumed here.
  const { subCategories, setSubCategories, entries, setEntries } = useContext<
    NavBarContextTypes | any
  >(NavBarContext);

  // State for holding the selected subcategory
  const [selectedSubCat, setSeletedSubCat] = useState<Subcategory>(null);

  console.log(entries, subCategories);

  return (
    <>
      {/* Add a dropdown to select a current subcategory */}
      <div>Individual Entries Patterns</div>
      <div>
        <div>Select SubCategory</div>
        <Dropdown as={ButtonGroup}>
          <Dropdown.Toggle
            id="dropdown-custom-1"
            style={{
              backgroundColor: "#9391ff",
              borderColor: "#9391ff",
              zIndex: "0",
              padding: "0 5px 0 5px",
            }}
          >
            {/* Text in the subcategory dropdown. This will show the default if nothing is selected */}
            {selectedSubCat ? selectedSubCat.name : "Select a Subcategory"}
          </Dropdown.Toggle>
        </Dropdown>
      </div>
    </>
  );
}
