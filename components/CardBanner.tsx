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
    <div>
      <Image width={250} height={100} src={image} alt={title}/>
    </div>
  )
}

export default CardBanner
