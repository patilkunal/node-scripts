// Stacks 

function createStack() {
  const array = []
  
  return {
    push(item) {
      array.push(item)
    },
    pop() {
      return array.pop()
    },
    peek() {
      return array9array.length - 1]
    },
	//This is getter function and not to use length property
    get length() {
      return array.length
    },
    isEmpty() {
      return array.length == 0
    }
  }
}