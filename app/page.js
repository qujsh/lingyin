"use client"

import { HeroUIProvider } from '@heroui/react';
import {Button} from "@heroui/react";
import {Textarea} from "@heroui/react";


export default function Home() {
  return (
    
    <HeroUIProvider>
<div className='text-xs'>
      hello
    </div>
<Button color="primary" className='text-lg'>Button</Button>
<Textarea className="max-w-xs" label="Description" placeholder="Enter your description" />
  </HeroUIProvider>
  );
}




