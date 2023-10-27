export function setupList(element: HTMLUListElement, list: string[]) {
  for(let word of list){
    const li = document.createElement("li")
    li.innerHTML = word + ": " + (word.length - 1)
    element.appendChild(li)
  }
}
