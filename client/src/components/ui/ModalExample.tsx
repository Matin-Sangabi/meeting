import * as React from "react";
import { Modal, ModalHeader, ModalTitle, ModalDescription, ModalBody, ModalFooter, ModalCloseButton } from "./Modal";
import { Button } from "./Button";

const ModalExample: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [modalType, setModalType] = React.useState<"simple" | "withHeader" | "withFooter" | "fullSize" | "noHeader">("simple");

  const handleOpenModal = (type: typeof modalType) => {
    setModalType(type);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const renderModalContent = () => {
    switch (modalType) {
      case "simple":
        return (
          <Modal
            isOpen={isOpen}
            onClose={handleCloseModal}
          >
            <ModalHeader>
              <div>
                <ModalTitle>Simple Modal</ModalTitle>
                <ModalDescription>
                  This is a simple modal with basic content.
                </ModalDescription>
              </div>
              <ModalCloseButton onClose={handleCloseModal} />
            </ModalHeader>
            <ModalBody>
              <p className="text-gray-600 dark:text-gray-300">
                This is the content of the simple modal. You can put any content here.
              </p>
            </ModalBody>
          </Modal>
        );

      case "withHeader":
        return (
          <Modal
            isOpen={isOpen}
            onClose={handleCloseModal}
            size="lg"
          >
            <ModalHeader>
              <div>
                <ModalTitle>Custom Header Modal</ModalTitle>
                <ModalDescription>
                  This modal has a custom header with title and description.
                </ModalDescription>
              </div>
              <ModalCloseButton onClose={handleCloseModal} />
            </ModalHeader>
            <ModalBody>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This modal demonstrates how to use the custom header components.
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-md">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Additional Information</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  You can add any content here, including forms, lists, or other components.
                </p>
              </div>
            </ModalBody>
          </Modal>
        );

      case "withFooter":
        return (
          <Modal
            isOpen={isOpen}
            onClose={handleCloseModal}
            size="xl"
          >
            <ModalHeader>
              <div>
                <ModalTitle>Modal with Footer</ModalTitle>
                <ModalDescription>
                  This modal includes action buttons in the footer.
                </ModalDescription>
              </div>
              <ModalCloseButton onClose={handleCloseModal} />
            </ModalHeader>
            <ModalBody>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                This modal demonstrates how to use the footer component with action buttons.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="agree"
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="agree" className="text-sm text-gray-700 dark:text-gray-300">
                    I agree to the terms and conditions
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="newsletter"
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="newsletter" className="text-sm text-gray-700 dark:text-gray-300">
                    Subscribe to newsletter
                  </label>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button onClick={handleCloseModal}>
                Confirm
              </Button>
            </ModalFooter>
          </Modal>
        );

      case "fullSize":
        return (
          <Modal
            isOpen={isOpen}
            onClose={handleCloseModal}
            size="full"
          >
            <ModalHeader>
              <div>
                <ModalTitle>Full Size Modal</ModalTitle>
                <ModalDescription>
                  This modal takes up the full screen.
                </ModalDescription>
              </div>
              <ModalCloseButton onClose={handleCloseModal} />
            </ModalHeader>
            <ModalBody>
              <div className="h-full flex flex-col">
                <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Full Size Content
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    This modal demonstrates the full-size variant. It's useful for complex forms,
                    detailed views, or content that requires more space.
                  </p>
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-md border">
                      <h4 className="font-medium mb-2">Section 1</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Content for the first section.
                      </p>
                    </div>
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-md border">
                      <h4 className="font-medium mb-2">Section 2</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Content for the second section.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button variant="outline" onClick={handleCloseModal}>
                Close
              </Button>
            </ModalFooter>
          </Modal>
        );

      case "noHeader":
        return (
          <Modal
            isOpen={isOpen}
            onClose={handleCloseModal}
            size="sm"
          >
            <ModalBody>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900 mb-4">
                  <svg
                    className="h-6 w-6 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Success!
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Your action was completed successfully.
                </p>
                <Button onClick={handleCloseModal}>
                  Continue
                </Button>
              </div>
            </ModalBody>
          </Modal>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Modal Examples
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Button onClick={() => handleOpenModal("simple")}>
          Simple Modal
        </Button>
        <Button onClick={() => handleOpenModal("withHeader")}>
          With Header
        </Button>
        <Button onClick={() => handleOpenModal("withFooter")}>
          With Footer
        </Button>
        <Button onClick={() => handleOpenModal("fullSize")}>
          Full Size
        </Button>
        <Button onClick={() => handleOpenModal("noHeader")}>
          No Header
        </Button>
      </div>

      {renderModalContent()}
    </div>
  );
};

export default ModalExample; 