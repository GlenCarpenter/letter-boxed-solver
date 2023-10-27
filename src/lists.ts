export function setupList(element: HTMLDivElement, list: string[], label: string, fallback: string): void {
  const div = document.createElement("div")
  div.classList.add("card")

  element.appendChild(div)

  const p = document.createElement("p")
  
  div.appendChild(p)
  if (list.length > 0) {
    p.innerHTML = label
    const ul = div.appendChild(document.createElement("ul"))
    for (let word of list) {
      const li = document.createElement("li")
      li.innerHTML = word + ": " + (word.length - 2)
      ul.appendChild(li)
    }
    return
  }
  p.innerHTML = fallback
}
