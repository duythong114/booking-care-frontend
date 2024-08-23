import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "./Modal.scss"

function ModalComponent(props) {
    const { show, handleClose, title, body, handlePrimaryBtnClick, primaryBtnText, size } = props;

    return (
        <>
            <Modal size={size || "md"} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{body}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handlePrimaryBtnClick}>
                        {primaryBtnText}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalComponent;