"use client";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { HiChevronDown, HiCheck } from "react-icons/hi";
import { useState } from "react";

type Client = {
  id: number;
  name: string;
};

export default function ListboxMenu({ clients }: { clients: Client[] }) {
  const [selectedClient, setSelectedClient] = useState<Client>()

  const handleChange = (client: Client) => {
    setSelectedClient(client);
    //router.push(`/clients/${client.id}`);
  };

  return (
    <Listbox value={selectedClient} onChange={handleChange}>
      <div className="relative">
        <ListboxButton
          className="
            group
            inline-flex
            items-center
            gap-2
            rounded-md
            border
            border-[#D8D6A0]
            bg-[#F6F5F2]
            px-5
            py-2.5
            text-[13px]
            font-semibold
            tracking-wide
            text-[#4A4A4A]
            shadow-sm
            transition-all
            duration-200
            hover:border-[#B3AF2B]
            hover:bg-[#B3AF2B]
            hover:text-white
            hover:shadow-md
            focus:outline-none
            focus:ring-1
            focus:ring-[#B3AF2B]
            focus:ring-offset-1
          "
        >
          {selectedClient?.name ?? "Clientes"}

          <HiChevronDown
            className="
              h-4
              w-4
              shrink-0
              transition-transform
              duration-200
              group-data-open:rotate-180
            "
          />
        </ListboxButton>

        <ListboxOptions
          anchor="bottom"
          className="
            overflow-y-auto
            z-50
            mt-2
            w-52
            h-[300px]
            rounded-lg
            border
            border-[#E5E3C4]
            bg-white
            p-1.5
            shadow-lg
            shadow-black/10
            outline-none
          "
        >
          {clients.map((client) => (
            <ListboxOption
              key={client.id}
              value={client}
              className="
                group
                flex
                cursor-pointer
                items-center
                justify-between
                rounded-md
                px-3
                py-2
                text-[13px]
                font-medium
                text-[#4A4A4A]
                outline-none
                transition-colors
                duration-150
                data-focus:bg-[#F3F2D8]
                data-focus:text-[#6F6B17]
              "
            >
              <span>{client.name}</span>

              <HiCheck
                className="
                  invisible
                  h-4
                  w-4
                  text-[#6F6B17]
                  group-data-selected:visible
                "
              />
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}