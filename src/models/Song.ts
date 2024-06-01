import { Genre } from './Genre'
import { Author } from './Author'
import { Performer } from './Performer'

export class Song {
    constructor(public id: number | unknown,
        public name: string,
        public lyrics: string,
        public lyricsID: string | unknown,
        public genre: Genre,
        public authors: Author[],
        public performers: Performer[]) { }
}