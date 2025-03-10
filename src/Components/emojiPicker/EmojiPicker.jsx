import { forwardRef, useState, useRef, useEffect } from "react"
import {data as emojiList} from './data.jsx';
import EmojiSearch from "./EmojiSearch.jsx";
import EmojiButton from "./EmojiButton.jsx";
import desing from "./EmojiPicker.module.css";

export function EmojiPicker(props, reference){
  const [isOpen, setIsOpen] = useState(false);
  const [emojis, setEmojis] = useState([...emojiList]);
  const containerRef = useRef(null);

  useEffect(() => {
    window.addEventListener('click', e => {
      if( !containerRef.current.contains(e.target) ){
        setIsOpen(false);
        setEmojis(emojiList);
      }
    })
  }, []);

  function handleClickOpen(){
    setIsOpen(!isOpen);
  }

  function handleSearch(e){
    const q = e;

    if(!!q){
      const search = emojiList.filter(emoji => {
        return (
          emoji.name.toLowerCase().includes(q) ||
          emoji.keywords.toLowerCase().includes(q)
        )
      });

      setEmojis(search);
    } else {
      setEmojis(emojiList);
    }

    console.log(q);
  }

  // function EmojiPickerContainer(){
  //   return(
  //     <div>
  //       <EmojiSearch onSearch={handleSearch} />
  //       <div>
  //         {
  //           emojiList.map(emoji =>(
  //             <div key={emoji.id}>{emoji.symbol}</div>
  //           ))
  //         }
  //       </div>
  //     </div>
  //   )
  // }

  function handleOnClickEmoji(emoji){
    const cursorPosition = reference.current.selectionStart;
    const text = reference.current.value;
    const prev = text.slice(0,cursorPosition);
    const next = text.slice(cursorPosition);

    reference.current.value = prev + emoji.symbol + next;
    reference.current.selectionStart = cursorPosition + emoji.symbol.length;
    reference.current.selectionEnd = cursorPosition + emoji.symbol.length;
    reference.current.focus();
  }

  return (
    <div ref={containerRef} className={desing.btnShowEmojis}>
      <button onClick={handleClickOpen} title="Add emoji">😁</button>
      {isOpen ? (
        <div className={desing.containerEmojis}>
          <EmojiSearch onSearch={handleSearch} />
          <div>
            {emojis.map(emoji =>(
              <EmojiButton key={emoji.symbol} emoji={emoji} onClick={handleOnClickEmoji} />
            ))}
          </div>
        </div>
      ) : ''}
    </div>
  )
}

export default forwardRef(EmojiPicker)