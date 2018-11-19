//this is the model for the highlights users log
export class Diary {
    key: string;
    text: string;//content
    year: null;
    month: null;
    day: null;
    hasimage: boolean = false;
    image: string;
}

//this is the model for their every day mood
export class Mood {
    key: string;
    type: string;//happy, sad, medium
    year: null;
    month: null;
    day: null;
}
