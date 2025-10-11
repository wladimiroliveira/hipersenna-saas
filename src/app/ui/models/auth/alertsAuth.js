import { cn } from "@/lib/utils";

export function AlertAuth({ response, message }) {
  if (response === 200) {
    return (
      <div className="relative w-full rounded-lg border border-[#A6E19D] px-4 py-3 text-sm has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current">
        <h2 className={cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight")}>Sucesso!</h2>
        <p
          className={cn(
            "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
          )}
        >
          {message}
        </p>
      </div>
    );
  } else if (response >= 400 || response < 500) {
    return (
      <div className="relative w-full rounded-lg border border-[#e1bc9d] px-4 py-3 text-sm has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current">
        <h2 className={cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight")}>Atenção!</h2>
        <p
          className={cn(
            "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
          )}
        >
          {message}
        </p>
      </div>
    );
  } else if (response >= 500) {
    return (
      <div className="relative w-full rounded-lg border border-[#e19d9d] px-4 py-3 text-sm has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current">
        <h2 className={cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight")}>Erro!</h2>
        <p
          className={cn(
            "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
          )}
        >
          {message}
        </p>
      </div>
    );
  }
}
