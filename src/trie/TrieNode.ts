class TrieNode {
    public children: any
    public isEndOfWord: boolean
    public constructor() {
        this.children = new Map()
        this.isEndOfWord = false
    }
}

export default TrieNode
