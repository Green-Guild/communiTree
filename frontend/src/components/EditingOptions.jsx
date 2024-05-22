import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import {
  ArchiveBoxXMarkIcon,
  ChevronDownIcon,
  PencilIcon,
  Square2StackIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'

function EditingOptions() {
  return (
    <div className="absalute right-1 flex">
      <Menu __demoMode>
        <MenuButton className=" items-center gap-2 rounded-md py-1.5 px-3 text-lg/6 font-semibold text-black">
          options
          <ChevronDownIcon className="size-4 fill-black/60" />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="w-52 origin-top-right rounded-xl"
          >
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                <PencilIcon className="size-4 fill-white/30" />
                Edit
                <kbd className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">⌘E</kbd>
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                <TrashIcon className="size-4 fill-white/30" />
                Delete
                <kbd className="ml-auto hidden font-sans text-xs text-black/50 group-data-[focus]:inline">⌘D</kbd>
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}

export default EditingOptions