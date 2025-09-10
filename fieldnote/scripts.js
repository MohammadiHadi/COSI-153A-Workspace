let count = 0;      // mutable variable
const pi = 3.14159; // cannot be reassigned
console.log(pi)
console.log(count)

function greet(name) {
  return "Hello " + name;
}
console.log(greet("Hadi"))


const greetArrow = (name) => {
    const greeting = `Hello ${name}`;
    console.log("Function is running...");
    return greeting;

}
console.log(greetArrow("World"));  // "Hello World"

const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
console.log(doubled)

// const heading = document.getElementById("notes");
// heading.textContent = "Hello JavaScript!";

// const div = document.createElement("div");
// div.textContent = "New content!";
// document.body.appendChild(div);


