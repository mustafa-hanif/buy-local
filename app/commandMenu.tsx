"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { countries } from "@/lib/utils";

export function ComboboxDemo({ onChange }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} modal onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[420px] justify-between"
        >
          {value
            ? countries.find((country) => country.name.toLowerCase() === value)?.name
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[420px] p-0">
        
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandEmpty>No framework found.</CommandEmpty>
          <CommandGroup>
            <ScrollArea className="h-48">
            {countries.map((country) => (
              <CommandItem
                key={country.name}
                value={country.name}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue)
                  onChange(currentValue)
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === country.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {country.name}
              </CommandItem>
            ))}
            </ScrollArea>
          </CommandGroup>
        </Command>
        
      </PopoverContent>
    </Popover>
  )
}
