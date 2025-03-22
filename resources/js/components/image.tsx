import React from "react";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className = "",
  style,
  ...props
}) => {
  // Build the style object to include provided width and height.
  const imgStyle = {
    width: width ? `${width}px` : "auto",
    height: height ? `${height}px` : "auto",
    ...style,
  };

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      style={imgStyle}
      className={`rounded-lg ${className}`}
      {...props}
    />
  );
};

export default Image;
