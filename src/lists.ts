export function setupList(element: HTMLUListElement, list: string[]) {
  for(let word of list){
    const li = document.createElement("li")
    li.innerHTML = word
    element.appendChild(li)
  }
}
