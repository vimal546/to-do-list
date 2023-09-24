import React from 'react';
import Listitems from './Listitems';

const Content = ({ items, handleCheck, deleteItems }) => {

    return (
        <>
            {(items.length) ? (
                <Listitems
                    items={items}
                    handleCheck={handleCheck}
                    deleteItems={deleteItems}
                />
            ) : (
                <p className="empty" style={{textAlign:'center' ,marginTop:'3rem'}}>Your List is empty</p>
            )
            }
        </>
    )
}
export default Content