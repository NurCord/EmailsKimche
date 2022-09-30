import React from 'react'
import Image from './Image'
import ImageDown from './ImageDown'
import { ScrollImagContainers, ScrollImagContainer } from './StyledScrollImage'

export default function ScrollImag() {
  return (
    <ScrollImagContainers>
      <ScrollImagContainer>
        <Image/>
        <ImageDown/>
        <Image/>
        <ImageDown/>
        <Image/>
        <ImageDown/>
      </ScrollImagContainer>
    </ScrollImagContainers>
  )
}
