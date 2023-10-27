import Trie from "./trie"

export function initTrie(words: string[]): Trie {
    const trie = new Trie()

    trie.insertArray(words)
    return trie
}
