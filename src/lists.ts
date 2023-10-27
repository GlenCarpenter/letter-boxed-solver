export function setupList(element: HTMLUListElement, list: string[]) {
  element.innerHTML = ""
  for (let word of list) {
    const li = document.createElement("li")
    li.innerHTML = word + ": " + (word.length - 2)
    element.appendChild(li)
  }
}
