---
title: 8-bit CPU from scratch
date: 2022-03-19T14:34:28.403Z
tags:
  - projects
thumbnail: /media/post_images/logicgates.jpg
---
Not that long ago, the CPU always seemed as almost a black box. Sure, I knew roughly what it *does*, but *how exactly* does it go about it seemed a complete mystery. I am glad to say that has changed now.

This project was done as part of the EE/CS10a class - the CPU was implemented on a CPLD mostly by explicitly defining AND, OR, XOR, etc. gates for use in the design.

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

Since this CPU is implemented using Harvard architecture, program memory is separate from data memory. So, we need a separate unit that can keep track of what address to look for the next instruction. It can be just the next one in memory, or, if there has been a JUMP instruction, some additional calculation might take place, since we might need to "jump" a constant number of instructions, or a variable amount based on a value passed on by the user.

## Data Address Unit

Similar to the program address unit, the addresses for data we want to access needs to be calculated. Since it can be addressed directly, or from an offset, this takes care of tracking where to look for data in memory.

Overall, I can say that this has been one of the most influential projects I've done in university, since it has really allowed me to understand what actually goes into "running a program" on a computer.