export interface PaymentsInterface {
    paymentId: string,
    status: string,
    name: string,
    response_id: string,
    method: string,
    datetime:string,
    attachment: string,
    info: {},
    value: number,
    userId: number,
    eventUsersId: number,
}