import {z} from 'zod'

const searchResultItemSchema = z.object({
    Title: z.string(),
    Year: z.string(),
    imdbID: z.string(),
    Type: z.string(),
    Poster: z.string().url(),
});

const searchResponseScheme = z.object({
    Search: z.array(searchResultItemSchema),
    totalResults: z.string(),
    Response: z.string()
});

export default searchResponseScheme