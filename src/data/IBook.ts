export interface IBook {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description: string;
    industryIdentifiers: { type: string; identifier: string; }[]
    readingModes: { text: boolean; image: boolean; }
    pageCount: number;
    printType: string;
    categories: string[];
    averageRating: number;
    ratingsCount: number;
    maturityRating: string;
    allowAnonLogging: true
    contentVersion: string;
    panelizationSummary: { containsEpubBubbles: boolean; containsImageBubbles: boolean; }
    imageLinks: { smallThumbnail: string; thumbnail: string; }
    language: string;
    previewLink: string;
    infoLink: string;
    canonicalVolumeLink: string;
    id: string;
    shelf: Shelf;
}

export enum Shelf {
    CurrentlyReading = "currentlyReading",
    WantToRead = "wantToRead",
    Read = "read",
    None = "none"
}