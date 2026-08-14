import Image, { type ImageProps } from "next/image";

export function Photo({
  alt,
  quality = 75,
  ...props
}: ImageProps) {
  const blur = typeof props.src === "object" ? "blur" as const : undefined;
  return (
    <Image
      {...props}
      alt={alt}
      quality={quality}
      placeholder={props.placeholder ?? blur}
      decoding={props.decoding ?? "async"}
    />
  );
}
