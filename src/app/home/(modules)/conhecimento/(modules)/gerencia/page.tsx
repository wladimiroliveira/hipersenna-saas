import { LibVideos, VideoListItem } from "@/app/ui/_components/module";
import { VideoListItemSkeleton } from "@/app/ui/_components/skeletons";
import { Suspense } from "react";

export default function Page(){
  return (
    <LibVideos

      title="Frente caixa"
    >
      <Suspense fallback={<VideoListItemSkeleton />}>
        <VideoListItem
          href="/mediavendas"
          title="Relatório de média de vendas"
          rotina="2020 - Relatórios"
          processo="1"
        />
      </Suspense>
      <Suspense fallback={<VideoListItemSkeleton />}>
        <VideoListItem
          href="/metas"
          title="Acompanhamento de metas"
          rotina="2021 - Metas"
          processo="2"
        />
      </Suspense>
    </LibVideos>
  );
}