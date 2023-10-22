---
title: Binario game embedded system
date: 2022-05-01T06:19:48.758Z
tags:
  - projects
thumbnail: /media/post_images/binario.jpg
---
This project was done as part of the class following [CPU design](https://opran.is/blog/posts/2022-03-19-8-bit-cpu-from-scratch/) - now we could actually get to know how to use it. It used to be the case that when I had to to a project involving programming, more often than not I would reach toward Python - its wide support and general ease of use mean it is great for various projects. At the same time, it is quite far removed from directly getting the CPU to do your bidding. This class was tremendously helpful in this regard, since all of the programming for it was done in AVR assembly.

The main project that we had to create, was a board on which you can play Binario - a game with a simple rule set that somewhat resembles sudoku. For this, the project was split into multiple parts:

## Switch and button handling and debouncing

While it may seem that a button is really a simple device, it actually has one aspect of it that can be a bit annoying to deal with. When you press down a button, it bounces, so what may seem like a single button press, a computer might register as multiple, over a very short time duration. Using system timers and interrupts, this was not too difficult to deal with.

## Display routines

This is the part where we can show the user what the game board actually looks like currently, and let them interact with the game. However, since we cannot output 64 different signals at once, we have to instead multiplex the LEDs - we can output the display 1 column at a time, in rapid succession so fast that the human eye does not even notice that not all of the display is on at any given point in time.

## Sound

We also want to give some sort of feedback to the user that pressing a button has indeed had some sort of effect on the game. This can just be generated using pulse-width modulation and some simple timing, to generate beeps of various pitches.

## SPI communication

The actual game boards is stored in an EEROM chip, so, to be able to talk to it, we need to implement SPI communication.

## Main game logic

This is where it all finally comes together. Using the aforementioned routines, we have all the tools to actually implement the Binario game logic, and put together the main loop that runs our game.

Overall, I can say that this project was tremendously helpful for understanding what a CPU actually does even when running a simple game such as this one. One has to think about interrupts, hardware timers, trying to make do with limited system resources. For example, I had never considered that a fairly trivial thing such as displaying output and playing music simultaneously might actually involve a fair bit of juggling system resources. In a very real way, having a limited amount of resources makes design more interesting!