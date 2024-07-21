import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'

export const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  preload: true,
  subsets: ['latin'],
})

export const dinnext = localFont({
  src: [
    {
      path: '../../public/fonts/DINNextW1G/DINNextW1G-Regular.otf',
      weight: '400',
    },
    {
      path: '../../public/fonts/DINNextW1G/DINNextW1G-Medium.otf',
      weight: '500',
    },
    {
      path: '../../public/fonts/DINNextW1G/DINNextW1G-Bold.otf',
      weight: '700',
    },
  ],
})

export const tungsten = localFont({
  src: [
    {
      path: '../../public/fonts/Tungsten/Tungsten-Bold.otf',
      weight: '700',
    },
  ],
})
