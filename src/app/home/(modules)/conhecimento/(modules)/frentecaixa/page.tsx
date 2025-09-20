import { LibVideos, VideoListItem } from "@/app/ui/_components/module";
import { VideoListItemSkeleton } from "@/app/ui/_components/skeletons";
import { Suspense } from "react";

export default function Page(){
  return (
    <LibVideos

      title="Frente de caixa"
    >
      <Suspense fallback={<VideoListItemSkeleton />}>
        <VideoListItem
          href="/aberturacaixa"
          title="Abertura de Caixa"
          rotina="2075 - Frente de caixa"
          processo="1"
        />
      </Suspense>
      <Suspense fallback={<VideoListItemSkeleton />}>
        <VideoListItem
          href="/fechamentocaixa"
          title="Fechamento de caixa"
          rotina="2075 - Frente de caixa"
          processo="2"
        />
      </Suspense>
    </LibVideos>
  );
}