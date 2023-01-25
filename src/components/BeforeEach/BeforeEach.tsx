import React from 'react'
import { useLocation, matchRoutes, Navigate } from 'react-router-dom'

import { routes } from '../../router'
import { useAppDispatch } from '../../store'
import { infosAction } from '../../store/modules/users'


interface BeforeEachProps {
  children?: React.ReactNode
}

export default function BeforeEach(props: BeforeEachProps) {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const matchs = matchRoutes(routes, location)

  if (Array.isArray(matchs)) {
    const meta = matchs[matchs.length - 1].route.meta

      
    if (meta?.auth) {
      dispatch(infosAction()).then((action) => {
        console.log(action.payload)
      })
      // return <Navigate to='/login' />
    }
  }


  return (
    <>
      { props.children }
    </>
  )
}
