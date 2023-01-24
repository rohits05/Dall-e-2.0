import {surpriseMePrompts} from '../constants';
import FileSaver from 'file-saver';
export function getRandomPrompt(prompt) {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length); // get a random index
    const randomPrompt = surpriseMePrompts[randomIndex]; // get the prompt at that index

    if(randomIndex === prompt) { // if the random prompt is the same as the previous prompt, get a new one
        return getRandomPrompt(prompt);
    }

    return randomPrompt;
}

// Saving images to the user's computer
export async function downloadImage(_id, photo) {
    FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
