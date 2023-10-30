import { setupList } from './lists.ts'
import { initTrie } from './init.ts'
import words from "word-list-json"
import { containsAllLetters, getBinaryMask, getWordsBySide, singleWordContainsAllLetters, sortArrayByLength } from './lbSolver.ts'


const trie = initTrie(words)

const form: HTMLFormElement = document.getElementById("letter-form") as HTMLFormElement
form?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault()
  e.stopPropagation()
  const cardContainer = document.querySelector<HTMLDivElement>('#list-cards')!
  cardContainer.innerHTML = ""

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

  const lettersMask: number = getBinaryMask(letters.flat().map(el => el ? el : "").join(""))
  const allWords: string[] = wordsBySide.flat()
  const singleWordResult: string[] = []
  const twoWordResult: string[] = []
  
  console.time("test")
  for (let k = 0; k < allWords.length - 1; k++) {
    if (singleWordContainsAllLetters(lettersMask, allWords[k])) {
      singleWordResult.push(allWords[k])
    }
    for (let j = k + 1; j < allWords.length; j++) {
      if (allWords[k][allWords[k].length - 1] === allWords[j][0]) {
        if (containsAllLetters(lettersMask, allWords[k], allWords[j])) {
          twoWordResult.push(allWords[k] + "-" + allWords[j])
        }
      }

      if (allWords[j][allWords[j].length - 1] === allWords[k][0]) {
        if (containsAllLetters(lettersMask, allWords[j], allWords[k])) {
          twoWordResult.push(allWords[j] + "-" + allWords[k])
        }
      }
    }
  }

  if (singleWordContainsAllLetters(lettersMask, allWords[allWords.length - 1])) {
    singleWordResult.push(allWords[allWords.length - 1])
  }
  console.timeEnd("test")


  setupList(cardContainer, sortArrayByLength(singleWordResult).reverse(), "Single word solutions", "No single word solutions found.")
  setupList(cardContainer, sortArrayByLength(twoWordResult).reverse(), "Two-word solutions", "No two-word solutions found.", 2)
  cardContainer.scrollIntoView({behavior: "smooth"});
})

// Autofocus logic
const top1: HTMLInputElement = document.getElementById("top-1") as HTMLInputElement
const top2: HTMLInputElement = document.getElementById("top-2") as HTMLInputElement
const top3: HTMLInputElement = document.getElementById("top-3") as HTMLInputElement

const left1: HTMLInputElement = document.getElementById("left-1") as HTMLInputElement
const left2: HTMLInputElement = document.getElementById("left-2") as HTMLInputElement
const left3: HTMLInputElement = document.getElementById("left-3") as HTMLInputElement

const right1: HTMLInputElement = document.getElementById("right-1") as HTMLInputElement
const right2: HTMLInputElement = document.getElementById("right-2") as HTMLInputElement
const right3: HTMLInputElement = document.getElementById("right-3") as HTMLInputElement

const bottom1: HTMLInputElement = document.getElementById("bottom-1") as HTMLInputElement
const bottom2: HTMLInputElement = document.getElementById("bottom-2") as HTMLInputElement
const bottom3: HTMLInputElement = document.getElementById("bottom-3") as HTMLInputElement

const submitButton: HTMLButtonElement = document.getElementById("submit-button") as HTMLButtonElement

const handleInput = (e: Event, focusElement: (HTMLInputElement | HTMLButtonElement | null)) => {

  if ((e as InputEvent)?.data) {
    (focusElement as HTMLInputElement)?.focus()
    focusElement !== submitButton && (focusElement as HTMLInputElement)?.select()
  }
}

top1?.addEventListener("input", (e) => handleInput(e, top2))
top2?.addEventListener("input", (e) => handleInput(e, top3))
top3?.addEventListener("input", (e) => handleInput(e, left1))

left1?.addEventListener("input", (e) => handleInput(e, left2))
left2?.addEventListener("input", (e) => handleInput(e, left3))
left3?.addEventListener("input", (e) => handleInput(e, right1))

right1?.addEventListener("input", (e) => handleInput(e, right2))
right2?.addEventListener("input", (e) => handleInput(e, right3))
right3?.addEventListener("input", (e) => handleInput(e, bottom1))

bottom1?.addEventListener("input", (e) => handleInput(e, bottom2))
bottom2?.addEventListener("input", (e) => handleInput(e, bottom3))
bottom3?.addEventListener("input", (e) => handleInput(e, submitButton))