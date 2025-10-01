
// export const TruncateText = (text, maxLength = 30, buttonshow, buttonName, redirection,) => {
//   if (!text) return "";
//   return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
// };


import Link from "next/link";

export const TruncateText = (
  text,
  maxLength = 30,
  buttonshow = false,
  buttonName = "more",
  redirection = "#"
) => {
  if (!text) return null; // return null instead of empty string for React
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);

  return buttonshow ? (
    <>
      {truncated}...
      <Link href={redirection} className="text-blue-500 ml-1 hover:underline">
        {buttonName}
      </Link>
    </>
  ) : (
    `${truncated}...`
  );
};


export const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};
