export class Message{
    constructor(
        public _id: string,
        public text: string,
        public viewed: boolean,
        public created_at: Date,
        public emitter: string,
        public receiver: string,
    ){}
}