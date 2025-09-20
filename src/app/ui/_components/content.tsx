import { Info } from "@/lib/types";

export function Content(
  {
    title,
    url,
    info,    
  }: {
    title: string,
    url: string,
    info: Info[],
  }
){
  return (
    <div className="flex flex-col items-center gap-8 pt-8 pb-8 p-4 m-auto max-w-[1200px]">
      <div>
        <h1 className="text-xl uppercase font-bold tracking-widest text-secundaria md:text-2xl">{title}</h1>
      </div>
      <div className="relative w-full max-w-[660px] aspect-video">
        <iframe
          width="100%"
          height="100%"
          className="rounded-xl border-1 antialiased"
          src={url}
          title={title}
          frameBorder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          referrerPolicy="strict-origin-when-cross-origin" 
          allowFullScreen
        ></iframe>
      </div>
      <div className="w-full">
        {
          info.map((data, idx) => (
            <div key={idx} className="flex flex-col gap-4 pl-4 pr-4">
              <h2 className="text-xl font-bold text-secundaria md:text-2xl">{data.title}</h2>
              <p className="text-quintenaria">{data.desc}</p>
            </div>
          ))
        }
      </div>
    </div>
  );
}