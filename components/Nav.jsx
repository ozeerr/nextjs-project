"use client"
import { useState,useEffect } from 'react'
import {signIn, signOut,useSession,getProviders} from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
const Nav = () => {
    const isUserLoggedIn = false
    const [providers, setProviders] = useState(null)
    const [toggleDropdown, setToggleDropdown] = useState(false)

    // useEffect(()=>{
    //     const setProviders=async()=>{
    //         const response=await getProviders()
    //         setProviders(response)
    //     }

    //     setProviders()
    // },[])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" alt="Promptopia Logo" width={30} height={30} className='object-contain'/>
        <p className='logo-text'>Promptopia</p>
      </Link>

      <div className='sm:flex hidden'>
        {isUserLoggedIn?(
            <div className='flex gap-3 md:gap-5'>
                <Link href="/create-propmpt" className='black_btn'>Create Post</Link>
                <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>
                <Link href="/profile">
                    <Image src="/assets/images/logo.svg" width={37} height={37} className='rounded-full' alt='profile'></Image>
                </Link>
            </div>
        ):(
            <>
            {providers&&Object.values(providers).map((provider)=>{
                    return(
                        <button type='button' onClick={()=>signIn(provider.id)} className='black_btn' key={provider.name}>Sign In</button>
                    )
            })}
            </>
        )}
      </div>

        <div className='sm:hidden flex relative'>
            {isUserLoggedIn?(
                <div className='flex'>
                    <Image src="/assets/images/logo.svg" width={37} height={37} className='rounded-full' alt='profile' onClick={()=>{setToggleDropdown((prev)=>!prev)}}/>
                    {toggleDropdown&&(
                        <div className='dropdown'>
                            <Link href="/profile" className='dropdown_link' onClick={()=>setToggleDropdown(false)}>
                                My Profile
                            </Link>
                            <Link href="/create-propmpt" className='dropdown_link' onClick={()=>setToggleDropdown(false)}>
                                Create Propmpt
                            </Link>
                            <button type='button' className='mt-5 w-full black_btn' 
                            onClick={()=>{
                                setToggleDropdown(false)
                                signOut()
                                }}>Sign Out</button>
                        </div>
                    )}
                </div>
            ):(
                <>
                {providers&&Object.values(providers).map((provider)=>{
                        return(
                            <button  className='black_btn' type='button' onClick={()=>signIn(provider.id)} key={provider.name}>Sign In</button>
                        )
                })}
                </>
            )}
        </div>

    </nav>
  )
}

export default Nav
