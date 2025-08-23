'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import * as React from 'react'
import { forwardRef } from 'react'

import { Button } from '@/src/shared/ui/button'
import { Calendar } from '@/src/shared/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/src/shared/ui/popover'

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
}

const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  ({ value, onChange }, ref) => {
    const [date, setDate] = React.useState<Date | undefined>(value)

    const handleSelect = (selectedDate: Date | undefined) => {
      setDate(selectedDate)
      onChange?.(selectedDate)
    }

    React.useEffect(() => {
      if (value !== date) {
        setDate(value)
      }
    }, [value])

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            type="button"
            variant="outline"
            data-empty={!date}
            className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, 'yyyy.MM.dd') : <span>날짜 선택</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto border-gray-200 p-0" align="end">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    )
  }
)

DatePicker.displayName = 'DatePicker'

export { DatePicker }
