---
title: 8-bit CPU from scratch
date: 2022-03-19T14:34:28.403Z
tags:
  - projects
thumbnail: /media/post_images/logicgates.jpg
---
Not that long ago, the CPU always seemed as almost a black box. Sure, I knew roughly what it *does*, but *how exactly* does it power the age of information seemed a complete mystery. I am glad to say that has changed now.

This project was done as part of the EE/CS10a class, using the ABEL hardware description language. Although fallen out of use nowadays, it did serve as a powerful teaching tool since most of the design was close to gate-level. That is, the CPU was built by explicitly defining AND, OR, XOR, etc. gates for use in the design.

The design itself consisted of 5 parts:

1. ALU (arithmetic logic unit)
2. Control Unit
3. Program Address Unit
4. Data Address Unit

## The ALU

Roughly speaking, this is the part of the CPU that actually performs calculations - all it is is a couple of shift registers (for performing logic/arithmetic shifts and rotates) and an adder/subtracter (for, you guessed it, adding and subtracting numbers). This is also the place that the registers and the accumulator are implemented - the place CPU actually stores numbers for performing calculations.

## Control Unit

This is the part of the CPU that controls the rest of its subsystems - decoding the instructions from the instruction register, passing along the commands to the ALU and data access units for performing certain tasks.

## Program Address Unit

Since this CPU is implemented using Harvard architecture, program memory is separate from data memory. So, we need a separate unit that can keep track of what address to look for the next instruction, since it can be just the next one, or, if there has been a JUMP instruction, an address that needs to be calculated.

## Data Address Unit

Similar to the program address unit, the addresses for data we want to access needs to be calculated. Since it can be addressed directly, or from an offset, this takes care of tracking where to look for data in memory.