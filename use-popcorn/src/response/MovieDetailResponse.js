import { z } from "zod";

const ratingSchema = z.object({
    Source: z.string(),
    Value: z.string(),
});

const movieDetailSchema = z.object({
    Title: z.string(),
    Year: z.string(),
    Rated: z.string(),
    Released: z.string(),
    Runtime: z.string(),
    Genre: z.string(),
    Director: z.string(),
    Writer: z.string(),
    Actors: z.string(),
    Plot: z.string(),
    Language: z.string(),
    Country: z.string(),
    Awards: z.string(),
    Poster: z.string().url(),
    Ratings: z.array(ratingSchema),
    Metascore: z.string(),
    imdbRating: z.string(),
    imdbVotes: z.string(),
    imdbID: z.string(),
    Type: z.string(),
    DVD: z.string(),
    BoxOffice: z.string().optional(), // Optional karena nilainya mungkin "N/A"
    Production: z.string().optional(), // Sama dengan atas
    Website: z.string().optional(), // Optional juga, bisa "N/A"
    Response: z.string(),
});

export default movieDetailSchema