import React from 'react'
import Lineitems from './Lineitems';
const Listitems = ({ items, handleCheck, deleteItems }) => {
    return (
        <ul>
            {items.map((item) => (
                <Lineitems
                    item={item}
                    key={item.id}
                    handleCheck={handleCheck}
                    deleteItems={deleteItems}
                />
            ))}
        </ul>
    )
}

export default Listitems