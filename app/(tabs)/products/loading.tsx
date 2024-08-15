export default function Loading() {
  return (
    <div className="flex flex-col gap-5 p-5 animate-pulse">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="flex gap-5 *:rounded-md">
          <div className="bg-neutral-700 size-24" />
          <div className="flex flex-col gap-2 *:rounded-md">
            <div className="bg-neutral-700 h-4 w-32" />
            <div className="bg-neutral-700 h-4 w-14" />
            <div className="bg-neutral-700 h-4 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
