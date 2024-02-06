
// Represents main command comming from kurvey agent
interface WSCommand {
    cmd: string;
    data: string;
}

interface WSActionCommand {
    title?: string;
    message: string;
}

export type { WSCommand, WSActionCommand };