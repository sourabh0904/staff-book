'use client'
import { useParams } from 'next/navigation'
import React from 'react'

export default function Page() {
  const params=useParams()
  return (
    <div className='flex text-black mt-96 min-h-screen bg-white'
  >page:{params.id}</div>
  )
}

