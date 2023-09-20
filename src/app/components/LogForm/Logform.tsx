import { Log } from "../../../../typings";

type LogFormTypes = {
  currentLogInProgress: Log | null;
  setCurrentLogInProgress: any;
};

export default function LogForm({
  currentLogInProgress,
  setCurrentLogInProgress,
}: LogFormTypes) {
  return (
    <>
      {currentLogInProgress ? (
        <>
          <div>
            {" "}
            <strong>New Log:</strong>{" "}
            {currentLogInProgress?.createdAt.toString()}
          </div>
        </>
      ) : (
        ""
      )}
    </>
  );
}
