import React from 'react'
import type { Todo } from '../types'
import {XCircle} from "lucide-react"

interface IProps {
  info: Todo
  onDelte: (id: number) => void
}
const TaskItem = ({info, onDelte}: IProps) => {
  return (
    <div className='border py-2 p-3 w-full flex items-center justify-between cursor-pointer' onClick={() => onDelte(info.id)}>
        {info.text}
        <XCircle />
    </div>
  )
}

export default TaskItem

