import clsx from "clsx";
import estilos from "@/app/ui/_components/skeletons.module.css";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div 
      className={clsx("skeleton rounded-md", `${className} ${estilos.skeleton}`)}
      style={{
        opacity: "0.6",
        cursor: "progress",
      }}
    />
  );
}

const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';

export function FormSkeleton() {
  return (
    <div className="flex flex-col w-full items-center gap-8 bg-gray-100 p-10 rounded-2xl" style={{ maxWidth: "525px" }}>
      <div className="w-full">
        <Skeleton className="h-5 w-20 mb-1" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
      <div className="w-full">
        <Skeleton className="h-5 w-20 mb-1" />
        <Skeleton className="h-10 w-full rounded-lg" />
      </div>
      <Skeleton className="h-10 w-full rounded-3xl max-w-[300px]" />
    </div>
  );
}

export function ModuleSkeleton() {
  return (
    <div className="flex flex-col items-center justify-between text-center text-sm rounded-2xl bg-gray-100 w-52 h-52 pt-5 pb-5 pl-8 pr-8 md:w-64 md:h-64 md:text-base active:translate-y-0">
      <Skeleton className="h-10 w-full bg-gray-200"/>
      <Skeleton className="w-[65px] h-[65px] bg-gray-200"/>
      <Skeleton className="h-15 w-full"/>
    </div>
  );
}

export function VideoListItemSkeleton() {
  return (
    <div>
      <div className="flex flex-col justify-between gap-1 p-4 border-1 rounded-2xl bg-gray-100">
        <Skeleton className="h-6 w-30 bg-gray-200"/>
        <Skeleton className="h-4 w-40 bg-gray-200"/>
        <Skeleton className="h-4 w-20 bg-gray-200"/>
      </div>
    </div>
  );
}

export function ContentSkeleton() {
  return (
    <div className="flex flex-col items-center gap-8 pt-8 pb-8 p-4 m-auto max-w-[1200px]">
      <div>
        <Skeleton className="w-80 h-8 bg-gray-200"/>
      </div>
      <Skeleton className="relative w-full max-w-[660px] aspect-video bg-gray-200" />        
      <div className="w-full">
            <div className="flex flex-col gap-4 pl-4 pr-4">
              <Skeleton className="h-8 w-40 bg-gray-200" />
              <Skeleton className="w-full h-40 bg-gray-200" />
            </div>
      </div>
    </div>
  );
}