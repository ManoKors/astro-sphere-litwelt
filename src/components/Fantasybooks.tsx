import type { CollectionEntry } from "astro:content"
import { createEffect, createSignal, For } from "solid-js"
import ArrowCard from "@components/ArrowCard"
import { cn } from "@lib/utils"

type Props = {
  tags: string[]
  data: CollectionEntry<"fantasybooks">[]
}

export default function Fantasybooks({ data, tags }: Props) {
  const [filter, setFilter] = createSignal(new Set<string>())
  const [yearRange, setYearRange] = createSignal([2000, 2024])
  const [fantasybooks, setFantasybooks] = createSignal<CollectionEntry<"fantasybooks">[]>([])

  createEffect(() => {
    setFantasybooks(
      data.filter((entry) => {
        const tagsMatch = Array.from(filter()).every((value) => 
          entry.data.tags.some((tag: string) => 
            tag.toLowerCase() === String(value).toLowerCase()
          )
        )
        
        const year = entry.data.year // Assuming the year is stored in entry.data.year
        const [minYear, maxYear] = yearRange()
        const yearInRange = year >= minYear && year <= maxYear
        
        return tagsMatch && yearInRange
      })
    )
  })

  function toggleTag(tag: string) {
    setFilter((prev) => 
      new Set(prev.has(tag) 
        ? [...prev].filter((t) => t !== tag) 
        : [...prev, tag]
      )
    )
  }

  function handleYearChange(e: Event) {
    const target = e.target as HTMLInputElement
    const [minYear, maxYear] = target.value.split(',').map(Number)
    setYearRange([minYear, maxYear])
  }

  return (
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div class="col-span-3 sm:col-span-1">
        <div class="sticky top-24">
          <div class="text-sm font-semibold uppercase mb-2 text-black dark:text-white">Filter</div>
          <ul class="flex flex-wrap sm:flex-col gap-1.5">
            <For each={tags}>
              {(tag) => (
                <li>
                  <button onClick={() => toggleTag(tag)} class={cn("w-full px-2 py-1 rounded", "whitespace-nowrap overflow-hidden overflow-ellipsis", "flex gap-2 items-center", "bg-black/5 dark:bg-white/10", "hover:bg-black/10 hover:dark:bg-white/15", "transition-colors duration-300 ease-in-out", filter().has(tag) && "text-black dark:text-white")}>
                    <svg class={cn("size-5 fill-black/50 dark:fill-white/50", "transition-colors duration-300 ease-in-out", filter().has(tag) && "fill-black dark:fill-white")}>
                      <use href={`/ui.svg#square`} class={cn(!filter().has(tag) ? "block" : "hidden")} />
                      <use href={`/ui.svg#square-check`} class={cn(filter().has(tag) ? "block" : "hidden")} />
                    </svg>
                    {tag}
                  </button>
                </li>
              )}
            </For>
          </ul>
          <div class="mt-4">
            <div class="text-sm font-semibold uppercase mb-2 text-black dark:text-white">Year Range</div>
            <input 
              type="range" 
              min="1900" 
              max="2024" 
              step="1" 
              value={yearRange().join(',')} 
              onInput={handleYearChange}
              class="w-full"
            />
            <div class="flex justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{yearRange()[0]}</span>
              <span>{yearRange()[1]}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-3 sm:col-span-2">
        <div class="flex flex-col">
          <div class="text-sm uppercase mb-2">
            SHOWING {fantasybooks().length} OF {data.length} FANTASYBOOKS
          </div>
          <ul class="flex flex-col gap-3">
            {fantasybooks().map((project) => (
              <li>
                <ArrowCard entry={project} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
