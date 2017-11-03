export class Bill {
    day: Number;
    username: String;
    title: String;
    type: String;
    value: Number;
    constructor(day, username, title, type, value) {
        this.day = day;
        this.username = username;
        this.title = title;
        this.type = type;
        this.value = value;
    }
}