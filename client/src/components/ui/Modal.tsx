import * as React from "react";
import { cn, createCva } from "../../lib/utils";

const modalVariants = createCva(
  "fixed inset-0 z-50 flex items-center justify-center p-4",
  {
    variants: {
      size: {
        sm: "",
        default: "",
        lg: "",
        xl: "",
        full: "p-0",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const modalContentVariants = createCva(
  "relative bg-white  rounded-xl shadow-xl border border-gray-50 w-full max-h-[90vh] overflow-hidden",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        default: "max-w-md",
        lg: "max-w-lg",
        xl: "max-w-xl",
        full: "max-w-full h-full rounded-none",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "sm" | "default" | "lg" | "xl" | "full";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  contentClassName?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = "default",
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  contentClassName,
}) => {
  const modalRef = React.useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const handleClose = React.useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      onClose();
      setIsAnimating(false);
    }, 200);
  }, [onClose, isAnimating]);

  const handleOverlayClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (closeOnOverlayClick && e.target === e.currentTarget) {
        handleClose();
      }
    },
    [closeOnOverlayClick, handleClose]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape") {
        handleClose();
      }
    },
    [closeOnEscape, handleClose]
  );

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen && !isAnimating) return null;

  return (
    <div
      ref={modalRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      className={cn(modalVariants({ size, className }))}
      onKeyDown={handleKeyDown}
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/10 backdrop-blur-sm transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Modal Content */}
      <div
        className={cn(
          modalContentVariants({ size, className: contentClassName }),
          "transition-all duration-200 ease-out",
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        )}
      >
        {/* Close Button (if no custom header) */}
        {showCloseButton && (
          <div className="absolute top-4 right-4 z-10">
            <ModalCloseButton onClose={handleClose} />
          </div>
        )}

        {/* Body */}
        <div className="p-4 pt-3 ">{children}</div>
      </div>
    </div>
  );
};

// Modal Header Component
interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className }) => (
  <div className={cn("flex items-center justify-between p-4 pb-0", className)}>
    {children}
  </div>
);

// Modal Title Component
interface ModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

const ModalTitle: React.FC<ModalTitleProps> = ({ children, className }) => (
  <h2 className={cn("text-lg font-semibold text-gray-900 ", className)}>
    {children}
  </h2>
);

// Modal Description Component
interface ModalDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const ModalDescription: React.FC<ModalDescriptionProps> = ({
  children,
  className,
}) => (
  <p className={cn(" text-sm text-gray-500 ", className)}>
    {children}
  </p>
);

// Modal Body Component
interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
}

const ModalBody: React.FC<ModalBodyProps> = ({ children, className }) => (
  <div className={cn("p-4 pt-3", className)}>{children}</div>
);

// Modal Footer Component
interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ children, className }) => (
  <div
    className={cn(
      "flex items-center justify-end gap-3 p-4 pt-2 border-t border-gray-200 ",
      className
    )}
  >
    {children}
  </div>
);

// Modal Close Button Component
interface ModalCloseButtonProps {
  onClose: () => void;
  className?: string;
  "aria-label"?: string;
}

const ModalCloseButton: React.FC<ModalCloseButtonProps> = ({
  onClose,
  className,
  "aria-label": ariaLabel = "Close modal",
}) => (
  <button
    type="button"
    onClick={onClose}
    className={cn(
      "inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 transition-colors",
      className
    )}
    aria-label={ariaLabel}
  >
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </button>
);

export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
};
