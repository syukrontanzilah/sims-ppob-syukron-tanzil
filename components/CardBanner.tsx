import Image from 'next/image'
import React from 'react'

interface CardBannerProps {
    title: string;
    image: string;
  }

const CardBanner:React.FC<CardBannerProps> = ({
    title,
    image
}) => {
  return (
    <div className='w-full lg:w-[250px] lg:h-[100px] mb-2 lg:mb-0'>
      <Image className='w-full lg:w-[250px] lg:h-[100px]' width={250} height={100} src={image} alt={title}/>
    </div>
  )
}

export default CardBanner
