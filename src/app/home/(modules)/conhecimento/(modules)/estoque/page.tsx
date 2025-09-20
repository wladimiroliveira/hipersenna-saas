'use client'

import { LibVideos, VideoListItem } from "@/app/ui/_components/module";
import { VideoListItemSkeleton } from "@/app/ui/_components/skeletons";
import { Suspense } from "react";
import { usePathname } from "next/navigation";

export default function Page(){
  return (
    <LibVideos

      title="Frente caixa"
    >
      <Suspense fallback={<VideoListItemSkeleton />}>
        <VideoListItem
          href="/recebermercadoria"
          title="Recebimento de mercadorias"
          rotina="WinThor - RF"
          processo="1"
        />
      </Suspense>
      <Suspense fallback={<VideoListItemSkeleton />}>
        <VideoListItem
          href="/organizarestoque"
          title="Organização do Estoque"
          rotina="WinThor - RF"
          processo="2"
        />
      </Suspense>
    </LibVideos>
  );
}