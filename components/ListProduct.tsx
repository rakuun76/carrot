import { formatToTimeAgo, formatToWon } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ListProductProps {
  id: number;
  title: string;
  price: number;
  photo: string;
  created_at: Date;
}

export default function ListProduct({
  id,
  title,
  price,
  photo,
  created_at,
}: ListProductProps) {
  return (
    <Link className="flex gap-5" href={`/products/${id}`}>
      <div className="relative size-24 rounded-md overflow-hidden">
        <Image fill src={photo} alt={title} />
      </div>
      <div className="flex flex-col gap-2px">
        <span className="text-lg font-semibold text-white">{title}</span>
        <span className="text-sm text-neutral-400">
          {formatToTimeAgo(created_at)}
        </span>
        <span className="text-lg text-white">{formatToWon(price)}</span>
      </div>
    </Link>
  );
}
