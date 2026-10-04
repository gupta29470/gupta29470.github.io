import { skills } from "@/content/work";

export function Skills() {
  return (
    <ul>
      {skills.map((group) => (
        <li
          key={group.no}
          className="grid grid-cols-1 gap-x-10 gap-y-3 border-b border-rule py-6 lg:grid-cols-12"
        >
          <div className="flex items-baseline gap-4 lg:col-span-4">
            <span className="meta">{group.no}</span>
            <h3 className="font-sans text-[19px] font-extrabold uppercase leading-tight tracking-tight lg:text-[21px]">
              {group.name}
            </h3>
          </div>
          <p className="min-w-0 max-w-[70ch] font-serif text-[15.5px] leading-[1.7] text-ink/85 lg:col-span-7">
            {group.items}
          </p>
        </li>
      ))}
    </ul>
  );
}

