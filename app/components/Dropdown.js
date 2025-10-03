
"use client";
import { useState, useRef, useEffect, useCallback } from "react";

export default function Dropdown({
  button,
  children,
  className,
  onOpen,
  onClose,
  initialOpen = false,
}) {
  const [open, setOpen] = useState(initialOpen);
  const ref = useRef(null);

  // stable functions
  const openDropdown = useCallback(() => {
    setOpen(true);
    onOpen?.();
  }, [onOpen]);

  const closeDropdown = useCallback(() => {
    setOpen(false);
    onClose?.();
  }, [onClose]);

  const toggleDropdown = useCallback(() => {
    setOpen((prev) => {
      const newVal = !prev;
      if (newVal) onOpen?.();
      else onClose?.();
      return newVal;
    });
  }, [onOpen, onClose]);

  // outside click + escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        closeDropdown();
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") closeDropdown();
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeDropdown]);

  return (
    <div className="relative" ref={ref}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {button}
      </div>

      {open && (
        <div className={`absolute mt-4 z-50 ${className || ""}`}>
          {typeof children === "function"
            ? children({ close: closeDropdown, open: openDropdown })
            : children}
        </div>
      )}
    </div>
  );
}
