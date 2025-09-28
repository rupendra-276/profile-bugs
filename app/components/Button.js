import React from "react";

export default function Button({
  children,
  type = "button",
  buttonclass = "",
  onClick,
  icon: Icon, // icon component (optional)
  showIcon = false, // only show icon when true
  ...props
}) {
  return (
    <button
      type={type}
      className={`flex items-center gap-2 px-4 py-1.5 rounded-3xl hover:cursor-pointer transition bg-[rgb(3,94,220)] hover:text-white hover:bg-[#] ${buttonclass}`}
      onClick={onClick}
      {...props}
    >
      {showIcon && Icon && <Icon className="text-lg" />}
      {children}
    </button>
  );
}

export function Buttonborder({
  name,
  onClick,
  classNameborder,
  icon: Icon,
  ...props
}) {
  return (
    <button onClick={onClick} {...props}>
      <span
        className={` text-[12px] flex gap-1 items-center  px-3 py-2.5 rounded-full bg-[#0013E3] font-semibold text-white ${classNameborder}`}
      >
       {Icon && <Icon className="w-5 h-5" />} {name}  
      </span>
    </button>
  );
}
