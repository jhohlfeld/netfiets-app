import { createContext } from 'react'

interface Typography {
  weight: string
  fontSize: number
  leading: number
  tracking: number
}

interface TypographyCollectionItem {
  [key: string]: Typography
}

interface TypographyCollection {
  [key: string]: any
  default: string
  large: TypographyCollectionItem
}

const typographyCollection: TypographyCollection = {
  default: 'large',
  large: {
    'Large Title': {
      weight: 'Regular',
      fontSize: 34,
      leading: 41,
      tracking: +11,
    },
    'Title 1': {
      weight: 'Regular',
      fontSize: 28,
      leading: 34,
      tracking: +13,
    },
    'Title 2': {
      weight: 'Regular',
      fontSize: 22,
      leading: 28,
      tracking: +16,
    },
    'Title 3': {
      weight: 'Regular',
      fontSize: 20,
      leading: 25,
      tracking: +19,
    },
    'Headline': {
      weight: 'Semi-Bold',
      fontSize: 17,
      leading: 22,
      tracking: -24,
    },
    'Body': {
      weight: 'Regular',
      fontSize: 17,
      leading: 22,
      tracking: -24,
    },
    'Callout': {
      weight: 'Regular',
      fontSize: 16,
      leading: 21,
      tracking: -20,
    },
    'Subhead': {
      weight: 'Regular',
      fontSize: 15,
      leading: 20,
      tracking: -16,
    },
    'Footnote': {
      weight: 'Regular',
      fontSize: 13,
      leading: 18,
      tracking: -6,
    },
    'Caption 1': {
      weight: 'Regular',
      fontSize: 12,
      leading: 16,
      tracking: 0,
    },
    'Caption 2': {
      weight: 'Regular',
      fontSize: 11,
      leading: 13,
      tracking: +6,
    },
  }
}

const typography = (type: string) : Typography => typographyCollection[typographyCollection.default][type]
const fontSize = (type: string) : number => typography(type).fontSize
const spacing = (n: number) : number => fontSize('Body') * n
const colors = {
  screenBackgroundColor: '#ffffff'
}

export const ThemeContext = createContext({})

export const theme = {
  fontSize,
  spacing,
  typography,
  colors,
}
