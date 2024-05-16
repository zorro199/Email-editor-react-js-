import { useQuery, useQueryClient } from '@tanstack/react-query'
import styles from './EmailList.module.scss'
import { emailService } from '../../services/email.service'
import parse from 'html-react-parser'
import { useState } from 'react';

export function EmailList() {
    const [dates, setDates] = useState([]);

    const queryClient = useQueryClient()

    const { data } = useQuery({
        queryKey: ['email list'],
        queryFn: () => emailService.getEmail()
    })

const deleteID = async (id: number) => {
    await emailService.deleteallEmail(id)
    queryClient.refetchQueries({
        queryKey: ['email list']
    })
    data?.filter(el => (
        el.id !== id
    ))
}

    return (
        <div className={styles.list}>
            {data?.map(email => (
                <div key={email.text}>
                <div>{parse(email.text)}</div>
                <button onClick={() => deleteID(email.id)}>Delete</button>
                </div>
            ))}
        </div> 
    )
}