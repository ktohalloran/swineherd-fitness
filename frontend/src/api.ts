import axios from "axios";
import { Path } from "./models";

// TODO: add decoders to increase type safety

export async function fetchPath(): Promise<Path> {
    console.log("I AM RUNNING")
    return new Promise((resolve, reject) => {
        console.log("I AM ALSO RUNNING")
        axios
            .get("http://localhost:8000/api/path")
            .then((response) => resolve(response.data)).catch(reject)
            .catch(error => reject(new Error(`Unable to fetch active path: ${error}`)))
    })
}