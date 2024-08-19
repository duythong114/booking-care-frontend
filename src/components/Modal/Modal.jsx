import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalComponent(props) {
    const { show, handleClose, title, body, handlePrimaryBtnClick, primaryBtnText } = props;

    return (
        <>
            <Modal show={show} onHide={handleClose}>
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