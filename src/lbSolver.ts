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

const maskMap: { [key: string]: number } = {}
const baseMask: string[] = []
for (let m = 0; m < 26; m++) {
    baseMask.push("0")
}

export const getBinaryMask = (word: string): number => {
    if (maskMap[word]) {
        return maskMap[word]
    }
    let mask = 0
    for (let i = 0; i < word.length; i++) {
        mask |= (1 << (word.charCodeAt(i) - 97))
    }

    maskMap[word] = mask
    return mask
}

export const singleWordContainsAllLetters = (
    lettersMask: number,
    wordA: string): boolean => {

    const maskA = getBinaryMask(wordA)

    return maskA === lettersMask
}

export const containsAllLetters = (
    lettersMask: number,
    wordA: string,
    wordB: string): boolean => {

    const maskA = getBinaryMask(wordA)
    const maskB = getBinaryMask(wordB)

    return (maskA | maskB) === lettersMask
}