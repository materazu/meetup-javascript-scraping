const body = $("body")
const input = body.find("input")

console.log(input)

input[2].value = "a"
input[3].click()

const body = $("body")
const cite = body.find("cite")

console.log(cite)

const url = []
for (let i = 0; i < cite.length; i++) {
  url.push(cite[i].innerHTML)
}

console.log(url)