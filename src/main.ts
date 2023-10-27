import { setupList } from './lists.ts'
import { initTrie } from './init.ts'
import wordsData from "./data/words_array.json"
import { containsAllLetters, getWordsBySide, sortArrayByLength } from './lbSolver.ts'

const { data } = wordsData as { data: string[] }

const trie = initTrie(data)

const form: HTMLFormElement = document.getElementById("letter-form") as HTMLFormElement
form?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault()
  e.stopPropagation()

  const formData = new FormData(form)
  const letters: (string | undefined)[][] = [
    [
      formData.get("top-1")?.toString().toLowerCase(),
      formData.get("top-2")?.toString().toLowerCase(),
      formData.get("top-3")?.toString().toLowerCase()
    ],
    [
      formData.get("right-1")?.toString().toLowerCase(),
      formData.get("right-2")?.toString().toLowerCase(),
      formData.get("right-3")?.toString().toLowerCase()
    ],
    [
      formData.get("bottom-1")?.toString().toLowerCase(),
      formData.get("bottom-2")?.toString().toLowerCase(),
      formData.get("bottom-3")?.toString().toLowerCase()
    ],
    [
      formData.get("left-1")?.toString().toLowerCase(),
      formData.get("left-2")?.toString().toLowerCase(),
      formData.get("left-3")?.toString().toLowerCase()
    ],
  ]

  for (let i = 0; i < letters.length; i++) {
    for (let j = 0; j < letters[i].length; j++) {
      if (!letters[i][j]) {
        alert("Missing letters")
        return
      }
    }
  }

  const wordsBySide: string[][] = []

  letters.forEach((_, i) => {
    const words = getWordsBySide(trie, letters as string[][], i)
    wordsBySide.push(words)
  })

  const allLetters: string[] = letters.flat().map(el => el ? el : "")
  const allWords: string[] = wordsBySide.flat()
  const result: string[] = []

  for (let k = 0; k < allWords.length - 1; k++) {
    for (let j = k + 1; j < allWords.length; j++) {
      if (allWords[k][allWords[k].length - 1] === allWords[j][0]) {
        if (containsAllLetters(allLetters, allWords[k], allWords[j])) {
          result.push(allWords[k] + "-" + allWords[j])
        }
      }

      if (allWords[j][allWords[j].length - 1] === allWords[k][0]) {
        if (containsAllLetters(allLetters, allWords[j], allWords[k])) {
          result.push(allWords[j] + "-" + allWords[k])
        }
      }
    }
  }

  setupList(document.querySelector<HTMLUListElement>('#list-0')!, sortArrayByLength(result).reverse())

})

// Autofocus logic
const top1 = document.getElementById("top-1")
const top2 = document.getElementById("top-2")
const top3 = document.getElementById("top-3")

const left1 = document.getElementById("left-1")
const left2 = document.getElementById("left-2")
const left3 = document.getElementById("left-3")

const right1 = document.getElementById("right-1")
const right2 = document.getElementById("right-2")
const right3 = document.getElementById("right-3")

const bottom1 = document.getElementById("bottom-1")
const bottom2 = document.getElementById("bottom-2")
const bottom3 = document.getElementById("bottom-3")

const submitButton = document.getElementById("submit-button")

top1?.addEventListener("input", () => top2?.focus())
top2?.addEventListener("input", () => top3?.focus())
top3?.addEventListener("input", () => left1?.focus())

left1?.addEventListener("input", () => left2?.focus())
left2?.addEventListener("input", () => left3?.focus())
left3?.addEventListener("input", () => right1?.focus())

right1?.addEventListener("input", () => right2?.focus())
right2?.addEventListener("input", () => right3?.focus())
right3?.addEventListener("input", () => bottom1?.focus())

bottom1?.addEventListener("input", () => bottom2?.focus())
bottom2?.addEventListener("input", () => bottom3?.focus())
bottom3?.addEventListener("input", () => submitButton?.focus())