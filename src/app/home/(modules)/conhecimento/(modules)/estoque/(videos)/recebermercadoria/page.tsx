import { Content } from "@/app/ui/_components/content";
import { ContentSkeleton } from "@/app/ui/_components/skeletons";
import { Suspense } from "react";

export default function Page(){
  return (
    <Suspense fallback={<ContentSkeleton />}>
      <Content
        title="Recebimento de Mercadorias"
        url="https://www.youtube.com/embed/1oDrJba2PSs?si=Wa4-s3mFsbruSM8n"
        info= {[
            {
              title: "Passos Importantes",
              desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt nemo, debitis consequatur, ipsa ab voluptatum corrupti quaerat unde, ratione ullam iusto facere pariatur est quidem perspiciatis obcaecati. Illo, dicta harum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Blanditiis numquam ex esse atque, quibusdam quis veritatis ipsam nisi amet dolorem molestiae quaerat qui inventore voluptas eius sequi mollitia suscipit molestias! Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas repellendus molestiae tempora quisquam esse! Aliquam, mollitia, ratione dolorem aspernatur dolores, veritatis laboriosam cumque itaque magnam deleniti nostrum molestias sapiente quibusdam."
            }
          ]}
      />
    </Suspense>
  );
}