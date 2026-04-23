import Image from "next/image";

interface EditorialImageProps {
  src: string;
  caption?: string;
  aspectRatio?: string;
  alt?: string;
  priority?: boolean;
}

export function EditorialImage({
  src,
  caption,
  aspectRatio = "3/2",
  alt = "",
  priority = false,
}: EditorialImageProps) {
  return (
    <figure className="m-0">
      <div
        className="editorial-img relative w-full overflow-hidden"
        style={{ aspectRatio }}
      >
        <Image
          src={src}
          fill
          alt={alt}
          className="object-cover"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      {caption && (
        <figcaption className="font-serif font-light italic text-[14px] text-gray-600 mt-3">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
