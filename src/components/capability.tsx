import { capabilities } from "@/content/work";

export function Capability() {
  return (
    <ul>
      {capabilities.map((capability) => (
        <li
          key={capability.no}
          className="group grid grid-cols-1 gap-x-8 gap-y-3 border-t border-ink py-6 last:border-b lg:grid-cols-12 lg:py-8"
        >
          <span className="meta transition-colors duration-300 group-hover:text-signal lg:col-span-1">
            {capability.no}
          </span>
          <h3 className="font-sans text-[26px] font-extrabold uppercase leading-none tracking-[-0.01em] lg:col-span-3 lg:text-[30px]">
            {capability.name}
          </h3>
          <p className="max-w-[58ch] font-serif text-[15.5px] leading-[1.6] lg:col-span-6">
            {capability.body}
          </p>
          <p className="meta self-start lg:col-span-2 lg:self-end lg:text-right">
            {capability.tools}
          </p>
        </li>
      ))}
    </ul>
  );
}
