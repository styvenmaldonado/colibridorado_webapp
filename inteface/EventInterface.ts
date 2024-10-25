import type { CostEventInterface } from "./CostEventInterface"

export interface EventInteface{
    name?: string,
    location?: string
    datetime_start?: string
    datetime_end?: string
    description?: string
    photos: string[]
    cancelPolicy?: string
    cost: CostEventInterface[] | undefined
    type?: string
    percent_advance_payment?: number
  }