import React from "react";

// Define the props interface for type safety and clarity
interface AvatarProps {
  avatarUrl?: string;
  name?: string;
  size?: number; // Optional
  fallbackAvatarUrl?: string;
  fallbackName?: string;
  className?: string;
  href?: string;
}

// Default values
const DEFAULT_AVATAR = "https://flowbite.com/docs/images/logo.svg";
const DEFAULT_NAME = "Guest";

const Avatar: React.FC<AvatarProps> = ({
  avatarUrl,
  name,
  fallbackAvatarUrl = DEFAULT_AVATAR,
  className = "", 
  href, 
}) => {
  // Determine the final values to use, applying fallbacks
  const finalAvatarUrl = avatarUrl || fallbackAvatarUrl;
  const finalName = name;


  

  // Construct the common classes for the container
  const containerClasses =
    `flex items-center space-x-3 rtl:space-x-reverse ${className}`.trim();

  // Determine the tag type based on whether href is provided

  return (
    <a href={href} className={containerClasses}>
      <img
        src={finalAvatarUrl}
        className={`h-14 w-14 rounded-full border-2 border-black object-cover object-center`}
        alt={finalName || ""} // More descriptive alt text
        onError={(e) => {
                    if (e.currentTarget.src !== fallbackAvatarUrl) {
            e.currentTarget.src = fallbackAvatarUrl;
          }
        }}
      />
      {finalName && (
        <span className="self-center md:text-xl lg:text-2xl font-semibold whitespace-nowrap text-white">
          {finalName}
        </span>
      )}
    </a>
  );
};

export default Avatar;
