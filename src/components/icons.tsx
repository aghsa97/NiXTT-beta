import { IoSettingsOutline } from 'react-icons/io5'
import { FiCheck, FiTrash } from 'react-icons/fi'
import { HiXMark } from 'react-icons/hi2'
import { ImSpinner2 } from 'react-icons/im'

import type { IconType } from 'react-icons'


export type Icon = IconType
export type ValidIcon = keyof typeof Icons

export const Icons = {
    checkMark: FiCheck,
    xMark: HiXMark,
    settings: IoSettingsOutline,
    spinner: ImSpinner2,
    trash: FiTrash,
} as const

