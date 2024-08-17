import { PhotoIcon } from "@heroicons/react/24/solid";

export default function Loading() {
  return (
    <div className="animate-pulse p-5 flex flex-col gap-3">
      <div className="aspect-square flex justify-center items-center border-4 rounded-md border-neutral-700 text-neutral-700">
        <PhotoIcon className="size-28" />
      </div>
      <div className="h-6 w-52 rounded-md bg-neutral-700" />
      <div className="flex items-center gap-2">
        <div className="size-14 rounded-full bg-neutral-700" />
        <div className="h-5 w-24 rounded-md bg-neutral-700" />
      </div>
      <div className="h-14 w-full rounded-md bg-neutral-700" />
    </div>
  );
}
