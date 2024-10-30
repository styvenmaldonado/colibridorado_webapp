import type { CostEventInterface } from "./CostEventInterface";

export interface EventInteface {
  id?: string;
  name?: string;
  location_link?: string;
  location?: string;
  datetime_start?: string;
  datetime_end?: string;
  description?: string;
  photos: string[];
  cancelPolicy?: string;
  cost: CostEventInterface[] | undefined;
  cost_interview: CostEventInterface[] | undefined;
  type?: string;
  percent_advance_payment?: number;
  instruction?: {
    instructions:string,
    recommendations:string
  }
}
