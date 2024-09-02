import { NzMessageService } from "ng-zorro-antd/message";

export function createMessage(messageService: NzMessageService, type: string, message: string) {
    return messageService.create(type, message);
}