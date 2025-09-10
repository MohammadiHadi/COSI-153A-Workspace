import { useState } from 'react'

function App() {
  const [notes, setNotes] = useState(
    [
      {
        title: "Trailhead observation", 
        body: "New signage at the kiosk."
      },
            {
        title: "Trailhead observation", 
        body: "New signage at the kiosk."
      },
            {
        title: "Trailhead observation", 
        body: "New signage at the kiosk."
      }
    ]
  )
const passingProps = (n)=>(<NoteCard {...n} />)
  return (
    <>
        
        {notes.map(passingProps)}
    
    </>
  )
}

// function NoteCard(props) {
//   return (
//     <>    
//         <h1>{props.title}</h1>
//         <p>{props.body}</p>

//     </>
//   );
// }
function NoteCard({title, body}) {
  return (
    <>    
        <h1>{title}</h1>
        <p>{body}</p>
    </>
  );
}

export default App
