import { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

const Document = () => {
  return (
    <Html>
        <Head/>
        <body className='bg-light-100'>
            <Main/>
            <NextScript/>
        </body>
    </Html>
  )
}

export default Document