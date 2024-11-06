'use client'

import { useState, useEffect } from 'react'

interface TypeWriterProps {
  text: string
  delay?: number
  className?: string
  showCursor?: boolean
}

export function TypeWriter({ 
  text, 
  delay = 100,
  deleteDelay = 50,  // 删除速度
  pauseDelay = 1000, // 暂停时间
  className = '',
  showCursor = true 
}: TypeWriterProps) {
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Google 颜色数组
  const googleColors = [
    'text-[#4285F4]', // Google 蓝
    'text-[#DB4437]', // Google 红
    'text-[#F4B400]', // Google 黄
    'text-[#0F9D58]'  // Google 绿
  ]

  // 获取每个字符的颜色
  const getColorClass = (index: number) => {
    return googleColors[index % googleColors.length]
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, pauseDelay)
    } else if (isDeleting) {
      if (currentText.length === 0) {
        setIsDeleting(false)
        setCurrentIndex(0)
      } else {
        timeout = setTimeout(() => {
          setCurrentText(prev => prev.slice(0, -1))
        }, deleteDelay)
      }
    } else {
      if (currentIndex < text.length) {
        timeout = setTimeout(() => {
          setCurrentText(prev => prev + text[currentIndex])
          setCurrentIndex(prev => prev + 1)
        }, delay)
      } else {
        setIsPaused(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentIndex, delay, deleteDelay, pauseDelay, text, isDeleting, isPaused, currentText])

  return (
    <span className={className}>
      {currentText.split('').map((char, index) => (
        <span key={index} className={getColorClass(index)}>
          {char}
        </span>
      ))}
      {showCursor && (
        <span className="ml-1 animate-pulse text-[#4285F4]">|</span>
      )}
    </span>
  )
}
