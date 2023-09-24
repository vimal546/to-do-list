import React from 'react'
import { FaTrashAlt } from 'react-icons/fa';

const Lineitems = ({item,handleCheck,deleteItems}) => {
    return (
        <li className='item' key={item.id}>
            <input
                onChange={() => handleCheck(item.id)}
                type="checkbox"
                checked={item.checked}
            />
            <label
                style={(item.checked) ? { textDecoration: "line-through" } : null}
                onDoubleClick={() => handleCheck(item.id)}> {item.item}</label>
            <FaTrashAlt
                role='button'
                tabIndex="0"
                onClick={() => deleteItems(item.id)}
                aria-label={`Delete ${item.item}`}
            />
        </li>
    )
}

export default Lineitems