This example demonstrates how easy it is to build a carousel type component with just a few lines of code, just checkout the <a href = 'https://github.com/arxii/preact-slide/blob/master/source/examples/CarouselExample.coffee?ts=4'>source file</a> and see for yourself!
***
**Notice** the red background when selecting slides that are 1 or more over, it's there to show that slides which are not visible relative to the parent are set to `visibility: hidden`. When you change the `pos` property, the component recalculates the visibility before and after the transition.
