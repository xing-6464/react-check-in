import React from 'react'
import { useLocation, matchRoutes, Navigate } from 'react-router-dom'
import _ from 'lodash'

import { routes } from '../../router'
import { useAppDispatch, useSelector } from '../../store'
import { infosAction, updateInfos } from '../../store/modules/users'
import type { Infos } from '../../store/modules/users'


interface BeforeEachProps {
  children?: React.ReactNode
}

export default function BeforeEach(props: BeforeEachProps) {
  const dispatch = useAppDispatch()
  const token = useSelector(s => s.users.token)
  const infos = useSelector(s => s.users.infos)
  const location = useLocation()
  const matchs = matchRoutes(routes, location)

  if (Array.isArray(matchs)) {
    const meta = matchs[matchs.length - 1].route.meta

      
    if (meta?.auth && _.isEmpty(infos)) {

      if (token) {
        dispatch(infosAction()).then((action) => {
          const { errcode, token } = (action.payload as {[index: string]: unknown}).data as {[index: string]: unknown}

          if (errcode === 0) {
            dispatch(updateInfos(infos as Infos))
          }
        })
      } else {
        return <Navigate to='/login' />
      }
    }
  }
  if (token && location.pathname === '/login') {
    return <Navigate to='/' />
  }


  return (
    <>
      { props.children }
    </>
  )
}
