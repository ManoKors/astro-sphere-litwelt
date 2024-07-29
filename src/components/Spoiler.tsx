// Spoiler.tsx

import { createSignal, JSX } from "solid-js";

interface SpoilerProps {
  children: JSX.Element | JSX.Element[];
}

function Spoiler({ children }: SpoilerProps) {
  const [revealed, setRevealed] = createSignal(false);

  const toggleReveal = () => setRevealed(!revealed());

  return (
    <div class="flex flex-col gap-2 items-start">
      <button
        onClick={toggleReveal}
        class="px-3 py-1 border border-black/25 dark:border-white/25 hover:bg-black/5 dark:hover:bg-white/15"
      >
        {revealed() ? "Hide Spoiler" : "Show Spoiler"}
      </button>
      {revealed() && (
        <div class="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
          {children}
        </div>
      )}
    </div>
  );
}

export default Spoiler;
