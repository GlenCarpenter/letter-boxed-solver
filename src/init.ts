import wordsData from "./data/words_array.json"
import Trie from "./trie"

export function initTrie(words: string[]): Trie {

    
    const trie = new Trie()
    
    trie.insertArray(words)
    /*
        const { data } = wordsData as { data: string[] }
        const letters: Array<string[]> = [
            ["r", "u", "d"], ["n", "m", "g"], ["f", "i", "o"], ["a", "p", "l"],
        ]
        for (let i = 0; i < letters.length; i++) {
            for (let j = 0; j < letters[i].length; j++) {
                const current = letters[i][j]
    
            }
        }
    */
    return trie
}
