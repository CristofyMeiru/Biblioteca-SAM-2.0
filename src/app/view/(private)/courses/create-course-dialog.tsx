import { buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogOverlay, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Icon from '@/components/ui/icon'
import React from 'react'

export default function CreateCourseDialog() {
  return (
    <Dialog>
      <DialogTrigger className={buttonVariants({variant: "default"})}>
        <Icon name='plus' /> Adicionar
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar curso</DialogTitle>
          <DialogDescription>Preencha as informações para adicionar um novo curso.</DialogDescription>
        </DialogHeader>
        
      </DialogContent>

    </Dialog>
  )
}
