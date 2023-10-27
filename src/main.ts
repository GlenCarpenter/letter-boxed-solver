import './style.css'
import { setupList } from './lists.ts'
import { initTrie } from './init.ts'
import wordsData from "./data/words_array.json"
import { containsAllLetters, getWordsBySide, sortArrayByLength } from './lbSolver.ts'


const { data } = wordsData as { data: string[] }

const trie = initTrie(data)

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <img src="/public/lb-favicon.ico">
    <h1>Letter Boxed Solver</h1>
    <div>
      <form id="letter-form">
        <formfield>
          <legend>Top</legend>
          <div class="row">
            <input maxlength=1 required type="text" name="top-1"></input>
            <input maxlength=1 required type="text" name="top-2"></input>
            <input maxlength=1 required type="text" name="top-3"></input>
          </div>
        </formfield>
        <formfield>
          <legend>Left</legend>
          <div class="row">
            <input maxlength=1 required type="text" name="left-1"></input>
            <input maxlength=1 required type="text" name="left-2"></input>
            <input maxlength=1 required type="text" name="left-3"></input>
          </div>
        </formfield>
        <formfield>
          <legend>Right</legend>
          <div class="row">
            <input maxlength=1 required type="text" name="right-1"></input>
            <input maxlength=1 required type="text" name="right-2"></input>
            <input maxlength=1 required type="text" name="right-3"></input>
          </div>
        </formfield>
        <formfield>
          <legend>Bottom</legend>
          <div class="row">
            <input maxlength=1 required type="text" name="bottom-1"></input>
            <input maxlength=1 required type="text" name="bottom-2"></input>
            <input maxlength=1 required type="text" name="bottom-3"></input>
          </div>
        </formfield>
        <button type="submit">Submit</button>
      </form>
    </div>
    <div class="card-container">
      <div class="card">
        <ul id="list-0"></ul>
      </div>
    </div>
  </div>
`

const form: HTMLFormElement = document.getElementById("letter-form") as HTMLFormElement
form?.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault()
  e.stopPropagation()

  const formData = new FormData(form)
  const letters: (string | undefined)[][] = [
    [formData.get("top-1")?.toString().toLowerCase(),
    formData.get("top-2")?.toString().toLowerCase(),
    formData.get("top-3")?.toString().toLowerCase()
    ],
    [formData.get("right-1")?.toString().toLowerCase(),
    formData.get("right-2")?.toString().toLowerCase(),
    formData.get("right-3")?.toString().toLowerCase()
    ],
    [formData.get("bottom-1")?.toString().toLowerCase(),
    formData.get("bottom-2")?.toString().toLowerCase(),
    formData.get("bottom-3")?.toString().toLowerCase()
    ],
    [formData.get("left-1")?.toString().toLowerCase(),
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
