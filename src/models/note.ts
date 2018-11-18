//this is the model for the happy things(dairies) users type in
export class Diary {
    key:string;
    text: string;//content
    timestamp = null;
    image: string;
}

//this is the model for their every day mood
export class Mood {
    key:string;
    type: string;//happy, sad, medium
    timestamp = null;
}
