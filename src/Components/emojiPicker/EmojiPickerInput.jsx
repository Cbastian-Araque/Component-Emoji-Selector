import { useRef } from "react";
import EmojiPicker from "./EmojiPicker";
import desing from "./EmojiPicker.module.css";

export default function EmojiPickerInput(){
  const refInput = useRef(null);

  return (
    <>
      <h1>Emoji Selector</h1>
      <div className={desing.emojiPickerApp}>
        <input type="text" ref={refInput} />
        <EmojiPicker ref={refInput} />
      </div>
    </>
  )
}