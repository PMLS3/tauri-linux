
export function chunkArray(array: Array<any>, chunk_size: number) {
    var results : Array<Array<any>> = [];
    var count = 0
    var index = 0
    array.forEach((element) => {
        if(count === 0) {
            results[index] = []
        }

        results[index][count] = element
        count++

        if (count >= chunk_size) {
            index++
            count = 0
        } 
    })
    console.debug("Chunk Array results:  ")
    console.debug(results)
    return results;
}