import Link from "next/link";

export function ModulesContainer({ modules, title, userRole, userPermissions }) {
  return (
    <div className="bg-gray-200 p-8 rounded-2xl mb-[200px] m-auto">
      <h2 className="text-center text-4xl font-semibold text-primaria mt-4 mb-10">{title}</h2>
      <div className="flex flex-wrap justify-center gap-8">
        {modules.map((module) => {
          if (module.roles.length > 1 && module.permissions.length > 1) {
            if (module?.roles.includes(userRole)) {
              return (
                <Module
                  title={module.name}
                  text={module.description}
                  buttonText={module.buttonText}
                  href={module.path}
                  key={module.id}
                />
              );
            }
          } else {
            return (
              <Module
                title={module.name}
                text={module.description}
                buttonText={module.buttonText}
                href={module.path}
                key={module.id}
              />
            );
          }
        })}
      </div>
    </div>
  );
}

export function Module({ title, text, buttonText, href }) {
  return (
    <div className="flex flex-col justify-between w-[252px] h-[278px] text-center bg-secundaria p-4 rounded-2xl">
      <div>
        <h3 className="uppercase text-2xl font-semibold text-primaria mb-2">{title}</h3>
        <p className="w-[180px] m-auto font-light text-primaria">{text}</p>
      </div>
      <Link
        href={href}
        className="bg-primaria p-2 rounded-md text-lg text-secundaria font-semibold uppercase transition-colors hover:bg-hover-primaria"
      >
        {buttonText}
      </Link>
    </div>
  );
}
