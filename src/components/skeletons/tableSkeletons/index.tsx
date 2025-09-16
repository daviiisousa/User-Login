import { Skeleton } from "../../UI/skeleton";

export function TableSkeleton() {
  return (
    <Skeleton className="w-full h-[400px] p-4 flex flex-col gap-4">
      <Skeleton className="w-full h-10 bg-slate-800" />
      <Skeleton className="w-full h-10 bg-slate-800" />
      <Skeleton className="w-full h-10 bg-slate-800" />
      <Skeleton className="w-full h-10 bg-slate-800" />
      <Skeleton className="w-full h-10 bg-slate-800" />
      <Skeleton className="w-full h-10 bg-slate-800" />
      <Skeleton className="w-full h-10 bg-slate-800" />
    </Skeleton>
  );
}
