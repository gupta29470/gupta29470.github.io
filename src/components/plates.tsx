/**
 * Project plates.
 *
 * These are drawn, not photographed. A portfolio that shows fabricated
 * screenshots of its own projects is worse than one that shows nothing, so each
 * plate is a schematic of the system as described in `content/work.ts`: the
 * boxes are components that exist and the arrows are the paths data actually
 * takes. The single red element on each plate marks the thing that made the
 * project worth building.
 *
 * Both share one drawing language: hairline rules, mono labels, 1120 wide.
 */

import type { PlateName } from "@/content/work";
import { CodewalkArchitecture } from "./codewalk-architecture";
import { VoiceFlowArchitecture } from "./voiceflow-architecture";

/**
 * A plate is drawn at a fixed readable width and panned horizontally inside its
 * own frame. Scaling a schematic down to phone width makes every label
 * illegible, and letting it size to the viewport pushes the page sideways.
 */
const FRAME = "w-full overflow-x-auto";

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`${FRAME} ${className ?? ""}`}>
      <div className="w-[600px] sm:w-[720px]">{children}</div>
    </div>
  );
}

/**
 * A dense, wide drawing needs a much larger frame than a simple one. At a
 * portrait aspect the diagram fits the sheet's width and is read by scrolling
 * the page; at 1780 x 1265 it is small enough that squeezing it into the sheet
 * would make every label unreadable. The frame is what decides that, so it is a
 * property of the plate.
 */
function WideFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="w-[1240px] lg:w-[1500px]">{children}</div>
    </div>
  );
}

export const plates: Record<
  PlateName,
  React.ComponentType<{ className?: string; compact?: boolean }>
> = {
  // Both plates are platform architecture diagrams drawn for their own repo.
  // The earlier hand-drawn schematics are in the git history.
  codewalk: CodewalkArchitecture,
  "voice-flow": VoiceFlowArchitecture,
};

const WIDE: PlateName[] = ["codewalk", "voice-flow"];

/**
 * Whether this plate is worth showing as a hover thumbnail. A dense drawing
 * scaled into a 19rem box is a grey smudge: it says "there is a diagram" and
 * nothing else. Plates that need the wide frame are read in the sheet instead.
 */
export function hasThumbnail(name: PlateName): boolean {
  return !WIDE.includes(name);
}

export function Plate({
  name,
  className,
  variant = "full",
}: {
  name: PlateName;
  className?: string;
  /** `compact` drops the pannable frame and scales the whole plate to fit. */
  variant?: "full" | "compact";
}) {
  const Render = plates[name];

  if (variant === "compact") {
    // A preview is a signpost, not a reading surface: scale the drawing to the
    // box rather than holding a readable width and spilling past the page.
    return (
      <div className={`overflow-hidden ${className ?? ""}`}>
        <Render compact />
      </div>
    );
  }

  return WIDE.includes(name) ? (
    <WideFrame>
      <Render />
    </WideFrame>
  ) : (
    <Frame className={className}>
      <Render />
    </Frame>
  );
}
