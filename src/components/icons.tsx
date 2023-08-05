import { IoSettingsOutline } from 'react-icons/io5'
import { FiCheck } from 'react-icons/fi'
import { HiXMark } from 'react-icons/hi2'

import type { IconType } from 'react-icons'


export type Icon = IconType
export type ValidIcon = keyof typeof Icons

export const Icons = {
    checkMark: FiCheck,
    xMark: HiXMark,
    settings: IoSettingsOutline
} as const

