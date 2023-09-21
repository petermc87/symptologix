import { Log, Subcategory } from "../../../../typings";

type LogFormTypes = {
  currentLogInProgress: Log | null;
  setCurrentLogInProgress: any;
  subCategories: Subcategory[];
};

export default function LogForm({
  currentLogInProgress,
  setCurrentLogInProgress,
  subCategories,
}: LogFormTypes) {
  // When the entry is submitted, we search the subCategories state array that are stored in cache so
  // the object can be searched here, matched with the id and the name displayed.
  // This avoids another database query.
  const getSubcat = (id: string) => {
    // Create a variable to store the name
    let name;
    // Cycle throuh each one
    subCategories.map((subcat) => {
      // Test the loop.
      // console.log(subcat.name)

      // Create a statement that will check the id vs the
      // id in each object. If there is a match, return the name
      if (subcat.id === id) {
        name = subcat.name;
      }
    });
    return name;
  };

  return (
    <>
      {currentLogInProgress ? (
        <>
          <div className="log" key={currentLogInProgress.id}>
            {" "}
            <strong>New Log:</strong>{" "}
            {currentLogInProgress?.createdAt.toString()}
            <div className="entries" key={currentLogInProgress.id}>
              <div className="headings" key={currentLogInProgress.id + 1}>
                <h4>SubCat</h4>
                <h4>Description</h4>
                <h4></h4>
              </div>

              {/* Add in the map here for the rest of the entry components. */}
              {currentLogInProgress.entries?.map((entry) => {
                // Run a mapping function here that will match the subcat id with
                // the id of the subcat in the entry object.

                // Pass entry.subCategoryId to the function and store the name here.
                const name = getSubcat(entry.subCategoryId);
                return (
                  <div className="entry">
                    {" "}
                    <div className="subcat" key={entry.id}>
                      {name}
                    </div>
                    <div className="description" key={entry.id + 1}>
                      {entry.entry}
                    </div>
                    <div className="buttons" key={entry.id + 2}>
                      <button>Del</button>
                      <button>Edit</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
