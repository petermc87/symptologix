import { Button, Modal } from "react-bootstrap";

type DangerModalTypes = {
  show: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  deleteEntry: (id: string) => void;
  deleteLog: (id: string) => void;
  elementName: string;
  id: string;
};

// Test open and close modal.
export default function DangerModal({
  elementName,
  show,
  handleClose,
  deleteEntry,
  deleteLog,
  id,
}: DangerModalTypes) {
  //Pass down a variable to be changed here.Looks like this option doesnt make much sense.
  //   Its easier to just pass down state.

  // handle open can only by called from the parent component. Maybe we could pass state down, and
  //   then call the the handle open function if the value passed down is false. Make this a variable rather
  // than state
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Danger!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are about to delete this {elementName} forever, do you really want
          to do this?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (elementName === "entry") {
                deleteEntry(id);
              } else {
                // Add deleteLog function here.
                deleteLog(id);
              }
              handleClose();
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
