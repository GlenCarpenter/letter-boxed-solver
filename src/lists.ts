export function setupList(element: HTMLUListElement, list: string[]): void {
  element.innerHTML = ""
  if (list.length > 0) {
    for (let word of list) {
      const li = document.createElement("li")
      li.innerHTML = word + ": " + (word.length - 2)
      element.appendChild(li)
    }
    return
  }
  element.innerHTML = "No two-word solutions found."
}
