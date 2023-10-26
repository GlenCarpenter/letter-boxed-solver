import Trie from "./trie"

/*
 [
    ["r", "u", "d"], 
    ["n", "m", "g"], 
    ["f", "i", "o"], 
    ["a", "p", "l"],
]
*/
type Letters = Array<Array<string>>

/*
const getOtherSides = (letters: Letters, i: number): Letters => letters.filter((_, idx) => idx !== i)
const getOtherLetters = (letters: Letters, i: number): string[] => {
    const otherSides = getOtherSides(letters, i)
    return otherSides.flat(1)
}
*/

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

const sortArrayByLength = (arr: string[]) => arr.sort(function (a: string, b: string) {
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