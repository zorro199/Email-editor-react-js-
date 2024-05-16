import styles from './EmailEditor.module.scss'
import { Bold, Eraser, Italic, Underline } from 'lucide-react';
import parse from 'html-react-parser'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { emailService } from '../../services/email.service';
import { useEditor } from './useEditor';
import axios from 'axios';


export function EmailEditor() {

const { text, setText, textRef, 
  updateSelection, applyFormat } = useEditor()
  
const queryClient = useQueryClient()

const { mutate, isPending } = useMutation({
  mutationKey: ['create email'],
  mutationFn: () => emailService.sendEmail(text),
  onSuccess() {
    setText('')
    queryClient.refetchQueries({
      queryKey: ['email list']
    })
  }
})

  return (
    <div>
      <h1>Email editor</h1>
      {text && 
      <div className={styles.preview}>{parse(text)}</div>
      }
      <div className={styles.card}>
        <textarea 
        placeholder='Enter email ...'
        ref={textRef}
        onSelect={updateSelection}
        value={text}
        className={styles.editor} 
        spellCheck={false}
        onChange={e => setText(e.target.value)}>
          {text}
        </textarea>
        <div className={styles.actions}>
          <div className={styles.tools}>
          <button onClick={() => setText('')}>
            <Eraser size={16}/>
            </button>
          <button onClick={() => applyFormat('bold')}>
            <Bold size={16}/>
            </button>
          <button onClick={() => applyFormat('italic')}>
            <Italic size={16}/>
            </button>
          <button onClick={() => applyFormat('underline')}>
            <Underline size={16}/>
            </button>
          </div>
          <button 
          disabled={isPending} 
          onClick={() => mutate()}>Send now</button>
        </div>
      </div>
    </ div>
  )

}

      