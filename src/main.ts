import './style.css'
import typescriptLogo from './typescript.svg'
import viteLogo from '/vite.svg'
import { setupList } from './lists.ts'
import { initTrie } from './init.ts'
import wordsData from "./data/words_array.json"
import dictionaryData from "./data/dictionary.json"
import { getWordsBySide } from './lbSolver.ts'


const letters: Array<string[]> = [
  ["i", "o", "u"], ["n", "m", "k"], ["s", "a", "l"], ["t", "c", "r"],
]

const { data } = wordsData as { data: string[] }
const { dictionary } = dictionaryData as { dictionary: string[] }

const lowerDictionary = dictionary.map(el => el.toLowerCase())
const trie = initTrie(lowerDictionary)


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card-container">
      <div class="card">
        <ul id="list-0"></ul>
      </div>
      <div class="card">
        <ul id="list-1"></ul>
      </div>
      <div class="card">
        <ul id="list-2"></ul>
      </div>
      <div class="card">
        <ul id="list-3"></ul>
      </div>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

letters.forEach((_, i) => {
  const words = getWordsBySide(trie, letters, i)
  setupList(document.querySelector<HTMLUListElement>('#list-' + i.toString())!, words)
})