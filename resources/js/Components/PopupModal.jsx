import Modal from '@mui/material/Modal';

export default function PopupModal({
    isOpened = false,
    children,
    setPopupIsOpened,
    contentClassNames = "",
}) {
    const handleClose = () => setPopupIsOpened(false);

    return (
        <Modal
            open={isOpened}
            onClose={handleClose}
            className="flex justify-center align-center"
        >
            <div className={`${contentClassNames} + bg-white w-full md:w-10/12 lg:w-1/2 lg:max-w-3xl my-auto`}>
                {children}
            </div>
        </Modal>
    );
}
