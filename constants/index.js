/*
 * @Author: czy0729
 * @Date: 2019-06-27 10:35:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-27 10:38:46
 */
import getConfig from 'next-server/config'

export const server = typeof window === 'undefined'

const { publicRuntimeConfig } = getConfig()
export const { linkPrefix } = publicRuntimeConfig
