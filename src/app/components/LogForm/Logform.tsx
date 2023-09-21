import { Log } from "../../../../typings";

type LogFormTypes = {
  currentLogInProgress: Log | null;
  setCurrentLogInProgress: any;
};

export default function LogForm({
  currentLogInProgress,
  setCurrentLogInProgress,
}: LogFormTypes) {
  console.log(currentLogInProgress);
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
                return (
                  <div className="entry">
                    {" "}
                    <div className="subcat" key={entry.id}>
                      {/* {entry.subCategoryId} */}
                      entry
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
