import React from "react";
import Collapsible from 'react-collapsible';

function Authors({authors}){

    const authorsMap = authors.map((author) => {
        
        return (
            <Collapsible className="authorContainer" trigger={author.name}>
            <table className="authorsQuote">
                {author.quotes.map((quote) => {
                    return (<tr>{quote.text}</tr>)
                })}
            </table>
            </Collapsible>
        )
    })

    return (
        <div className="authorsList">
            {authorsMap}
        </div>
    )
}


export default Authors