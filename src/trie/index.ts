import TrieNode from "./TrieNode"

class Trie {
    public root: any
    public constructor() {
        this.root = new TrieNode()
    }

    insert(word: string): void {
        let node = this.root
        for (let char of word) {
            if (!node.children.has(char)) {
                node.children.set(char, new TrieNode())
            }
            node = node.children.get(char)
        }
        node.isEndOfWord = true
    }

    insertArray(words: string[]): void {
        for (let word of words) {
            this.insert(word)
        }
    }

    search(word: string): boolean {
        let node = this.root
        for (let char of word) {
            if (!node.children.has(char)) {
                return false
            }
            node = node.children.get(char)
        }
        return node.isEndOfWord
    }

    startsWith(prefix: string): boolean {
        let node = this.root
        for (let char of prefix) {
            if (!node.children.has(char)) {
                return false
            }
            node = node.children.get(char)
        }
        return true
    }
}

export default Trie