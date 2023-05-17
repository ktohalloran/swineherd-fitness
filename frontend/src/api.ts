import axios from "axios";
import { Path } from "./models";

// TODO: add decoders to increase type safety

export async function fetchPath(): Promise<Path> {
    return new Promise((resolve, reject) => {
        axios
            .get("http://localhost:8000/api/path")
            .then((response) => response.data).then(resolve).catch(reject)
            .catch((error) => reject(`Unable to fetch active path: ${error}`))
    })
}