import { getCsrfToken, getSession, signIn } from 'next-auth/react'
import React, { useState } from 'react';
import Head from 'next/head';
import { isConfirmed, isEmpty } from '../helpers';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { XIcon } from '@heroicons/react/outline';

function Signup({}) {
    const [fullName,setFullName] = useState('');
    const [email,setEmailAddress] = useState('');
    const [companyName,setCompanyName] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [error,setError] = useState(null);
    const [emailErrorMessage,setEmailErrorMessage] = useState(null);
    const [passwordErrorMessage,setPasswordErrorMessage] = useState(null);
    const [isSigningup,setIsSigningUp] = useState(false);
    const router = useRouter();



    let submitButton;

    if(!isEmpty(fullName) && !isEmpty(email) && !isEmpty(password) && !isEmpty(confirmPassword) && isConfirmed(password,confirmPassword)){
        submitButton =  <button type='submit' className='p-2 w-full bg-blue-400 
        text-white font-semibold text-lg rounded hover:bg-blue-600' disabled={isSigningup & true}>{isSigningup ? 'Signing up...' : 'Signup'}</button>
    }else{
        submitButton =  <button type='submit' className='p-2 w-full 
        bg-slate-100 text-slate-600 font-semibold text-lg rounded 
        hover:bg-blue-600' disabled>
        Signup
    </button>
    }

    

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        setIsSigningUp(true);
        const data = {fullName,email,companyName,password,confirmPassword};
        try {

            const apiResponse = await fetch('/api/signup',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify(data)
            });

            const jsonData = await apiResponse.json();
            const {success} = jsonData;

            if(success){
                const signinRes = await signIn('credentials',{
                    redirect:false,
                    email,
                    password,
                    callbackUrl:window.location.origin
                });

                if(signinRes.url === "https://taskit-nine.vercel.app"){
                    router.push('https://taskit-nine.vercel.app/app/');
                }

            }
        } catch (error) {
            setError(true);
            setIsSigningUp(false);
            console.log(error.message);
        }
        
        
         

    }

  return (
    <div>
      <Head>
        <title>Taskit - Signup</title>
        <meta name="description" content="Taskit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className='flex items-center relative min-h-screen'>
            <div className='hidden md:flex md:flex-col md:justify-center md:items-center bg-blue-400 min-h-screen w-1/2 p-20'>
                <h1 className='font-bold text-white text-5xl'>Task<span className='text-yellow-200'>it</span></h1>
                <p className='text-white font-bold'>Your #1 task management platform.</p>
            </div>

            <div className='w-full md:w-1/2 flex flex-col justify-center items-center px-0'>
                <div className='text-3xl font-bold'>Signup.</div>
                <div className='p-2'>
                    {
                        error && (
                            <div className='flex founded text-white font-semibold items-center justify-centerp-2 bg-red-400'>
                                <span>Something went wrong!</span>
                            <XIcon className='w-2 h-2' onClick={() => setError(false)}/></div>
                        )
                    }
                    <form onSubmit={handleSignupSubmit}>
                        <div className='relative'>
                            <label className='font-semibold text-slate-600 text-sm'>Your Full Name *</label>
                            <input type={'text'} 
                            placeholder='John Doe'
                            name='fullName'
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)} 
                            className='border border-slate-200 focus:border-blue-300 p-2 outline-none w-full rounded'
                            autoFocus
                            />
                        </div>

                        <div className='relative mt-3'>
                            <label className='font-semibold text-slate-600 text-sm'>Your email address *</label>
                            <input type={'email'} 
                            name='email'
                            value={email}
                            onChange={(e) => setEmailAddress(e.target.value)} 
                            placeholder='example@example.com' 
                            className='border border-slate-200 focus:border-blue-300 p-2 outline-none w-full rounded'/>
                        </div>

                        <div className='relative mt-3'>
                            <label className='font-semibold text-slate-600 text-sm'>Company name (optional)</label>
                            <input type={'text'}
                            name='companyName'
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            placeholder='Example Ltd' 
                            className={`border border-slate-200 focus:border-blue-300 ${emailErrorMessage && 'border-red-300'} p-2 outline-none w-full rounded`}/>
                            {emailErrorMessage && <div className='text-red-300 text-sm font-semibold'>{emailErrorMessage}</div>}
                        </div>

                        <div className='relative mt-3'>
                            <label className='font-semibold text-slate-600 text-sm'>Password *</label>
                            <input type={'password'}  
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='border border-slate-200 focus:border-blue-300 p-2 outline-none w-full rounded'/>
                        </div>

                        <div className='relative mt-3'>
                            <label className='font-semibold text-slate-600 text-sm'>Confirm Password *</label>
                            <input type={'password'}  
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`border border-slate-200 focus:border-blue-300 ${passwordErrorMessage && 'border-red-300'} p-2 outline-none w-full rounded`}/>
                        </div>

                        <div className='relative mt-4'>
                            {submitButton}
                        </div>
                    </form>
                    <div className='mt-1 text-center'>
                        <div className='text-sm'>Already have an account? <Link href={'/login'}><span className='cursor-pointer text-blue-500'>Login</span></Link></div>
                    </div>
                </div>
            </div>
        </div>
      </main>

     
    </div>
  )
}


export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    if(session){
        return {
            redirect:{
                destination:'/app/',
                permanent:false
            }
        }
    }
    else{
        return {
            props:{}
        }
    }
}
export default Signup

