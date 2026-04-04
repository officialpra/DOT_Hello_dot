import Image from "next/image";

const ImageBlock = ({ src, alt, width, height, className = "" }) => {
  return (
    <div className={`image-block ${className}`}>
      <Image src={src} alt={alt} width={width} height={height} />
    </div>
  );
};

export default ImageBlock;
