import { Link } from 'react-router-dom'
import addIcon from '../assets/add.svg'



const AddButton = () => {
  return (
    <div className='floating-button'>
        <img src={addIcon} alt="+" />
    </div>
  )
}

export default AddButton
