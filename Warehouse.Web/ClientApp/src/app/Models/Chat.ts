import {MessageType, Room} from "./Room";

export interface Chat {
    id?: string;
    message: string;
    // type: MessageType
    timeStamp?: Date;
    userId: string;
    room: Room;
}
