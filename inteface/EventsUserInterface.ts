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
}