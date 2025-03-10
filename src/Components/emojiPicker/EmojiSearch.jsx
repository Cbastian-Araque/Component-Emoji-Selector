import {useState} from 'react';

export default function EmojiSearch({ onSearch }){
  const [value, setValue] = useState('');

  function handleChange(e){
    setValue(e.target.value);
    onSearch(e.target.value);
  }

  return <input type="text" placeholder='Search emoji' onChange={handleChange} value={value} />
}