import Addnote from './Addnote'
import Note from './Note'

function Home(props) {


  return (
    <>
      <Addnote showAlert={props.showAlert} />
      <Note showAlert={props.showAlert} />
    </>
  )
}

export default Home
