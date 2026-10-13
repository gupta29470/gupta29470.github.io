import { skills } from "@/content/work";

/**
 * The vocabulary, in one block, under the three statements.
 *
 * The capabilities above are arguments; this is the index to them — the nouns
 * a reader wants to scan for, kept separate so neither has to carry the other's
 * job. It sits last because a list of tools is the least interesting thing on
 * the page, and it is deliberately flat: five rows, no prose, every term also
 * present in a project's `tech` list.
 */
export function Skills() {
  return (
    <dl className="mt-10 border-t border-rule pt-2">
      {skills.map((row) => (
        <div
          key={row.group}
          className="grid grid-cols-1 gap-x-10 gap-y-1 border-b border-rule py-3 lg:grid-cols-12"
        >
          <dt className="meta lg:col-span-3">{row.group}</dt>
          <dd className="min-w-0 font-serif text-[15px] leading-[1.6] text-ink/80 lg:col-span-9">
            {row.items}
          </dd>
        </div>
      ))}
    </dl>
  );
}
