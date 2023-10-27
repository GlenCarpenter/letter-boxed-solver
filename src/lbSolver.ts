import Trie from "./trie"
type Letters = Array<Array<string>>

type FindByPrefix = {
    prefix: string, letters: Letters, currentSide: number, trie: Trie, words: string[]
}
const findWordsByPrefix = ({ prefix, letters, currentSide, trie, words }: FindByPrefix): string[] => {
    if (trie.search(prefix!)) {
        words.push(prefix!)
    }

    letters.forEach((el, i) => {
        if (i !== currentSide) {
            for (let letter of el) {
                const newPrefix = prefix + letter
                if (trie.startsWith(newPrefix)) {
                    findWordsByPrefix({ prefix: newPrefix, letters: letters, currentSide: i, trie: trie, words: words })
                }
            }
        }
    })

    return words
}

export const sortArrayByLength = (arr: string[]) => arr.sort(function (a: string, b: string) {
    return b.length - a.length
})

function onlyUnique(value: string, index: number, array: Array<string>) {
    return array.indexOf(value) === index
}

export const getWordsBySide = (trie: Trie, letters: Letters, currentSide: number): Array<string> => {
    const words: Array<string> = []

    letters[currentSide].forEach(letter => {
        const args = { prefix: letter, letters, trie, currentSide, words }
        const newWords = findWordsByPrefix(args)
        words.push(...newWords)
    })

    return sortArrayByLength(words.filter(onlyUnique))
}

export const getBinaryMask = (word: string): string => {
    let mask: string[] = []
    for(let m = 0; m < 26; m++){
        mask.push("0")
    }
    for (let i = 0; i < word.length; i++) {
        let idx = word.charCodeAt(i) - 97
        mask[25 - idx] = "1"
    }

    const maskString = mask.join("")

    return maskString
}

export const containsAllLetters = (
    letters: string[],
    wordA: string,
    wordB: string): boolean => {

    const lettersMask = parseInt(getBinaryMask(letters.join("")), 2)
    const maskA = parseInt(getBinaryMask(wordA), 2)
    const maskB = parseInt(getBinaryMask(wordB), 2)

    return (maskA | maskB) === lettersMask
}