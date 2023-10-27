export function setupList(element: HTMLDivElement, list: string[], label: string, fallback: string, offset: number = 0): void {
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
      li.innerHTML = word + ": " + (word.length - offset)
      ul.appendChild(li)
    }
    return
  }
  p.innerHTML = fallback
  
  const frownyFace = document.createElement("p")
  frownyFace.classList.add("big-sad")
  frownyFace.innerHTML = "☹️"
  div.appendChild(frownyFace)
}
