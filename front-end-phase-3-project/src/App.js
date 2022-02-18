import React, {useEffect, useState} from "react";
import {Route, Routes } from "react-router-dom";
import MainPage from "./MainPage"
import Quotes from "./Quotes"
import Authors from "./Authors"
import NavBar from "./NavBar"

function App() {
    const authorUrl = "http://localhost:9292/authors"
    const quoteUrl = "http://localhost:9292/quotes"
    const completionsUrl = "http://localhost:9292/completions"

    const [authors, setAuthors] = useState([])
    const [quotes, setQuotes] = useState([])
    const [completions, setCompletions] = useState([])

    useEffect(() => {
        fetch(authorUrl).then((r) => r.json()).then(setAuthors)
    }, [])

    useEffect(() => {
        fetch(quoteUrl).then((r) => r.json()).then(setQuotes)
    }, [])

    useEffect(() => {
        fetch(completionsUrl).then((r) => r.json()).then(setCompletions)
    }, [])


    return (
        <div classname="mainPage">
            <NavBar/>
            <Routes>
              <Route exact path="/quotes" element={<Quotes quotes={quotes} completions={completions}/>}/>
              <Route exact path="/authors" element={<Authors authors={authors}/>}/>
              <Route exact path="/" element={<MainPage/>}/>
            </Routes>
        </div>
    )

}

export default App