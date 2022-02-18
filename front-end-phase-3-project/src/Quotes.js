import React, {useEffect, useState} from "react";
import Collapsible from 'react-collapsible';
import { Configuration, OpenAIApi } from "openai";

function Quotes({quotes, completions}){

    const [newResp, setNewResp] = useState({})
    const [newComp, setNewComp] = useState([])

    const configuration = new Configuration({
        organization: "org-qlo9s40uJRugmWMe0hsbCDTR",
        apiKey: "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"
    })
    function payload(prompt) {
            return {prompt: `In summary, ${prompt}`,
            max_tokens: 64,
            temperature: 0.65,
            n: 1,
            stream: false,
            logprobs: null,
            presence_penalty: 0.2,
            frequency_penalty: 0.4}
            }
    const openai = new OpenAIApi(configuration)

    async function response(x) {setNewResp(await openai.createCompletion("davinci", payload(x)))}
  
    function handleClick(e) {
        response(e.target.parentNode.parentNode.parentNode.parentNode.firstChild.innerText)
        fetch("http://localhost:9292/quotes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  text: newResp.data.choices[0].text,
                  quote_id: e.target.getAttribute("quoteId"),
                  author_id: e.target.getAttribute("authorId")
              })
        }).then((r) => r.json()).then(setNewComp)
        console.log(newComp)
        e.target.disabled = true
        setTimeout(e.target.disabled = false, 1500)
    }

    function handleDelete(e) {
        fetch(`http://localhost:9292/completions/${e.target.id}`, {
            method: 'DELETE',
        })
        console.log(e.target.parentNode.remove())
        
    }
    const quotesMap = quotes.map((quote) => {
        return (
            <Collapsible className="quoteContainer" trigger={quote.text} key={quote.id}>
            <tr className="quotesAuthor">
                {quote.author.name}
            </tr>
            <td><button type="button" onClick={(e) => handleClick(e)} quoteId={quote.id} authorId={quote.author.id}>Generate New Summary</button>
            <td><Collapsible className="completionList" trigger="Show Summaries">
                {completions.map((completion) => {
                    if (completion.quote_id === quote.id) {
                        return (<div key={completion.id} className="completionText" id={completion.id}><p>{completion.text}</p><button id={completion.id} type="button" onClick={(e) => handleDelete(e)}>X</button></div>)
                    }
                })}
            </Collapsible></td>
            </td> 
            </Collapsible>
        )
    })

    return (
        <div className="quotesList">
            <table>
                {quotesMap}
            </table>
        </div>
    )
}
export default Quotes   