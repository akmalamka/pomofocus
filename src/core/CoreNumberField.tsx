import { NumberField } from '@base-ui-components/react/number-field'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import * as React from 'react'

export default function CoreNumberField({ value, onValueChange }: { value: number | null, onValueChange: (value: number | null) => void }) {
  const id = React.useId()
  return (
    <NumberField.Root id={id} className="flex flex-col items-start gap-[0.25rem]" value={value} onValueChange={onValueChange} min={0} max={60} step={1}>
      {/* TODO: put color in theme */}
      <NumberField.Group className="flex">
        <NumberField.Decrement className="box-border flex items-center justify-center w-10 h-10 m-0 p-0 outline-0 border border-gray-200 rounded-md bg-[#94182C] select-none hover:bg-[#67101E] active:bg-[#67101E]/90">
          <RemoveIcon color="white" />
        </NumberField.Decrement>
        <NumberField.Input className="box-border m-0 p-0 border-t border-b border-gray-200 border-x-0 w-24 h-10 text-center font-normal text-base text-gray-900 bg-transparent font-inherit [font-variant-numeric:tabular-nums] focus:z-10 focus:outline-2 focus:outline-blue-500 focus:-outline-offset-1" />
        <NumberField.Increment className="box-border flex items-center justify-center w-10 h-10 m-0 p-0 outline-0 border border-gray-200 rounded-md bg-[#94182C] select-none hover:bg-[#67101E] active:bg-[#67101E]/90">
          <AddIcon color="white" />
        </NumberField.Increment>
      </NumberField.Group>
    </NumberField.Root>
  )
}
