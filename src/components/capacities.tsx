import { capacities } from "@/content/work";

/**
 * Three statements about what I would be handed, each next to the work that
 * proves it.
 *
 * This replaced a keyword list, and the difference is the point: a list of nouns
 * answers "what does he know", which is not the question a hiring manager is
 * holding. The question is what they would hand over in week one, and a claim
 * with no proof beside it is the thing that reads as filler.
 */
export function Capacities() {
  return (
    <ul>
      {capacities.map((item) => (
        <li
          key={item.no}
          className="grid grid-cols-1 gap-x-10 gap-y-3 border-b border-rule py-7 lg:grid-cols-12"
        >
          <div className="flex items-baseline gap-4 lg:col-span-4">
            <span className="meta">{item.no}</span>
            <h3 className="font-sans text-[19px] font-extrabold uppercase leading-tight tracking-tight lg:text-[21px]">
              {item.name}
            </h3>
          </div>

          <div className="min-w-0 lg:col-span-7">
            <p className="max-w-[64ch] font-serif text-[15.5px] leading-[1.7] text-ink/85">
              {item.body}
            </p>
            <p className="meta mt-3">
              <span className="text-signal" aria-hidden>
                ▸
              </span>{" "}
              {item.proof}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
