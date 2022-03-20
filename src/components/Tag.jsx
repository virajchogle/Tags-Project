import { useState } from "react"
import React from "react";
import './Tag.css';

function Tag() {

  const [input, setInput] = useState('');
  const [tags, setTags] = useState([]);
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [message, setMessage] = useState('');
  const [limitReached, setlimitReached] = useState(false);

  const limit = 5; //Dummy limit that can be changed according to preference

    const checkValid = (input) => {

      if(!input.length){
        setMessage('Cant be empty')
        return false
      }
      if(tags.includes(input)){
        setMessage('Duplicate tag')
        return false
      }
      if(tags.length===limit){
        setlimitReached(true)
        setMessage(`Cannot have more than ${limit} tags`)
        return false
      }
      else {
        setMessage(null)
        return true
      }
    }

    const onChange = (e) => {
      const { value } = e.target;
      setInput(value);
      if(tags.length<=limit ) {
        setMessage(null)
      }
    };

    const onKeyDown = (e) => {
      const { key } = e;
      const trimmedInput = input.trim();
    
      if ((key === ',' || key==="Enter") && checkValid(trimmedInput)) {
        e.preventDefault();
        setTags(prevState => [...prevState, trimmedInput]);
        setInput('');
      }
    
      if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
        const tagsCopy = [...tags];
        const poppedTag = tagsCopy.pop();
        e.preventDefault();
        setTags(tagsCopy);
        setInput(poppedTag);
        setlimitReached(false);
      } 
      setIsKeyReleased(false);
    };
    
    const onKeyUp = () => {
      setIsKeyReleased(true);
    }

    const deleteTag = (index) => {
      setTags(prevState => prevState.filter((tag, i) => i !== index))
      setlimitReached(false)
      setMessage(null)
    }

  return (
    <div>
    <div className="textArea">
    {tags.map((tag,index) => <div className="tag">{tag}<button className="tagButton" onClick={() => deleteTag(index)}>x</button></div>)}
    <input className={` input ${!limitReached ? 'input-box' : 'input-invisible'}`}
      value={input}
      placeholder="Enter a tag"
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onChange={onChange}
    />
  </div> 
    {message && <div className="message">{message}</div>}
  </div>
  )
}

export default Tag