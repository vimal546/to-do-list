import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { useRef } from 'react'

const Additems = ({newItem, setNewItem, handleSubmit}) => {
  const inputRef = useRef()
  return (
    <form className='addForm' onSubmit={handleSubmit}>
        <label htmlFor="Additems">Add items</label>
        <input 
            type="text"
            autoFocus
            ref={inputRef}
            id='addItem'
            autoComplete='off'
            placeholder='Add List Items'
            required
            value={newItem}
            onChange={(e)=> setNewItem(e.target.value)}
        />
        <button
            type='submit'
            aria-label='Add Item'
            onClick={()=> inputRef.current.focus()}
        >
            <FaPlus />
        </button>
    </form>
  )
}

export default Additems