import React from "react"
import { Link, useSearchParams } from "react-router-dom"



export default function Vans() {

    const [searchParams, setSearchParams] = useSearchParams()

    const typeFilter = searchParams.get("type")
     
    

    const [vans, setVans] = React.useState([])

    const displayedVans = typeFilter
        ? vans.filter(van => van.type === typeFilter)
        : vans

    React.useEffect(() => {
        fetch("/api/vans")
            .then(res => res.json())
            .then(data => setVans(data.vans))
    }, [])

    
    const vanElements = displayedVans.map(van => (
        <div key={van.id} className="van-tile">
            <Link to={van.id}>
                <img src={van.imageUrl} alt={`Image of ${van.name}`} /> 
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>            
        </div>
    ))

    function genNewSearchParamString(key, value) {
        const sp = new URLSearchParams(searchParams)
        if (value === null) {
          sp.delete(key)
        } else {
          sp.set(key, value)
        }
        return `?${sp.toString()}`
      }

    function handleFilterChange(key, value) {
        setSearchParams(prevParams => {
            if (value === null) {
                prevParams.delete(key)
            } else {
                prevParams.set(key, value)
            }
            return prevParams
        })
    }


    return (
        <div className="van-list-container">
            <h1>Explore our van options</h1>
            <div className="van-list-filter-buttons">
                <button className="van-type simple" to="?type=simple">simple</button>
                <button className="van-type luxury" to="?type=luxury">luxury</button>
                <button className="van-type rugged" to="?type=rugged">rugged</button>
                <button to="." className="van-type clear-filter">clear filter</button>
            </div>
            <div className="van-list">
                {vanElements}
            </div>
        </div>


        // <div className="van-list-container">
        //     <h1>Explore our van options</h1>
        //     <div className="van-list-filter-buttons">
        //         <button onClick={() => setSearchParams({type: "simple"})} className="van-type simple" to="?type=simple">simple</button>
        //         <button onClick={() => setSearchParams({type: "luxury"})} className="van-type luxury" to="?type=luxury">luxury</button>
        //         <button onClick={() => setSearchParams({type: "rugged"})} className="van-type rugged" to="?type=rugged">rugged</button>
        //         <button onClick={() => setSearchParams({})} to="." className="van-type clear-filter">clear filter</button>
        //     </div>
        //     <div className="van-list">
        //         {vanElements}
        //     </div>
        // </div>


    )
}