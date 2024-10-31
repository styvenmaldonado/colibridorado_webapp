import type { EventInteface } from "./EventsInterface"
import type { UsersInterface } from "./UsersInterface"

export interface EventsUserInterface {
    id?: string,
    eventUsersId?: string,
    eventId: string,
    needs_transport: boolean,
    available_seats:boolean,
    available_seats_number: number,
    userId: string
    medicalPreincription: string,
    rol:string
    user?:UsersInterface
    events?:EventInteface
}