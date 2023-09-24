import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";
import '../index.css';
import { useEffect, useState } from 'react';
import Additems from"./Additems";
import Searchitems from "./Searchitems";
import Apirequest from "./Apirequest";


function App () {
    // const [items, setItems] = useState(
    //     // [
    //     //     {
    //     //         id: 1,
    //     //         checked: false,
    //     //         item: "___Finish Your All List___"
    //     //     },
    //     // ] ,
    //     JSON.parse(localStorage.getItem('todo_list')) || []);
        
    const [items, setItems] = useState(
        // [
        //     {
        //         id: 1,
        //         checked: false,
        //         item: "___Finish Your All List___"
        //     },
        // ] ,
         []);
    // useEffect(()=>{JSON.parse(localStorage.getItem('todo_list'))} , [items])
    const [fetchError, setFetchError] = useState(null)
    const[isLoading, setIsLoading] = useState(true)
    const API_URL = 'http://localhost:3500/items';
    useEffect(()=>{
        const fetchItems = async()=>{
            try{
                const response = await fetch(API_URL);
                if(!response.ok) throw Error("Data not received")
                const listItems = await response.json();
                setItems(listItems);
                setFetchError(null)
            }catch(err){
                setFetchError(err.message)
            }finally{
                setIsLoading(false)
            }
        }
        setTimeout(()=>{
            (async ()=> await fetchItems())()
        },2000)
    }, [])

    const [search, setSearch] =useState('')

    const [newItem,setNewItem] =useState('')
    const addItem = async (item)=>{
        const id = items.length ? items[items.length - 1].id+1 : 1;
        const addNewItem = {id ,checked:false ,item}
        const listItems = [...items, addNewItem]
        setItems(listItems)
        // AddInlocalStorage(listItems)
        const postOptions = {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(addNewItem)
        }
        const result = await Apirequest(API_URL,postOptions)
        if(result) setFetchError(result)
    }

    // const AddInlocalStorage =(listItems)=>{
    //     localStorage.setItem('todo_list', JSON.stringify(listItems))
    // }

    const handleCheck = async (id) => {
        const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item)
        setItems(listItems)
        const myItem = listItems.filter((item)=>item.id===id)
        const updateOptions={
            method:'PATCH',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({checked:myItem[0].checked})
        }
        const reqUrl = `${API_URL}/${id}`
        const result = await Apirequest(reqUrl,updateOptions)
        if(result) setFetchError(result);
        // AddInlocalStorage(listItems)
    }

    const deleteItems = async (id) => {
        const listItems = items.filter((item) => item.id !== id)
        setItems(listItems)
        // AddInlocalStorage(listItems)
        const deleteOptions = { method: 'DELETE'}
        const reqUrl = `${API_URL}/${id}`
        const result = await Apirequest(reqUrl,deleteOptions)
        if(result) setFetchError(result);
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        if (!newItem) return;
        addItem(newItem)
        setNewItem('')
    }
    return(
        <div className="App">
            <Header heading = 'To Do List'/>
            <Additems
                newItem={newItem}
                setNewItem = {setNewItem} 
                handleSubmit={handleSubmit}
            />
            <Searchitems 
                search={search}
                setSearch={setSearch}
            />
            <main>
                {isLoading && <p style={{textAlign:'center' ,marginTop:'3rem'}}>Loading items..</p>}
                {fetchError  && <p style={{textAlign:'center' ,marginTop:'3rem'}}>{`Error: ${fetchError}`}</p>}
                {!isLoading && !fetchError && <Content 
                    items = {items.filter(item => (item.item).toLowerCase().includes(search.     toLowerCase()))}
                    handleCheck = {handleCheck}
                    deleteItems = {deleteItems}
                    // setItems = {setItems}
                />}
            </main>
            <Footer
                length = {items.length}
            />
        </div>
    );
}
export default App;