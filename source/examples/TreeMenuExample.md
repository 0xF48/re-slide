This example is a bit more advanced (and somewhat crazy), pushing the limits of what this library can practically do. Without `Slide` creating a component that mimics this exact same functionality would be near impossible or would have taken thousands of lines of code. Using a nested slide offset trick i created a smooth and optimized tree menu from an object in just 150 lines of code.

19 nested components for just showing 3 root elements may seems a bit crazy, but hey, optimizing it while maintaining the same sliding approach would probably be even more insane. Click around to see the cool effect.

Notice how the div count changes dynamically. slides that are not in the viewport are automatically hidden by parents, eliminating the need to worry about rendering components that are not visible.

However, even though the components dont get rendered, the props are still passed down. To avoid passing down too many props inside render, conditionaly rendering components will optimize the ui even further.

>recursion + nested slides 😨