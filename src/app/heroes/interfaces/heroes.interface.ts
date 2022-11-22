export interface Heroe {
    id?:              string; //Colocamos id como opcional, ya que cuando creemos un nuevo heroe, puede que no tenga su id
    superhero:        string;
    publisher:        Publisher;
    alter_ego:        string;
    first_appearance: string;
    characters:       string;
    alt_img?:         string; // https://kasdfjaskdfajsdf.com/img.png --> Aqui quiero almacenar el path de la imagen que yo voy a establecer
}

export enum Publisher {
    DCComics = "DC Comics",
    MarvelComics = "Marvel Comics",
}
