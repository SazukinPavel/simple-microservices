export default interface Log {
    level: string
    data: any
    stack: any
    context: any
    ts: number
}