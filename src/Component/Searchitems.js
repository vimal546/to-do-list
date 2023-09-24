import React from 'react'

const Searchitems = ({search, setSearch}) => {
  return (
    <form className='searchForm' onSubmit={(e)=>(e.preventDefault())}>
        <label htmlFor="search">Search</label>
        <input 
            type="text" 
            role='searchbox' 
            id="search" 
            autoComplete='off'
            placeholder='Search Items'
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
        />
    </form>
  )
}

export default Searchitems