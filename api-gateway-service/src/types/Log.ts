export default interface Log {
    level: string
    data: any
    context: any
    ts?: number
    stack: any
}